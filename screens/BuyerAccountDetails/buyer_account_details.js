import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Headline } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';


class BuyreAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ''
        }
    }
    onChangeText = () => {
        this.setState({ email: this.state.email })
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
                    onChangeText={this.onChangeText}
                />
                <TextInput
                    label="Website"
                    placeholder="web.com"
                    mode="outlined"
                    outlineColor="#C4C4C4"
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={styles.inputView}
                    value={this.state.email}
                    onChangeText={this.onChangeText}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        label="Code"
                        placeholder="+961"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={styles.inputV}
                        value={this.state.email}
                        onChangeText={this.onChangeText}
                    />
                    <TextInput
                        label="Phone Number"
                        placeholder="70909090"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={styles.input_V}
                        value={this.state.email}
                        onChangeText={this.onChangeText}
                    />
                </View>
                <TextInput
                    mode="outlined"
                    label="Password*"
                    secureTextEntry
                    outlineColor="#C4C4C4"
                    style={styles.inputView}
                    value={this.state.password}
                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                    right={<TextInput.Icon name="eye" />}
                />
                <TextInput
                    mode="outlined"
                    label="Confirm Password*"
                    secureTextEntry
                    outlineColor="#C4C4C4"
                    style={styles.inputView}
                    value={this.state.password}

                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                    right={<TextInput.Icon name="eye" />}
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.Btn}>
                        <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Home')}>Discard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Dis_Btn}>
                        <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Home')}>Apply Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>);
    }
}

export default BuyreAccount;


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
    Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        flex: 1
    },
    Dis_Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 5,
        flex: 1
    },
    loginText: {
        color: "white"
    },
    signupText: {
        color: "#31C2AA",
        textAlign: "center"
    },
    inputV: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 25,
        flex: 1,
        marginRight: 5
    },
    input_V: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 25,
        flex: 2
    },
});