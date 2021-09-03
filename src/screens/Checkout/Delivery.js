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
// import { Card, IconButton, Searchbar, Menu, Divider, Provider, Button, Avatar } from 'react-native-paper';
// import { Colors, Dialog, Picker, Assets, PanningProvider, Typography, ActionBar } from 'react-native-ui-lib';
// import dropdown from '../../assets/down.png';
// import _ from 'lodash';
// import Swipeout from 'react-native-swipeout';

// // Buttons
// const swipeoutBtns = [
//     {
//         text: 'Delete'
//     }
// ]


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
// const Cargo = [
//     { label: 'Air', value: 'Air' },
//     { label: 'Ocean', value: 'Ocean' },
//     { label: 'Land', value: 'Land' },
// ];

// const ServiceLevel = [
//     { label: 'Premium', value: 'Premium' },
//     { label: 'Standard', value: 'Standard' },
// ];

// const Air = [
//     { label: 'Door to Door', value: 'Door to Door' },
//     { label: 'Door to Airport', value: 'Door to Airport' },
//     { label: 'Airport to Door', value: 'Airport to Door' },
//     { label: 'Airport to Airport', value: 'Airport to Airport' }
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


// export default class Delivery extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: false,
//             data: [
//                 { id: 1, name: "116 Smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
//                 { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
//                 { id: 2, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
//                 { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
//             ],
//             location: [],
//             payments: "",
//             cargo: "",
//             typeofservice: '',
//             serviceLevel: "",
//         }
//     }

//     openMenu = () => {
//         this.setState({ visible: true })
//     }
//     closeMenu = () => {
//         this.setState({ visible: false })
//     }
//     clickEventListener = (item) => {
//         this.setState({ userSelected: item }, () => {
//             alert(item.name)
//         });
//     }

//     render() {
//         return (
//             <Provider>
//                 <ScrollView >
//                     <View style={styles.container}>
//                         <Text style={{ padding: 10, marginLeft: 5, fontSize: 17, fontWeight: 'bold', color: "#698EB7" }}>Order Summary</Text>


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
//                                         <Swipeout right={swipeoutBtns}>
//                                             <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }} >
//                                                 <Image style={styles.image} source={{ uri: item.image }} />
//                                                 <View style={styles.cardContent}>
//                                                     <Text style={styles.name}>{item.name}</Text>
//                                                     <Text style={{ display: item.value ? 'flex' : 'none', color: '#31C2AA' }}>Value added service </Text>
//                                                     <Text style={styles.count}>Price {item.count}</Text>
//                                                 </View>
//                                                 <View style={{ flexDirection: 'row' }}>
//                                                     <IconButton icon="dots-vertical" style={{ alignItems: 'flex-end' }} color="#698EB7" onPress={this.openMenu}></IconButton>
//                                                 </View>
//                                             </TouchableOpacity>
//                                         </Swipeout>
//                                     </ScrollView>
//                                 )
//                             }} />
//                         <Divider></Divider>
//                         <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 10 }}>
//                             <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>Total</Text>
//                             <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>400 $ </Text>
//                         </View>
//                     </View>
//                     <View style={{
//                         marginLeft: 10,
//                         marginRight: 10,
//                     }}>
//                         <View style={{ flex: 1, padding: 10, paddingTop: 20, backgroundColor: "#fff", marginTop: 20 }}>
//                             <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: "#698EB7" }}>Shipment Details</Text>
//                             {/* <Picker
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
//                             </Picker> */}
//                             <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
//                                 <Picker
//                                     selectedValue={this.state.Location}
//                                     onValueChange={(itemValue, itemIndex) =>
//                                         this.setState({ Location: itemValue })
//                                     }>
//                                     {Location.map((option) =>
//                                         <Picker.Item
//                                             key={option.value}
//                                             value={option.value}
//                                             label={option.label}
//                                         />
//                                     )}
//                                 </Picker>
//                             </View>
//                             {/* <Picker
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
//                             </Picker> */}
//                             <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
//                                 <Picker
//                                     selectedValue={this.state.payments}
//                                     onValueChange={(itemValue, itemIndex) =>
//                                         this.setState({ payments: itemValue })
//                                     }>
//                                     {Cargo.map((option) =>
//                                         <Picker.Item
//                                             key={option.value}
//                                             value={option.value}
//                                             label={option.label}
//                                         />
//                                     )}
//                                 </Picker>
//                             </View>
//                             {/* <Picker
//                                 placeholder="Choose a Cargo  Method"
//                                 value={this.state.cargo}
//                                 onChange={items => this.setState({ cargo: items })}
//                                 //mode={Picker.modes.MULTI}
//                                 //rightIconSource={dropdown}
//                                 renderCustomModal={this.renderDialog}
//                             >
//                                 {_.map(Cargo, option => (
//                                     <Picker.Item
//                                         key={option.value}
//                                         value={option}
//                                         label={option.label}
//                                         disabled={option.disabled}
//                                     />
//                                 ))}
//                             </Picker> */}
//                             <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
//                                 <Picker
//                                     selectedValue={this.state.cargo}
//                                     onValueChange={(itemValue, itemIndex) =>
//                                         this.setState({ cargo: itemValue })
//                                     }>
//                                     {Air.map((option) =>
//                                         <Picker.Item
//                                             key={option.value}
//                                             value={option.value}
//                                             label={option.label}
//                                         />
//                                     )}
//                                 </Picker>
//                             </View>
//                             {/* <Picker
//                                 placeholder="Choose a Type Of Service "
//                                 value={this.state.typeofservice}
//                                 onChange={items => this.setState({ typeofservice: items })}
//                                 //mode={Picker.modes.MULTI}
//                                 //rightIconSource={dropdown}
//                                 renderCustomModal={this.renderDialog}
//                             >
//                                 {_.map(Air, option => (
//                                     <Picker.Item
//                                         key={option.value}
//                                         value={option}
//                                         label={option.label}
//                                         disabled={option.disabled}
//                                     />
//                                 ))}
//                             </Picker> */}
//                             <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
//                                 <Picker
//                                     selectedValue={this.state.serviceLevel}
//                                     onValueChange={(itemValue, itemIndex) =>
//                                         this.setState({ serviceLevel: itemValue })
//                                     }>
//                                     {ServiceLevel.map((option) =>
//                                         <Picker.Item
//                                             key={option.value}
//                                             value={option.value}
//                                             label={option.label}
//                                         />
//                                     )}
//                                 </Picker>
//                             </View>
//                             {/* <Picker
//                                 placeholder="Choose a Level Of Service "
//                                 value={this.state.serviceLevel}
//                                 onChange={items => this.setState({ serviceLevel: items })}
//                                 //mode={Picker.modes.MULTI}
//                                 //rightIconSource={dropdown}
//                                 renderCustomModal={this.renderDialog}
//                             >
//                                 {_.map(ServiceLevel, option => (
//                                     <Picker.Item
//                                         key={option.value}
//                                         value={option}
//                                         label={option.label}
//                                         disabled={option.disabled}
//                                     />
//                                 ))}
//                             </Picker> */}
//                             <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 5 }}>
//                                 <Avatar.Icon size={40} icon="plus" style={{ backgroundColor: '#698EB7' }} color="#fff" />
//                                 <Text style={{ marginLeft: 10, color: "#698EB7", fontWeight: 'bold' }}>Upload Document</Text>
//                             </View>
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
//         fontWeight: 'bold',
//         alignSelf: "flex-start",
//         color: "#698EB7",
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