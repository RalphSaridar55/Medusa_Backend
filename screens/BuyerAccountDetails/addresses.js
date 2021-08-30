import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Headline } from 'react-native';
import { TextInput, HelperText, IconButton } from 'react-native-paper';


class Addresses extends Component {
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
                    label="Registered Adress*"
                    placeholder="Registered Adress*"
                    mode="outlined"
                    outlineColor="#C4C4C4"
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={styles.inputView}
                    value={this.state.email}
                    onChangeText={this.onChangeText}
                />
                <TextInput
                    label="Country"
                    placeholder="Country"
                    mode="outlined"
                    outlineColor="#C4C4C4"
                    theme={{ colors: { primary: '#31c2aa' } }}
                    style={styles.inputView}
                    value={this.state.email}
                    onChangeText={this.onChangeText}
                />
                <TextInput
                    mode="outlined"
                    label="City*"
                    outlineColor="#C4C4C4"
                    style={styles.inputView}
                    value={this.state.password}
                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                />
                <TextInput
                    mode="outlined"
                    label="State"
                    secureTextEntry
                    outlineColor="#C4C4C4"
                    style={styles.inputView}
                    value={this.state.password}

                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                />
                <TextInput
                    mode="outlined"
                    label="Street*"
                    outlineColor="#C4C4C4"
                    style={styles.inputView}
                    value={this.state.password}
                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                />
                <TextInput
                    mode="outlined"
                    label="Postal Code*"
                    secureTextEntry
                    outlineColor="#C4C4C4"
                    style={styles.inputView}
                    value={this.state.password}

                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}

                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.Btn}>
                        <IconButton
                            icon="plus"
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>);
    }
}

export default Addresses;


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