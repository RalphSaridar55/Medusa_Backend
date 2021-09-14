import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './style_buyer';

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
        return (<ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode="cover"
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


