import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Alert
} from 'react-native';
import { Card, IconButton, Searchbar, Menu, Divider, Provider, Button } from 'react-native-paper';
import { Colors, Dialog, Picker, Avatar, Assets, PanningProvider, Typography, ActionBar } from 'react-native-ui-lib';
import dropdown from '../../../assets/down.png';
import styles from './style_pickup';
import _ from 'lodash';
import * as DocumentPicker from "expo-document-picker";



const Location = [
    { label: 'UAE, Dubai, Sheikh Zayed St.', value: 'uae' },
    { label: 'Lebanon, Beirut, Hamra St.', value: 'leb' },
    { label: 'UAE, Abu Dhabi, Al Sharqi St.', value: 'abu' },
];

const Payments = [
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'Cash on Delivery', value: 'Cash on Delivery' },
    { label: 'Letter of Credit', value: 'Letter of Credit' },
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Cash on Advance', value: 'Cash on Advance' },

];


renderDialog = modalProps => {
    const { visible, children, toggleModal, onDone } = modalProps;

    return (
        <Dialog
            migrate
            visible={visible}
            onDismiss={() => {
                onDone();
                toggleModal(false);
            }}
            bottom
            useSafeArea
            renderPannableHeader={this.dialogHeader}
            panDirection={PanningProvider.Directions.DOWN}
        >
            <ScrollView >{children}</ScrollView>
        </Dialog>
    );
};


export default class Pickup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [
                { id: 1, name: "116 smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
                { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 2, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
                { id: 4, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 5, name: "116 smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
                { id: 6, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 7, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
                { id: 8, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 9, name: "116 smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
                { id: 10, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 11, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
                { id: 12, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
            ],
            location: "",
            payments: "",
            total:0
        }
    }

    placeOrder = () =>{
        console.log(this.state.location, "   ",this.state.payments)
        if(this.state.data.length<1){
            Alert.alert("Order not placed","Please add products before placing an order")
        }
        else if (this.state.location.label.length<1 || this.state.payments.label.length<1){
            Alert.alert("Order not placed","Please fill all the required fields")
        }
        else{
            //database stuff
            Alert.alert("Order has been placed","Thank you for your purchase")
            this.props.navigation.navigate('Home')
        }
    }

    calculateTotal(){
        let array = this.state.data.map(i=>(parseFloat(i.count.substring(0,this.state.data.length-1))))
        //console.log(array)
        const total = array.reduce((pre,curr)=>pre+curr);
        //console.log(total)
        this.setState({total:total})
    }

    componentDidMount(){
        this.calculateTotal()
        //console.log(this.state.data.reduce((pre,cur)=>pre+cur))
        //this.setState({total:arr})
    }

    openMenu = () => {
        this.setState({ visible: true })
    }
    closeMenu = () => {
        this.setState({ visible: false })
    }
    render() {
        return (
            <Provider>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={{ padding: 10, marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: "#698EB7" }}>Order Summary</Text>
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={this.state.data}
                            // ItemSeparatorComponent={() => {
                            //     return (
                            //         <View style={styles.separator} />
                            //     )
                            // }}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <ScrollView>
                                        <TouchableOpacity style={styles.card} >
                                            <Image style={styles.image} source={{ uri: item.image }} />
                                            <View style={styles.cardContent}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text style={{ display: item.value ? 'flex' : 'none', color: '#31C2AA' }}>Value added service </Text>
                                                <Text style={styles.count}>Price {item.count}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <IconButton icon="dots-vertical" style={{ alignItems: 'flex-end' }} color="#698EB7" onPress={this.openMenu}></IconButton>
                                            </View>
                                        </TouchableOpacity>
                                    </ScrollView>
                                )
                            }} />
                        <Divider></Divider>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 5 }}>
                            <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>Total</Text>
                            <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>{this.state.total} $ </Text>
                        </View>
                    </View>
                    <View style={{
                        marginLeft: 10,
                        marginRight: 10,
                    }}>
                        <View style={{ flex: 1, padding: 10, paddingTop: 20, backgroundColor: "#fff", marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: "#698EB7" }}>Pickup Details</Text>
                            <Picker
                                placeholder="Pick a Location"
                                value={this.state.location}
                                onChange={items => this.setState({ location: items })}
                                //mode={Picker.modes.MULTI}
                                //rightIconSource={dropdown}
                                renderCustomModal={this.renderDialog}
                                style={{ alignItems: 'center' }}

                            >
                                {_.map(Location, option => (
                                    <Picker.Item
                                        key={option.value}
                                        value={option}
                                        label={option.label}
                                        disabled={option.disabled}
                                    />
                                ))}
                            </Picker>
                            <Picker
                                placeholder="Choose a Payment Method"
                                value={this.state.payments}
                                onChange={items => this.setState({ payments: items })}
                                //mode={Picker.modes.MULTI}
                                //rightIconSource={dropdown}
                                renderCustomModal={this.renderDialog}
                            >
                                {_.map(Payments, option => (
                                    <Picker.Item
                                        key={option.value}
                                        value={option}
                                        label={option.label}
                                        disabled={option.disabled}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.loginBtn} onPress={this.placeOrder}>
                                <Text style={styles.loginText}>Place Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView >
            </Provider>
        );
    }
}