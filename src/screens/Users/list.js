import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import { Headline } from 'react-native-paper';
import styles from './list_style';

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calls: [
                { id: 1, name: "Mark Doe", status: "Last Active 1/2/2021 ", role: "Admin", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
                { id: 2, name: "Clark Man", status: "Last Active 1/2/2021 ", role: "Employee", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
                { id: 3, name: "Jaden Boor", status: "Last Active 1/2/2021 ", role: "Admin", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
                { id: 4, name: "Srick Tree", status: "Last Active 1/2/2021 ", role: "Manager", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
                { id: 5, name: "Erick Doe", status: "Last Active 1/2/2021 ", role: "Manager", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
                { id: 6, name: "Francis Doe", status: "Last Active 1/2/2021 ", role: "Admin", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
                { id: 8, name: "Matilde Doe", status: "Last Active 1/2/2021 ", role: "Employee", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
                { id: 9, name: "John Doe", status: "Last Active 1/2/2021 ", role: "Admin", image: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" },
            ]
        };
    }

    renderItem = ({ item }) => {
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditUser')} >
                    <View style={styles.row} >
                        <Image source={{ uri: item.image }} style={styles.pic} />
                        <View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                <Text style={styles.mblTxt}>{item.status}</Text>
                            </View>
                            <View style={styles.msgContainer}>
                                <Text style={styles.msgTxt}>{item.role}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E9F3FF', flexDirection: 'column' }} >
                <FlatList
                    extraData={this.state}
                    data={this.state.calls}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={this.renderItem} />
                <View>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('AddUser')}>Add User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
