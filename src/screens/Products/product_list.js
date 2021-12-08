import React, { Component, createRef } from 'react';
import SelectMultiple from "react-native-select-multiple";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";
import * as API from "../../core/apis/apiProductServices";
import * as APICountry from '../../core/apis/apiAddressServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Overlay from 'react-native-modal-overlay';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import ActionSheet from "react-native-actions-sheet";
import { List, Checkbox, Button, Appbar, Searchbar, IconButton, Title } from 'react-native-paper';
import Slider from "react-native-sliders";
import styles from './listing_style';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from 'react-native-loading-spinner-overlay';
import {Picker} from '@react-native-picker/picker';

const actionSheetRef = createRef();
const actionSheetCat = createRef();
export default class ProductList extends Component {

    constructor(props) {
    super(props);
    this.locationRef = React.createRef()
        this.state = {
            countryLabel:"",
            country:null,
            countries:[],
            total:0,
            search:'',
            List: true,
            showSearch: false,
            value: [0,1],
            isVisible:true,
            category:[],
            subcategory:[],
            brand:[],
            userType:0,
            showButton:false,
            fetchedProducts:[],
            filterProducts:[],
            fetchedCategories:[],
            fetchedSubCategories:[],
            fetchedSBProductsForFiltering:[],
            fetchedBProductsForFiltering:[],
            fetchedBrands:[],
            apiCategoriesForFiltering:[],
            multiplier:500,
            modalVisible:false,
            page:1,
        };
    }

    
    // don't delete this comment
    /* async componentDidMount() {
        console.log("Route Name: ",this.props.route.params);
        this.setState({isVisible:true})
        let user = JSON.parse( await AsyncStorage.getItem('user_details'));
        console.log("Affected",user)
        this.setState({userType:user.user_type, showButton:true, showButton:user.user_type==4?true:false})
        //console.log("USER DATA: ",user.user_type)
        apiPortFolioServices.getCategories().then((result)=>{
            //console.log("CATEGORIES: ",result);
            let array = result;
            let data = [];
            array.map((item) => data.push({label:item.category_name,value:item.id}));
            this.setState({ fetchedCategories: data,apiCategoriesForFiltering:result });
        })
        API.getProducts(1).then((res)=>{
            //console.log("FROM comp ",res)
            //console.log("PRODUCTS FETCHED: ",res)
            let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
            this.setState({ filterProducts:result,fetchedProducts:res,isVisible:false,total:res.totalCount})
        })
    } */

    componentWillUnmount(){
    }
    
    componentDidMount(){
      console.log("Route Name: ",this.props.route.params);
      this.focusListener = this.props.navigation.addListener("focus", async() => {
        this.setState({isVisible:true,category:[],subcategory:[],brand:[]})
        let user = JSON.parse( await AsyncStorage.getItem('user_details'));
        this.setState({userType:user.user_type, showButton:true, showButton:user.user_type==4?true:false})
        APICountry.getCountries().then((res)=>{
            this.setState({countries:res})
        })
        apiPortFolioServices.getCategories().then((result)=>{
            let array = result;
            let data = [];
            array.map((item) => data.push({label:item.category_name,value:item.id}));
            this.setState({ fetchedCategories: data, apiCategoriesForFiltering:result });
        }).then((res)=>{
            let {multiplier} = this.state
            if(this.props.route.params?.category_id){
                let {category_id,category_name} = this.props.route.params
                this.getProducts(1,category_id,null,null,null,[0*multiplier,1*multiplier])
                this.setCategory([{value:category_id, label:category_name}])
            }
            else{
                this.getProducts(1,null,null,null,null,[0*multiplier,1*multiplier]) 
            }  
        })
      })
    }

    getProducts(page,catid,subid,brandid,countryid,price){
        API.getFilteredProducts(page,catid,subid,brandid,countryid,price).then((res)=>{
            // console.log("PRODUCTS FETCHED: ",res)
            let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
            this.setState({ filterProducts:result,fetchedProducts:res,isVisible:false,total:res.totalCount})    
        })
        .catch(err=>{
            Alert.alert("Error",err.response.data.message)
            this.setState({isVisible:false})
        })
    }

    onclick = () => {
        this.setState({ showSearch: !this.state.showSearch })
    }
    setView = () => {
        this.setState({ List: !this.state.List })
    }

    filterPriceRange = (v) =>{
        console.log("VALUE: ",v)
        this.setState({value:v})
    }

    resetPriceRange = () =>{
        this.setState({value:[0,1], filterProducts:this.state.fetchedProducts.data})
    }

    clickEventListener(item) {
        Alert.alert(item.name)
    }

    SortingByData(type){
        switch(type){
            case 'high':
                this.setState({filterProducts:this.state.filterProducts.sort((a,b)=>
                    a.price < b.price? 1 : -1)
                })
                break;
            case 'low':
                this.setState({filterProducts:this.state.filterProducts.sort((a,b)=>
                    a.price > b.price? 1 : -1)
                })
                break;
            case 'best':
                this.setState({filterProducts:this.state.filterProducts.sort((a,b)=>
                    a.current_stock < b.current_stock? 1 : -1)
                })
                break;
            case 'date':
                this.setState({filterProducts:this.state.filterProducts.sort((a,b)=>{
                                        
                        return new Date(a.createdAt).getTime() - 
                        new Date(b.createdAt).getTime()
                    }).reverse()
                    })
                break; 
            case 'reset':
                let products = this.state.fetchedProducts.data.sort((a,b)=> a.product_name[0] > b.product_name[0]?1:-1)
                // console.log("AFTER RESETTING: ",products)
                this.setState({filterProducts:products,category:[],subcategory:[],brand:[]})
                break;
        }  
    }   

    chooseLocation(selection){
        this.setState({isVisible:true})
        let {category,subcategory,brand} = this.state
        console.log("Selection:",selection)
        let countryLabel = this.state.countries.filter((item)=>item.value === selection)[0]
        let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
        API.getFilteredProducts(1,category.length<1?null:category[0].value,subcategory.length<1?null:subcategory[0].value,brand.length<1?null:brand[0].value,selection,price).then((res)=>{
            // console.log("COUNTRY PRODUCCTS: ",res)
            let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
            this.setState({ countryLabel:countryLabel.label,isVisible:false,country:selection,page:1,filterProducts:result,fetchedProducts:res,isVisible:false,total:res.totalCount})
        }).catch(err=>{
            Alert.alert("Error",err.response.data.message)
        })
    }

    setBrand(selection){
        let {page,category,subcategory,country} = this.state
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one brand")
        }
        else if(selection.length==0){
            this.setState({isVisible:true})
            let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
            API.getFilteredProducts(1,category[0].value,subcategory[0].value,null,country!=null?country:null,price).then((res)=>{
                this.setState({filterProducts:res.data,brand:[],isVisible:false})
            })
        }
        else{
            this.setState({isVisible:true})
            let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
            API.getFilteredProducts(1,category[0].value,subcategory[0].value,selection[0].value,country!=null?country:null,price).then((res)=>{
                this.setState({filterProducts:res.data,isVisible:false})
            })
            this.setState({brand:selection})
        }
    }    

    resetEverything(){
        this.setState({
            category:[],
            subcategory:[],
            brand:[],
            isVisible:true,
        })
        this.SortingByData('reset');
        this.resetPriceRange();
        this.getProducts(1,null,null,null,null);
    }

    setSubCategory(selection){
        let {page,category,country} = this.state
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one category")
        }
        else if(selection.length==0){
            this.setState({isVisible:true})
            let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
            API.getFilteredProducts(1,category[0].value,null,null,country!=null?country:null,price).then((res)=>{
                this.setState({filterProducts:res.data,subcategory:[],isVisible:false})
            })
        }
        else{
            this.setState({isVisible:true})
            let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
            API.getFilteredProducts(1,category[0].value,selection[0].value,null,country!=null?country:null,price).then((res)=>{
                this.setState({filterProducts:res.data,isVisible:false})
            })
            let array = [];
            let fetchedSubrands = this.state.apiCategoriesForFiltering.find((i1)=>i1.id === this.state.category[0].value)
            let fetchedBrands = fetchedSubrands.subcategory.find((i2)=>i2.id === selection[0].value)
            fetchedBrands.brands.map((i3)=>{
                array.push({label:i3.brand_name,value:i3.id})
            })

            this.setState({subcategory:selection,fetchedBrands:array})
        }
    }
   

    setCategory(selection){
        let {page,country} = this.state
        console.log("SELECTION: ",selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one category")
        }
        else if(selection.length==0){
            this.setState({isVisible:true})
            let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
            API.getFilteredProducts(1,null,null,null,country!=null?country:null,price).then((res)=>{
                this.setState({filterProducts:res.data,category:[],fetchedSubCategories:[],isVisible:false})
            })
        }
        else{
            this.setState({isVisible:true})
            let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
            API.getFilteredProducts(1,selection[0].value,null,null,country!=null?country:null,price).then((res)=>{
                this.setState({filterProducts:res.data,category:selection,isVisible:false})
            })
            let array = [];
            let fetchedSub = this.state.apiCategoriesForFiltering.find((it)=>it.id===selection[0].value).subcategory.filter((item)=>item.category_id === selection[0].value)
            fetchedSub.map((item2)=>{
                array.push({label:item2.sub_category_name, value:item2.id})
            })
            this.setState({ fetchedSubCategories:array})
        }
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };
    
    loadMore=(page)=>{
        this.setState({isVisible:true,page:page});
        let {category,subcategory,brand,country} = this.state
        let price = this.state.value[0]==0&&this.state.value[1]==1?null:[parseInt(this.state.value[0]*this.state.multiplier),parseInt(this.state.value[1]*this.state.multiplier)]
        API.getFilteredProducts(page,category.length>0?category:null,subcategory.length>0?subcategory:null,brand.length>0?brand:null,country!=null?country:null,price).then((res)=>{
            // console.log("COUNTRY PRODUCCTS: ",res.data)
            // console.log("STATE: ",this.state.filterProducts)
            let addedData = this.state.filterProducts.concat(res.data)
            // console.log("RESULT FROM CONCAT: ",addedData.length)
            let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
            this.setState({ isVisible:false,page:1,filterProducts:addedData,fetchedProducts:addedData,isVisible:false,total:res.totalCount})
        })
        .catch(error=>{
            Alert.alert("Error",error.response.data.message)
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.countries.length>0 &&  <Picker 
                style={{display:'none'}} 
                ref={this.locationRef} 
                selectedValue={this.state.country}
                onValueChange={(item)=>this.chooseLocation(item)}>
                    {this.state.countries.map((item,index)=>{
                        return <Picker.Item label={item.label} value={item.value} key={index}/>
                    })}
                </Picker>}
                <Spinner visible={this.state.isVisible} />
                <Overlay visible={this.state.modalVisible} onClose={()=>this.setState({modalVisible:false})} 
                containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
                closeOnTouchOutside>
                                
                    <View style={styles.modalHeader}>
                        <Text
                        style={{
                            fontSize: 24,
                            color: "#31C2AA",
                            marginBottom: 5,
                            fontFamily:'Adam-Bold'
                        }}
                        >
                        Product Creation
                        </Text>
                        <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>this.setState({modalVisible:false})}/>
                    </View>
                    <View style={{flexDirection:'column',marginTop:20}}>
                        <View style={{width:150,paddingHorizontal:10}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({modalVisible:false});
                                    this.props.navigation.navigate("Add",{screen:"Add1"})}
                                }
                                style={[styles.loginBtn,{height:40,marginTop:20}]}
                            >
                                <Text style={styles.loginBtnText}>Add Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:150,paddingHorizontal:10}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({modalVisible:false});
                                    this.props.navigation.navigate("Bulk")}
                                }
                                style={[styles.loginBtn,{height:40,marginTop:20}]}
                            >
                                <Text style={styles.loginBtnText}>Bulk Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay>
                <View>
                    <Appbar style={{backgroundColor:"#E9F3FF" , color:"#fff"}}>
                        <Appbar.Content title={this.state.filterProducts.length>0?this.state.filterProducts.filter
                        ((i)=>i.product_name.toLowerCase().includes(this.state.search.toLowerCase())).length + " " + "Results":""} onPress={this.setView} style={{ fontSize: 14 }}
                        titleStyle={{fontFamily:'Adam-Bold'}} />
                        <Appbar.Action icon="pin"/* {<Entypo name="location-pin" size={24} color="black" />} */ onPress={() => {
                        console.log(this.locationRef.current.focus())
                        }} />
                        <Appbar.Action icon="sort-descending" onPress={() => {
                            actionSheetRef.current?.setModalVisible();
                        }} />
                        <Appbar.Action icon="filter-menu" onPress={() => {
                            actionSheetCat.current?.setModalVisible();
                        }} />
                        <Appbar.Action icon="magnify" onPress={()=> this.onclick()}
                            style={this.state.showSearch&&{backgroundColor:'#31C2AA'}}  color={this.state.showSearch?"#E9F3FF":"black"}/>
                    </Appbar>
                </View>
                <View style={{paddingHorizontal:10,paddingVertical:10,marginHorizontal:10}}>
                    <Searchbar
                        onChangeText={(e)=>this.setState({search:e})}
                        placeholder="Search"
                        style={{ display: !this.state.showSearch ? 'none' : 'flex', }}
                    />
                </View>
                {(this.state.category.length>0 || this.state.countryLabel.length>0)&& <View style={styles.filterContainer}>
                    <Text style={styles.filterText}>Filtered By: {this.state.countryLabel} {this.state.category[0]?.label} {this.state.subcategory[0]?.label} {this.state.brand[0]?.label}</Text>
                </View>}
                <View style={{flex:1}}>
                    <FlatList style={styles.list}
                        contentContainerStyle={styles.listContainer}
                        data={this.state.filterProducts.filter
                            (i=>i.product_name.toLowerCase().includes(this.state.search.toLowerCase()))}
                        horizontal={false}
                        numColumns={2}
                        onEndReachedThreshold={5}
                        onScroll={({nativeEvent}) => {
                            //console.log("length",this.state.total)
                            if (this.isCloseToBottom(nativeEvent) && this.state.filterProducts.length<this.state.total) {
                                let page = this.state.page + 1; 
                                this.loadMore(page);
                            }
                          }}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={[styles.card,{borderRadius:15,paddingVertical:20}]} onPress={()=>this.props.navigation.navigate("Detailed",{item:item})}>
                                    <View style={styles.cardHeader}>
                                    </View>
                                    <Image style={[styles.userImage,{marginBottom:20}]} source={{ uri: item?.images[0]?.media }}  resizeMode="cover"/>
                                    <View style={styles.cardFooter}>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={[styles.name,{textAlign:'center'}]}>{item.product_name}</Text>
                                            <Text style={styles.position}>${item.price} / Piece</Text>
                                            <Text style={styles.position}>Available Qu. {item.current_stock}</Text>
                                            <Text style={styles.position}> Min. Order {item.min_purchase_qty}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                </View>
                <ActionSheet ref={actionSheetRef}>
                    <ScrollView >
                        <View style={{ flexDirection: 'column', padding: 10 }} >
                            <View style={styles.contentSize}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <IconButton
                                            icon="clock-outline"
                                            color="#6E91EC"
                                            size={20}
                                            onPress={()=>this.SortingByData("date")}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.sortIconText}>Newset</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <IconButton
                                            icon="chevron-up-box-outline"
                                            color="#6E91EC"
                                            size={20}
                                            onPress={()=>this.SortingByData("best")}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.sortIconText}>Available</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize} onPress={()=>this.SortingByData("low")}>
                                        <Text style={{ fontSize: 18 ,color:"#6E91EC" }}>$</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.sortIconText}>Low</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize} onPress={()=>this.SortingByData("high")}>
                                        <Text style={{ fontSize: 18,color:"#6E91EC" }}>$$</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.sortIconText}>High</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 15, marginBottom: 10, marginHorizontal: 10, }} >
                                {/* <Button mode="contained" onPress={() => console.log('Pressed')} style={{ marginBottom: 10, borderRadius: 10 }}>
                                    Submit
                                </Button> */}
                                <Button mode="outlined" onPress={() =>this.SortingByData("reset")} color='#6E91EC'  style={{ marginBottom: 10, borderRadius: 10}}>
                                    Reset
                                </Button>
                            </View>
                        </View>

                    </ScrollView >
                </ActionSheet>
                <ActionSheet ref={actionSheetCat}>
                    <ScrollView >
                        <View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <Title style={{ padding: 10,flex:1, fontFamily:'Adam-Bold' }}>Filter By </Title>
                                <Title style={{ padding: 10,flex:1, fontFamily:'Adam-Bold', alignItems:'flex-end',paddingHorizontal:20,color:'#6E91EC'}/* ,styles.resetButton  */}
                                onPress={()=>{
                                    this.resetEverything()
                                }}>Reset </Title>
                            </View>
                            <List.AccordionGroup>
                                <List.Accordion title="Categories" id="1" style={{ width: "100%" }}
                                        theme={{
                                        colors: { primary: "#6E91EC", underlineColor: "transparent" },
                                        }}>
                                        <SelectMultiple
                                        labelStyle={{fontFamily:'Inter-Black-Light'}}
                                        items={this.state.fetchedCategories}
                                        selectedItems={this.state.category}
                                        onSelectionsChange={(e) => this.setCategory(e)}/>
                                </List.Accordion>

                                <List.Accordion title="Sub-Categories" id="2" 
                                        theme={{
                                        colors: { primary: "#6E91EC", underlineColor: "transparent" },
                                        }}> 
                                <ScrollView style={{ maxHeight: 200 }}>
                                        {this.state.category.length==0
                                        ?(<Text style={styles.errorCat}>Please choose a category first</Text>)
                                        :(<SelectMultiple
                                        labelStyle={{fontFamily:'Inter-Black-Light'}}
                                        items={this.state.fetchedSubCategories}
                                        selectedItems={this.state.subcategory}
                                        onSelectionsChange={(e) => this.setSubCategory(e)}/>)}
                                    </ScrollView>
                                </List.Accordion>

                                <List.Accordion title="Brand" id="3"
                                        theme={{
                                        colors: { primary: "#6E91EC", underlineColor: "transparent" },
                                        }}>
                                    <ScrollView style={{ maxHeight: 200 }}>
                                        {this.state.category.length==0
                                        ?(<Text style={styles.errorCat}>Please choose a sub-category first</Text>)
                                        :(<SelectMultiple
                                        labelStyle={{fontFamily:'Inter-Black-Light'}}
                                        items={this.state.fetchedBrands}
                                        selectedItems={this.state.brand}
                                        onSelectionsChange={(e) => this.setBrand(e)}/>)}
                                    </ScrollView>
                                </List.Accordion>

                                <List.Accordion title="Price Range" id="5"
                                        theme={{
                                        colors: { primary: "#6E91EC", underlineColor: "transparent" },
                                        }}>
                                    <View style={styles.priceTextContainer}>
                                        <Text style={styles.priceText}>
                                            ${parseInt(this.state.value[0]*this.state.multiplier)} - ${parseInt(this.state.value[1]*this.state.multiplier)}
                                        </Text>
                                    </View>
                                    <Slider
                                        style={{marginHorizontal:10}}
                                        value={this.state.value}
                                        onValueChange={value => this.filterPriceRange(value)
                                        }
                                        minimumTrackTintColor="lightgray"
                                        maximumTrackTintColor="#6E91EC"
                                        thumbTintColor="#6E91EC"
                                    />
                                    <View style={{ flex:1, flexDirection:"row", justifyContent:"space-between" }}>
                                        <TouchableOpacity
                                        style={{marginHorizontal:20,marginBottom:20}}
                                        onPress={()=>this.resetPriceRange()}>
                                            <Text style={styles.resetText}>
                                                Reset
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        style={{marginHorizontal:20,marginBottom:20}}
                                        onPress={()=>{
                                            let { category,subcategory,brand,country,value,multiplier } = this.state 
                                            this.getProducts(1, category.length<1?null:category[0].value, subcategory.length<1?null:subcategory[0].value, brand.length<1?null:brand[0].value, country==null?null:country, (value[0]==0&&value[1]==1?null:[value[0]*multiplier,value[1]*multiplier]))
                                            }}>
                                            <Text style={styles.resetText}>
                                                Apply
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </List.Accordion>
                                    
                            </List.AccordionGroup>
                        </View>
                    </ScrollView>
                </ActionSheet>
                {this.state.showButton && <TouchableOpacity
                    style={[styles.Btn,this.state.userType==1?{display:'none',opacity:0}:null]}
                    onPress={() => this.setState({modalVisible:true})/* this.props.navigation.navigate("Add") */}
                >
                    <Icon name="plus-thick" size={30} color="white" />
                </TouchableOpacity>}
            </View>
        );
    }
}



