import { Picker } from "@react-native-picker/picker";
import React, { useEffect,useState } from "react";
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
import RNPickerSelect from 'react-native-picker-select';
import Spinner from "react-native-loading-spinner-overlay";
import * as apiService from "../../core/apis/apiChatServices";
import * as APIProduct from '../../core/apis/apiPortfolioServices';
import styles from "./style_negotiation";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const Negotiations = ({route,navigation}) => {
  const [replies, setReplies] = useState([{label:"reply",value:0}]);
  const [price, setPrice] = useState(0);
  const [reply, setReply] = useState();
  const [isVisible,setIsVisible] = useState(true)
  const [routeData, setRouteData] = useState();
  const [userData,setUserData] = useState();
  const [chat,setChat] = useState();
  const [productDetails,setProductDetails] = useState();
  const sendAction = () =>{
      console.log("Should send a text")
  }
  

  useEffect(() => {
    const runEffect = async() =>{
      let userData = JSON.parse(await AsyncStorage.getItem('user_details'));
      console.log("USER: ",userData)
      console.log("ROTUE PARAMS: ",route.params.fromOrder)
      setRouteData(route.params.fromOrder)
      APIProduct.getProductDetails(route.params.fromOrder.product_id).then((res)=>{
        console.log("PRODUCT DETAILS: ",res);
        setProductDetails(res);
      })
      apiService.getChatReplies().then((res) => {
        console.log("CHAT REPLIES: ", res);
        setReplies(res);
        setReply(res[0]);
        setIsVisible(false);
        setUserData(userData)
      });
      apiService.getChatDetails(route.params.fromOrder.product_id).then((res)=>{
        console.log("FROM THE USEEFFECT: ",res)
        setChat(res.sort((a,b)=>a.created_at>b.created_at?1:-1))
      })
    }
    runEffect()
  }, []);

  const Approve=(type)=>{
    let payload ={ 
      negotiate_id: routeData.id,
      product_id:routeData.product_id,
      status:type=="Approve"?4:5
    }
    console.log("PAYLOAD: ",payload)
    Alert.alert(type,`Are you sure you want to ${type} this negotiation?`,[
      {text:"No"},{text:"Yes",onPress:()=>apiService.approveOrDisapprove(payload).then((res)=>{
        Alert.alert(type,res,[
          {text:"Ok",onPress:()=>navigation.goBack()}
        ])
      }).catch(err=>{
        console.log(err)
        Alert.alert("Error",err.response.message)
      })}
    ])
  }

  const replyFunction=()=>{
    console.log("REPLY:",reply)
    setIsVisible(true)
    if(reply==0){
      setIsVisible(false);
      Alert.alert("Error","Please choose a reply");
      return;
    }
    let receiver_id = userData?.user_type==1?routeData.seller_id:routeData.receiverDetails.id;
    //let negotiate_reply = replies.filter((i)=>i.value === reply)[0].label
    console.log("PAY",reply,price)
    let payload ={
      negotiate_reply: reply?.label,
      negotiate_reply_id: reply?.value,
      //chat_sender_name: routeData.chat_sender_name,
      product_id: routeData.product_id,
      receiver_id: receiver_id,
      negotiate_price: price,
      product_order_id: routeData.cart_id || chat[0].product_order_id,
      buyer_virtual_id: routeData.buyer_virtual_id,
      seller_virtual_id: routeData.seller_virtual_id
    }
    console.log("PAYLOAD: ",payload)
    apiService.replyTo(payload).then((res)=>{
      console.log("RESULT FROM REPLY API : ",res)
      setIsVisible(false)
      apiService.getChatDetails(route.params.fromOrder.product_id).then((res)=>{
        console.log("FROM THE USEEFFECT: ",res)
        setChat(res.sort((a,b)=>a.created_at>b.created_at?1:-1))
      })
    }).catch(err=>{
      Alert.alert("Error",err.response.data.message);
      setIsVisible(false)
    })
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/Login-bg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
    <Spinner visible={isVisible}/>
    <View style={{flex:1,marginBottom:screenheight*0.1,marginTop:10}}>
        <View style={[styles.container,styles.container2]}>
          <Text style={[styles.productTitle,{flex:3}]}>{productDetails?.product_name}</Text>
          {userData?.user_type==4?<TouchableOpacity onPress={()=>Approve(routeData?.type==5?"Approve":"Disapprove")}
          style={[styles.buttonApprove,{flex:2,backgroundColor:routeData?.type==5?"#5BC5B9":'red'}]}>
            <Text style={{color:'white'}}>{routeData?.type==4?"Mark as approved":"Mark as disapproved"}</Text>
          </TouchableOpacity>:null}
        </View>
        <View style={[styles.chatContainer,{height:screenheight*0.75}]}>
          <ScrollView
            style={{ paddingHorizontal: 20, marginBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {chat?.map((i, index) => (
              <View style={styles.textContainer} key={index}>
                <View style={styles.pictureAndUsernameContainer}>
                  <View
                    style={[
                      styles.pictureContainer,
                      i.senderDetails.owner_email === userData?.owner_email
                        ? { backgroundColor: "#5BC5B9" }
                        : { backgroundColor: "#7F67A9" },
                    ]}
                  >
                    <Text style={styles.name}>{i.senderDetails.owner_email === userData?.owner_email?"You":i.chat_sender_name.substring(0,2).toUpperCase()}</Text>
                  </View>
                  <Text style={styles.username}>
                    {i.senderDetails.owner_email}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ width: screenwidth * 0.5 }}>{i.negotiate_reply}</Text>
                  <Text style={styles.date}>{i.created_at.substring(0,10)}</Text>
                </View>
                <View>
                {i.negotiate_price>1?<><TouchableOpacity style={[
                    i.senderDetails.owner_email == userData?.owner_email
                      ? { backgroundColor: "#5BC5B9",width:screenwidth*0.4,alignItems:'center',borderRadius:20,marginVertical:10,padding:5}
                      : { backgroundColor: "#7F67A9",width:screenwidth*0.4,alignItems:'center',borderRadius:20,marginVertical:10,padding:5}
                  ]}><Text
                  style={
                    i.senderDetails.owner_email == userData?.owner_email
                      ? { color: "#fff" }
                      : { color: "#fff" }
                  }
                >
                  Suggested Price:  ${i.negotiate_price}
                </Text></TouchableOpacity></>:null}
                </View>
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
              <View style={{flex:3,marginHorizontal:5,borderRadius:20,borderColor:'lightgray',borderWidth:1,paddingTop:5}}>
                {<Picker
                style={{paddingLeft:30,backgroundColor:'#fff',}}
                selectedValue={reply}
                prompt="Replies"numberOfLines={3}
                onValueChange={(itemValue,itemIndex)=>{
                  console.log("Item Value: ",itemValue)
                  setReply(itemValue)
                }}>
                  {
                  replies?.map((item,index)=>{
                    return(
                      <Picker.Item key={index}
                      numberOfLines={3} label={item.label} 
                      value={item.value} />
                    )
                  })}
                </Picker>}
              </View>
              <TouchableOpacity
               onPress={()=>{
                 console.log(typeof(parseInt(price)),price)
                 if(price<0)
                  Alert.alert("Error","Price must be positive number")
                 else replyFunction()
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