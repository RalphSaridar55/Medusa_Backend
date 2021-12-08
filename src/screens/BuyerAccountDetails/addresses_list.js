import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style_addresses_list";
import * as apiServices from "../../core/apis/apiAddressServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Headline } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { TouchableOpacityButton } from "../../components/TouchableOpacity";

const AdressList = (props) => {
  const [deleted, setDeleted] = useState(false);
  const [adressList, setAdressList] = useState();
  const [countries, setCountries] = useState([]);
  const [current, SetCurrent] = useState([]);
  const [userId, setUserId] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const handleAddresses = useCallback(() => {
    console.log("RUNNING USEEFFECT");
    setIsVisible(true);
    apiServices.getCountries().then((res) => {
      console.log("COUNTRIES DATA: ", res);
      setCountries(res);
    });
    apiServices.getAddresses().then((res) => {
      console.log("API DATA", res.data);
      setAdressList(res.data);
      setIsVisible(false);
    });
  }, []);

  useEffect(() => {
    handleAddresses();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      handleAddresses();
    });

    return unsubscribe;
  }, [props.navigation]);

  const deleteAdress = (id) => {
    //api function
    console.log("DATATYPE:", typeof id);
    setIsVisible(true);
    let payload = {
      address_id: id,
    };
    apiServices
      .deleteAddresses(payload)
      .then((res) => {
        console.log(res);
        setIsVisible(false);
        setDeleted(!deleted);
      })
      .catch((err) => {
        setIsVisible(false);
        Alert.alert("Error", err.response.data.message);
      });

    setAdressList(adressList.filter((i) => i.id != id));
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/Login-bg.png")}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Spinner visible={isVisible} />
      <Headline
        style={{ margin: 20, color: "#698EB7" }}
        >
        Addresses
      </Headline>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {adressList?.map((i, index) => (
          <View
            key={index}
            style={styles.listContainer}
          >
            <View style={styles.Container}>
              <View style={styles.listIcon}>
                <Icon name="home-outline" size={30} color="gray" />
              </View>
              <View style={styles.leftContainer}>
                <Text style={styles.listCountry}>
                  {countries?.filter((s) => s.value === i.country_id)[0]?.label}
                </Text>
                <Text style={styles.listCity}>
                  {i.city + ", " + i.state + ", " + i.street}
                </Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.iconsContainer}>
                <Icon
                  name="pencil-outline"
                  color="gray"
                  size={24}
                  style={{ position: "relative", right: 20 }}
                  onPress={() =>
                    props.navigation.navigate("Addresses", {
                      type: "edit",
                      item: i,
                    })
                  }
                />
                <Icon
                  name="trash-can-outline"
                  color="red"
                  size={24}
                  onPress={() =>
                    Alert.alert(
                      "Delete Address",
                      "Are you sure you want to delete this address?",
                      [
                        { text: "No", onPress: () => console.log("refused") },
                        { text: "Yes", onPress: () => deleteAdress(i.id) },
                      ]
                    )
                  }
                />
              </View>
            </View>
          </View>
        ))}
       
      </ScrollView>
        <TouchableOpacityButton 
        onPress={()=> props.navigation.navigate("Addresses", { type: "add" })}
        text="Add New Address"/>
    </ImageBackground>
  );
};

export default AdressList;
