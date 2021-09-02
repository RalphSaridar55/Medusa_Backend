import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Headline, TextInput, RadioButton, Card, Button } from 'react-native-paper';
import forgotPasswordStyle from './ForgotPasswordStyle';
import Spinner from 'react-native-loading-spinner-overlay';
import * as apiUserServices from '../../core/apis/apiUserServices'

export default class ForgotPassword extends Component {
    state = {
        otp: '',
        userEmailInput: '',
        screenState: "verify",
        userInfoFromApi: {},
        isLoading: false,
    }

    _verifyEmail = () => {
        this.setState({ isLoading: true })
        apiUserServices.verifyEmail('sellers@yopmail.com').then((res) => {
            if (res.owner_email == this.state.userEmailInput.toLowerCase()) {
                this.setState({ userInfoFromApi: res, screenState: 'picker', isLoading: false })
            } else {
                this.setState({ isLoading: false })
                alert('Invalid e-mail address');
            }
        })
    }

    _onPressReset = () => {
        apiUserServices.verifyOtp({
            otp:this.state.otp,
            owner_mobile_number: '71188394'
        }).then((res)=>{
            if (res===200){
                
            }else{
                alert('Invalid OTP')
            }
        })
    }

    onValueChange = (radioBtnValue) => {
        if (radioBtnValue === 'otp') {
            apiUserServices.sendOtp(/*this.state.userInfoFromApi*/  {
                owner_email: this.state.userEmailInput,
                owner_country_code: '961',
                owner_mobile_number: '71188394'
            }).then((otpRes) => {
                if (otpRes.statusCode === 200){
                    this.setState({ screenState: radioBtnValue})
                }else{
                    alert('failed Sending OTP')
                }
            })
        } if (radioBtnValue === 'email') {
            this.setState({ screenState: radioBtnValue })
        }
    }

    displayBody = () => {
        switch (this.state.screenState) {
            case 'verify': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Verify Your Email"}</Headline>
                <TextInput
                    label="Email"
                    placeholder="email@gmail.com"
                    mode="outlined"
                    outlineColor="#C4C4C4"
                    onChangeText={(text) => { this.setState({ userEmailInput: text }) }}
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={forgotPasswordStyle.inputView}
                />
                <TouchableOpacity style={forgotPasswordStyle.loginBtn} onPress={this._verifyEmail}>
                    <Text style={forgotPasswordStyle.loginText}>Submit</Text>
                </TouchableOpacity>
            </>
            );
            case 'picker': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
                <Card style={forgotPasswordStyle.cardPickerStyle}>
                    <RadioButton.Group onValueChange={this.onValueChange} value={this.state.screenState}>
                        <RadioButton.Item label="Send Reset to e*****@m***.com" value="email" id="email" />
                        <RadioButton.Item label="Send Reset to +961 7******4" value="otp" id="otp" />
                    </RadioButton.Group>
                </Card>
            </>
            );
                break;
            case 'email': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
                <Card style={forgotPasswordStyle.cardEmailSent}>
                    <Text>An Email has been sent to reset your password</Text>
                </ Card>
                <TouchableOpacity style={forgotPasswordStyle.loginBtn} >
                    <Text style={forgotPasswordStyle.loginText}>Resend Email in 30s</Text>
                </TouchableOpacity></>);
                break;
            case 'otp': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
                <TextInput
                    label="Mobile OTP Code*"
                    placeholder="#44445"
                    mode="outlined"
                    outlineColor="#C4C4C4"
                    onChangeText={(text) => { this.setState({ otp: text }) }}
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={forgotPasswordStyle.inputView}
                />
                <TouchableOpacity style={forgotPasswordStyle.loginBtn} onPress={() => { this._onPressReset()}} >
                    <Text style={forgotPasswordStyle.loginText}>Reset</Text>
                </TouchableOpacity>
            </>);
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
                style={forgotPasswordStyle.container}>
                <Spinner visible={this.state.isLoading} />
                <View style={forgotPasswordStyle.mainContent}>
                    {this.displayBody()}
                </View>
            </ImageBackground>
        );
    }
}