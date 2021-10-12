import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as API from "../../core/apis/apiProductServices";
import { styles } from "./detailedProduct_style";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";

const screenwidth =  Dimensions.get('screen').width;
const screenheight =  Dimensions.get('screen').height;

const data = {
    name: "Product 1",
    description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
    price:20,
    qty:5,
    services:[
        {name:"Service 1",price:100},
        {name:"Service 2",price:100},
        {name:"Service 3",price:100},
        {name:"Service 4",price:100},
        {name:"Service 5",price:100},
        {name:"Service 6",price:100},
    ]
};

const detailedOrder  = ({navigation,route}) =>{

    const [dataRoute, setDataRoute] = useState();
    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(()=>{
        setIsVisible(false)
        console.log("PRODUCT ITEM IS: ",route.params)
        setDataRoute(route.params);
    },[])

    return(
    <ScrollView style={{flex:1}}>
        <Spinner visible={isVisible} />
        <View>
          <Image
            resizeMode="contain"
            source={{uri:dataRoute?.images[0].media}}
            style={styles.image}
          />
        </View>
        <View style={[styles.mainContainer,{}]}>
          <View style={{paddingBottom:20}}>
              <Text style={styles.name}>{dataRoute?.product_name}</Text>
              <Text style={{fontSize:18}}>{dataRoute?.description}</Text>
          </View>
            <Text style={[styles.name,{marginVertical:20}]}>Info</Text>
          <View style={styles.twoInfoBox}>
              <View>
                  <Text>Width: {dataRoute?.width} cm</Text>
                  <Text>Height: {dataRoute?.height} cm</Text>
                  <Text>Depth: {dataRoute?.depth} cm</Text>
                  <Text>Weight: {dataRoute?.weight} kg</Text>
              </View>
              <View>
                  <Text>Price: ${dataRoute?.width}</Text>
                  <Text>Offered Price: ${dataRoute?.height}</Text>
                  <Text>Min Purchase Qty: {dataRoute?.min_purchase_qty}</Text>
                  <Text>Max Purchase Qty: {dataRoute?.max_purchase_qty}</Text>
                  <Text>Max Reserve Qty: {dataRoute?.max_reserve_qty}</Text>
              </View>
          </View>
          <View style={styles.twoInfoBox}>
              <View>
                  <Text>Warranty: {dataRoute?.warranty_details}</Text>
                  <Text>Return days: {dataRoute?.return_day}</Text>
                  <Text>Down Payment: {dataRoute?.down_payment}%</Text>
                  <Text>Promoted: {dataRoute?.is_promoted?"Yes":"No"}</Text>
                  <Text>Brand: {dataRoute?.brand.brand_name}</Text>
              </View>
              <View style={{flexDirection:'row', flexWrap: "wrap",width:screenwidth*0.5}}>
                  {dataRoute?.tags.map((item,index)=>{
                      return(
                            <View style={{padding:5}}>
                                <Text key={index} style={{color:'white',backgroundColor:'#698EB7',paddingHorizontal:6,paddingVertical:2,borderRadius:20}}>
                                    {item.tag_name}
                                </Text>
                            </View>
                      )
                  })}
              </View>
          </View>
            <Text style={[styles.name,{marginVertical:20}]}>Services</Text>
          <View>
              {dataRoute?.services.map((item,index)=>{
                  return(
                      <View key={index} style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                        <Text>
                            {item.service_name}
                        </Text>
                        <Text>
                            ${item.service_cost}
                        </Text>
                      </View>
                  )
              })}
          </View>
            <Text style={[styles.name,{marginVertical:20}]}>Variants</Text>
          {dataRoute?.productvariant.map((item,index)=>{
          return(
          <View style={styles.twoInfoBox} key={index}>
            <View>
                <Text>Type: {item.productvariantopt[0].varientType.varient_type}</Text>   
                <Text>Value: {item.productvariantopt[0].varientValue.varient_value}</Text> 
                <Text>By Piece: {item.is_variant_by_piece?"Yes":"No"}</Text>   
                <Text>By Stock: {item.is_variant_by_stock?"Yes":"No"}</Text>   
                <Text>Min Qty: {item.is_variant_min_qty?"Yes":"No"}</Text>   
                <Text>Discount: {item.is_discount?"Yes":"No"}</Text>   
            </View>
            <View>
                <Image source={{uri:dataRoute?.productvariant[0].variant_image}}
                    resizeMode="contain"
                    style={[styles.image,{width:screenwidth * 0.5,height:screenheight*0.2}]}/>
            </View>
          </View>
          )
          })}
        </View>
      </ScrollView>
    );
}

export default detailedOrder