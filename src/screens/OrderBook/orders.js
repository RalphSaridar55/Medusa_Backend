
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import styles from './orders_style'

export default class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "ORDER 1", status: "Delivered " },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "ORDER 2", status: "status" },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "ORDER 3", status: "status" },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "ORDER 4", status: "status" },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "ORDER 5", status: "status" },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "ORDER 6", status: "status" },
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "ORDER 7", status: "status" },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "ORDER 8", status: "status" },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "ORDER 9", status: "status" },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "ORDER 10", status: "status" },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "ORDER 11", status: "status" },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "ORDER 12", status: "status" },
            ]
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.root}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={(item) => {
                        const Notification = item.item;
                        return (
                            <ScrollView>
                                <View style={styles.container}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image style={styles.image} source={require('../../../assets/images/logo.png')} />
                                    </TouchableOpacity>
                                    <View style={styles.content}>
                                        <View style={styles.contentHeader}>
                                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                                <Text style={styles.name}>{Notification.name}</Text>
                                                <Text style={styles.status}>{Notification.status}</Text>
                                            </View>
                                            <Text style={styles.time}>WED, AUG 4, 08:51 AM</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        );
                    }} />
            </View>
        );
    }
}

