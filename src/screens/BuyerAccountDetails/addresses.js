import React, { Component } from "react";
import {RenderPicker} from '../../components/Picker';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Headline,
  Alert,
  ScrollView
} from "react-native";
import {
  TextInput,
  HelperText,
  IconButton,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./style_address";
import { getCountries } from "../../core/apis/apiPortfolioServices";
import { call } from "react-native-reanimated";
import * as apiServices from "../../core/apis/apiAddressServices";
import Spinner from "react-native-loading-spinner-overlay";
import { Picker } from "@react-native-picker/picker";
import { addresses } from "./map";
import { TouchableOpacityButton } from "../../components/TouchableOpacity";

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      adress: "",
      adressError: false,
      country: {label:null,value:null},
      city: "",
      cityError: false,
      state: "",
      stateError: false,
      street: "",
      streetError: false,
      postal: '',
      postalError: false,
      visible: false,

      fetchedCountries: [],
      openCountry: false,
      type: "",
    };
  }

  componentDidMount() {
    //console.log(this.props.route.params.type)
    this.setState({ type: this.props.route.params.type });
    if (this.props.route.params.type == "edit" || this.props.route.params.type == "view"){
        console.log("ROUTE DATA,", this.props.route.params.item);
        let route = this.props.route.params.item;
        this.setState({
        id:route.id,
        adress: route.registered_address,
        postal: route.postal_code,
        street: route.street,
        state: route.state,
        city:route.city,
        country:route.country_id
        });
        }
    getCountries().then((result) => {
      let arr = [];
      result.map((i) => {
        arr.push({ label: i.label, value: i.value });
      });
      return this.setState({ ...this.state, ...{ fetchedCountries: arr } });
    });
  }

  setOpenCountry = (openCountry) => {
    this.setState({
      openCountry,
    });
  };

  setCountryValue = (callback) => {
    this.setState((state) => ({
      country: callback({label:state.country.label,value:state.country.value}),
    }));
  };

  _handleEdit = () => {
      console.log(this.state.country)
    if (
      this.state.adressError ||
      this.state.cityError ||
      this.state.streetError ||
      this.state.postalError ||
      this.state.adress.length < 1 ||
      this.state.city.length < 1 ||
      this.state.street.length < 1 ||
      this.state.postal.length < 1
    )
      Alert.alert("Fields Error", "Please fill all the required fields");
    else {
    this.setState({visible:true})
      let payload = {
        address_id: this.state.id,
        registered_address: this.state.adress,
        country_id: this.state.country,
        state: this.state.state,
        city: this.state.city,
        street: this.state.street,
        postal_code: parseInt(this.state.postal),
      };
      console.log("PAYLOAD",payload)
      //console.log("DATA SENT TO BE, ",payload);
      this.editAddress(payload);
    }
  };

  _handleAdd = () => {
    console.log(this.state.country);
    if (
      this.state.adressError ||
      this.state.cityError ||
      this.state.streetError ||
      this.state.postalError ||
      this.state.adress.length < 1 ||
      this.state.city.length < 1 ||
      this.state.street.length < 1 ||
      this.state.postal.length < 1 ||
      this.state.country === 0
    )
      Alert.alert("Fields Error", "Please fill all the required fields");
    else {
    this.setState({visible:true})
      let payload = {
        registered_address: this.state.adress,
        country_id: this.state.country,
        state: this.state.state,
        city: this.state.city,
        street: this.state.street,
        postal_code: parseInt(this.state.postal),
      };
      console.log("PAYLOAD",payload)
      //console.log("DATA SENT TO BE, ",payload);
      this.addAddress(payload);
    }
  };

  addAddress = (data) => {
    apiServices.addAddress(data).then((result) => {
      //console.log(result.data.data)
      this.setState({visible:false})
      Alert.alert("Address", "Address Added Successfully",[
        {text:"Ok",onPress:()=>this.props.navigation.goBack()}
      ]);
      //console.log('compo func',result);
    }).catch(err=>{
      console.log("Error:\n",err)
      this.setState({visible:false});
      Alert.alert("Error",err.response.data.message);});
  };

  editAddress = (data) => {
    apiServices.editAddress(data).then((result) => {
      //console.log(result.data.data)
      console.log(result)
      this.setState({visible:false})
      Alert.alert("Address", "Address Modified Successfully",
      [
        { text: "OK", onPress: () =>this.props.navigation.goBack() }
      ]);
      //console.log('compo func',result);
    }).catch(err=>{
      console.log("Error:\n",err)
      this.setState({visible:false});
      Alert.alert("Error",err.response.data.message);});
  };

  render() {
    return (
      <ImageBackground
        source={require("../../../assets/images/Login-bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Spinner visible={this.state.visible}/>
        <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: "center",
          }}
        >
          <Text style={styles.header}>
            {this.state.type == "view"?"" : this.state.type =="edit"?"Edit":"Add"} Address {this.state.type =="view"?`#${this.props.route.params.item.id}`:null}
          </Text>
          <TextInput
            disabled={this.state.type=="view"?true:false}
            error={this.state.adressError}
            label="Registered Address*"
            placeholder="Registered Address*"
            mode="outlined"
            outlineColor="#C4C4C4"
            multiline={true}
            theme={{ colors: { primary: "#31c2aa" } }}
            style={styles.inputView}
            value={this.state.adress}
            onChangeText={(e) => {
              this.setState({ adress: e });
            }}
            onBlur={() => {
              if (this.state.adress.length < 1)
                this.setState({ adressError: true });
              else this.setState({ adressError: false });
            }}
          />
          <RenderPicker
            containerStyle={styles.picker}
            enabled={this.state.type=="view"?false:true}
            selectedValue={this.state.country}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({country:itemValue})
            } 
            map={this.state.fetchedCountries}/>
  
          { addresses.map((item,index)=><TextInput
            key={index}
            disabled={this.state.type=="view"?true:false}
            error={this.state[item.error]}
            mode="outlined"
            label={item.label}
            outlineColor="#C4C4C4"
            style={styles.inputView}
            value={this.state[item.value]}
            onChangeText={(e) => {
              this.setState({ [item.value]: e });
            }}
            onBlur={() => {
              if (this.state.city.length < 1)
                this.setState({ [item.error]: true });
              else this.setState({ [item.error]: false });
            }}
            theme={{
              colors: { primary: "#31c2aa", underlineColor: "transparent" },
            }}
          />)}
          <TouchableOpacityButton
              onPress={()=>
                this.state.type == "add" ? this._handleAdd() : this._handleEdit()
              } text ={this.state.type == "add" ? "Add" : "Edit"}/>
        </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Addresses;
