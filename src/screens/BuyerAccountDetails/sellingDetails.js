import React, { useState, useEffect } from "react";
import { categories_data } from "./categories_map";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import {
  Searchbar,
  Appbar,
} from "react-native-paper";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import {styles} from "./sellingDetails_style";
import * as API from '../../core/apis/apiUserServices';
import * as apiPortFolioServices from '../../core/apis/apiPortfolioServices';
import Spinner from "react-native-loading-spinner-overlay";
import { TouchableOpacityButton } from "../../components/TouchableOpacity";

const SellingDetail = ({navigation}) =>{

    const [data,setData] = useState([]);
    const [chosen,setChosen] = useState({categories:[],subcategories:[],brands:[]})
    const [filterData,setFilterData] = useState({filter:[],search:'',showFilter:false,isVisible:true,showCategory:false,subcategories:[],brands:[]});
    const [apiData,setApiData] = useState({categories:[], subcategories:[], brands:[]});
    const [allData,setAllData] = useState({categories:[], subcategories:[], brands:[]})
    const [usersAllData,setUsersAllData] = useState({categories:[], subcategories:[], brands:[]})
    const [page,setPage] = useState({page:1,totalCount:0});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
          API.getSellersOwnProducts(1).then((res)=>{
            //console.log("RESULT FROM: ",res)
            setData(res.data.sort((a,b)=>a.product_name>b.product_name?1:-1));
            setPage({page:1,totalCount:res.totalCount})
        })
    
        apiPortFolioServices.getCategories().then((result) => {
          let cat = [];
          let subcat = [];
          let brands = [];
          //console.log("USER ALL DATA: ",usersAllData)
          //console.log("RESULT CATEGORIES :" ,result);
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
          //console.log("BRANDS BECOMES: ",brands)
          //setUsersAllData({categories:cat,subcategories:subcat,brands:brands})
          setAllData({categories:cat,subcategories:subcat,brands:brands})
          setFilterData({...filterData,isVisible:false,subcategories:subcat,brands:brands})
          setApiData({categories:cat})
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);



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
          //console.log("Sub Categories Item:", map)
          array.push({...map,category_id:map.category_id})
        })
      })
      //console.log("SUBCATEGORIES BECOMES: ",array)
      setChosen({...chosen,categories:value})
      //setUsersAllData({...usersAllData,categories:value})
      setApiData({...apiData,subcategories:array});
    }

    const handleSubCategories = (value) =>{
      let array = [];
      let values = [];
      console.log("SubCategories");
      console.log(value)
      console.log("INSIDE HANDLE SUBCATEGORIES: ",filterData.subcategories)
      value.map((v)=>{
        let result = filterData.brands.filter((i)=>{
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
      setChosen({...chosen,subcategories:values})
      //setUsersAllData({...usersAllData,subcategories:values})
      setApiData({...apiData,brands:array});
    }

    const handleBrands = (value) =>{
      console.log("Brands");
      console.log(value)
      let values = [];
      value.map((v)=>{
        let val = filterData.brands.find((ite)=>ite.value === v.value)
        console.log("BRAND VALUE: ",val)
        let {label,value,category} = val
        values.push({label:label,sub_category_id:val.sub_category_id,value:value});        
      })
      setChosen({...chosen,brands:values})
      //setUsersAllData({...usersAllData,brands:values})
    }





    const applyChanges=()=>{
      setFilterData({...filterData,isVisible:true})
      if(chosen.categories.length<1){
        Alert.alert("Error",`Please choose atleast one category`);
        return;
      }
      console.log("Categories For Payload: ",chosen)
      let categories = [];
      chosen.categories.map((item1)=>{
        let category_id = item1.value;
        let subCategory_id;
        let brand_id;
        let subcategories = chosen.subcategories.filter((f1)=>f1.category_id === item1.value)
        if(subcategories.length<1){
          Alert.alert("Error",`Please choose a subcategory for category: ${item1.label}`);
          return;
        }
        subcategories.map((item2)=>{
          subCategory_id = item2.value;
          let brands = chosen.brands.filter((f2)=>f2.sub_category_id === item2.value)
          if(brands.length<1){
            Alert.alert("Error",`Please choose a brand for subcategory: ${item2.label}`);
            return;
          }
          brands.map((item3)=>{
            brand_id = item3.value;
            categories.push({category_id:category_id, subCategory_id:subCategory_id, brand_id:brand_id})
          })
        })
      })
      console.log("RESULT IS : ",categories)
      let payload = {categories:categories}

      API.updateSellersChosenCategories(payload).then((res)=>{
        setFilterData({...filterData,isVisible:false})
        Alert.alert("Success",res,[
          {text:"Ok",onPress:()=>changeScreen()}
        ])
      }).catch(err=>{
        setFilterData({...filterData,isVisible:false})
        Alert.alert("Error",err.response.data.message)
      })
    }

    const changeScreen=()=>{
      setFilterData({...filterData, showFilter: false, showCategory:!filterData.showCategory,isVisible:true })
        apiPortFolioServices.getSellerCategories().then((res)=>{
          //All chosen categories
          let selectedBrands = [];
          let selectedSubcategories = [];
          let SubCats;
          let Brands;
          let selectedCategories = [];
          console.log("FILTER DATA: ",filterData)
          console.log("ALL CATEGORIES: ",apiData)
          console.log("SELLER'S CATEGORY: ",res)
          res.categoryList.map((item)=>{
            selectedCategories.push({label:item.category.category_name, value:item.category_id})
            SubCats = res.subCategoryList?.filter((filter)=>{
              return filter.subCategory.category_id === item.category_id
            })
            console.log("NON SELECTED SUBCATEGORIES: ",SubCats)
            /* res.subCategoryList */SubCats.map((item2)=>{
              /* let found = apiData.subcategories.find((i)=>item.category.id == i.category_id)
                console.log("FOUND: ",found)  */
               selectedSubcategories.push({label:item2.subCategory.sub_category_name +` ( ${item.category.category_name} )`, value:item2.subCategory.id,})
               //console.log("SUBCATEGORY ID: ",item2.sub_category_id)
               Brands = res.brandList.filter((filter2)=>{
                return filter2.brand.sub_category_id === item2.subCategory.id
              })
              console.log("NON SELECTED BRANDS: ",Brands)
              /* res.brandList */Brands.map((item3)=>{
                selectedBrands.push({label:item3.brand.brand_name+` ( ${item2.subCategory.sub_category_name} )`, value:item3.brand.id /* sub_category_id:item.brand.sub_category_id */})
                
              })
            })
          })
          setUsersAllData({categories:selectedCategories, subcategories:selectedSubcategories, brands:selectedBrands})
          /*setApiData({...apiData,subcategories:selectedSubcategories}) */
          setApiData({...apiData,/* subcategories:SubCats,brands:Brands */});
          setFilterData({...filterData, showCategory:!filterData.showCategory,isVisible:false})
        })

    }

   
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };  

  const loadMore= (page) =>{
      setFilterData({...filterData,isVisible:true})
      API.getSellersOwnProducts(page).then((res)=>{
          let result = data.concat(res.data);
          setFilterData({...filterData,isVisible:false})
          setData(result)
      })
  }

    const renderCategories = () =>{
     return  (<>{categories_data.map((item,index)=>{

        return(
          <View style={{ marginVertical: 10, marginHorizontal:20 }} key={index}>
            <CollapsibleList
              style={{ marginVertical: 10 }}
              wrapperStyle={{
                borderWidth: 0.2,
                borderColor: "lightgray",
                borderRadius: 5,
              }}
              buttonPosition="top"
              numberOfVisibleItems={0}
              buttonContent={
                <View
                  style={[
                    styles.docPicker,
                    {
                      backgroundColor:'#fff',
                      marginVertical: 0,
                    },
                  ]}
                >
                  <Text style={{color:'gray'}}>{item.label}</Text>
                </View>
              }
            >{apiData[item.items]?.length>0?
              <SelectMultiple
                items={apiData[item.items]?.length>0 &&apiData[item.items]}
                selectedItems={chosen[item.value]}
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
              />:<Text style={{padding:10,color:'red'}}>Please Select a {item.value=="subcategories"?"Category":"Subcategory"} first</Text>}
            </CollapsibleList>
          </View>
      )})}</>)
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
        <Appbar.Action icon="plus" onPress={()=>{changeScreen();}} style={filterData.showCategory&&{backgroundColor:'#31C2AA'}} color={filterData.showCategory?"white":"black"}/>
        <Appbar.Action icon="magnify" onPress={()=> {
          if(!filterData.showCategory)
            setFilterData({...filterData, showFilter: !filterData.showFilter, showCategory:false })
          else 
            setFilterData({...filterData,showFilter:false,showCategory:true,isVisible:false})}}
      style={filterData.showFilter&&{backgroundColor:'#31C2AA'}}  color={filterData.showFilter?"#E9F3FF":"black"}/>
      </Appbar>
      <View style={{paddingHorizontal:20,paddingVertical:10,
        display: !filterData.showFilter ? "none" : "flex" }}>
        <Searchbar
          theme={{
            colors: { primary: "#6E91EC", underlineColor: "transparent" },
          }}
          onChangeText={(e) => setFilterData({ ...filterData, search: e })}
          placeholder="Search"
        />
      </View>
      {!filterData.showCategory?<View style={{flex:1}}>
        <FlatList
         style={styles.list}
         contentContainerStyle={styles.listContainer}
         data={data?.filter
             (i=>i.product_name.toLowerCase().includes(filterData.search.toLowerCase()))}
         horizontal={false}
         numColumns={2}
         onEndReachedThreshold={5}
         onScroll={({nativeEvent}) => {
           //console.log(page.totalCount)
          if (isCloseToBottom(nativeEvent) && data.length<page.totalCount) {
              //console.log("REACHED END ")
              let p = page.page + 1; 
              loadMore(p);
          }
        }}
         keyExtractor={(item) => {
             return item.id;
         }}
         renderItem={({ item }) => {
             return (
                 <TouchableOpacity style={[styles.card,{borderRadius:15}]}
                 onPress={()=>navigation.navigate("DetailedProduct",item)}>
                     <View style={styles.cardHeader}>
                     </View>
                     <View style={{flex:1}}>
                     <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode="contain"/>
                     <View style={styles.cardFooter}>
                         <View style={{ alignItems: "center", justifyContent: "center" }}>
                             <Text style={[styles.name,{textAlign:'center'}]}>{item.product_name}</Text>
                             <Text style={[styles.position,{paddingVertical:10,textAlign:'center'}]}>{item?.description.length>50?item?.description.substring(0,50):item?.description}</Text>
                             <Text style={styles.position}>${item.price} / Pc</Text>
                             <Text style={styles.position}>Avai. qty {item.current_stock}</Text>
                             <Text style={styles.position}> Min. qty {item.min_purchase_qty}</Text>
                         </View>
                     </View>
                     </View>
                     <View style={{marginTop:100}}>
                      </View>
                     <View style={{position:'absolute',width:'100%',bottom:10,marginTop:100 }}>
                      <TouchableOpacityButton 
                        onPress={()=>navigation.navigate("Campaign")}
                        text="Promote"
                        additionalContainerStyle={{paddingTop:20,flex:1,width:'100%'}}
                        additionalButtonStyle={styles.loginBtn}/>
                    </View>
                    {/* <TouchableOpacity
                      onPress={()=>navigation.navigate("Campaign")}
                      style={styles.loginBtn}
                    >
                      <Text style={styles.loginBtnText}>Promote</Text>
                    </TouchableOpacity> */}
                 </TouchableOpacity>
             )
         }} />
      </View>:<><ScrollView>
       <View style={{ marginVertical: 10, marginHorizontal:20 }}>
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
                      backgroundColor:'#fff',
                      marginVertical: 0,
                    },
                  ]}
                >
                  <Text style={{color:'black'}}>Selected</Text>
                </View>
              }
            >
              <View style={{padding:20, backgroundColor:'#fff'}}>
                <View style={{paddingBottom:20}}>
                  <Text style={{fontWeight:'bold'}}>Selected Categories:</Text>
                  {usersAllData?.categories.map((item)=>{
                    return <Text>{item.label}</Text>
                  })}
                </View>
                <Text style={{fontWeight:'bold'}}>Selected Subcategories:</Text>
                <View style={{paddingBottom:20}}>
                  {usersAllData?.subcategories.map((item)=>{
                    return <Text>{item.label}</Text>
                  })}
                </View>
                <View style={{paddingBottom:20}}>
                  <Text style={{fontWeight:'bold'}}>Selected Brands:</Text>
                  {usersAllData?.brands.map((item)=>{
                    return <Text>{item.label}</Text>
                  })}
                </View>
              </View>
            </CollapsibleList>
          </View>
       {renderCategories()}
       {/* <TouchableOpacity
         onPress={()=>applyChanges()}
         style={styles.loginBtn}
       >
         <Text style={styles.loginBtnText}>Apply Changes</Text>
       </TouchableOpacity> */}</ScrollView>
       <TouchableOpacityButton
       onPress={()=>applyChanges()}
       text="Apply Changes" /></>}
    </>
 );
}

export default SellingDetail;