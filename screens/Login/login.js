import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native'
import { Text, Button } from 'react-native-paper'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import * as Device from 'expo-device';
import Spinner from 'react-native-loading-spinner-overlay';
import * as apiServices from "../../core/apis/apiUserServices";
import APIKit, { setToken } from "../../core/apis/APIKit"

export default function Login({ navigation }) {

  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isAuthorized, setAuthorized] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState("")


  const onLoginPressed = () => {
    // Validation 
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    // Set Errors msgs
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    const payload = {
      owner_email: email.value,
      password: password.value,
      device_id: "string",
      device_name: Device.deviceName,
      device_version: Device.osVersion,
      device_token: "string"
    }
    // Show spinner when call is made
    setLoading(true)
    APIKit.post('/user/login', payload).then((res) => {
        apiServices.setToken(res.data.data.access_token);
        setData(res.data.data)
        setAuthorized(true);
        setLoading(false)
        navigation.navigate(
          "initialHome"
        )

      })
      .catch((error) => {
        console.error(error.response);
        setAuthorized(false);
        setLoading(false)
      })
    // apiServices.userLogin(payload).then((res)=>{
    //   apiServices.setToken(res.data.data.access_token);
    //     setData(res.data.data)
    //     setAuthorized(true);
    //     setLoading(false)
    //     navigation.navigate(
    //       "initialHome"
    //     )
    // })
  }

  return (
    <ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        {!isAuthorized ?
          <View>
            <Header>Welcome back </Header>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
            // right={<TextInput.Icon name="eye" />}
            />
            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgot}>Forgot your password ?</Text>
              </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onLoginPressed} style={styles.loginBtn}>
              Login
            </Button>
            <View >
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Become a Partner </Text>
              </TouchableOpacity>
            </View>
          </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Header>Welcome {data.userDetails.company_name}</Header></View>}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center'
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgot: {
    color: "#31C2AA",
    fontSize: 12,
    textAlign: "right"
  },
  link: {
    color: "#31C2AA",
    textAlign: "center",
    marginTop: 5
  },
  loginBtn: {
    backgroundColor: "#31C2AA",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 50
  }
})


