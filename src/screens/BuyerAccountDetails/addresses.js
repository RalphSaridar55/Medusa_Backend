import React, { Component } from "react";
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
      postal: 0,
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
    //this.setState({id:this.props.route.params.item.id})
    // apiPortFolioServices.getCategoryDetails().then((response) => {
    //     return (
    //         this.setState({ ...this.state,...{categoryData: response}}),
    //         this.setState({ ...this.state,...{fetchedcategories: registrationServices.filterCategory(response)}})
    //     )
    // })
    getCountries().then((result) => {
      //console.log(result)
      //console.log(result);
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
      Alert.alert("Address", "Address Added Successfully");
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
          <View
            style={{
              borderWidth: 1,
              borderColor: "#C4C4C4",
              borderRadius: 4,
              marginVertical: 10,
              height:55,
              justifyContent:'center',
              backgroundColor:'#fff'
            }}
          >
            <Picker
            enabled={this.state.type=="view"?false:true}
            selectedValue={this.state.country}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({country:itemValue})
            }>
              <Picker.Item key={0} label="Country" value={0} />
            {this.state.fetchedCountries.length>0?
            this.state.fetchedCountries.map((item,index)=>(
              <Picker.Item key={index} label={item.label} value={item.value}/>
            ))
            :
            <Picker.Item label="Country" value={0}/>}
            </Picker>
            </View>
            
          <TextInput
            disabled={this.state.type=="view"?true:false}
            error={this.state.cityError}
            mode="outlined"
            label="City*"
            outlineColor="#C4C4C4"
            style={styles.inputView}
            value={this.state.city}
            onChangeText={(e) => {
              this.setState({ city: e });
            }}
            onBlur={() => {
              if (this.state.city.length < 1)
                this.setState({ cityError: true });
              else this.setState({ cityError: false });
            }}
            theme={{
              colors: { primary: "#31c2aa", underlineColor: "transparent" },
            }}
          />
          <TextInput
            disabled={this.state.type=="view"?true:false}
            mode="outlined"
            label="State *"
            outlineColor="#C4C4C4"
            style={styles.inputView}
            value={this.state.state}
            onBlur={() => {
              if (this.state.state.length < 1)
                this.setState({ stateError: true });
              else this.setState({ stateError: false });
            }}
            onChangeText={(e) => {
              this.setState({ state: e });
            }}
            theme={{
              colors: { primary: "#31c2aa", underlineColor: "transparent" },
            }}
          />
          <TextInput
            disabled={this.state.type=="view"?true:false}
            error={this.state.streetError}
            mode="outlined"
            label="Street*"
            outlineColor="#C4C4C4"
            style={styles.inputView}
            value={this.state.street}
            onChangeText={(e) => {
              this.setState({ street: e });
            }}
            onBlur={() => {
              if (this.state.street.length < 1)
                this.setState({ streetError: true });
              else this.setState({ streetError: false });
            }}
            theme={{
              colors: { primary: "#31c2aa", underlineColor: "transparent" },
            }}
          />
          <TextInput
            disabled={this.state.type=="view"?true:false}
            error={this.state.postalError}
            mode="outlined"
            label="Postal Code*"
            keyboardType="numeric"
            outlineColor="#C4C4C4"
            style={styles.inputView}
            value={this.state.postal+""}
            onChangeText={(e) => {
              this.setState({ postal: e });
            }}
            onBlur={() => {
              if (this.state.postal.length < 1)
                this.setState({ postalError: true });
              else this.setState({ postalError: false });
            }}
            theme={{
              colors: { primary: "#31c2aa", underlineColor: "transparent" },
            }}
          />
          <View
            style={this.state.type=="view"?{display:'none'}:
            {
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.Btn}
              onPress={
                this.state.type == "add" ? this._handleAdd : this._handleEdit
              }
            >
              <Text style={styles.textButton}>
                {this.state.type == "add" ? "Add" : "Edit"}
              </Text>
              {/*                         <IconButton
                            icon="plus"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        /> */}
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Addresses;
