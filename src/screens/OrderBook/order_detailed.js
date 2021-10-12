import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as API from "../../core/apis/apiProductServices";
import { styles } from "./valueadded_style";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";

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

const detailedOrder  = () =>{

    const [fetchedServices, setFetchedServices] = useState([]);
    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(()=>{
        setIsVisible(false)
    },[])

    return(
    <ScrollView style={{flex:1}}>
        <Spinner visible={isVisible} />
        <View>
          <Image
            resizeMode="contain"
            source={require("../../../assets/images/mouse.jpg")}
            style={styles.image}
          />
        </View>
        <View style={[styles.mainContainer,{}]}>
          <Text style={styles.name}>{data.name}</Text>
          <Text>{data.description}</Text>
          <View>
          <CollapsibleList
            wrapperStyle={{
              borderWidth: 0.2,
              borderColor: "gray",
              borderRadius: 5,marginVertical: 20 
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
                <Text style={{ color: "gray" }}>Services</Text>
              </View>
            }
          > 
          <View style={{backgroundColor:'#fff',padding:10}}>
                {data.services.map((item,index)=>{
                    return(
                        <View key={index} style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:5,borderWidth:0.2,borderColor:'#A6A6A6'}}>
                            <Text>{item.name}</Text>
                            <Text style={{color:'#6E91EC'}}>$ {item.price}</Text>
                        </View>
                    )
                })}
            </View>
            </CollapsibleList>
          </View>
          <View style={styles.priceContainer}>
            <Text style={{ fontWeight: "bold" }}>Quantity:</Text>
            <Text style={{color:'#6E91EC'}}>{data.qty}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={{ fontWeight: "bold" }}>Price:</Text>
            <Text style={{color:'#6E91EC'}}>$ {data.price}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={{ fontWeight: "bold" }}>Total:</Text>
            <Text style={{color:'#6E91EC'}}>$ {(data.price * data.qty)+data.services.reduce((pre,cur)=>pre+cur.price,0)}</Text>
          </View>
        </View>
        
      </ScrollView>
    );
}

export default detailedOrder