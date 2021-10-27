import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import * as DocumentPicker from "expo-document-picker";
import { docValidator } from "../../helpers/docValidator";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import styles from "./style_buyer";
import * as apiServices from "../../core/apis/apiAddressServices";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";
import { FlatListSlider } from "react-native-flatlist-slider";
import { AntDesign } from '@expo/vector-icons'; 
import { validatePathConfig } from "@react-navigation/core";
import Spinner from "react-native-loading-spinner-overlay";

class BuyreAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata:null,
      email: "",
      emailError: false,
      address: "",
      addressError: false,
      oldPassword: "",
      oldPasswordError: false,
      password: "",
      passwordError: false,
      confirmPassword: "",
      confirmPasswordError: false,
      website: "",
      websiteError: false,
      code: "",
      codeError: false,
      phone: "",
      phoneError: false,
      state:"",
      stateError:false,
      city:"",
      cityError:false,
      street:"",
      streetError:false,
      postal:"",
      postalError:false,
      hideOldPassword: true,
      hidePassword: true,
      hideConfirmPassword: true,
      country: null,
      trading:"",
      tradingError:false,
      company:"",
      companyError:false,
      defaultLanding:"DASHBOARD",
      defaultLandingPages:[
          {label:'Dashboard',value:'DASHBOARD'},
          {label:'Home',value:'HOME'}
      ],
      countries: [{
          label:'Country',
          value:0
      }],
      spinnerVisible:true,
    };
  }
  /*     onChangeText = () => {
        this.setState({ email: this.state.email })
    } */

  componentDidMount() {
    apiServices.getCountries().then((res) => {
      this.setState({ countries: res });
    });
    this.getUserData();
  }

  getUserData= async()=>{
    try {
      const value = JSON.parse(await AsyncStorage.getItem('user_details'));
      if (value !== null) {
        // We have data!!
        console.log("DATA RECEIVED FROM ASYNC STORAGE: ",value)
        this.setState({
            userdata:value,
            email:value.owner_email,
            website:value.website,
            code:value.owner_country_code,
            phone:value.owner_mobile_number,
            country:value.country_id,
            state:value.state,
            city:value.city,
            street:value.street,
            postal:value.postal_code+"",
            trading:value.trading_license_doc,
            company:value.company_reg_doc,
            address:value.registered_address,
            defaultLanding:value.default_landing_page,
            spinnerVisible:false,
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  DrawTouchableOpacity = (e, i) => {
    return (
      <View key={i}>
        <TouchableOpacity
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() =>
            e.typeDoc == "Trading License"
              ? this.pickDocument("Trade")
              : this.pickDocument("Passport")
          }
          style={styles.docPicker}
        >
          <AntDesign name="file1" size={24} color="#6E91EC" />
          <Text style={{ color: "gray" }}>{e.typeDoc}</Text>
          {(e.typeDoc == "Company Registration" &&
            this.state.companyError == true) ||
          (e.typeDoc == "Trading License" && this.state.tradingError == true) ? (
            <AntDesign name="closecircle" size={24} color="red" />
          ) : (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  pickDocument = async (e) => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
      e == "Trade"
        ? this.setState({ tradingError: true })
        : this.setState({ companyError: true });
    } else {
      //console.log(result);
      try {
        e == "Trade"
          ? this.setState({ trading: result, tradingError: false })
          : this.setState({ company: result, companyError: false });
      } catch (error) {
        console.log(error);
      }
    }
    /* e.typeDoc==="Trade"?console.log("test"):console.log(123);
        this.setState({ docs: result.uri })
        alert(result.uri); */
  };

  _discardAction = () => {
    console.log("running");
    for(var key of Object.keys(this.state)){
      if(typeof(this.state[key]) ==="boolean"){
        this.setState({...this.state,[key]:false})
      }
      else if(typeof(this.state[key]) ==="string"){
        this.setState({...this.state,[key]:""})
      }
      else if(typeof(this.state[key]) ==="number"){
        this.setState({...this.state,[key]:0})
      }
    }
    this.setState({
      email: "",
      emailError: false,
      address:'',
      addressError:false,
      oldPassword: "",
      oldPasswordError: false,
      password: "",
      passwordError: false,
      confirmPassword: "",
      confirmPasswordError: false,
      country:[{
          label:'Country',
          value:0
      }],
      website: "",
      websiteError: false,
      code: "",
      codeError: false,
      phone: "",
      phoneError: false,
      phone: "",
      phoneError: false,
      state:"",
      stateError:false,
      city:"",
      cityError:false,
      street:"",
      streetError:false,
      postal:"",
      postalError:false,
      hideOldPassword: true,
      hidePassword: true,
      hideConfirmPassword: true,
      trading:'',
      tradingError:true,
      company:'',
      companyError:true,

      defaultLanding:"DASHBOARD",
      defaultLandingPages:[
          {label:'Dashboard',value:'DASHBOARD'},
          {label:'Home',value:'HOME'}
      ]
    });
  };

  _ApplyChanges = () => {
    if (
      this.state.emailError ||
      this.state.passwordError ||
      this.state.confirmPasswordError ||
      this.state.websiteError ||
      this.state.codeError ||
      this.state.phoneError ||
      this.state.country==0 ||
      this.state.stateError ||
      this.state.cityError ||
      this.state.streetError ||
      this.state.postalError ||
      this.state.addressError
    )
      Alert.alert("Edit Error", "Please fill the inputs correctly");
    else if(this.state.oldPassword.length<1 || this.state.oldPasswordError )
      Alert.alert("Edit Error","Please enter your password")
    else if(this.state.companyError ||
    this.state.tradingError ){
        Alert.alert("Edit Error", "Please attach the required files");
    }
    else if(this.state.password != this.state.confirmPassword)  
      Alert.alert("Edit Error", "Please make sure passwords match");
    else {
        let payload = {
            owner_country_code:this.state.code,
            owner_mobile_number:this.state.phone,
            old_password:this.state.oldPassword,
            password:this.state.password.length<1?this.state.oldPassword:this.state.password,
            website:this.state.website,
            registered_address:this.state.address,
            country_id:this.state.country,
            state:this.state.state,
            city:this.state.city,
            street:this.state.street,
            postal_code:this.state.postal,
            company_reg_doc:this.state.company,
            trading_licence_doc:this.state.trading,
            default_landing_page:this.state.defaultLanding
        }
        console.log("PAYLOAD: ",payload)
        this.setState({spinnerVisible:true})
        apiPortFolioServices.updateUserProfile(payload)
        .then((res)=>{
            console.log("FROM THE COMPONENT: ",res)
            Alert.alert("Edit", res);
            this.setState({spinnerVisible:false})
        }).catch(err=>{
          console.log("Error:\n",err)
          this.setState({spinnerVisible:false});
          Alert.alert("Error",err.response.data.message);})
    }
    
  };

  render() {
    //should apply validation
    //for the inputText

    return (
      <ImageBackground
        source={require("../../../assets/images/Login-bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Spinner visible={this.state.spinnerVisible}/>
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: "center",
          }}
        >
          <ScrollView
          showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Account Details</Text>
            <TextInput
              error={this.state.emailError}
              label="Email"
              placeholder="email@gmail.com"
              mode="outlined"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              value={this.state.email}
              onBlur={() => {
                if (
                  this.state.email.length > 1 &&
                  !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
                    this.state.email
                  )
                )
                  this.setState({ emailError: true });
                else {
                  this.setState({ emailError: false });
                }
              }}
              onChangeText={(e) => this.setState({ email: e })}
            />
            <TextInput
              error={this.state.addressError}
              label="Registered Address"
              placeholder="Address"
              mode="outlined"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              value={this.state.address}
              onBlur={()=>{
                    if(this.state.address.length<1)
                        this.setState({addressError:true})
                    else
                        this.setState({addressError:false})
              }}
              onChangeText={(e) => this.setState({ address: e })}
            />
            <TextInput
              error={this.state.websiteError}
              label="Website"
              placeholder="web.com"
              mode="outlined"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              value={this.state.website}
              onBlur={() => {
                if (
                  this.state.website.length > 1 &&
                  !/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
                    this.state.website
                  )
                )
                  this.setState({ websiteError: true });
                else this.setState({ websiteError: false });
              }}
              onChangeText={(e) => this.setState({ website: e })}
            />
            <View style={{ flexDirection: "row" }}>
              <TextInput
                error={this.state.codeError}
                label="Code"
                placeholder="+961"
                mode="outlined"
                outlineColor="#C4C4C4"
                theme={{ colors: { primary: "#31c2aa" } }}
                style={styles.inputV}
                value={this.state.code}
                onBlur={() => {
                  if (
                    !/^(\++\d{3,4})$/.test(this.state.code) &&
                    this.state.code.length > 0
                  )
                    this.setState({ codeError: true });
                  else this.setState({ codeError: false });
                }}
                onChangeText={(e) => this.setState({ code: e })}
              />
              <TextInput
                error={this.state.phoneError}
                label="Phone Number"
                placeholder="70909090"
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#C4C4C4"
                theme={{ colors: { primary: "#31c2aa" } }}
                style={styles.input_V}
                value={this.state.phone}
                onBlur={()=>{
                    if(this.state.phone.length<1)
                        this.setState({phoneError:true})
                    else
                        this.setState({phoneError:false})
                }}
                onChangeText={(e) => this.setState({ phone: e })}
              />
            </View>
            <TextInput
              error={this.state.oldPasswordError}
              mode="outlined"
              label="Password*"
              secureTextEntry={this.state.hideOldPassword}
              outlineColor="#C4C4C4"
              onChangeText={(e) => this.setState({ oldPassword: e })}
              style={styles.inputView}
              value={this.state.oldPassword}
              onBlur={() => {
                if (this.state.oldPassword.length < 8)
                  this.setState({ oldPasswordError: true });
                else this.setState({ oldPasswordError: false });
              }}
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    if (this.state.hideOldPassword)
                      this.setState({ hideOldPassword: false });
                    else this.setState({ hideOldPassword: true });
                  }}
                />
              }
            />
            <TextInput
              error={this.state.passwordError}
              mode="outlined"
              label="Password*"
              secureTextEntry={this.state.hidePassword}
              outlineColor="#C4C4C4"
              onChangeText={(e) => this.setState({ password: e })}
              style={styles.inputView}
              value={this.state.password}
              onBlur={() => {
                if (this.state.password.length < 8)
                  this.setState({ passwordError: true });
                else this.setState({ passwordError: false });
              }}
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    if (this.state.hidePassword)
                      this.setState({ hidePassword: false });
                    else this.setState({ hidePassword: true });
                  }}
                />
              }
            />
            <TextInput
              error={this.state.confirmPasswordError}
              mode="outlined"
              label="Confirm Password*"
              secureTextEntry={this.state.hideConfirmPassword}
              outlineColor="#C4C4C4"
              onChangeText={(e) => this.setState({ confirmPassword: e })}
              style={styles.inputView}
              value={this.state.confirmPassword}
              onBlur={() => {
                if (this.state.confirmPassword !== this.state.password)
                  this.setState({ confirmPasswordError: true });
                else this.setState({ confirmPasswordError: false });
              }}
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    if (this.state.hideConfirmPassword)
                      this.setState({ hideConfirmPassword: false });
                    else this.setState({ hideConfirmPassword: true });
                  }}
                />
              }
            />
            <View
              style={{
                borderWidth: 1,
                marginVertical:10,
                borderColor: "#C4C4C4",
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "#fff",
              }}
            >
            <Picker
              selectedValue={this.state.country}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({ country: itemValue })
                console.log("COUNTRY VALUE: ",itemValue)
                }
              }
            >
                {this.state.countries?.map((item,index)=>(
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
            </View>
            <TextInput
                error={this.state.stateError}
                label="State"
                placeholder="State"
                mode="outlined"
                outlineColor="#C4C4C4"
                theme={{ colors: { primary: "#31c2aa" } }}
                style={styles.input_V}
                value={this.state.state}
                onBlur={()=>{
                    if(this.state.state.length<1)
                        this.setState({stateError:true})
                    else
                        this.setState({stateError:false})
                }}
                onChangeText={(e) => this.setState({ state: e })}
              />
            <TextInput
                error={this.state.cityError}
                label="City"
                placeholder="City"
                mode="outlined"
                outlineColor="#C4C4C4"
                theme={{ colors: { primary: "#31c2aa" } }}
                style={styles.input_V}
                value={this.state.city}
                onBlur={()=>{
                    if(this.state.city.length<1)
                        this.setState({cityError:true})
                    else
                        this.setState({cityError:false})
                }}
                onChangeText={(e) => this.setState({ city: e })}
            />
            <TextInput
                error={this.state.streetError}
                label="Street"
                placeholder="Street"
                mode="outlined"
                outlineColor="#C4C4C4"
                theme={{ colors: { primary: "#31c2aa" } }}
                style={styles.input_V}
                value={this.state.street}
                onBlur={()=>{
                    if(this.state.street.length<1)
                        this.setState({streetError:true})
                    else
                        this.setState({streetError:false})
                }}
                onChangeText={(e) => this.setState({ street: e })}
              />
              <TextInput
                  error={this.state.postalError}
                  label="Postal Code"
                  placeholder="Postal Code"
                  mode="outlined"
                  outlineColor="#C4C4C4"
                  theme={{ colors: { primary: "#31c2aa" } }}
                  style={styles.input_V}
                  value={this.state.postal}
                  onBlur={()=>{
                      if(this.state.postal.length<1)
                          this.setState({postalError:true})
                      else
                          this.setState({postalError:false})
                  }}
                  onChangeText={(e) => this.setState({ postal: e })}
                />
              {this.DrawTouchableOpacity({typeDoc:"Company Registration"},1)}
              {this.DrawTouchableOpacity({typeDoc:"Trading License"},2)}
            
              {this.state.userdata?.user_type==4&&<View
              style={{
                borderWidth: 1,
                marginVertical:10,
                borderColor: "#C4C4C4",
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "#fff",
              }}
            >  
            <Picker
              selectedValue={this.state.defaultLanding}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({ defaultLanding: itemValue })
                console.log("COUNTRY VALUE: ",itemValue)
                }
              }
            >
                {this.state.defaultLandingPages?.map((item,index)=>(
                    <Picker.Item key={index} label={`Landing Page: ${item.label}`} value={item.value} />
                ))}
            </Picker>
            </View>}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={
              this._discardAction /* this.props.navigation.navigate('Home') */
            }
          >
            <Text style={styles.loginText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Dis_Btn}
            onPress={
              this._ApplyChanges /* this.props.navigation.navigate('Home') */
            }
          >
            <Text style={styles.loginText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default BuyreAccount;
