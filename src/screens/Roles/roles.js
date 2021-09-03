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
import { Headline, DataTable, IconButton } from 'react-native-paper';

export default class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calls: [
                { id: 1, name: "Role A", status: "4 " },
                { id: 2, name: "Role C", status: "14 ", },
                { id: 3, name: "Role D", status: "2 ", },
                { id: 4, name: "Role E ", status: "1 ", },

            ]
        };
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E9F3FF' }} >
                <ScrollView>
                    <DataTable style={{ backgroundColor: '#fff' }}>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title numeric >Users</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView style={{ maxHeight: 450 }}>
                            <TouchableOpacity>
                                <DataTable.Row style={{ paddingTop: 20, paddingBottom: 20 }}>
                                    <DataTable.Cell>Role A</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ marginRight: 15 }}>6</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <DataTable.Row style={{ backgroundColor: '#efefef' }}>
                                    <DataTable.Cell>Role F</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ marginRight: 15 }}>4</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <DataTable.Row>
                                    <DataTable.Cell>Role E</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ marginRight: 15 }}>3</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <DataTable.Row style={{ backgroundColor: '#efefef' }}>
                                    <DataTable.Cell>Role A</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ marginRight: 15 }}>6</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <DataTable.Row >
                                    <DataTable.Cell>Role s</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ marginRight: 15 }}>9</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <DataTable.Row style={{ backgroundColor: '#efefef' }}>
                                    <DataTable.Cell>Role O</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ marginRight: 15 }} >2</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <DataTable.Row >
                                    <DataTable.Cell>Role A</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ marginRight: 15 }}>7</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        </ScrollView>
                    </DataTable>
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('AddRoles')}>Add Role</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 40,
        height: 40,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
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
});