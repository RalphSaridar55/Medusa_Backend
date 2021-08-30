// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     Image,
//     ScrollView,
//     FlatList
// } from 'react-native';
// import { Card, IconButton, Searchbar, Menu, Divider, Provider, Button } from 'react-native-paper';
// import { Colors, Dialog, Picker, Avatar, Assets, PanningProvider, Typography, ActionBar } from 'react-native-ui-lib';
// import dropdown from '../../assets/down.png';
// import _ from 'lodash';



// const Location = [
//     { label: 'UAE, Dubai, Sheikh Zayed St.', value: 'uae' },
//     { label: 'Lebanon, Beirut, Hamra St.', value: 'leb' },
//     { label: 'UAE, Abu Dhabi, Al Sharqi St.', value: 'abu' },
// ];

// const Payments = [
//     { label: 'Bank Transfer', value: 'Bank Transfer' },
//     { label: 'Cash on Delivery', value: 'Cash on Delivery' },
//     { label: 'Letter of Credit', value: 'Letter of Credit' },
//     { label: 'Credit Card', value: 'Credit Card' },
//     { label: 'Cash on Advance', value: 'Cash on Advance' },

// ];


// renderDialog = modalProps => {
//     const { visible, children, toggleModal, onDone } = modalProps;

//     return (
//         <Dialog
//             migrate
//             visible={visible}
//             onDismiss={() => {
//                 onDone();
//                 toggleModal(false);
//             }}
//             bottom
//             useSafeArea
//             renderPannableHeader={this.dialogHeader}
//             panDirection={PanningProvider.Directions.DOWN}
//         >
//             <ScrollView >{children}</ScrollView>
//         </Dialog>
//     );
// };


// export default class Pickup extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: false,
//             data: [
//                 { id: 1, name: "116 smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
//                 { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
//                 { id: 2, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
//                 { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
//             ],
//             location: [],
//             payments: "",
//         }
//     }

//     openMenu = () => {
//         this.setState({ visible: true })
//     }
//     closeMenu = () => {
//         this.setState({ visible: false })
//     }
//     render() {
//         return (
//             <Provider>
//                 <ScrollView >
//                     <View style={styles.container}>
//                         <Text style={{ padding: 10, marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: "#698EB7" }}>Order Summary</Text>
//                         <FlatList
//                             style={styles.contentList}
//                             columnWrapperStyle={styles.listContainer}
//                             data={this.state.data}
//                             // ItemSeparatorComponent={() => {
//                             //     return (
//                             //         <View style={styles.separator} />
//                             //     )
//                             // }}
//                             keyExtractor={(item) => {
//                                 return item.id;
//                             }}
//                             renderItem={({ item }) => {
//                                 return (
//                                     <ScrollView>
//                                         <TouchableOpacity style={styles.card} >
//                                             <Image style={styles.image} source={{ uri: item.image }} />
//                                             <View style={styles.cardContent}>
//                                                 <Text style={styles.name}>{item.name}</Text>
//                                                 <Text style={{ display: item.value ? 'flex' : 'none', color: '#31C2AA' }}>Value added service </Text>
//                                                 <Text style={styles.count}>Price {item.count}</Text>
//                                             </View>
//                                             <View style={{ flexDirection: 'row' }}>
//                                                 <IconButton icon="dots-vertical" style={{ alignItems: 'flex-end' }} color="#698EB7" onPress={this.openMenu}></IconButton>
//                                             </View>
//                                         </TouchableOpacity>
//                                     </ScrollView>
//                                 )
//                             }} />
//                         <Divider></Divider>
//                         <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 5 }}>
//                             <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>Total</Text>
//                             <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>400 $ </Text>
//                         </View>
//                     </View>
//                     <View style={{
//                         marginLeft: 10,
//                         marginRight: 10,
//                     }}>
//                         <View style={{ flex: 1, padding: 10, paddingTop: 20, backgroundColor: "#fff", marginTop: 20 }}>
//                             <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: "#698EB7" }}>Pickup Details</Text>
//                             <Picker
//                                 placeholder="Pick a Location"
//                                 value={this.state.Location}
//                                 onChange={items => this.setState({ Location: items })}
//                                 //mode={Picker.modes.MULTI}
//                                 //rightIconSource={dropdown}
//                                 renderCustomModal={this.renderDialog}
//                                 style={{ alignItems: 'center' }}

//                             >
//                                 {_.map(Location, option => (
//                                     <Picker.Item
//                                         key={option.value}
//                                         value={option}
//                                         label={option.label}
//                                         disabled={option.disabled}
//                                     />
//                                 ))}
//                             </Picker>
//                             <Picker
//                                 placeholder="Choose a Payment Method"
//                                 value={this.state.payments}
//                                 onChange={items => this.setState({ payments: items })}
//                                 //mode={Picker.modes.MULTI}
//                                 //rightIconSource={dropdown}
//                                 renderCustomModal={this.renderDialog}
//                             >
//                                 {_.map(Payments, option => (
//                                     <Picker.Item
//                                         key={option.value}
//                                         value={option}
//                                         label={option.label}
//                                         disabled={option.disabled}
//                                     />
//                                 ))}
//                             </Picker>
//                         </View>
//                         <View>
//                             <TouchableOpacity style={styles.loginBtn}>
//                                 <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Home')}>Place Order</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </ScrollView >
//             </Provider>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 10,
//         backgroundColor: "#fff",
//         marginLeft: 10,
//         marginRight: 10,
//     },
//     contentList: {
//         flex: 1,
//     },
//     separator: {
//         height: 1,
//         backgroundColor: "#CCCCCC"
//     },
//     image: {
//         width: 60,
//         height: 60,
//     },

//     card: {

//         backgroundColor: "white",
//         padding: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     name: {
//         fontSize: 16,
//         flex: 1,
//         alignSelf: "flex-start",
//         color: "#000",
//         fontWeight: 'bold'
//     },
//     total: {
//         fontSize: 18,
//         flex: 1,
//         alignSelf: "flex-start",
//         color: "#3399ff",
//         margin: 10,
//         fontWeight: 'bold'
//     },
//     totalcard: {
//         marginLeft: 10,
//         marginRight: 10,
//         backgroundColor: "white",
//         padding: 10,
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: "space-between"
//     },
//     totalcount: {
//         fontSize: 18,
//         flex: 1,
//         alignSelf: "flex-end",
//         color: "#3399ff",
//         margin: 10,
//         fontWeight: 'bold'
//     }
//     ,
//     count: {
//         fontSize: 14,
//         flex: 1,
//         alignSelf: "flex-start",
//         color: "#6666ff",
//         width: 200
//     },
//     value: {
//         marginTop: 5,
//         marginBottom: 5
//     },
//     loginBtn: {
//         backgroundColor: "#31C2AA",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 20,
//         marginBottom: 10
//     },
//     loginText: {
//         color: "white"
//     },
// });