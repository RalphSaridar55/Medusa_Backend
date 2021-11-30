import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as API from '../../core/apis/apiCampaignServices';
import * as ImageApi from '../../core/apis/apiDocumentService';
import Overlay from "react-native-modal-overlay";
import Spinner from "react-native-loading-spinner-overlay";
import { Button } from "react-native-paper";
import { styles } from "./Create_style";
import { RenderPicker } from "../../components/Picker";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { CardField, /* confirmPayment, */ StripeProvider, useStripe  } from '@stripe/stripe-react-native';
import { stripePk } from "../../config/env";
import { TouchableOpacityButton } from "../../components/TouchableOpacity";
import moment from "moment";
import DateRangePicker from "rn-select-date-range";
import { payloadValidator } from "../../helpers/payloadValidator";
import * as FileSystem from 'expo-file-system';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const locations =[
  {label:"Top",value:1},
  {label:"Side",value:2},
  {label:"Middle",value:3},
];

const Create = ({ navigation, route }) => {
  
  const calculateLocation = ()=>{
    console.log("TEST: ",userData.placement, "\n", cost)
    if(userData.placement==1)
      return cost.top_location_cost;
    else if(userData.placement==2)
      return cost.side_location_cost;
    else
      return cost.middle_location_cost;
    }

  const changeCategory = (itemValue) =>{
    console.log("CHANGING CATEGORY: ")
    setCategories({...categories,category_id:null})
    setVisible({...visible,spinner:true});
    setCategories({ ...categories, category_id: itemValue });
    API.getSubCategories(itemValue).then((res)=>{
      console.log("API")
      setSubcategories({...subcategories,subCategoryList:res});
      // changeSubCategory(1,1)
    })
  }

  const changeSubCategory = (itemValue) =>{
    console.log("CHANGING SUBCATEGORY: ");
    setVisible({...visible,spinner:true});
    setSubcategories({ ...subcategories, subCategory_id: itemValue });
    API.getProducts(categories.category_id,itemValue).then((res)=>{
      console.log("CHANGING PRODUCTS");
      setProducts({...products,productList:res,product_id:1});
      setVisible({...visible,spinner:false});
    })
  }

  const chooseImages = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    console.log("URI:", pickerResult.uri);
    setUserData({ ...userData, campaign_image: pickerResult.uri });
  };

  const [isByClicks, setIsByClicks] = useState(true);
  const [pointsAmount,setPointsAmount] = useState(0)
  const [cost, setCost] = useState();
  const [visible,setVisible] = useState({modal:false,spinner:false,overlayType:"Ad"});
  const [categories,setCategories] = useState({categoryList:[],category_id:null});
  const [subcategories,setSubcategories] = useState({subCategoryList:[],subCategory_id:null});
  const [products,setProducts] = useState({productList:[],product_id:null});
  const [routeData, setRouteData] = useState();
  const [userData, setUserData] = useState({
    days:0,
    placement:1,
    campaign_name: "",
    duration: 0,
    usd:0,
    number_of_clicks : 0,
    points:0,
    campaign_image: "",
    from_duration:null,
    to_duration:null
  });


  const buyPoints = () =>{
    let payload ={
      payment_token_id: "string",
      amount: 0,
      points: 0
    }
  }

  const chooseDate = (range) =>{
    console.log("RANGE: ",range)
    let start = (new Date(range.firstDate).getTime());
    let end = (new Date(range.secondDate).getTime());
    let Difference_In_Time = end - start;
    let Days = Difference_In_Time / (1000 * 3600 * 24);
    //console.log("DAYS: ",Days)
    setUserData({...userData ,from_duration:start, to_duration:end, days:Days, usd:Days*cost.day_cost})
  }

  const createAd = async() =>{
    setVisible({...visible, spinner:true})
    if(userData.campaign_image.length<1){
      Alert.alert("Error","Please choose an image for your campaign");
      setVisible({...visible, spinner:false})
      return
    }
    let extension = userData.campaign_image.substr(userData.campaign_image.length-4,userData.campaign_image.length-1)
    console.log("Extension: ",extension)
    let base64 = await FileSystem.readAsStringAsync(userData.campaign_image, { encoding: 'base64' });

    let payload ={
      campaign_type:routeData.name=="Banner Ad"?1:routeData.name=="Web Ad"?2:3,
      //payment_token_id: "string",
      campaign_images: base64,
      campaign_name: userData.campaign_name,
      //placement: userData.placement,
      category_id: categories.category_id,
      subCategory_id: subcategories.subCategory_id,
      product_id: [
        products.product_id
      ],
      //campaign_mode: "durations",
      //from_duration: 0,
      //to_duration: 0,
      //number_of_clicks: 0,
      usd: routeData?.name=="Web Ad"?((userData.usd *0.01) * calculateLocation().toFixed(2)):(userData.usd.toFixed(2)),
      points: routeData?.name=="Web Ad"? parseInt((((userData.usd *0.01) * calculateLocation())/ cost?.points ).toFixed(2)):parseInt(( userData.usd/ cost?.points).toFixed(2)) 
    }
    let checkResult = payloadValidator(payload)
    if(checkResult!=null){
      Alert.alert("Error",checkResult);
      setVisible({...visible, spinner:false})
      return;
    }
    if(routeData.name=="Web Ad"){
        payload.placement = userData.placement
    }
    if(!isByClicks){
        payload.from_duration=userData.from_duration;
        payload.to_duration=userData.to_duration;
        payload.campaign_mode="durations"
    }
    else{
        payload.number_of_clicks = (userData.number_of_clicks)
        payload.campaign_mode="clicks"
    }
    //console.log('PAYLOAD TO SEND TO API : ',payload)
    ImageApi.uploadDoc({document:payload.campaign_images,extension:extension}).then((res)=>{ 
      API.createAd({...payload,campaign_images:res}).then((res2)=>{
        Alert.alert("Campaign", res2, [
          {text:"Ok", onPress:()=>navigation.goBack()}
        ])
        setVisible({...visible, spinner:false})
      }).catch(err=>{
        Alert.alert("Error",err.response.data.message)
        setVisible({...visible, spinner:false})
      })
    })
  }

  useEffect(() => {
    console.log("ROIUTE: ",route.params)
    setRouteData(route.params);
    API.getCost().then((res)=>{
      console.log("RESULT: ",res)
      setCost(res)
    })
    API.getCategories().then((res)=>{
      console.log("RES: ",res)
      setCategories({...categories,categoryList:res})
      setVisible({...visible,spinner:false})
    })
  }, []);
  return (
    <ImageBackground
      source={require("../../../assets/images/Login-bg.png")}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Spinner visible={visible.spinner}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        

      <Overlay
        visible={visible.modal}
        onClose={() => setVisible({ ...visible, modal: false })}
        closeOnTouchOutside
        containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
      >
        <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 21,
                color: "#31C2AA",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {visible.overlayType=="Ad" ? "Create Campaign" : "Buy Points"}
            </Text>
            <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>setVisible({ ...visible, modal: false })}/>
        </View>
          <View style={{marginVertical:20}}>
              {visible.overlayType=="Points" ? (<><TextInput
                selectionColor="#31c2aa"
                label="Points"
                style={styles.modalInputs}
                placeholder="Buy Points"
                value={pointsAmount+""}
                keyboardType="numeric"
                //value={this.state[element.stateValue]}
                onChangeText={(text) =>
                  setPointsAmount(text)
                  //setUserData({...userData,points:text,usd:(text*cost.points)})
                }
                autoCapitalize="none"
                // keyboardType={element.keyBoardType}
                outlineColor="#C4C4C4"
                theme={{
                  colors: { primary: "#31c2aa", underlineColor: "transparent" },
                }}
              />
              <TextInput
                selectionColor="#31c2aa"
                label="Amount"
                style={[styles.modalInputs]}
                placeholder="Amount in USD"
                value={userData.usd+""}
                //value={this.state[element.stateValue]}
                disabled
                autoCapitalize="none"
                // keyboardType={element.keyBoardType}
                outlineColor="#C4C4C4"
                theme={{
                  colors: { primary: "#31c2aa", underlineColor: "transparent" },
                }}
              /></>):null}
              <StripeProvider publishableKey={stripePk.STRIPE_PK} merchantIdentifier="merchant.identifier">
                  <SafeAreaView style={[styles.docPicker]}>
                      <CardField style={{ height: 50, }}
                          postalCodeEnabled={false}
                          onCardChange={(t) => {
                              console.log("PAY: ",t)/* sendBack(t) */
                          }} />
                  </SafeAreaView>
              </StripeProvider>
              <TouchableOpacityButton 
              text="Buy"
              onPress={() => visible.overlayType=="Ad"?createAd():buyPoints()}
              additionalContainerStyle={{paddingHorizontal:40}}
              additionalButtonStyle={{
                backgroundColor: "#31C2AA",
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",marginVertical:10,
                height: 30,}}
                />
          </View>
      </Overlay>
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" , alignItems:'center'}}
          >
            <Text style={styles.header}>{routeData?.name}</Text>

            <Button
              icon="bookmark-outline"
              mode="outlined"
              labelStyle={{color:"#31C2AA"}}
              onPress={() => setVisible({ ...visible, modal: true, overlayType:"Points" })}
            >
              Buy Points
            </Button>
          </View>

          <TouchableOpacity
            onPress={() => chooseImages()}
            style={[
              styles.cardContainer,
              {
                paddingHorizontal: 20,
                paddingVertical: userData.campaign_image.length < 1 ? 100 : 20,
                position: "relative",
              },
            ]}
          >
            {userData.campaign_image.length < 1 ? (
              <View
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
              </View>
            ) : (
              <Image
                source={{ uri: userData.campaign_image }}
                resizeMode="center"
                style={{
                  flex: 1,
                  width: screenWidth * 0.8,
                  height: screenHeight * 0.3,
                }}
              />
            )}
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
                marginHorizontal: 10,
                width: "100%",
                paddingHorizontal: 10,
              }}
            >
              <TextInput
                mode="outlined"
                outlineColor="#C4C4C4"
                multiline={true}
                label="Campaign Name"
                placeholder="Campaign Name"
                theme={{ colors: { primary: "#31c2aa" } }}
                onChangeText={(text) =>
                  setUserData({ ...userData, campaign_name: text })
                }
                value={userData.campaign_name + ""}
                style={styles.inputView}
              />
              <RenderPicker 
              containerStyle={styles.pickerstyle}
              prompt="Category"
              selectedValue={categories.category_id}
              onValueChange={(itemValue, itemIndex) =>
                changeCategory(itemValue)
              }
              map={categories.categoryList}
              />
              <RenderPicker 
              containerStyle={styles.pickerstyle}
              prompt=" Sub Category"
              selectedValue={subcategories.subCategory_id}
              onValueChange={(itemValue,itemIndex)=>{
                changeSubCategory(itemValue);
              }}
              map={subcategories.subCategoryList}
              />
              <RenderPicker 
              containerStyle={styles.pickerstyle}
              prompt="Products"
              selectedValue={products.product_id}
              onValueChange={(itemValue, itemIndex) =>
                setProducts({ ...products, product_id:itemValue })
              }
              map={products.productList}
              />
              {routeData?.name!="Banner Ad" && <RenderPicker 
               containerStyle={styles.pickerstyle}
               prompt="Ad Location"
               selectedValue={userData.placement}
               onValueChange={(itemValue,itemIndex)=>{
                setUserData({ ...userData, placement: itemValue })
                }}
                map={locations} />}

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <View style={{flexDirection:'row',alignItems: "center",}}>
                  <RadioButton
                    value={false}
                    status={isByClicks === false ? "checked" : "unchecked"}
                    onPress={() => {
                      setIsByClicks(false);
                      setUserData({ ...userData, number_of_clicks: 0 });
                    }}
                  />
                  <Text style={[styles.modalBoxInputs,{borderColor:'#fff'}]}>
                    Period
                  </Text>
                </View>
                
                {!isByClicks && <View style={{width:screenWidth*0.8}}>
                  <DateRangePicker
                      style={{}}
                      onSelectDateRange={(range) => {
                        chooseDate(range)
                        //console.log("RANGE:",range)
                      }}
                      blockSingleDateSelection={true}
                      responseFormat="YYYY-MM-DD"
                      maxDate={moment().add(365, "days")}
                      minDate={moment()}
                      selectedDateContainerStyle={
                        styles.selectedDateContainerStyle
                      }
                      selectedDateStyle={styles.selectedDateStyle}
                    />
                </View>}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value={true}
                  status={isByClicks === true ? "checked" : "unchecked"}
                  onPress={() => {
                    setIsByClicks(true);
                    setUserData({ ...userData, duration: 0 });
                  }}
                />

                <TextInput
                  mode="outlined"
                  outlineColor="#C4C4C4"
                  keyboardType="numeric"
                  multiline={true}
                  label="Number of clicks"
                  placeholder="Number of clicks"
                  editable={isByClicks ? true : false}
                  value={userData.number_of_clicks + ""}
                  theme={{ colors: { primary: "#31c2aa" } }}
                  onChangeText={(text) =>
                    setUserData({ ...userData, number_of_clicks : text, usd:(text*cost.click_cost)})
                  }
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  value={userData.number_of_clicks + ""}
                  style={styles.inputView}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: "#6E91EC" }}>Cost:</Text>
                {cost?.click_cost && <Text style={{ color: "#6E91EC" }}>{routeData?.name=="Web Ad"?((((userData.usd *0.01) * calculateLocation())/ cost?.points).toFixed(2)+" Points or $" + ((userData.usd *0.01) * calculateLocation()).toFixed(2)):((userData.usd/cost?.points).toFixed(2)+ "Points or $" + userData.usd.toFixed(2))}</Text>}
              </View>
            </View>
            

            <View
                style={{
                  flexDirection: "row",
                  width: screenWidth * 0.7,
                  marginTop: 20,
                }}
              >
                {/* <TouchableOpacity
                  onPress={() => setVisible({ ...visible, modal: true })}
                  style={[
                    styles.loginBtn,
                    { backgroundColor: "red"  },
                  ]}
                >
                  <Text style={[styles.loginBtnText]}>Discard</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => setVisible({ ...visible, modal: true, overlayType:"Ad" })}
                  style={styles.loginBtn}
                >
                  <Text style={styles.loginBtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Create;
