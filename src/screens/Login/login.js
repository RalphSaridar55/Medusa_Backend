import React, { useState, useContext } from "react";
import { TouchableOpacity, View, ImageBackground, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginStyle from "./loginStyle";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import * as Device from "expo-device";
import Spinner from "react-native-loading-spinner-overlay";
import * as apiServices from "../../core/apis/apiUserServices";
/* import {HeadContext} from '../../../App'; */
import { TouchableOpacityButton } from '../../components/TouchableOpacity';

export default function Login({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isAuthorized, setAuthorized] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState("");

  /**
   *
   * @returns to login page when user credentials are validated
   */

  //const { setUserData,userData,product,setProduct } = useContext(HeadContext);

  const storeData =async(key,value)=>{
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (error) {
      // Error saving data
    }
  }
  const onLoginPressed = () => {
    // Validation
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    // Set Errors msgs
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const payload = {
      owner_email: email.value,
      password: password.value,
      device_id: "string",
      device_name: Device.deviceName,
      device_version: Device.osVersion,
      device_token: "string",
    };
    // Show spinner when call is made
    setLoading(true);

    apiServices.userLogin(payload).then((res) => {
      //console.log("CONTEXT: ",setUserData,userData,product,setProduct)
      console.log("---->", res.access_token);
      console.log("USER DETAILS: " , res.userDetails);
      apiServices.setToken(res.access_token);
      setData(res);
      setAuthorized(true);
      setLoading(false);
      storeData("company_name",res.userDetails.company_name)
      storeData("user_id",res.userDetails.id+"")
      storeData("user_details",JSON.stringify({...res.userDetails,user_type_static:res.userDetails.user_type}))
      //setUserData(123);
      if(res.userDetails.user_type===4 && res.userDetails.is_approved==3)
        navigation.navigate("Contract");
      else if(res.userDetails.user_type===4 && res.userDetails.default_landing_page=="DASHBOARD")
        navigation.navigate("Dashboard");
      else
        navigation.navigate("Home")
      
      /* const [value, setValue] = useState(0); // integer state
      return () => setValue(value => value + 1); */
      
    }).catch(err=>{
      console.log("ERROR: ",err/* .response.data.message */);
      Alert.alert("Alert",err.response.data.message);
      setLoading(false);
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/Login-bg.png")}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <View style={loginStyle.container}>
        <Spinner visible={isLoading} />
          <View>
            <Header>Welcome Back</Header>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: "" })}
              error={email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              outlineColor="#C4C4C4"
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: "" })}
              error={password.error}
              errorText={password.error}
              secureTextEntry
              outlineColor="#C4C4C4"
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
              // right={<TextInput.Icon name="eye" />}
            />
            <View style={loginStyle.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={loginStyle.forgot}>Forgot your password</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacityButton
            additionalButtonStyle={loginStyle.loginBtn}
            text="Login"
            onPress={() => onLoginPressed()}
            />
            {/* <Button
              mode="contained"
              onPress={() => onLoginPressed()}
              style={loginStyle.loginBtn}
            >
              Login
            </Button> */}
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={loginStyle.link}>Become a Partner </Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </ImageBackground>
  );
}
