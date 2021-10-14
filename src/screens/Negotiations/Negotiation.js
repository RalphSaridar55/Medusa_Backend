import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import CollapsibleList from "react-native-collapsible-list";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react/cjs/react.development";
import * as apiService from "../../core/apis/apiChatServices";
import styles from "./style_negotiation";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

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
  const [price, setPrice] = useState(0);
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
    <View style={{flex:1,marginBottom:screenheight*0.1,marginTop:10}}>
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
          <View style={{marginHorizontal:10,paddingBottom:20,display:'flex',flexDirection:'row',justifyContent:'space-between',}}>
              <View style={{flex:1,marginHorizontal:5}}>
                <TextInput
                  style={{paddingLeft:15,backgroundColor:'#fff',borderRadius:20,borderColor:'lightgray',borderWidth:1,height:40}}
                  label="Price"
                  placeholder="Price"
                  value={price}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setPrice(text)
                  }
                  autoCapitalize="none"
                  // keyboardType={element.keyBoardType}
                  outlineColor="#C4C4C4"
                  theme={{
                    colors: { primary: "#31c2aa", underlineColor: "transparent" },
                  }}
                />
              </View>
              <View style={{flex:3,marginHorizontal:5,borderRadius:20,borderColor:'lightgray',borderWidth:1}}>
                <Picker
                style={{paddingLeft:15,backgroundColor:'#fff',textAlignVertical:'center',alignItems:'center',justifyContent:'center'}}
                selectedValue={reply}
                prompt="Replies"
                
                onValueChange={(itemValue,itemIndex)=>{
                  setReply(itemValue)
                }}>
                  {replies?.length<1
                  ?<Picker.Item label="Reply" value={0} />
                  :replies?.map((item,index)=>{
                    return(
                      <Picker.Item key={index}
                      style={{flexWrap:'wrap',display:'flex'}}
                      numberOfLines={3} label={item.label} 
                      value={item.value}/>
                    )
                  })}
                </Picker>
              </View>
              <TouchableOpacity
               onPress={()=>{
                 console.log(typeof(parseInt(price)),price)
                 if(price<0)
                  Alert.alert("Error","Price must be positive number")
                 console.log("Reply: ",reply,"\nPrice: $",price)
               }}>
                <MaterialCommunityIcons name="send-circle" size={40} color="#5BC5B9"
                /* style={{transform: [{ rotate: "180deg" }]}} *//>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Negotiations;
