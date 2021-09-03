import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Headline } from 'react-native';
import { TextInput, HelperText, IconButton } from 'react-native-paper';
import styles from './style_address';

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

