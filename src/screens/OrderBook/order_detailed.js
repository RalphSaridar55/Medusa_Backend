import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import * as APiOrder from '../../core/apis/apiOrderServices';
import { styles } from "./valueadded_style";
import CollapsibleList from "react-native-collapsible-list";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Overlay from "react-native-modal-overlay";
import { RenderPicker } from "../../components/Picker";

const detailedOrder = ({ route, navigation }) => {
  const screenWidth = Dimensions.get("screen").width;
  const [userData, setUserData] = useState();
  const [modalVisible,setModalVisible] = useState(false);
  const [fetchedServices, setFetchedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [apiData, setApiData] = useState();
  const [reason, setReason] = useState("");
  const [status,setStatus] = useState([
    {label:"Pending",value:1},
    {label:"Shipped",value:2},
    {label:"Paid",value:3},
    {label:"Awaiting Payment",value:4},
  ])

  const sellerRejectOrder = () =>{
      if(reason.length<1){
        Alert.alert("Error","Please make sure you give a reason")
        return
      }
      let payload = {
        order_id:route.params.item.order_id,
        reject_reason:reason
      }
      APiOrder.sellerRejectOrder(payload).then((res)=>{
        Alert.alert("Order Rejection",res,[
          {text:"Ok",onPress:()=>navigation.goBack()}
        ])
      }).catch(err=>{
        Alert.alert("Error",err.message)
      })
  }

  const changeStatus = (selection) =>{
    console.log('selection: ',selection)
    Alert.alert("Order Status","Are you sure you want to change status of this product ?",[
      {text:"No"},
      {text:"Yes",onPress:()=>{
        let payload = {
          order_id:route.params.item.order_id,
          order_status:selection
        }
        APiOrder.sellerChangeStatusOrder(payload).then((res)=>{
          Alert.alert("Status",res,[
            {text:"Ok",onPress:()=>navigation.goBack()}
          ])
        }).catch(err=>{
          Alert.alert("Error",err.message)
        })
      }}
    ])
  }

  useEffect(() => {
    const runEff = async () => {
      let id = route.params.item.order_id
      APiOrder.getOrderDetails(id).then((res)=>{
        console.log("FROM API DATAL : ",res)
        setApiData(res)
      })
      //let res =data.reduce((a,b)=>({x:a+b.price}))
      //console.log("RES:",res)
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
      <Overlay visible={modalVisible} onClose={()=>setModalVisible(false)} 
          containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
          closeOnTouchOutside>  
          <View style={styles.modalHeader}>
              <Text
              style={{
                  fontSize: 18,
                  color: "#31C2AA",
                  marginBottom: 5,
              }}
              >
              Reject Order
              </Text>
              <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>this.setState({overlay:false})}/>
          </View>
          
          <View style={{marginVertical:20}}>
            <TextInput
                  selectionColor="#31c2aa"
                  label="Rejection Reason"
                  style={styles.modalBoxInputs}
                  placeholder="Reason"
                  value={reason}
                  //value={this.state[element.stateValue]}
                  onChangeText={(text) =>
                    setReason(text)
                  }
                  autoCapitalize="none"
                  // keyboardType={element.keyBoardType}
                  outlineColor="#C4C4C4"
                  theme={{
                    colors: { primary: "#31c2aa", underlineColor: "transparent" },
                  }}
                />
              
              <TouchableOpacity
              onPress={() => sellerRejectOrder()}
              style={{
                backgroundColor: "#31C2AA",
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",marginVertical:10,
                height: 30,}}
            >
              <Text style={styles.loginBtnText}>Reject Order</Text>
            </TouchableOpacity>
          </View>
      </Overlay>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop:10,
          paddingBottom:5,
          display: "flex",
          flexDirection: "row",
          alignItems:'center',
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.name}>Order Number {apiData?.order_id}</Text>
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
      <Text style={{paddingHorizontal:20,color:'gray',fontSize:16,paddingBottom:5}}>Tracking ID: {apiData?.trackingId}</Text>
      <Text style={{paddingHorizontal:20,color:'gray',fontSize:14,paddingBottom:5,color: "#31C2AA",}}>{apiData?.created_at.substring(0,10)}</Text>
      <ScrollView style={{ flex: 1,marginTop:10 }}>
        {apiData?.order_data.map((item, index) => {
          return (
            <View key={index}>
              <CollapsibleList
                wrapperStyle={{
                  borderBottomWidth: 0.2,
                  paddingVertical:5,
                  borderTopWidth: 0.2,
                  borderColor: "gray",
                  borderRadius: 5,
                  justifyContent:'center'
                }}
                buttonPosition="top"
                numberOfVisibleItems={0}
                buttonContent={
                  <View
                    style={[
                      {
                        marginHorizontal: 20,
                        borderColor: "#A6A6A6",
                        marginVertical: 10,
                        justifyContent: "space-between",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#698EB7" }}>{item.product_name}</Text>
                      {/*leaving this here commented intentionally
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
                      /> */}
                    </View>
                    <Text style={{ color: "#31C2AA" }}>
                      ${item.total_price + item.shipping}
                    </Text>
                  </View>
                }
              >
                <View>
                  <Image
                    resizeMode="contain"
                    source={{uri:item.product_image[0].media}}
                    style={[styles.image,{marginTop:10}]}
                  />
                </View>
                <View style={[styles.mainContainer /* {} */]}>
                  {/* <View style={styles.headerContainer}>
            <Text style={styles.name}>{item.name}</Text>
         </View> */}
                  <Text>{item.description}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.detailKey}>Variants:</Text>
                    <Text style={{ color: "#6E91EC" }}>{item.variants}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.detailKey}>Quantity:</Text>
                    <Text style={{ color: "#6E91EC" }}>{item.units}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.detailKey}>Price:</Text>
                    <Text style={{ color: "#6E91EC" }}>$ {item.price_per_unit}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.detailKey}>Shipping:</Text>
                    <Text style={{ color: "#6E91EC" }}>$ {item.shipping}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.detailKey}>Services:</Text>
                    <Text style={{ color: "#6E91EC" }}>$ {item.services}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.detailKey}>Value Added Services:</Text>
                  </View>
                  <View style={[styles.priceContainer,{marginTop:0}]}>
                    <Text style={{  color:'gray'}}>Inspection Report:</Text>
                    <Text style={{ color: "#6E91EC" }}>{item.value_added_services.inspection_report}</Text>
                  </View>
                  <View style={[styles.priceContainer,{marginTop:0}]}>
                    <Text style={{  color:'gray'}}>Packaging:</Text>
                    <Text style={{ color: "#6E91EC" }}>{item.value_added_services.inspection_report}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.detailKey}>Total:</Text>
                    <Text style={{ color: "#6E91EC" }}>
                      ${" "}
                      {
                        item.total_price + item.shipping + item.services
                      }
                    </Text>
                  </View>
                </View>
              </CollapsibleList>
            </View>
          );
        })}

      </ScrollView>
      
      <View style={{ marginHorizontal: 20, paddingVertical: 20 }}>
        {userData?.user_type==4&&<View style={[styles.priceContainer,{marginTop:5}]}>
          <Text style={{ }}>Logistic:</Text>
          <Text style={{ color: "#6E91EC" }}>
          {apiData?.logistic.length<1?"Not Chosen":apiData?.logistic}
          </Text>
        </View>}
        <View style={[styles.priceContainer,{marginTop:5}]}>
          <Text style={{ }}>Logistic:</Text>
          <Text style={{ color: "#6E91EC" }}>
          {apiData?.logistic.length<1?"Not Chosen":apiData?.logistic}
          </Text>
        </View>
        <View style={[styles.priceContainer,{marginTop:5}]}>
          <Text style={{ }}>Warehouse:</Text>
          <Text style={{ color: "#6E91EC" }}>
          {apiData?.wareHouse.length<1?"Not Chosen":apiData?.wareHouse}
          </Text>
        </View>
        <View style={[styles.priceContainer,{marginTop:5}]}>
          <Text style={{ }}>Total Qty:</Text>
          <Text style={{ color: "#6E91EC" }}>
            {apiData?.order_data.reduce(function(a,b){return a+b.units},0)+""}
          </Text>
        </View>
        <View style={[styles.priceContainer,{marginTop:5}]}>
          <Text style={{ }}>Total Shipping:</Text>
          <Text style={{ color: "#6E91EC" }}>
            ${apiData?.order_data.reduce(function(a,b){return a+b.shipping},0)+""}
          </Text>
        </View>
        <View style={[styles.priceContainer,{marginTop:5}]}>
          <Text style={{ }}>Total Price:</Text>
          <Text style={{ color: "#6E91EC" }}>
            ${apiData?.order_data.reduce(function(a,b){return a+(b.shipping+(b.total_price)+b.services)},0)+""}
          </Text>
        </View>
      </View>
      {userData?.user_type == 4 && (
        <View
          style={{
            width: screenWidth,
            borderTopColor:'lightgray',
            borderTopWidth:1,
          }}
        >
          <View style={[styles.buttonContainer]}>
            {/* </View> */}
            <RenderPicker 
            map={status}
            selectedValue={status}
            onValueChange={(selection)=>changeStatus(selection)}
            containerStyle={styles.picker}
            />
            {route.params.item.status=="Current"&&<TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[styles.loginBtn, { backgroundColor: "red" }]}
            >
              <Text style={styles.loginBtnText}>Reject</Text>
            </TouchableOpacity>}
            {/* <View
              style={props.containerStyle}
            > */}
            {/* <TouchableOpacity
              onPress={() => console.log(123)}
              style={[styles.loginBtn]}
            >
              <Text style={styles.loginBtnText}>Accept</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      )}
    </View>
  );
};

export default detailedOrder;
