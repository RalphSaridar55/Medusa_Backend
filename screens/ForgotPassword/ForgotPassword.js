import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Headline, TextInput, RadioButton, Card, Button } from 'react-native-paper';
import forgotPasswordStyle from './ForgotPasswordStyle'

export default class ForgotPassword extends Component {
    state = {
        email: "",
        subject: "",
        message: "",
        verified: false,
        reset: true,
        byemail: false,
        byotp: false,
        value: "otp"
    }
    _onPressButton = () => {
        this.setState({ verified: !this.state.verified })
    }

    _onPressReset = () => {
        this.setState({ reset: !this.state.reset })
        alert(this.state.reset)
    }

    onValueChange = () => {
        this.setState({ value: this.state.value, byotp: !this.state.byotp })
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
                style={forgotPasswordStyle.container}>
                <View style={{ flex: 1, padding: 15, justifyContent: 'center'}}>
                    <Headline style={{ marginBottom: 10, color: "#698EB7", fontStyle: "bold" }}>{this.state.verified ? "Reset Password" : "Verify Your Email "}</Headline>
                    <View style={{ display: this.state.verified ? 'none' : 'flex' }}>
                        <TextInput
                            label="Email"
                            placeholder="email@gmail.com"
                            mode="outlined"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa' } }}
                            style={forgotPasswordStyle.inputView}
                        />
                        <TouchableOpacity style={forgotPasswordStyle.loginBtn} onPress={this._onPressButton}>
                            <Text style={forgotPasswordStyle.loginText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: this.state.verified && !this.state.byemail && !this.state.byotp ? 'flex' : 'none' }}>
                        <Card style={{ backgroundColor: "#fff", paddingTop: 15, paddingBottom: 15 }}>
                            <RadioButton.Group onValueChange={this.onValueChange} value={this.state.value}>
                                <RadioButton.Item label="Send Reset to e*****@m***.com" value="email" id="email" />
                                <RadioButton.Item label="Send Reset to +961 7******4" value="otp" id="otp" />
                            </RadioButton.Group>
                        </Card>
                    </View>
                    <View style={{ display: this.state.byemail ? 'flex' : 'none' }}>
                        <Card style={{ backgroundColor: "#fff", padding: 30 }}>
                            <Text>An Email has been sent to reset your password</Text>
                        </Card>
                        <TouchableOpacity style={forgotPasswordStyle.loginBtn} >
                            <Text style={forgotPasswordStyle.loginText}>Resend Email in 30s</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: this.state.byotp ? 'flex' : 'none' }}>
                        <TextInput
                            label="Mobile OTP Code*"
                            placeholder="#44445"
                            mode="outlined"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa' } }}
                            style={forgotPasswordStyle.inputView}
                        />
                        <TouchableOpacity style={forgotPasswordStyle.loginBtn} >
                            <Text style={forgotPasswordStyle.loginText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}