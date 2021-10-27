import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import * as API from "../../core/apis/apiProductServices";
import { styles } from "./valueadded_style";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const test = [{ x: 1 }, { x: 2 }, { x: 3 }];
const data = [
  {
    name: "Product 1",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 2",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 1",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 2",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 1",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 2",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 1",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 2",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 1",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 2",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 1",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
  {
    name: "Product 2",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price: 20,
    shipping: 5,
    qty: 5,
  },
];

const detailedOrder = ({ route, navigation }) => {
  const screenWidth = Dimensions.get("screen").width;
  const [userData, setUserData] = useState();
  const [fetchedServices, setFetchedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const runEff = async () => {
      let res =data.reduce((a,b)=>({x:a+b.price}))
      console.log("RES:",res)
      let user = JSON.parse(await AsyncStorage.getItem("user_details"));
      console.log("USER DETAILS: ", user);
      setUserData(user);
      setIsVisible(false);
      console.log("ORDER ROUTE PARAMS: ", route.params);
    };
    runEff();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={isVisible} />
      <View
        style={{
          padding: 20,
          paddingBottom:5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.name}>Order Number 1</Text>
        <AntDesign
          name="printer"
          size={24}
          color="#698EB7"
          onPress={() =>
            Alert.alert(
              "Print Order",
              "Are you sure you want print this order?",
              [
                { text: "No" },
                { text: "Yes", onPress: () => console.log("Printing...") },
              ]
            )
          }
        />
      </View>
      <Text style={{paddingHorizontal:20,color:'gray',paddingBottom:20}}>Status: {route?.params.item.status}</Text>
      <ScrollView style={{ flex: 1 }}>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <CollapsibleList
                wrapperStyle={{
                  borderBottomWidth: 0.2,
                  paddingBottom: 5,
                  borderColor: "gray",
                  borderRadius: 5,
                  marginVertical: 20,
                }}
                buttonPosition="top"
                numberOfVisibleItems={0}
                buttonContent={
                  <View
                    style={[
                      {
                        marginHorizontal: 20,
                        borderColor: "#A6A6A6",
                        marginVertical: 0,
                        justifyContent: "space-between",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#698EB7" }}>{item.name}</Text>
                      <Ionicons
                        name="chatbox"
                        size={24}
                        color="#6E91EC"
                        style={{ paddingLeft: 10 }}
                        onPress={() =>
                          navigation.navigate("Negotiations", {
                            screen: "Negotiation",
                          })
                        }
                      />
                    </View>
                    <Text style={{ color: "#31C2AA" }}>
                      ${item.price * item.qty + item.shipping}
                    </Text>
                  </View>
                }
              >
                <View>
                  <Image
                    resizeMode="contain"
                    source={require("../../../assets/images/mouse.jpg")}
                    style={styles.image}
                  />
                </View>
                <View style={[styles.mainContainer /* {} */]}>
                  {/* <View style={styles.headerContainer}>
            <Text style={styles.name}>{item.name}</Text>
         </View> */}
                  <Text>{item.description}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontWeight: "bold" }}>Variants:</Text>
                    <Text style={{ color: "#6E91EC" }}>Variant 1</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontWeight: "bold" }}>Quantity:</Text>
                    <Text style={{ color: "#6E91EC" }}>{item.qty}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontWeight: "bold" }}>Price:</Text>
                    <Text style={{ color: "#6E91EC" }}>$ {item.price}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontWeight: "bold" }}>Shipping:</Text>
                    <Text style={{ color: "#6E91EC" }}>$ {item.shipping}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontWeight: "bold" }}>Total:</Text>
                    <Text style={{ color: "#6E91EC" }}>
                      ${" "}
                      {
                        item.price * item.qty + item.shipping /* +
                item.services.reduce((pre, cur) => pre + cur.price, 0) */
                      }
                    </Text>
                  </View>
                </View>
              </CollapsibleList>
            </View>
          );
        })}

        {/* <View>
            <CollapsibleList
              wrapperStyle={{
                borderWidth: 0.2,
                borderColor: "gray",
                borderRadius: 5,
                marginVertical: 20,
              }}
              buttonPosition="top"
              numberOfVisibleItems={0}
              buttonContent={
                <View
                  style={[
                    styles.docPicker,
                    {
                      borderColor: "#A6A6A6",
                      backgroundColor: "#fff",
                      marginVertical: 0,
                    },
                  ]}
                >
                  <Text style={{ color: "gray" }}>Services</Text>
                </View>
              }
            >
              <View style={{ backgroundColor: "#fff", padding: 10 }}>
                {data[0].services.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 5,
                        borderWidth: 0.2,
                        borderColor: "#A6A6A6",
                      }}
                    >
                      <Text>{item.name}</Text>
                      <Text style={{ color: "#6E91EC" }}>$ {item.price}</Text>
                    </View>
                  );
                })}
              </View>
            </CollapsibleList>
          </View> */}
      </ScrollView>
      <View style={{ marginHorizontal: 20, paddingVertical: 20 }}>
        <View style={styles.priceContainer}>
          <Text style={{ fontWeight: "bold" }}>Total Qty:</Text>
          <Text style={{ color: "#6E91EC" }}>
            {data.reduce(function(a,b){return a+b.qty},0)+""}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={{ fontWeight: "bold" }}>Total Shipping:</Text>
          <Text style={{ color: "#6E91EC" }}>
            ${data.reduce(function(a,b){return a+b.shipping},0)+""}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={{ fontWeight: "bold" }}>Total Price:</Text>
          <Text style={{ color: "#6E91EC" }}>
            ${data.reduce(function(a,b){return a+(b.shipping+(b.qty*b.price))},0)+""}
          </Text>
        </View>
      </View>
      {route?.params?.item?.status == "Pending" && userData?.user_type == 4 && (
        <View
          style={{
            width: screenWidth,
          }}
        >
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity
              onPress={() => console.log(123)}
              style={[styles.loginBtn, { backgroundColor: "red" }]}
            >
              <Text style={styles.loginBtnText}>Refuse</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log(123)}
              style={[styles.loginBtn]}
            >
              <Text style={styles.loginBtnText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default detailedOrder;
