import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Headline, TextInput, RadioButton, Card, Button } from 'react-native-paper';
import forgotPasswordStyle from './ForgotPasswordStyle';
import Spinner from 'react-native-loading-spinner-overlay';
import * as apiUserServices from '../../core/apis/apiUserServices'
import { maskEmail, maskNumber } from '../../shared/sharedFunctions/sharedFunctions'
import { TouchableOpacityButton } from '../../components/TouchableOpacity';

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
        confirmPass: '',
        country:'',
        mobile:'',
        otp_code:'',
        sendOtp:true
    }

    //verify user email and get user info data then save them in state
    _verifyEmail = () => {
        console.log("STATE EMAIL: ",this.state.userEmailInput)
        this.setState({ isLoading: true })
        apiUserServices.verifyEmail(this.state.userEmailInput/** should use this --> this.state.userInfoFromApi.owner_email */).then((res) => {
            console.log("RESULT FROM API: ",res)
            if (res.owner_email == this.state.userEmailInput.toLowerCase()) {
                this.setState({ userInfoFromApi: res, screenState: 'picker', isLoading: false, country:res.owner_country_code, mobile:res.owner_mobile_number })
            } else {
                this.setState({ isLoading: false });
                alert('Invalid e-mail address');
            }
        }).catch(err =>{
            Alert.alert("Error",err.response.data.message)
        })
    }

    /**
     *toggle between mobile or email verification method,
     *if email: send email verification link
     *if mobile: send otp verification 
     */
    onValueChange = (radioBtnValue) => {
        if (radioBtnValue === 'otp') {
            if(!this.state.sendOtp){
                Alert.alert("Password Reset","Already sent a OTP, please wait 2 minutes before sending another OTP")
                return
            }
            else{
                apiUserServices.sendOtp({
                    //owner_email: this.state.userEmailInput,/**should use this --> this.state.userInfoFromApi.owner_email*/
                    owner_country_code: this.state.country,/**should use this --> this.state.userInfoFromApi.owner_country_code*/
                    owner_mobile_number: this.state.mobile,/**should use this --> this.state.userInfoFromApi.owner_mobile_number*/
                }).then((otpRes) => {
                    console.log("OTP RES:",otpRes)
                    if (otpRes.statusCode === 201) {
                        this.setState({ sendOtp:false, screenState: radioBtnValue, otp_code:otpRes.data.varification_code });
                    } else {
                        alert('failed Sending OTP');
                    }
                setTimeout(()=>{
                    this.setState({sendOtp:true})
                },120000)
                }).catch(err=>{
                    console.log("ERROR:")
                    Alert.alert("Error",err.response.data.message)
                })
            }
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
        console.log(
            typeof(this.state.otp),
            typeof(this.state.mobile)
        )
        this.setState({isLoading:true})
        if(this.state.otp.length!=4 || this.state.otp!=this.state.otp_code){
            this.setState({isLoading:false})
            Alert.alert("Error","Incorrect OTP")
            return
        }
        apiUserServices.verifyOtp({
            otp: this.state.otp,
            owner_mobile_number: this.state.userInfoFromApi.owner_mobile_number
        }).then((res) => {
            console.log("VERIFYING OTP:",res.data.statusCode)
            if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                this.setState({ screenState: 'reset', isLoading:false });
            } else {
                Alert.alert("Error",res.data.message);
                this.setState({ isLoading:false });
            }
        }).catch((err)=>{
            Alert.alert("Error",err.response.data.message)
            this.setState({  isLoading:false });
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
                <TouchableOpacityButton 
                text="Submit"
                onPress={()=>this._verifyEmail()}
                additionalButtonStyle={forgotPasswordStyle.loginBtn}
                />
                {/* <TouchableOpacity style={forgotPasswordStyle.loginBtn} onPress={()=>this._verifyEmail()}>
                    <Text style={forgotPasswordStyle.loginText}>Submit</Text>
                </TouchableOpacity> */}
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
            case 'email':
                Alert.alert("Reset Password","Please check your e-mail for password reset link",[
                    {text:"Ok",onPress:()=>this.props.navigation.goBack()}
                ])
                break;
            // return (<>
            //     <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
            //     <Card style={forgotPasswordStyle.cardEmailSent}>
            //         <Text style={forgotPasswordStyle.emailLinkMsg}>{this.state.emailLinkMsg}</Text>
            //     </ Card>
            //     <Button style={forgotPasswordStyle.btnLoginScreen} mode="contained"
            //         color='#31c2aa'
            //         onPress={() => { this.props.navigation.navigate('Login') }}>
            //         <Text style={forgotPasswordStyle.textBtn}>Back to login</Text>
            //     </Button>
            // </>);
            //     break;
            case 'otp': return (<>
                <Headline style={forgotPasswordStyle.headlineStyle}>{"Reset Password"}</Headline>
                <TextInput
                    label="Mobile OTP Code*"
                    placeholder="*****"
                    mode="outlined"
                    keyboardType="numeric"
                    outlineColor="#C4C4C4"
                    value={this.state.otp}
                    onChangeText={(text) => { 
                        console.log("TEXT: ",text, " ", typeof(text))
                        if(text.length<=4)
                            this.setState({ otp: text }) }}
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={forgotPasswordStyle.inputView}
                />
                <TouchableOpacityButton 
                text="Next"
                additionalButtonStyle={forgotPasswordStyle.loginBtn}
                onPress={()=>{ this._onPressNext() }}/>
                {/* <TouchableOpacity style={forgotPasswordStyle.loginBtn} onPress={() => { this._onPressNext() }} >
                    <Text style={forgotPasswordStyle.loginText}>Next</Text>
                </TouchableOpacity> */}
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
                    onPress={() => apiUserServices.resetPass(this.state.userInfoFromApi.owner_mobile_number, this.state.confirmPass).then((resPas)=>console.log("RES PASS:",resPas).catch(err=>Alert.alert("Error",err)))}>
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