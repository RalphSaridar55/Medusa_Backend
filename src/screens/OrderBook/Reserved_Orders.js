import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import styles from './reserved_orders_style';

// Buttons
const swipeoutBtns = [
    {
        text: 'Delete'
    },
]

export default class Reserved extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            userSelected: [],
            data: [
                { id: 1, name: "116 Smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
                { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 2, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
                { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },

            ],
        };
    }

    clickEventListener = (item) => {
        Alert.alert('Message', 'Item clicked. ' + item.name);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.contentList}
                    columnWrapperStyle={styles.listContainer}
                    data={this.state.data}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <ScrollView >
                                <Swipeout right={swipeoutBtns}>
                                    <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }} >
                                        <Image style={styles.image} source={{ uri: item.image }} />
                                        <View style={styles.cardContent}>
                                            <Text style={styles.name}>{item.name}</Text>
                                            <Text style={{ display: item.value ? 'flex' : 'none', color: '#31C2AA' }}>Value added service </Text>
                                            <Text style={styles.count}>Price {item.count}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Swipeout>
                            </ScrollView>
                        )
                    }} />
            </View>
        );
    }
}
