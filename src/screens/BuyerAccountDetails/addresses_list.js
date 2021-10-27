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

const AdressList = (props) => {
  const data = [
    {
      id: 1,
      country: "India1",
      city: "Lorem",
      street: "Lorem Ipsum Lorem Lorem Ipsum Lorem",
      current: true,
    },
    {
      id: 2,
      country: "India2",
      city: "Lorem",
      street: "Lorem Ipsum Lorem Lorem Ipsum Lorem",
      current: false,
    },
  ];
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
      //getUserId(res
      console.log("RESULT: ", res.data);
      setAdressList(res.data);
      setIsVisible(false);
      /*  
      let arr=[]
      let arr2=[]
      res.data.map((i)=>{
        countries.filter((id)=>{
          return id.value === i.country_id
        }).then((re)=>{
          arr.push(re[0].label)
        })
      })
      res.data.map((i,index)=>{
        console.log("DATA IS: ",arr[index])
        arr2.push({...i,country_name:arr[index]})
      })
      console.log("ARRAY BECOMES, ",arr2)
      setAdressList(arr2);  */
    });
  }, []);

  useEffect(() => {
    handleAddresses();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      handleAddresses();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [props.navigation]);

  const handleAdd = () => {
    //api function
  };

  const deleteAdress = (id) => {
    //api function
    console.log("DATATYPE:", typeof id);
    setIsVisible(true);
    let payload = {
      address_id: id,
    };
    apiServices.deleteAddresses(payload).then((res) => {
      console.log(res);
      setIsVisible(false);
      setDeleted(!deleted);
    }).catch(err=>{
      setIsVisible(false);
      Alert.alert("Error",err.response.data.message)
    });

    setAdressList(adressList.filter((i) => i.id != id));
  };

  const fetchData = () => {};

  /* const getUserId = async (res) => {
    try {
      console.log("+++Inside the AsyncStorage Function");
      const value = await AsyncStorage.getItem("user_id");
      console.log("user id is ", value);

      if (value !== null) {
        // We have data!!
        setUserId(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }; */

  const changeCurrentAdress = (id) => {
    console.log(id);
    //api function
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
      <Headline style={{ margin: 15, marginTop: 20, color: "#698EB7" }}>
        Addresses
      </Headline>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {adressList?.map((i, index) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Addresses", { type: "view", item: i })
            }
            key={index}
            style={styles.listContainer}
          >
            <View style={styles.listIcon}>
              <Icon name="home-outline" size={40} color="gray" />
            </View>
            <View>
              <Text style={styles.listCountry}>
                {
                  countries?.filter((s) => s.value === i.country_id)[0]?.label}
              </Text>
              <Text style={styles.listCity}>{i.city}</Text>
              <Text style={styles.listStreet}>{i.street.substr(0, 100)}</Text>
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.postalContainer}>
                <Text style={{ color: "#C0C0C0" }}>{i.postal_code + ""}</Text>
              </View>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => props.navigation.navigate("Addresses", { type: "add" })}
      >
        <Icon name="plus-thick" size={30} color="white" />
        {/*                     <IconButton
             icon="plus"
             size={20}
             onPress={() => console.log('Pressed')}
         /> */}
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default AdressList;
