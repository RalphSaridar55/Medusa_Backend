import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import CollapsibleList from "react-native-collapsible-list";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import * as apiService from "../../core/apis/apiChatServices";
import styles from "./style_negotiation";
const data = [
  {
    typePerson: "buyer",
    message:
      "Can you fix the price?Can you fix the price?Can you fix the price?Can you fix the price?Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "buyer",
    message: "Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "buyer",
    message: "Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "buyer",
    message: "Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "buyer",
    message: "Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "buyer",
    message: "Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "buyer",
    message: "Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
  {
    typePerson: "buyer",
    message: "Can you fix the price?",
    suggestedPrice: 0.3,
    date: "12-01-2021",
  },
  {
    typePerson: "seller",
    message: "Price fixed",
    suggestedPrice: 0.15,
    date: "12-01-2021",
  },
];

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

const Negotiations = () => {
  const [replies, setReplies] = useState();
  const [price, setPrice] = useState({ value: "", error: false });
  const [reply, setReply] = useState(0);
  const [isVisible,setIsVisible] = useState(true)
  const sendAction = () =>{
      console.log("Should send a text")
  }

  useEffect(() => {
    apiService.getChatReplies().then((res) => {
      console.log("CHAT REPLIES: ", res);
      setReplies(res);
      setIsVisible(false)
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/images/Login-bg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
    <Spinner visible={isVisible}/>
    <View style={{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.productTitle}>Product #33</Text>
        </View>
        <View style={styles.chatContainer}>
          <ScrollView
            style={{ paddingHorizontal: 20, marginBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {data.map((i, index) => (
              <View style={styles.textContainer} key={index}>
                <View style={styles.pictureAndUsernameContainer}>
                  <View
                    style={[
                      styles.pictureContainer,
                      i.typePerson == "buyer"
                        ? { backgroundColor: "#5BC5B9" }
                        : { backgroundColor: "#7F67A9" },
                    ]}
                  >
                    <Text style={styles.name}>AB</Text>
                  </View>
                  <Text style={styles.username}>
                    {i.typePerson == "buyer" ? `Virtual ${i.typePerson}` : "Me"}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ width: screenwidth * 0.5 }}>{i.message}</Text>
                  <Text style={styles.date}>{i.date}</Text>
                </View>
                <Text
                  style={
                    i.typePerson == "buyer"
                      ? { color: "#5BC5B9", fontSize: 16 }
                      : { color: "#7F67A9", fontSize: 16 }
                  }
                >
                  Suggested Price:{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    {i.suggestedPrice} $
                  </Text>
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Price"
            placeholder="$50"
            returnKeyType="next"
            value={price.value}
            onChangeText={(text) => setPrice({ value: text, error: false })}
            error={price.error}
            autoCapitalize="none"
            keyboardType="numeric"
            outlineColor="#C4C4C4"
            style={{ backgroundColor: "#fff", }}
            theme={{
              colors: { primary: "#31c2aa", underlineColor: "transparent" },
            }}
          />
          {/* <CollapsibleList
            style={{ marginVertical: 10 }}
            wrapperStyle={{
              borderWidth: 0,
              borderColor: "#A6A6A6",
              borderRadius: 5,
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
                <Text>{reply}</Text>
              </View>
            }
          >
            {replies?.map((item) => (
              <View>
                <Text>{item.negotiate_reply}</Text>
              </View>
            ))}
          </CollapsibleList> */}
          
      <View
        style={{
          borderWidth: 1,
          borderColor: "#C4C4C4",
          borderRadius: 4,
          marginVertical: 10,
          height:55,
          justifyContent:'center',
          backgroundColor:'#fff'
        }}
      >
          <Picker
            prompt="Reply"
            selectedValue={reply}
            onValueChange={(itemValue, itemIndex) =>
                setReply(itemValue)
            }> 
                {replies?.length>0 &&replies.map((item,index)=>{
                    return <Picker.Item key={index} value={item.id} label={item.negotiate_reply} />
                })}
          </Picker>
          </View>
              <TouchableOpacity
                onPress={sendAction}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>Send</Text>
              </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );
};

export default Negotiations;
