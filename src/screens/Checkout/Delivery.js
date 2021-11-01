import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
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
import { Picker } from "@react-native-picker/picker";
import {
  Colors,
  Dialog,
  Assets,
  PanningProvider,
  Typography,
  ActionBar,
} from "react-native-ui-lib";
import dropdown from "../../../assets/down.png";
import _ from "lodash";
import Swipeout from "react-native-swipeout";
import * as DocumentPicker from "expo-document-picker";
import TextInput from "../../components/TextInput";
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
      location: 0,
      cargo_method: 0,
      delivery_address: {
        address_id: null,
        address: null,
      },
      cargo_methods: [
        { label: "Land", value: 1 },
        { label: "Sea", value: 2 },
        { label: "Air", value: 3 },
      ],
      payment: 0,
      payments: [
        { label: "Credit", value: 1 },
        { label: "Cash", value: 2 },
      ],
      filterLocations: [],
      filteredLocation: {
        Country: "",
        State: "",
        City: "",
        Street: "",
      },
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
      Location: "",
      countries: [],
      locations: [],
      //payments: "",
      doc: "",
      docError: "",
      cargo: "",
      typeofservice: "",
      serviceLevel: "",

      products: [],
      dataFromRoute: null,
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

  selectLocation(id) {
    let state = this.state.locations.filter((i) => i.value === id)[0];
    let filtResult = this.state.filterLocations.filter((i) => i.id === id)[0];
    console.log("FILTER RESULT: ", filtResult);
    let country = this.state.countries.filter(
      (i) => i.value === filtResult.country_id
    )[0];
    console.log("COUNTRY ", country);
    this.setState({
      delivery_address: {
        address_id: id,
        adress: state.label,
      },
      filteredLocation: {
        Country: country?.label,
        State: filtResult.state,
        City: filtResult.city,
        Street: filtResult.street,
      },
    });
    //console.log("COUNTRY CHOSEN: ",itemValue)
  }

  componentDidMount() {
    this.calculateTotal();
    let { products, order } = this.props.route.params;
    console.log("ROUTE PARAMS PRODUCTS: ", products);
    this.setState({ products: products, dataFromRoute: order });
    apiServices.getCountries().then((res) => {
      //console.log("RES COUNTRIES FROM THE FUNCTION:",res);
      this.setState({ countries: res });
    });
    apiServices.getAddresses().then((res) => {
      console.log("RES FROM THE FUNCTION:", res);
      let addresses = res.data.map((it) => {
        let country_name = this.state.countries.filter((filtered) => {
          return filtered.value === it.country_id;
        });
        return { ...it, country_name: country_name[0].label };
      });

      this.setState({ locations: addresses });
    });
    //console.log(this.state.data.reduce((pre,cur)=>pre+cur))
    //this.setState({total:arr})
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      // Call ur function here.. or add logic.
      this.calculateTotal();
      let { products, order } = this.props.route.params;
      console.log("ROUTE PARAMS PRODUCTS: ", products);
      this.setState({ products: products, dataFromRoute: order });
      apiServices.getCountries().then((res) => {
        //console.log("RES COUNTRIES FROM THE FUNCTION:",res);
        this.setState({ countries: res });
      });
      apiServices.getAddresses().then((res) => {
        console.log("RES FROM THE FUNCTION:", res);
        let ad = [];
        res.data.map((it) => {
          ad.push({ label: it.registered_address, value: it.id });
          /* let country_name = this.state.countries.filter((filtered)=>{
          return filtered.value === it.country_id;
        })
        return ({...it,country_name:country_name[0].label}) */
        });

        this.setState({ locations: ad, filterLocations: res.data });
      });
      //console.log(this.state.data.reduce((pre,cur)=>pre+cur))
      //this.setState({total:arr})
    });
  }

  removeItem = (id) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item", [
      { text: "No" },
      {
        text: "Yes",
        onPress: () =>
          this.setState({
            products: this.state.products.filter((i) => i.product_id !== id),
          }),
      },
    ]);
  };

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
        this.setState({ doc: result.uri });
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

  pay() {
    console.log("PLACING ORDER DATA: ", this.state.dataFromRoute);
    let { delivery_address, payment, cargo_method, doc } = this.state;
    let payload = {
      order_method_id: this.props.route.name == "Delivery" ? 1 : 2,
      delivery_address: delivery_address,
      payment_method_id: payment,
      payment_token_id: "",
      cargo_delivery_method: cargo_method,
      service_type: 0,
      service_level: 0,
      document: doc,
    };

    console.log("PAYLOAD: ", payload);
    Object.keys(payload).map((item, index) => {
      switch (typeof item) {
        case "number":
          if (payload[item] == 0) {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            break;
          }
        case "string":
          if (payload[item] == "") {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            break;
          }
        default:
          if (payload[item].address_id == 0 || payload[item].address == "") {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            break;
          }
      }
    });
  }

  render() {
    return (
      <Provider>
        <View style={{ margin: 10 }}>
          <Text style={[styles.header]}>Delivery</Text>
        </View>
        <ScrollView style={{}}>
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
              data={this.state.products}
              // ItemSeparatorComponent={() => {
              //     return (
              //         <View style={styles.separator} />
              //     )
              // }}
              keyExtractor={(item) => {
                return item.product_id;
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
                          source={{ uri: item.images[0].media }}
                        />
                        <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.product_name}</Text>
                          {item.value_added_services !== null ? (
                            <Text
                              style={{
                                display: item.value ? "flex" : "none",
                                color: "#31C2AA",
                              }}
                            >
                              Value added service{" "}
                            </Text>
                          ) : null}
                          <Text style={styles.count}>Price ${item.total}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => this.removeItem(item.product_id)}
                        >
                          <MaterialCommunityIcons
                            name="close-thick"
                            size={20}
                            color="red"
                          />
                        </TouchableOpacity>
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
                $
                {this.state.products.length > 0
                  ? this.state.products.reduce((a, b) => ({
                      total: a.total + b.total,
                    }))["total"] + ""
                  : "0"}
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
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#C4C4C4",
                  borderRadius: 4,
                  marginVertical: 10,
                  height: 55,
                  justifyContent: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Picker
                  style={{ marginLeft: 5 }}
                  selectedValue={this.state.cargo_method}
                  prompt="Cargo Delivery Method"
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ location: itemValue });
                  }}
                >
                  {/* <Picker.Item label="Registered Address" value={0}/> */}
                  {this.state.cargo_methods.map((item, index2) => (
                    <Picker.Item
                      label={item.label}
                      value={item.value}
                      key={index2}
                    />
                  ))}
                </Picker>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#C4C4C4",
                  borderRadius: 4,
                  marginVertical: 10,
                  height: 55,
                  justifyContent: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Picker
                  style={{ marginLeft: 5 }}
                  selectedValue={this.state.location}
                  prompt="Registered Address"
                  onValueChange={(itemValue, itemIndex) => {
                    this.selectLocation(itemValue);
                  }}
                >
                  {/* <Picker.Item label="Registered Address" value={0}/> */}
                  {this.state.locations.map((item, index2) => (
                    <Picker.Item
                      label={item.label}
                      value={item.value}
                      key={index2}
                    />
                  ))}
                </Picker>
              </View>
              {Object.keys(this.state.filteredLocation).map((i, index) => (
                <TextInput
                  MV={5}
                  key={index}
                  style={{ backgroundColor: "#fff", marginVertical: 0 }}
                  label={i}
                  disabled={true}
                  value={this.state.filteredLocation[i]}
                  autoCapitalize="none"
                  // keyboardType={element.keyBoardType}
                  outlineColor="#C4C4C4"
                  theme={{
                    colors: {
                      primary: "#31c2aa",
                      underlineColor: "transparent",
                    },
                  }}
                />
              ))}

              <View
                style={{
                  flex: 1,
                  marginLeft: 10,
                  marginRight: 10,
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
                  Payment Details
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#C4C4C4",
                    borderRadius: 4,
                    marginVertical: 10,
                    height: 55,
                    justifyContent: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <Picker
                    style={{ marginLeft: 5 }}
                    selectedValue={this.state.payment}
                    prompt="Payment Method"
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ payment: itemValue });
                    }}
                  >
                    {/* <Picker.Item label="Registered Address" value={0}/> */}
                    {this.state.payments.map((item, index2) => (
                      <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={index2}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  color="#6E91EC"
                  icon="file"
                  mode="outlined"
                  onPress={() => this.pickDocument()}
                  style={styles.docPicker}
                >
                  <AntDesign name="file1" size={24} color="#6E91EC" />
                  <Text style={{ color: "gray" }}>.pdf .docx</Text>
                  {this.state.doc.length < 1 ? (
                    <AntDesign name="closecircle" size={24} color="red" />
                  ) : (
                    <AntDesign name="checkcircle" size={24} color="green" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.loginBtn, { marginHorizontal: 40 }]}
                onPress={() => this.pay()}
              >
                <Text style={styles.loginText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}
