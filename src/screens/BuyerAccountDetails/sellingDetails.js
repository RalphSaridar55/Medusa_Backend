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
import CollapsibleList from "react-native-collapsible-list";
import { AntDesign } from "@expo/vector-icons";
import {styles} from "./sellingDetails_style";
import { Picker } from "@react-native-picker/picker";
import * as API from '../../core/apis/apiUserServices';
import * as apiPortFolioServices from '../../core/apis/apiPortfolioServices';
import Spinner from "react-native-loading-spinner-overlay";

const SellingDetail = ({navigation}) =>{
    const [data,setData] = useState([]);
    const [filterData,setFilterData] = useState({filter:[],search:'',showFilter:false,isVisible:true,showCategory:false});
    const [apiData,setApiData] = useState([]);
    const [allData,setAllData] = useState({categories:[], subcategories:[], brands:[]})
    const [usersAllData,setUsersAllData] = useState({categories:[], subcategories:[], brands:[]})
    useEffect(()=>{
        API.getSellersOwnProducts().then((res)=>{
            console.log("RESULT FROM USEEFFECT: ",res)
            setFilterData({...filterData});
            setData(res);
        })
        apiPortFolioServices.getCategories().then((result) => {
          let cat = [];
          let subcat = [];
          let brands = [];
          console.log("RESULT CATEGORIES :" ,result);
          result.map((item1)=>{
            cat.push({label:item1.category_name,value:item1.id})
            item1.subcategory.map((item2)=>{
              subcat.push({label:item2.sub_category_name, value:item2.id, category_id:item2.category_id})
              item2.brands.map((item3)=>{
                brands.push({label:item3.brand_name, value:item3.id, sub_category_id:item3.sub_category_id})
              })
            })
          })
          setFilterData({...filterData,isVisible:false})

          /* 
          for
          let array = result;
          let data = [];
          array.map((item) =>
            data.push({ label: item.category_name, value: item.id })
          );
          this.setState({ fetchedcategories: data, fetchedApiCategory: result }); */
        });
    },[])

    const renderCategories = () =>{
      return(
        <View style={{ marginVertical: 10 }}>
          <CollapsibleList
            style={{ marginVertical: 10 }}
            wrapperStyle={{
              borderWidth: 0.2,
              borderColor: "gray",
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
                    backgroundColor:'#fff',
                    marginVertical: 0,
                  },
                ]}
              >
                <Text style={{color:'gray'}}>Categories</Text>
              </View>
            }
          >
            <SelectMultiple
              items={allData.categories}
              selectedItems={usersAllData.categories}
              labelStyle={{color:'black'}}
              selectedLabelStyle	={{color:'#698EB7'}}
              onSelectionsChange={(item) => setUsersAllData({...usersAllData,categories:item})
                /* this.fetchCategories(item, [element.query]) */
              }
              /* renderLabel={(label)=>{
                [element.value]=="category"?tlabel:<Text>Label</Text>
              }} */	
            />
          </CollapsibleList>
        </View>
      )
    }
    
return (
    <ScrollView>
      <Spinner visible={filterData.isVisible} />
      <Appbar style={{ backgroundColor: "#E9F3FF"}}>
      { !filterData.showCategory ?<><Appbar.Content title="Products: " color="black"  />
        <Appbar.Content
          title={
            data?.filter((i) =>
              i.product_name.toLowerCase().includes(filterData.search.toLowerCase())
            ).length +
            " Results"
          } color="black" 
          //onPress={this.setView}
          style={{ fontSize: 14 }}
        /></>:<><Appbar.Content title="My Categories: " color="black" /></>}
        <Appbar.Action icon="plus" onPress={()=>
            setFilterData({...filterData, showFilter: false, showCategory:true })} />
        <Appbar.Action icon="magnify" onPress={()=>
            setFilterData({...filterData, showFilter: !filterData.showFilter, showCategory:false })} />
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
      {!filterData.showCategory?<FlatList
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
                       </View>
                   </View>
               </TouchableOpacity>
           )
       }} />:renderCategories()}
    </ScrollView>
 );
}


export default SellingDetail;