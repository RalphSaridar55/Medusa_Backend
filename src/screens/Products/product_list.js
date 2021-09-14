import React, { Component, createRef } from 'react';
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
import ActionSheet from "react-native-actions-sheet";
import { List, Checkbox, Button, Appbar, Searchbar, IconButton, Title } from 'react-native-paper';
import Slider from "react-native-sliders";
import styles from './listing_style';

const actionSheetRef = createRef();
const actionSheetCat = createRef();

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, name: "116 smart watch ", status: "$0.66 - $3.46 / Piece", moq: "10", av: '100', image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg" },
                { id: 2, name: "Q12 Smartwatch", status: "$0.76 - $3.46 / Piece", moq: "20", av: '100', image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg" },
                { id: 3, name: "Q12 Smartwatch", status: "$0.12 - $7.55 / Piece", moq: "5", av: '200', image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg" },
                { id: 4, name: "Z15 Smartwatch", status: "$0.13 - $8.55 / Piece", moq: "10", av: '100', image: "https://sc04.alicdn.com/kf/Hbe79d59029f749bdb11318553a997740u.jpg" },
                { id: 5, name: "Z15 Smartwatch", status: "$0.12 - $7.55 / Piece", moq: "1", av: '300', image: "https://sc04.alicdn.com/kf/Hbefda793d3084ed5819cc908183d6b71a.jpg" },
                { id: 6, name: "G102 Gaming", status: "$0.66 - $3.46 / Piece", moq: "10", av: '100', image: "https://sc04.alicdn.com/kf/Hb1a7df7c8ea041e780440827874d67ddn.jpg" },
                { id: 8, name: "W11 headphone", status: "$0.66 - $5.46 / Piece", moq: "100", av: '300', image: "https://sc04.alicdn.com/kf/H0fafa3dcf2d543dab6aa08623ff8ba2cA.jpg" },
                { id: 9, name: "A12 headphone", status: "$0.66 - $6.46 / Piece", moq: "10", av: '100', image: "https://sc04.alicdn.com/kf/H1f097508b28149c391b0d366d3e58922v.jpg" },
                { id: 10, name: "Q1 Smartwatch", status: "$0.66 - $4.46 / Piece", moq: "40", av: '100', image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg" },
                { id: 11, name: "Z1 Smartwatch", status: "$0.66 - $5.46 / Piece", moq: "50", av: '100', image: "https://sc04.alicdn.com/kf/Hbefda793d3084ed5819cc908183d6b71a.jpg" },
            ],
            List: true,
            showSearch: true,
            value: [0.2, 0.5]
        };
    }

    onclick = () => {
        this.setState({ showSearch: !this.state.showSearch })
    }
    setView = () => {
        this.setState({ List: !this.state.List })
    }

    clickEventListener(item) {
        Alert.alert(item.name)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Appbar style={{backgroundColor:"#E9F3FF" , color:"#fff"}}>
                        <Appbar.Content title={this.state.data.length + " " + "Results"} onPress={this.setView} style={{ fontSize: 14 }} />
                        <Appbar.Action icon="sort-descending" onPress={() => {
                            actionSheetRef.current?.setModalVisible();
                        }} />
                        <Appbar.Action icon="filter-menu" onPress={() => {
                            actionSheetCat.current?.setModalVisible();
                        }} />
                        <Appbar.Action icon="magnify" onPress={this.onclick} />
                    </Appbar>
                </View>
                <View>
                    <Searchbar
                        placeholder="Search"
                        style={{ display: this.state.showSearch ? 'none' : 'flex' }}
                    />
                </View>
                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={this.state.data}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item.image }} />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.position}>{item.status}</Text>
                                        <Text style={styles.position}>Available Qu. {item.av}</Text>
                                        <Text style={styles.position}> Min. Order {item.moq}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <ActionSheet ref={actionSheetRef}>
                    <ScrollView >
                        <View style={{ flexDirection: 'column', padding: 10 }} >
                            <View style={styles.contentSize}>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <IconButton
                                            icon="clock"
                                            size={20}
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>Newset</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <IconButton
                                            icon="star-outline"
                                            size={20}
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>Best Selling</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <Text style={{ fontSize: 18 }}>$</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>Low</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <Text style={{ fontSize: 18 }}>$$</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>High</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 15, marginBottom: 10, marginHorizontal: 10, }} >
                                <Button mode="contained" onPress={() => console.log('Pressed')} style={{ marginBottom: 10, borderRadius: 10 }}>
                                    Submit
                                </Button>
                                <Button mode="outlined" onPress={() => console.log('Pressed')} style={{ marginBottom: 10, borderRadius: 10 }}>
                                    Reset
                                </Button>
                            </View>
                        </View>

                    </ScrollView >
                </ActionSheet>
                <ActionSheet ref={actionSheetCat}>
                    <ScrollView >
                        <View >
                            <Title style={{ padding: 10 }}>Filter By </Title>
                            <List.AccordionGroup>
                                <List.Accordion title="Categories" id="1" style={{ width: "100%" }}>
                                    <ScrollView style={{ maxHeight: 200 }}>
                                        <Checkbox.Item
                                            status="checked"
                                            label="Electronics"
                                        />
                                        <Checkbox.Item
                                            status="unchecked"
                                            label="Home"
                                        />
                                        <Checkbox.Item
                                            status="unchecked"
                                            label="Beauty"
                                        />
                                        <Checkbox.Item
                                            status="checked"
                                            label="Electronics"
                                        />
                                        <Checkbox.Item
                                            status="unchecked"
                                            label="Home"
                                        />
                                        <Checkbox.Item
                                            status="unchecked"
                                            label="Beauty"
                                        />
                                        <Checkbox.Item
                                            status="unchecked"
                                            label="Gifts & Carfts"
                                        />
                                    </ScrollView>
                                </List.Accordion>

                                <List.Accordion title="Sub-Categories" id="2">
                                <ScrollView style={{ maxHeight: 200 }}>
                                    <Checkbox.Item
                                        status="checked"
                                        label="Accessories"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Car & Vehicle Electronics"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Beauty"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Camera & Photo"
                                    />
                                    </ScrollView>
                                </List.Accordion>

                                <List.Accordion title="Brand" id="3">
                                <ScrollView style={{ maxHeight: 200 }}>
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Samsung"
                                    />
                                    <Checkbox.Item
                                        status="checked"
                                        label="Apple"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Lenovo"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Huawei"
                                    />
                                    </ScrollView>
                                </List.Accordion>

                                <List.Accordion title="Color" id="4">
                                <ScrollView style={{ maxHeight: 200 }}>
                                    <Checkbox.Item
                                        status="checked"
                                        label="Black"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Red"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="Blue"
                                    />
                                    <Checkbox.Item
                                        status="unchecked"
                                        label="White"
                                    />
                                    </ScrollView>
                                </List.Accordion>
                                <List.Accordion title="Price Range" id="5">
                                    <Slider
                                        value={this.state.value}
                                        onValueChange={value => this.setState({ value })}
                                    />
                                </List.Accordion>
                            </List.AccordionGroup>
                        </View>
                    </ScrollView>
                </ActionSheet>
            </View>
        );
    }
}



