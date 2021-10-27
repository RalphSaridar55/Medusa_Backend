import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { styles } from "./Create_style";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Create = ({ navigation, route }) => {

   const chooseImages = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({allowsEditing:true,mediaTypes:MediaTypeOptions.Images	});
    if (pickerResult.cancelled === true) {
      return;
    }
    console.log("URI:",pickerResult.uri)
      setUserData({ ...userData, image: pickerResult.uri });
  };

  const [isByClicks, setIsByClicks] = useState(false);
  const [routeData, setRouteData] = useState();
  const [userData, setUserData] = useState({ campaignName: "", duration: 0, clicks:0, image:'' });
  const [duration, setDuration] = useState([
    { label: "2h", value: 1 },
    { label: "4h", value: 2 },
    { label: "8h", value: 3 },
    { label: "12h", value: 4 },
    { label: "24h", value: 5 },
    { label: "1D12h", value: 6 },
    { label: "2D", value: 7 },
    { label: "1W", value: 8 },
    { label: "1M", value: 9 },
  ]);
  useEffect(() => {
    setRouteData(route.params);
  }, []);
  return (
    <ScrollView
      style={{
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: "#e9f3ff",
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.header}>{routeData?.name}</Text>
      </View>
      <TouchableOpacity
        onPress={()=>chooseImages()}
        style={[
          styles.cardContainer,
          { paddingHorizontal: 20, paddingVertical: userData.image.length<1?100:20, position:'relative' },
        ]}
      >
        {userData.image.length<1?<View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 40,
            width: "100%",
            paddingHorizontal: 20,
            //backgroundColor: "red",
          }}
        >
          <View
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "#e9f3ff",
            }}
          >
            <Feather name="plus" size={24} color="#31C2AA" />
          </View>
          <View>
            <Text style={[styles.bannerPrice]}>
              Upload {routeData?.name} .jpeg, .png
            </Text>
          </View>
        </View>:<Image source={{uri : userData.image}} resizeMode="contain" style={{flex:1,width:screenWidth*0.8,height:screenHeight*0.3}}/>}
      </TouchableOpacity>
      <View
        style={[
          styles.cardContainer,
          { paddingHorizontal: 20, paddingVertical: 40 },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
            <TextInput
              selectionColor="#31c2aa"
              label="Campaign Name"
              style={[styles.modalBoxInputs,{width:screenWidth*0.8}]}
              placeholder="Campaign Name"
              value={userData.campaignName + ""}
              //value={this.state[element.stateValue]}
              onChangeText={(text) =>
                setUserData({ ...userData, campaignName: text })
              }
              autoCapitalize="none"
              // keyboardType={element.keyBoardType}
              outlineColor="#C4C4C4"
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
            />
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <RadioButton
            value={false}
            status={isByClicks === false ? "checked" : "unchecked"}
            onPress={() => {
              setIsByClicks(false)
              setUserData({...userData,clicks:0})
            }}
          />
          <View style={[styles.modalBoxInputs]}>
            <Picker
              editable={isByClicks?false:true}
              prompt="Payment Method"
              selectedValue={userData.duration}
              onValueChange={(itemValue, itemIndex) =>
                setUserData({ ...userData, duration: itemValue })
              }
            >
              {duration.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <RadioButton
              value={true}
              status={isByClicks === true ? "checked" : "unchecked"}
              onPress={() => {
                setIsByClicks(true);
                setUserData({...userData,duration:0})
              }}
            />
            <TextInput
              selectionColor="#31c2aa"
              editable={isByClicks?true:false}
              label="Number of clicks"
              placeholder="Number of clicks"
              style={styles.modalBoxInputs}
              value={userData.clicks + ""}
              //value={this.state[element.stateValue]}
              keyboardType="number-pad"
              onChangeText={(text) =>
                setUserData({ ...userData, clicks: text })
              }
              autoCapitalize="none"
              // keyboardType={element.keyBoardType}
              outlineColor="#C4C4C4"
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: screenWidth * 0.7,
              marginVertical: 20,
            }}
          >
            <Text style={{ color: "#6E91EC" }}>Cost:</Text>
            <Text style={{ color: "#6E91EC" }}>4 Points or $400</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: screenWidth * 0.7,
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setVisible({ ...visible, modal: true })}
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>Buy Points</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: screenWidth * 0.7,
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setVisible({ ...visible, modal: true })}
              style={[styles.loginBtn,{backgroundColor:'red'/* #6E91EC */}]}
            >
              <Text style={[styles.loginBtnText]}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisible({ ...visible, modal: true })}
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Create;
