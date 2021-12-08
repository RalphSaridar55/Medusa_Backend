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
import Spinner from "react-native-loading-spinner-overlay";
import * as API from "../../core/apis/apiProductServices";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";
import { styles } from "./detailedProduct_style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

const detailedOrder = ({ navigation, route }) => {
  const [dataRoute, setDataRoute] = useState();
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [blocked,setBlocked] = useState(false)

  useEffect(() => {
    apiPortFolioServices.getProductDetails(route.params.id).then((res)=>{
        console.log("PRODUCT DETAILS: ",res)
        console.log("PRODUCT DETAILS productvariantopt: ",res.productvariant)
        setDataRoute(res);
        setIsVisible(false);
        setBlocked(res.status==1?true:false)
    })
  }, []);

  useEffect(()=>{
    apiPortFolioServices.getProductDetails(route.params.id).then((res)=>{
        console.log("PRODUCT DETAILS: ",res)
        setDataRoute(res);
        setIsVisible(false);
        setBlocked(res.status==1?true:false)
    })
    const willFocusSubscription = navigation.addListener('focus', () => {
      
    apiPortFolioServices.getProductDetails(route.params.id).then((res)=>{
        console.log("PRODUCT DETAILS: ",res)
        setDataRoute(res);
        setIsVisible(false);
    })
  });

  return willFocusSubscription;
  },[])
  
  const deleteOrBlockProduct=(id)=>{
    console.log("id:",id)
    setIsVisible(true)
    let payload={
      product_status:id,
      product_id: dataRoute.productvariant[0].product_id
    }
    API.blockOrDeleteProduct(payload).then((res)=>{
      setIsVisible(false);
      Alert.alert(`${id==3?"Delete":id==2?"Unblock":"Block"} Product`,res,[
        {text:"Ok",onPress:()=>{
          if(id==3)
           navigation.goBack()
        }}
      ])
    if(id ==1 || id==2)
      setBlocked(!blocked)
    }).catch(err=>{
      setIsVisible(false);
      Alert.alert("Error",err.response.data.message)
    })
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Spinner visible={isVisible} />
      <View>
        <Image
          resizeMode="cover"
          source={{ uri: dataRoute?.images[0]?.media }}
          style={styles.image}
        />
      </View>
      <View style={[styles.mainContainer]}>
        <View style={{ paddingBottom: 20, }}>
          <View style={{
                        marginVertical: 20,
                        borderBottomWidth: 1.5,
                        borderBottomColor: "lightgray",}}>
              <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',marginBottom:10}}>
                  <Text
                    style={[
                      styles.name,
                    ]}
                  >
                    {dataRoute?.product_name}
                  </Text>
                <View style={{display:'flex',flexDirection:'row'}}>
                <View style={{display:'flex',alignItems:'flex-end',justifyContent:'center',marginHorizontal:10}}>
                    <TouchableOpacity style={{borderRadius:40,backgroundColor:'#698EB7',padding:5}}
                    onPress={()=>{
                      Alert.alert(`${blocked?"Unblock":"Block"} Product`,`Are you sure you want to ${blocked?"unblock":"block"} this product ?`,[
                        {text:"No"},
                        {text:"Yes",onPress:()=>{deleteOrBlockProduct(blocked?2:1)}},
                      ])
                    }}>
                        <Icon name={blocked?"eye-off-outline":"eye-outline"} size={24} color="white" style={{}}/>
                    </TouchableOpacity>
                </View>
                <View style={{display:'flex',alignItems:'flex-end',justifyContent:'center',marginHorizontal:10}}>
                    <TouchableOpacity style={{borderRadius:40,backgroundColor:'red',padding:5}}
                    onPress={()=>{
                      Alert.alert("Delete Product","Are you sure you want to delete this product ?",[
                        {text:"No"},
                        {text:"Yes",onPress:()=>{deleteOrBlockProduct(3)}},
                      ])
                    }}>
                        <Icon name="trash-can" size={24} color="white" style={{}} />
                    </TouchableOpacity>
                </View>
                <View style={{display:'flex',alignItems:'flex-end',justifyContent:'center',marginHorizontal:10}}>
                    <TouchableOpacity style={{borderRadius:40,backgroundColor:'gray',padding:5}}
                    onPress={()=>navigation.navigate("Edit",{screen:"edit1",params:{...dataRoute,product_id:dataRoute?.productvariant[0].product_id}})}>
                        <Icon name="pencil" size={24} color="white" style={{}}/>
                    </TouchableOpacity>
                </View>
                </View>
              </View>
          </View>
          <Text style={{ fontSize: 18, fontFamily:'Inter-Black-Light' }}>{dataRoute?.description}</Text>
        </View>
        <Text
          style={[
            styles.name,
            {
              marginVertical: 20,
              borderBottomWidth:1.5,
              borderBottomColor: "lightgray",
            },
          ]}
        >
          Info
        </Text>
        <View style={styles.twoInfoBox}>
          <View>
            <Text style={styles.textInfo}>Width: {dataRoute?.width} cm</Text>
            <Text style={styles.textInfo}>Height: {dataRoute?.height} cm</Text>
            <Text style={styles.textInfo}>Depth: {dataRoute?.depth} cm</Text>
            <Text style={styles.textInfo}>Weight: {dataRoute?.weight} kg</Text>
          </View>
          <View>
            <Text style={styles.textInfo}>Price: ${dataRoute?.width}</Text>
            <Text style={styles.textInfo}>Offered Price: ${dataRoute?.height}</Text>
            <Text style={styles.textInfo}>Min Purchase Qty: {dataRoute?.min_purchase_qty}</Text>
            <Text style={styles.textInfo}>Max Purchase Qty: {dataRoute?.max_purchase_qty}</Text>
            <Text style={styles.textInfo}>Max Reserve Qty: {dataRoute?.max_reserve_qty}</Text>
          </View>
        </View>
        <View style={styles.twoInfoBox}>
          <View>
            <Text style={styles.textInfo}>Warranty: {dataRoute?.warranty_details}</Text>
            <Text style={styles.textInfo}>Return days: {dataRoute?.return_day}</Text>
            <Text style={styles.textInfo}>Down Payment: {dataRoute?.down_payment}%</Text>
            <Text style={styles.textInfo}>Promoted: {dataRoute?.is_promoted ? "Yes" : "No"}</Text>
            <Text style={styles.textInfo}>Brand: {dataRoute?.brand.brand_name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: screenwidth * 0.5,
              justifyContent:'center',
            }}
          >
            {dataRoute?.tags.map((item, index) => {
              return (
                <View style={{ padding: 5 }}>
                  <Text
                    key={index}
                    style={{
                      color: "white",
                      backgroundColor: "#698EB7",
                      paddingHorizontal: 10,
                      fontFamily:'Inter-Black-Light',
                      paddingVertical: 2,
                      borderRadius: 20,
                    }}
                  >
                    {item.tag_name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <Text
          style={[
            styles.name,
            {
              marginVertical: 20,
              borderBottomWidth: 1.5,
              borderBottomColor: "lightgray",
            },
          ]}
        >
          Services
        </Text>
        <View>
          {dataRoute?.services.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Text style={styles.textInfo}>{item.service_name}</Text>
                <Text style={styles.textInfo}>${item.service_cost}</Text>
              </View>
            );
          })}
        </View>
        <Text
          style={[
            styles.name,
            {
              marginVertical: 20,
              borderBottomWidth: 1.5,
              borderBottomColor: "lightgray",
            },
          ]}
        >
          Variants
        </Text>
        {dataRoute?.productvariant.map((item, index) => {
          return (
            <View style={{borderBottomColor:'lightgray',borderBottomWidth:1,paddingBottom:10}}>
            <View style={styles.twoInfoBox} key={index}>
              <View>
                {item.productvariantopt.length>0 &&<><Text style={styles.textInfo}>
                  Type: {item.productvariantopt[0].varientType?.varient_type}
                </Text>
                <Text style={styles.textInfo}>
                  Value: {item.productvariantopt?.map((it,index)=>{return <Text>{it?.varientValue?.varient_value}{index!=item.productvariantopt.length-1?",":null} </Text>})}
                </Text></>}
                <Text style={styles.textInfo}>By Piece: {item.is_variant_by_piece ? "Yes" : "No"}</Text>
                {item.is_variant_by_piece && <Text style={styles.textInfo}>Variant Piece: {item.variant_by_piece}</Text>}
                <Text style={styles.textInfo}>By Stock: {item.is_variant_stock ? "Yes" : "No"}</Text>
                {item.is_variant_stock && <Text style={styles.textInfo}>Variant Stock: {item.variant_stock}</Text>}
                <Text style={styles.textInfo}>Min Qty: {item.is_variant_min_qty ? "Yes" : "No"}</Text>
                {item.is_variant_min_qty && <Text style={styles.textInfo}>Variant Min. Qty: {item.variant_min_qty}</Text>}
                <Text style={styles.textInfo}>Discount: {item.is_discount ? "Yes" : "No"}</Text>
                {item.is_discount &&<><Text style={styles.textInfo}>Discount Start:{'\n'} {(new Date(parseInt(item.discount_start_date))+"").substr(0,15)}</Text><Text style={styles.textInfo}>Discount End:{'\n'} {(new Date(parseInt(item.discount_end_date))+"").substr(0,15)}</Text></>}
              </View>
              <View>
                <Image
                  source={{ uri: item?.variant_image }}
                  resizeMode="cover"
                  style={[
                    styles.image,
                    { width: screenwidth * 0.5, height: screenheight * 0.2 },
                  ]}
                />
              </View>
            </View>
            <View style={{marginTop:10,display:'flex',alignItems:'flex-end'}}>
                <TouchableOpacity style={{borderRadius:40,backgroundColor:'gray',padding:5}}
                onPress={()=>navigation.navigate("AddVariant",{...item,category_id:dataRoute.category_id,type:'edit'})}>
            <Icon name="pencil" size={24} color="white" style={{}}/>
                  </TouchableOpacity>
            </View>
            </View>
          );
        })}
        <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.Btn}
          onPress={
            () =>navigation.navigate("AddVariant",{category_id:dataRoute.category_id,product_id:dataRoute?.productvariant[0].product_id})
          }
        >
          <Icon name="plus-thick" size={30} color="white" />
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default detailedOrder;
