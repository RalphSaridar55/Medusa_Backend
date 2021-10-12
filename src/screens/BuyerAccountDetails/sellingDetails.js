import React, { Component, createRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  Searchbar,
  Headline,
  Appbar,
  ActionSheet,
  Title,
  List,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import {styles} from "./sellingDetails_style";
import { Picker } from "@react-native-picker/picker";
import * as API from '../../core/apis/apiUserServices';
import Spinner from "react-native-loading-spinner-overlay";

const SellingDetail = ({navigation}) =>{
    
    const [filterData,setFilterData] = useState({filter:[],search:'',showFilter:false,isVisible:true});
    const [data,setData] = useState([]);
    
    useEffect(()=>{
        API.getSellersOwnProducts().then((res)=>{
            console.log("RESULT FROM USEEFFECT: ",res)
            setFilterData({...filterData,isVisible:false});
            setData(res);
        })
    },[])

    const drawScreenTwoData = (item,index) =>{
        return (
        <TouchableOpacity
          style={[styles.container, styles.content,{marginLeft:0}]}
          key={index}
          onPress={()=>this.props.navigation.navigate('DetailedOrder')}
        >
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              <View style={styles.mainInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={{ width: "70%" }}>
                {item.description.length > 40
                  ? item.description.substring(0, 40) + "..."
                  : item.description}
              </Text>
            </View>
            <View style={[styles.contentContainer, { marginTop: 10 }]}>
              <Text>Price: ${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    
return (
    <>
      <Spinner visible={filterData.isVisible} />
      <Appbar style={{ backgroundColor: "#E9F3FF", color: "#fff" }}>
        <Appbar.Content title="My Products: " />
        <Appbar.Content
          title={
            data?.filter((i) =>
              i.product_name.toLowerCase().includes(filterData.search.toLowerCase())
            ).length +
            " Results"
          }
          //onPress={this.setView}
          style={{ fontSize: 14 }}
        />
        <Appbar.Action icon="magnify" onPress={()=>
            setFilterData({...filterData, showFilter: !filterData.showFilter })} />
      </Appbar>
      <View style={{paddingHorizontal:10,paddingVertical:10,
        display: !filterData.showFilter ? "none" : "flex" }}>
        <Searchbar
          theme={{
            colors: { primary: "#6E91EC", underlineColor: "transparent" },
          }}
          onChangeText={(e) => setFilterData({ ...filterData, search: e })}
          placeholder="Search"
        />
      </View>
      <FlatList
       style={styles.list}
       contentContainerStyle={styles.listContainer}
       data={data.filter
           (i=>i.product_name.toLowerCase().includes(filterData.search.toLowerCase()))}
       horizontal={false}
       numColumns={2}
       keyExtractor={(item) => {
           return item.id;
       }}
       renderItem={({ item }) => {
           return (
               <TouchableOpacity style={styles.card}
               onPress={()=>navigation.navigate("DetailedProduct",item)}>
                   <View style={styles.cardHeader}>
                   </View>
                   <Image style={styles.userImage} source={{ uri: item.images[0].media }} />
                   <View style={styles.cardFooter}>
                       <View style={{ alignItems: "center", justifyContent: "center" }}>
                           <Text style={styles.name}>{item.product_name}</Text>
                           <Text style={[styles.position,{paddingVertical:10,textAlign:'center'}]}>{item.description}</Text>
                           <Text style={styles.position}>${item.price} / Pc</Text>
                           <Text style={styles.position}>Avai. qty {item.current_stock}</Text>
                           <Text style={styles.position}> Min. qty {item.min_purchase_qty}</Text>
                           {/* <Text style={[styles.position,{paddingTop:10,textAlign:'right'}]}>W {item.width}</Text>
                           <Text style={styles.position}>H {item.height}</Text>
                           <Text style={styles.position}>D {item.depth}</Text> */}
                       </View>
                   </View>
               </TouchableOpacity>
           )
       }} />
      {/* <ScrollView style={{paddingHorizontal:10}}>
        {filterData.search.length>0?filterData.filter.filter(i=>
              i.product_name.toLowerCase().includes(filterData.search.toLowerCase())).map((item, index) => {
                return drawScreenTwoData(item,index)
        })
        :filterData.filter.map((item, index) => {
                return drawScreenTwoData(item,index)
        })}
    </ScrollView> */}
    </>
 );
}


export default SellingDetail;