import React, { Component, createRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { categories_data } from "./categories_map";
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
  Alert,
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
import SelectMultiple from "react-native-select-multiple";
import { AntDesign } from "@expo/vector-icons";
import {styles} from "./sellingDetails_style";
import { Picker } from "@react-native-picker/picker";
import * as API from '../../core/apis/apiUserServices';
import * as apiPortFolioServices from '../../core/apis/apiPortfolioServices';
import Spinner from "react-native-loading-spinner-overlay";

const SellingDetail = ({navigation}) =>{

    const [data,setData] = useState([]);
    const [filterData,setFilterData] = useState({filter:[],search:'',showFilter:false,isVisible:true,showCategory:false,subcategories:[],brands:[]});
    const [apiData,setApiData] = useState({categories:[], subcategories:[], brands:[]});
    const [allData,setAllData] = useState({categories:[], subcategories:[], brands:[]})
    const [usersAllData,setUsersAllData] = useState({categories:[], subcategories:[], brands:[]})

    useEffect(()=>{
        API.getSellersOwnProducts().then((res)=>{
            console.log("RESULT FROM USEEFFECT: ",res)
            setData(res);
        })
        
        apiPortFolioServices.getCategories().then((result) => {
          let cat = [];
          let subcat = [];
          let brands = [];
          console.log("USER ALL DATA: ",usersAllData)
          console.log("RESULT CATEGORIES :" ,result);
          result.map((item1)=>{
            cat.push({label:item1.category_name,value:item1.id})
            // All categories
            item1.subcategory.map((item2)=>{
                subcat.push({label:item2.sub_category_name+` (${item1.category_name})`, value:item2.id, category_id:item2.category_id})
              item2.brands.map((item3)=>{
                brands.push({label:item3.brand_name+` (${item2.sub_category_name})`, value:item3.id, sub_category_id:item3.sub_category_id})
              })
            })
          })
          console.log("SUBCATS BECOMES: ",subcat)
          setAllData({categories:cat,subcategories:subcat,brands:brands})
          setFilterData({...filterData,isVisible:false,subcategories:subcat,brands:brands})
          setApiData({categories:cat,subcategories:subcat,brands:brands})
        });
    },[])

    const handleCategories = (value) =>{
      let array = [];
      console.log("Categories");
      console.log(value)
      //fetching data for subcategories
      value.map((item)=>{
        let subcategories = allData.subcategories.filter((sub)=>{
          return sub.category_id === item.value
        }) 
        subcategories.map((map)=>{
          console.log("Sub Categories Item:", map)
          array.push({...map,category_id:map.category_id})
        })
      })
      setUsersAllData({...usersAllData,categories:value})
      setApiData({...apiData,subcategories:array});
    }

    const handleSubCategories = (value) =>{
      let array = [];
      let values = [];
      console.log("SubCategories");
      console.log(value)
      console.log("INSIDE HANDLE SUBCATEGORIES: ",filterData.subcategories)
      value.map((v)=>{
        let result = allData.brands.filter((i)=>{
         return i.sub_category_id === v.value
        })
        result.map((map)=>{
          console.log("MAP IS: ",map)
          array.push({...map,category_id:map.category_id})
        })
        console.log("SUBCAT: ",apiData.subcategories)
        let val = apiData.subcategories.find((ite)=>ite.value === v.value)
        console.log("VAL: ",val)
        values.push(val);        
      })

      setUsersAllData({...usersAllData,subcategories:values})
      setApiData({...apiData,brands:array});
    }

    const handleBrands = (value) =>{
      console.log("Brands");
      console.log(value)
      let values = [];
      /* 
      value.map((v)=>{
        let result = allData.brands.filter((i)=>{
         return i.sub_category_id === v.value
        })
      }) */
      value.map((v)=>{
        let val = apiData.brands.find((ite)=>ite.value === v.value)
        let {label,sub_category_id,value,category} = val
        values.push({label:label,sub_category_id:sub_category_id,value:value});        
      })
      setUsersAllData({...usersAllData,brands:values})
    }

    const applyChanges=()=>{
      console.log("Categories For Payload: ",usersAllData)
      let error = false;
      setFilterData({...filterData,isVisible:true})
      usersAllData.categories.map((i1)=>{
        let subFilter = usersAllData.subcategories.filter((i2)=>{
          i2.category_id === i1.value
        })
        if(subFilter.length<1){
          Alert.alert("Error",`Please choose a subcategory for the category: ${i1.label}`);  
          setFilterData({...filterData,isVisible:false})
          error=true;
        }
        subFilter.map((i3)=>{
          let brands = usersAllData.brands.filter((i4)=>{
            i4.sub_category_id === i3.value
          })
          if(brands.length<1){
            Alert.alert("Error",`Please choose a brand for the subcategory: ${i3.label}`);      
            setFilterData({...filterData,isVisible:false})
            error=true;
          }
        })
      })
      if(error)
        return
      let data =[];
      usersAllData.subcategories.map((i1)=>{
        let res =usersAllData.brands.filter((i2)=>i2.sub_category_id === i1.value);
        res.map((i3)=>{
          data.push({category_id:i1.category_id, subCategory_id:i3.sub_category_id, brand_id:i3.value})
        })
      })

      let payload={
          categories:data
      }
      console.log("UPDATE DATA SHOULD BE: ",payload)
      API.updateSellersChosenCategories(payload).then((res)=>{
        Alert.alert("Success",res,[
          {text:"Ok",
        onPress:()=>setFilterData({...filterData,showCategory:false,isVisible:false})}
        ])
      })
    }

    const changeScreen=()=>{
      setFilterData({...filterData, showFilter: false, showCategory:!filterData.showCategory,isVisible:true })
        apiPortFolioServices.getSellerCategories().then((res)=>{
          //All chosen categories
          let selectedBrands = [];
          let selectedSubcategories = [];
          let SubCats ;
          let selectedCategories = [];
          console.log("ALL CATEGORIES: ",apiData)
          console.log("SELLER'S CATEGORY: ",res)
          res.categoryList.map((item)=>{
            selectedCategories.push({label:item.category.category_name, value:item.category_id})
            res.subCategoryList.map((item2)=>{
              let found = apiData.subcategories.find((i)=>item.category.id == i.category_id)
                console.log("FOUND: ",found) 
               selectedSubcategories.push({label:item2.subCategory.sub_category_name, value:item2.sub_category_id,})
            })
          })

          //setting the data for all subcats and brands
          /* res.categoryList.map((item1)=>{
            let filtered = apiData.subcategories.filter((item2)=>{
              item2.category_id === item1.category_id
            })
            
            console.log("FILTERED: ",filtered)

            if(filtered.length>0)
            filtered.map((toPush)=>{
              SubCats.push({label:toPush.label, value:toPush.value, category_id:toPush.category_id})
            })

          }) */
          console.log("SELECTED BRANDS: ",selectedBrands)
          /* apiData.subcategories.map((item)=>{ 
            
          }) */
          /* res.subCategoryList.map((item)=>{
            let found = apiData.categories.find((i)=>i.value == item.subCategory.category_id)
            console.log("FOUND: ",found)
            selectedSubcategories.push({label:item.subCategory.sub_category_name, value:item.sub_category_id,})
          }) */

          res.brandList.map((item)=>{
            selectedBrands.push({label:item.brand.brand_name, value:item.brand_id, /* sub_category_id:item.brand.sub_category_id */})
          })
          setUsersAllData({categories:selectedCategories, subcategories:selectedSubcategories, brands:selectedBrands})
          /*setApiData({...apiData,subcategories:selectedSubcategories}) */
          setApiData({...apiData,subcategories:SubCats});
          setFilterData({...filterData, showCategory:!filterData.showCategory,isVisible:false})
        })

    }

    const renderCategories = () =>{
     return  (<ScrollView>{categories_data.map((item,index)=>{

        return(
          <View style={{ marginVertical: 20, marginHorizontal:20 }} key={index}>
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
                  <Text style={{color:'gray'}}>{item.label}</Text>
                </View>
              }
            >
              <SelectMultiple
                items={apiData[item.items]}
                selectedItems={usersAllData[item.value]}
                labelStyle={{color:'black'}}
                selectedLabelStyle	={{color:'#698EB7'}}
                onSelectionsChange={(it) =>{
                   if(item.value=="categories")
                      handleCategories(it)
                    else if(item.value=="subcategories")
                      handleSubCategories(it)
                    else
                      handleBrands(it)
                   //console.log("Test: ",item,"\nState becomes: ",usersAllData)
                }}
                /* renderLabel={(label)=>{
                  [element.value]=="category"?tlabel:<Text>Label</Text>
                }} */	
              />
            </CollapsibleList>
          </View>
      )})}</ScrollView>)
    }
    
return (
    <>
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
        /></>:<><Appbar.Content title="My Categories " color="black" /></>}
        <Appbar.Action icon="plus" onPress={()=>changeScreen()} />
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
       }} />:<>{renderCategories()}
       <TouchableOpacity
         onPress={()=>applyChanges()}
         style={styles.loginBtn}
       >
         <Text style={styles.loginBtnText}>Apply Changes</Text>
       </TouchableOpacity></>}
    </>
 );
}

export default SellingDetail;