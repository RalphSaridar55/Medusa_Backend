import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Headline, TextInput, RadioButton, Card, Button } from 'react-native-paper';
import forgotPasswordStyle from './ForgotPasswordStyle';
import Spinner from 'react-native-loading-spinner-overlay';
import * as apiUserServices from '../../core/apis/apiUserServices'
import { maskEmail, maskNumber } from '../../shared/sharedFunctions/sharedFunctions'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        otp: '',
        userEmailInput: '',
        emailLinkMsg: '',
        screenState: 'verify',
        userInfoFromApi: {},
        isLoading: false,
        newPAss: '',
        confirmPass: ''
    }

    //verify user email and get user info data then save them in state
    _verifyEmail = () => {
        this.setState({ isLoading: true })
        apiUserServices.verifyEmail('sellers@yopmail.com'/** should use this --> this.state.userInfoFromApi.owner_email */).then((res) => {
            if (res.owner_email == this.state.userEmailInput.toLowerCase()) {
                this.setState({ userInfoFromApi: res, screenState: 'picker', isLoading: false })
            } else {
                this.setState({ isLoading: false });
                alert('Invalid e-mail address');
            }
        })
    }

    /**
     *toggle between mobile or email verification method,
     *if email: send email verification link
     *if mobile: send otp verification 
     */
    onValueChange = (radioBtnValue) => {
        if (radioBtnValue === 'otp') {
            apiUserServices.sendOtp({
                owner_email: this.state.userEmailInput,/**should use this --> this.state.userInfoFromApi.owner_email*/
                owner_country_code: '961',/**should use this --> this.state.userInfoFromApi.owner_country_code*/
                owner_mobile_number: '71188394',/**should use this --> this.state.userInfoFromApi.owner_mobile_number*/
            }).then((otpRes) => {
                if (otpRes.statusCode === 200) {
                    this.setState({ screenState: radioBtnValue });
                } else {
                    alert('failed Sending OTP');
                }
            })
        } if (radioBtnValue === 'email') {
            apiUserServices.sendEmailLink(this.state.userInfoFromApi.owner_email).then((resMsg) => {
                if (resMsg) {
                    this.setState({ emailLinkMsg: resMsg })
                    this.setState({ emailLinkMsg: resMsg, screenState: radioBtnValue });
                }
            })
        }
    }

    /**press next to verify otp*/
    _onPressNext = () => {
        apiUserServices.verifyOtp({
            otp: this.state.otp,
            owner_mobile_number: '71188394'/** should use this --> this.state.userInfoFromApi.owner_mobile_number */
        }).then((res) => {
            if (res === 200) {
                this.setState({ screenState: 'reset' });
            } else {
                alert('Invalid OTP');
            }
        })
    }

    /** Check if password entered by user matches */
    _checkIfPasswordsMatch = () => {
        if (this.state.newPAss !== this.state.confirmPass) {
            return 'red';
        } else { return '#31c2aa'; }
    }

    /**Disable reset button in 'new password screen' 
     * if password fields are empty or do not match
     */
    _disableResetBtn = () => {
        if (this.state.newPAss && this.state.confirmPass) {
            if (this.state.newPAss === this.state.confirmPass) {
                return false;
            } else { return true; }
        } else {
            return true;
        }
    }

    /**
     * 
     * @returns which state of the forgot password process should be display at the screen
     */
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
                        <RadioButton.Item label={"Send Reset to " + maskEmail(this.state.userInfoFromApi.owner_email)} value="email" id="email" />
                        <RadioButton.Item label={"Send Reset to " + "+" + this.state.userInfoFromApi.owner_country_code + " " + maskNumber(this.state.userInfoFromApi.owner_mobile_number)} value="otp" id="otp" />
                    </RadioButton.Group>
                </Card>
            </>
            );
                break;
            case 'email': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
                <Card style={forgotPasswordStyle.cardEmailSent}>
                    <Text style={forgotPasswordStyle.emailLinkMsg}>{this.state.emailLinkMsg}</Text>
                </ Card>
                <Button style={forgotPasswordStyle.btnLoginScreen} mode="contained"
                    color='#31c2aa'
                    onPress={() => { this.props.navigation.navigate('Login') }}>
                    <Text style={forgotPasswordStyle.textBtn}>Back to login</Text>
                </Button>
            </>);
                break;
            case 'otp': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
                <TextInput
                    label="Mobile OTP Code*"
                    placeholder="*****"
                    mode="outlined"
                    outlineColor="#C4C4C4"
                    onChangeText={(text) => { this.setState({ otp: text }) }}
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={forgotPasswordStyle.inputView}
                />
                <TouchableOpacity style={forgotPasswordStyle.loginBtn} onPress={() => { this._onPressNext() }} >
                    <Text style={forgotPasswordStyle.loginText}>Next</Text>
                </TouchableOpacity>
            </>);
                break;
            case 'reset': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
                <TextInput
                    label="New Password*"
                    placeholder="********"
                    secureTextEntry={true}
                    mode="outlined"
                    outlineColor={this._checkIfPasswordsMatch()}
                    onChangeText={(text) => { this.setState({ newPAss: text }) }}
                    theme={{ colors: { primary: this._checkIfPasswordsMatch() } }}
                    style={forgotPasswordStyle.inputView}
                />
                <TextInput
                    label="Confirm Password*"
                    placeholder="********"
                    secureTextEntry={true}
                    mode="outlined"
                    outlineColor={this._checkIfPasswordsMatch()}
                    onChangeText={(text) => { this.setState({ confirmPass: text }) }}
                    theme={{ colors: { primary: this._a() } }}
                    style={forgotPasswordStyle.inputView}
                />
                <Button style={forgotPasswordStyle.btnReset} mode="contained"
                    color='#31c2aa'
                    disabled={this._disableResetBtn()}
                    onPress={() => apiUserServices.resetPass(this.state.userInfoFromApi.owner_mobile_number, this.state.confirmPass)}>
                    <Text style={forgotPasswordStyle.textBtn}>Reset</Text>
                </Button>
            </>);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode="cover"
                style={forgotPasswordStyle.container}>
                <Spinner visible={this.state.isLoading} />
                <View style={forgotPasswordStyle.mainContent}>
                    {this.displayBody()}
                </View>
            </ImageBackground>
        );
    }
}