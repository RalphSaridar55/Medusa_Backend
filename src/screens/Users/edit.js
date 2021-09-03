import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Headline, Paragraph, TextInput, IconButton, List, Avatar, Card, Searchbar, Checkbox } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from "expo-document-picker";

const items = [
    {
        value: '1',
        label: 'Role 1'
    },
    {
        value: '2',
        label: 'Role 2'
    },
    {
        value: '3',
        label: 'Role 3'
    },

];

export default class EditUsers extends Component {
    state = {
        email: "",
        subject: "",
        message: "",
        role: "",
        docs:"",
        selectedItems: [],
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        this.setState({ docs: result.uri })
        setDocs(result.uri)
    };

    render() {
        const { selectedItems } = this.state;

        return (
            <ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
                style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                <View style={{ flex: 1, padding: 15, justifyContent: 'center' }}>
                    <Headline style={{ marginBottom: 10, color: "#698EB7", fontStyle: "bold" }}>Edit User</Headline>
                    <TextInput
                        label="Email"
                        placeholder="email@gmail.com"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={styles.inputView}
                        value="Mark@gmail.com"
                    />
                    <TextInput
                        label="UserName"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={styles.inputView}
                        value="Mark"
                    />
                    {/* Drop down  */}
                    <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
                        <Picker
                            selectedValue={this.state.role}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ role: itemValue })
                            }>
                            {items.map((option) =>
                                <Picker.Item
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}
                                />
                            )}
                        </Picker>
                    </View>
                    {/* should be a list  */}
                    <TextInput
                        label="Permissions"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={styles.inputView}
                        value="Add"
                    />
                     <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <IconButton
                                icon="plus"
                                size={20}
                                onPress={pickDocument}
                                style={{ backgroundColor: '#698EB7' }} color="#fff"
                            />
                            <Text style={{ marginLeft: 10, color: "#698EB7", fontWeight: 'bold' }}>Proof of identification .pdf .png</Text>
                        </View>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginText}>Apply Changes</Text>
                    </TouchableOpacity>

                </View>


            </ImageBackground>
        );
    }
}

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