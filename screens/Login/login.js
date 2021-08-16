import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Headline } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: '',
            emailError: "",
            passwordError: ""
        }
    }

    onChange = () => {

    }

    render() {
        return (<ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
            style={{
                flex: 1,
                justifyContent: "center"
            }}>
            <View style={{ flex: 1, padding: 15, justifyContent: 'center' }}>
                <TextInput
                    label="Email"
                    placeholder="email@gmail.com"
                    mode="outlined"
                    outlineColor="#C4C4C4"
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={styles.inputView}
                    value={this.state.email}
                // onChangeText={onChangeText}
                />
                <HelperText type="error" visible={hasErrors()}>
                    Email address is invalid!
                </HelperText>
                <TextInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry
                    outlineColor="#C4C4C4"
                    style={styles.inputView}
                    value={this.state.passwordpassword}
                    //onChangeText={onChangePassword}
                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                    right={<TextInput.Icon name="eye" />}
                />
                <TouchableOpacity>
                    <Text style={styles.forgot} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Home')}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.signupText} onPress={() => this.props.navigation.navigate('Registration')}>Become a Partner </Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>);
    }
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 25
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "#31C2AA",
        fontSize: 11,
        textAlign: "right"
    },
    loginBtn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    },
    signupText: {
        color: "#31C2AA",
        textAlign: "center"
    }
});