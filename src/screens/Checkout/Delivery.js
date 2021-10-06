import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import styles from "./style_delivery";
import * as apiServices from "../../core/apis/apiAddressServices";
import {
  Card,
  IconButton,
  Searchbar,
  Menu,
  Divider,
  Provider,
  Button,
  Avatar,
} from "react-native-paper";
import {
  Colors,
  Dialog,
  Picker,
  Assets,
  PanningProvider,
  Typography,
  ActionBar,
} from "react-native-ui-lib";
import dropdown from "../../../assets/down.png";
import _ from "lodash";
import Swipeout from "react-native-swipeout";
import * as DocumentPicker from "expo-document-picker";
// Buttons
const swipeoutBtns = [
  {
    text: "Delete",
  },
];

const Location = [
  { label: "UAE, Dubai, Sheikh Zayed St.", value: "uae" },
  { label: "Lebanon, Beirut, Hamra St.", value: "leb" },
  { label: "UAE, Abu Dhabi, Al Sharqi St.", value: "abu" },
];

const Payments = [
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "Cash on Delivery", value: "Cash on Delivery" },
  { label: "Letter of Credit", value: "Letter of Credit" },
  { label: "Credit Card", value: "Credit Card" },
  { label: "Cash on Advance", value: "Cash on Advance" },
];
const Cargo = [
  { label: "Air", value: "Air" },
  { label: "Ocean", value: "Ocean" },
  { label: "Land", value: "Land" },
];

const ServiceLevel = [
  { label: "Premium", value: "Premium" },
  { label: "Standard", value: "Standard" },
];

const Air = [
  { label: "Door to Door", value: "Door to Door" },
  { label: "Door to Airport", value: "Door to Airport" },
  { label: "Airport to Door", value: "Airport to Door" },
  { label: "Airport to Airport", value: "Airport to Airport" },
];

renderDialog = (modalProps) => {
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
      <ScrollView>{children}</ScrollView>
    </Dialog>
  );
};

export default class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [
        {
          id: 1,
          name: "116 Smart watch ",
          image:
            "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg",
          count: "100$",
          value: true,
        },
        {
          id: 3,
          name: "Z15 Smartwatch",
          image:
            "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg",
          count: "100$",
          value: false,
        },
        {
          id: 2,
          name: "Q12 Smartwatch",
          image:
            "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg",
          count: "100$",
          value: true,
        },
        {
          id: 4,
          name: "Z15 Smartwatch",
          image:
            "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg",
          count: "100$",
          value: false,
        },
        {
          id: 5,
          name: "Q12 Smartwatch",
          image:
            "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg",
          count: "100$",
          value: true,
        },
        {
          id: 6,
          name: "Z15 Smartwatch",
          image:
            "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg",
          count: "100$",
          value: false,
        },
      ],
      Location:'',
      countries:[],
      locations: [],
      payments: "",
      doc: "",
      docError: "",
      cargo: "",
      typeofservice: "",
      serviceLevel: "",
    };
  }

  calculateTotal() {
    let array = this.state.data.map((i) =>
      parseFloat(i.count.substring(0, this.state.data.length - 1))
    );
    //console.log(array)
    const total = array.reduce((pre, curr) => pre + curr);
    //console.log(total)
    this.setState({ total: total });
  }

  componentDidMount() {
    this.calculateTotal();
    apiServices.getCountries().then((res)=>{
      console.log("RES COUNTRIES FROM THE FUNCTION:",res);
      this.setState({countries:res})
    })
    apiServices.getAddresses().then((res)=>{
      console.log("RES FROM THE FUNCTION:",res)
      let addresses =res.data.map((it)=>{
        let country_name = this.state.countries.filter((filtered)=>{
          return filtered.value === it.country_id;
        })
        return ({...it,country_name:country_name[0].label})
      })
      
      this.setState({locations:addresses})
    })
    //console.log(this.state.data.reduce((pre,cur)=>pre+cur))
    //this.setState({total:arr})
  }

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let ext = result.name.split(".");
    console.log(ext[ext.length - 1]);
    if (ext[ext.length - 1] != "docx" && ext[ext.length - 1] != "pdf")
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
    else {
      console.log(result);
      try {
        this.setState({ doc: result });
      } catch (error) {
        this.setState({ docError: error });
      }
    }
    /* e.typeDoc==="Trade"?console.log("test"):console.log(123);
          this.setState({ docs: result.uri })
          alert(result.uri); */
  };

  openMenu = () => {
    this.setState({ visible: true });
  };
  closeMenu = () => {
    this.setState({ visible: false });
  };
  clickEventListener = (item) => {
    this.setState({ userSelected: item }, () => {
      alert(item.name);
    });
  };

  render() {
    return (
      <Provider>
        <ScrollView style={{marginTop:40}}>
          <View style={styles.container}>
            <Text
              style={{
                padding: 10,
                marginLeft: 5,
                fontSize: 17,
                fontWeight: "bold",
                color: "#698EB7",
              }}
            >
              Order Summary
            </Text>

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
                    <Swipeout right={swipeoutBtns}>
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                          this.clickEventListener(item);
                        }}
                      >
                        <Image
                          style={styles.image}
                          source={{ uri: item.image }}
                        />
                        <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text
                            style={{
                              display: item.value ? "flex" : "none",
                              color: "#31C2AA",
                            }}
                          >
                            Value added service{" "}
                          </Text>
                          <Text style={styles.count}>Price {item.count}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <IconButton
                            icon="dots-vertical"
                            style={{ alignItems: "flex-end" }}
                            color="#698EB7"
                            onPress={this.openMenu}
                          ></IconButton>
                        </View>
                      </TouchableOpacity>
                    </Swipeout>
                  </ScrollView>
                );
              }}
            />
            <Divider></Divider>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  padding: 10,
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#31C2AA",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  padding: 10,
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#31C2AA",
                }}
              >
                {this.state.total} ${" "}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingTop: 20,
                backgroundColor: "#fff",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#698EB7",
                }}
              >
                Shipment Details
              </Text>
              {/* <Picker
                                placeholder="Pick a Location"
                                value={this.state.Location}
                                onChange={items => this.setState({ Location: items })}
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
                            </Picker> */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#C4C4C4",
                  borderRadius: 4,
                  paddingVertical: 15,
                  backgroundColor: "#fff",
                }}
              >
                <Picker
                  selectedValue={this.state.Location}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ Location: itemValue })
                  }
                >
                  {this.state.locations.map((option) => (
                    <Picker.Item
                      key={option.id}
                      value={option.id}
                      label={`${option.country_name}, ${option.city}, ${option.street}`}
                    />
                  ))}
                </Picker>
              </View>
              {/* <Picker
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
                            </Picker> */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#C4C4C4",
                  borderRadius: 4,
                  paddingVertical: 15,
                  backgroundColor: "#fff",
                }}
              >
                <Picker
                  selectedValue={this.state.payments}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ payments: itemValue })
                  }
                >
                  {Cargo.map((option) => (
                    <Picker.Item
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </Picker>
              </View>
              {/* <Picker
                                placeholder="Choose a Cargo  Method"
                                value={this.state.cargo}
                                onChange={items => this.setState({ cargo: items })}
                                //mode={Picker.modes.MULTI}
                                //rightIconSource={dropdown}
                                renderCustomModal={this.renderDialog}
                            >
                                {_.map(Cargo, option => (
                                    <Picker.Item
                                        key={option.value}
                                        value={option}
                                        label={option.label}
                                        disabled={option.disabled}
                                    />
                                ))}
                            </Picker> */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#C4C4C4",
                  borderRadius: 4,
                  paddingVertical: 15,
                  backgroundColor: "#fff",
                }}
              >
                <Picker
                  selectedValue={this.state.cargo}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ cargo: itemValue })
                  }
                >
                  {Air.map((option) => (
                    <Picker.Item
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </Picker>
              </View>
              {/* <Picker
                                placeholder="Choose a Type Of Service "
                                value={this.state.typeofservice}
                                onChange={items => this.setState({ typeofservice: items })}
                                //mode={Picker.modes.MULTI}
                                //rightIconSource={dropdown}
                                renderCustomModal={this.renderDialog}
                            >
                                {_.map(Air, option => (
                                    <Picker.Item
                                        key={option.value}
                                        value={option}
                                        label={option.label}
                                        disabled={option.disabled}
                                    />
                                ))}
                            </Picker> */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#C4C4C4",
                  borderRadius: 4,
                  paddingVertical: 15,
                  backgroundColor: "#fff",
                }}
              >
                <Picker
                  selectedValue={this.state.serviceLevel}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ serviceLevel: itemValue })
                  }
                >
                  {ServiceLevel.map((option) => (
                    <Picker.Item
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </Picker>
              </View>
              {/* <Picker
                                placeholder="Choose a Level Of Service "
                                value={this.state.serviceLevel}
                                onChange={items => this.setState({ serviceLevel: items })}
                                //mode={Picker.modes.MULTI}
                                //rightIconSource={dropdown}
                                renderCustomModal={this.renderDialog}
                            >
                                {_.map(ServiceLevel, option => (
                                    <Picker.Item
                                        key={option.value}
                                        value={option}
                                        label={option.label}
                                        disabled={option.disabled}
                                    />
                                ))}
                            </Picker> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity
                      onPress={this.pickDocument}>
                    <Avatar.Icon
                      size={40}
                      icon="plus"
                      style={{ backgroundColor: "#698EB7", marginTop: 10 }}
                      color="#fff"
                    />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: 10,
                    color: "#698EB7",
                    fontWeight: "bold",
                  }}
                >
                  Upload Document
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.loginBtn}>
                <Text
                  style={styles.loginText}
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  Place Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}
