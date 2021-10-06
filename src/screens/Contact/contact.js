import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Headline, Paragraph, TextInput } from 'react-native-paper';
import contactStyle from './contactStyle';
import Footer from '../../components/footer/footer';

export default class Contact extends Component {
    state = {
        email: "",
        subject: "",
        message: "",
    }
    render() {
        return (
            <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode="cover"
                style={contactStyle.imageBkg}>
                <View style={contactStyle.container}>
                    <Headline style={contactStyle.headLine}>Get In Touch </Headline>
                    <Paragraph style={contactStyle.paragraph}>Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days. We will be happy to answer your questions.</Paragraph>
                    <TextInput
                        label="Email"
                        placeholder="email@gmail.com"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={contactStyle.inputView}
                    />
                    <TextInput
                        label="Subject"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={contactStyle.inputView}
                    />
                    <TextInput
                        label="Message"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={contactStyle.inputView}
                    />
                    <TouchableOpacity style={contactStyle.loginBtn}
                        /* onPress={()=>{
                            
                        }} */>
                        <Text style={contactStyle.loginText}>Submit</Text>
                    </TouchableOpacity>

                </View>
                {/* <Footer/> */}
            </ImageBackground>
        );
    }
}