import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Headline, Paragraph, TextInput, List, Avatar, Card } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import styles from "./style"

export default class AddRole extends Component {
    state = {
        email: "",
        subject: "",
        message: "",
        roles: [],
        fetchedRole: [
            {
                id: "1",
                name: "name"
            },
            {
                id: "2",
                name: "name 2"
            }
        ]
    }

    setRoles = (e) => {
        this.setState({ roles: e.target.value }
        )
    }
    render() {
        return (
            <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode="cover"
                style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                <View style={{ flex: 1, padding: 15, justifyContent: 'center' }}>
                    <Headline style={{ marginBottom: 10, color: "#698EB7", fontStyle: "bold" }}>Create a Role</Headline>
                    <TextInput
                        label="Role name*"
                        placeholder="store"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={styles.inputView}
                    />

                    <MultiSelect
                        hideTags
                        items={this.state.fetchedRole}
                        uniqueKey="id"
                        onSelectedItemsChange={(e) => this.setRoles(e)}
                        selectedItems={this.state.roles}
                        selectText="  Select Permissions"
                        searchInputPlaceholderText="  Search ..."
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        styleRowList={{ padding: 5 }}
                        styleSelectorContainer={{ padding: 5 }}

                    />

                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginText}>Create Role</Text>
                    </TouchableOpacity>

                </View>


            </ImageBackground>
        );
    }
}

