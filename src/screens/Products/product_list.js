import React, { Component, createRef } from 'react';
import SelectMultiple from "react-native-select-multiple";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";
import * as API from "../../core/apis/apiProductServices";
import * as APICountry from '../../core/apis/apiAddressServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Overlay from 'react-native-modal-overlay';
import {NavigationEvents} from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Touchable,
} from 'react-native';
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import ActionSheet from "react-native-actions-sheet";
import { List, Checkbox, Button, Appbar, Searchbar, IconButton, Title } from 'react-native-paper';
import Slider from "react-native-sliders";
import styles from './listing_style';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from 'react-native-loading-spinner-overlay';
import { RenderPicker } from '../../components/Picker';
import {Picker} from '@react-native-picker/picker';

const actionSheetRef = createRef();
const actionSheetCat = createRef();
export default class ProductList extends Component {

    constructor(props) {
        super(props);
    this.locationRef = React.createRef()
        this.state = {
            countryLabel:"",
            country:[],
            countries:[],
            total:0,
            search:'',
            List: true,
            showSearch: false,
            value: [0,1],
            isVisible:true,
            category:[],
            subcategory:[],
            //color:[],
            brand:[],
            //sortByData:'',
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
    
    componentDidMount(){
        //console.log("ROUTE PARAMETERS ",this.props.route.params)
      console.log("Route Name: ",this.props.route.params);
      this.focusListener = this.props.navigation.addListener("focus", async() => {
        this.setState({isVisible:true})
        let user = JSON.parse( await AsyncStorage.getItem('user_details'));
        //console.log("Affected",user)
        this.setState({userType:user.user_type, showButton:true, showButton:user.user_type==4?true:false})
        //console.log("USER DATA: ",user.user_type)
        APICountry.getCountries().then((res)=>{
            //console.log("COUNTRE: ",res)
            this.setState({countries:res})
        })
        apiPortFolioServices.getCategories().then((result)=>{
            //console.log("CATEGORIES: ",result);
            let array = result;
            let data = [];
            array.map((item) => data.push({label:item.category_name,value:item.id}));
            this.setState({ fetchedCategories: data,apiCategoriesForFiltering:result });
        })
        if(this.props.route.params?.category_id){
            let {category_id,category_name} = this.props.route.params
            API.getProductsByCategory(1,category_id).then((res)=>{
                //console.log("FROM comp ",res)
                //console.log("PRODUCTS FETCHED: ",res)
                let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
                this.setState({ filterProducts:result,fetchedProducts:res,isVisible:false,total:res.totalCount})    
                    this.setCategory([{value:category_id, label:category_name}])
            })
        }
        else{
            this.getProducts() 
          }
      })
    }

    getProducts(){
        API.getProducts(1).then((res)=>{
            //console.log("FROM comp ",res)
            //console.log("PRODUCTS FETCHED: ",res)
            let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
            this.setState({ filterProducts:result,fetchedProducts:res,isVisible:false,total:res.totalCount})    
        }) 
    }

    onclick = () => {
        this.setState({ showSearch: !this.state.showSearch })
    }
    setView = () => {
        this.setState({ List: !this.state.List })
    }

    filterPriceRange = (v) =>{
        //console.log(v);
        this.setState({value:v})
        //console.log(v[1])
        let filteredData = this.state.fetchedProducts.filter(item=>{
            return (item.price>=(parseInt(v[0]*this.state.multiplier)) && item.price<=(parseInt(v[1]*this.state.multiplier)))
         })
        this.setState({filterProducts:filteredData})
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
                console.log("AFTER RESETTING: ",products)
                this.setState({filterProducts:products,category:[],subcategory:[],brand:[]})
                break;
        }  
    }   

    /* setColor(selection){
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one color")
        }
        else if(selection.length==0){
            this.setState({data:data,color:[]})
        }
        else{
            let result = this.state.data.filter((i)=>i.color == selection[0].label)
            this.setState({data:result,color:selection})
        }
    }     */

    chooseLocation(selection){
        this.setState({isVisible:true})
        console.log("Selection:",selection)
        let countryLabel = this.state.countries.filter((item)=>item.value === selection)[0]
        API.getProductsByCountry(1,selection).then((res)=>{
            console.log("COUNTRY PRODUCCTS: ",res)
            let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
            this.setState({ countryLabel:countryLabel.label,isVisible:false,country:selection,page:1,filterProducts:result,fetchedProducts:res,isVisible:false,total:res.totalCount})
        })
        /* let res = this.state.fetchedBrands.filter((item)=>{
            return item.user.country_id === selection
        }) */
    }

    setBrand(selection){
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one brand")
        }
        else if(selection.length==0){
            this.setState({filterProducts:this.state.fetchedBProductsForFiltering,brand:[]})
        }
        else{
            let result = this.state.fetchedBProductsForFiltering.filter((i)=>i.brand.id == selection[0].value)
            this.setState({filterProducts:result,brand:selection})
        }
    }    

    resetEverything(){
        this.setState({
            category:[],
            subcategory:[],
            brand:[],
        })
        this.SortingByData('reset');
        this.resetPriceRange();
    }

    setSubCategory(selection){
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one category")
        }
        else if(selection.length==0){
            this.setState({filterProducts:this.state.fetchedSBProductsForFiltering,subcategory:[],fetchedBrands:[]})
        }
        else{
            let array = [];
            let result = this.state.fetchedSBProductsForFiltering.filter((i)=>i.subCategory.id == selection[0].value)
            console.log("RESULT: ",result)
            let fetchedSubrands = this.state.apiCategoriesForFiltering.find((i1)=>i1.id === this.state.category[0].value)
            let fetchedBrands = fetchedSubrands.subcategory.find((i2)=>i2.id === selection[0].value)
            fetchedBrands.brands.map((i3)=>{
                array.push({label:i3.brand_name,value:i3.id})
            })

            this.setState({filterProducts:result,subcategory:selection,fetchedBrands:array,fetchedBProductsForFiltering:result})
        }
    }
   

    setCategory(selection){
        console.log("SELECTION: ",selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one category")
        }
        else if(selection.length==0){
            console.log("12345")
            this.setState({isVisible:true})
            API.getProducts(this.state.page).then((res)=>{
                this.setState({filterProducts:res.data,category:[],fetchedSubCategories:[],isVisible:false})
            })
        }
        else{
            this.setState({isVisible:true})
            /* API.getProductsFiltered(this.state.page,selection,null,null).then((res)=>{
                this.setState({filterProducts:res.data,category:selection})
            }) */
            API.getProductsByCategory(this.state.page,selection).then((res)=>{
                this.setState({filterProducts:res.data,category:selection,isVisible:false})
            })
            /* let array = [];
            console.log("FILTERING CAtegories: ",this.state.fetchedProducts)
            let result = this.state.fetchedProducts.data.filter((i)=>i.category_id == selection[0].value)
            console.log("RESULT: ",result)
            let fetchedSub = this.state.apiCategoriesForFiltering.find((it)=>it.id===selection[0].value).subcategory.filter((item)=>item.category_id === selection[0].value)
            fetchedSub.map((item2)=>{
                array.push({label:item2.sub_category_name, value:item2.id})
            })
            this.setState({filterProducts:result,category:selection, fetchedSubCategories:array,fetchedSBProductsForFiltering:result}) */
        }
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };
    
    loadMore=(page)=>{
        this.setState({isVisible:true,page:page});
        if(this.state.country>0){
            API.getProductsByCountry(page,selection).then((res)=>{
                console.log("COUNTRY PRODUCCTS: ",res)
                let result = res.data.sort((a,b)=>a.product_name>b.product_name?1:-1)
                this.setState({ isVisible:false,country:selection,page:1,filterProducts:result,fetchedProducts:res,isVisible:false,total:res.totalCount})
            })
        }
        else{
            API.getProducts(page).then((res)=>{
                let result = this.state.filterProducts.concat(res.data);
                this.setState({filterProducts:result,isVisible:false})
            })
        }
    }


    render() {
        return (
            <View style={styles.container}>
                {/* <NavigationEvents onDidFocus={async() => {
                    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
                    this.setState({userType:user.user_type, showButton:true})
                    console.log("USER DATA: ",user.user_type)
                    apiPortFolioServices.getCategories().then((result)=>{
                        console.log("CATEGORIES: ",result);
                        let array = result;
                        let data = [];
                        array.map((item) => data.push({label:item.category_name,value:item.id}));
                        this.setState({ fetchedCategories: data,apiCategoriesForFiltering:result });
                    })
                    API.getProducts().then((res)=>{
                        console.log("PRODUCTS FETCHED: ",res)
                        let result = res.sort((a,b)=>a.product_name>b.product_name?1:-1)
                        this.setState({ filterProducts:result,fetchedProducts:res,isVisible:false })
                    })
                }} /> */}
                {this.state.countries.length>0 &&  <Picker 
                style={{display:'none'}} 
                ref={this.locationRef} 
                selectedValue={this.state.country}
                onValueChange={(item)=>this.chooseLocation(item)}>
                    {this.state.countries.map((item,index)=>{
                        return <Picker.Item label={item.label} value={item.value} key={index}/>
                    })}
                </Picker>}
                {/* <RenderPicker 
                ref={locationRef}
                containerStyle={{display:"none"}}
                map={this.state.countries}
                onValueChange={(item)=>this.chooseLocation(item)}
                selectedValue={this.state.country}/> */}
                <Spinner visible={this.state.isVisible} />
                <Overlay visible={this.state.modalVisible} onClose={()=>this.setState({modalVisible:false})} 
                containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
                closeOnTouchOutside>
                                
                    <View style={styles.modalHeader}>
                        <Text
                        style={{
                            fontSize: 21,
                            color: "#31C2AA",
                            fontWeight: "bold",
                            marginBottom: 5,
                        }}
                        >
                        Product Creation
                        </Text>
                        <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>setVisible({ ...visible, modal: false })}/>
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
                        ((i)=>i.product_name.toLowerCase().includes(this.state.search.toLowerCase())).length + " " + "Results":""} onPress={this.setView} style={{ fontSize: 14 }} />
                        <Appbar.Action icon={()=><Entypo name="location-pin" size={24} color="black" />} onPress={() => {
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
                                <TouchableOpacity style={[styles.card,{borderRadius:15}]} onPress={()=>this.props.navigation.navigate("Detailed",{item:item})}>
                                    <View style={styles.cardHeader}>
                                    </View>
                                    <Image style={styles.userImage} source={{ uri: item.images[0].media }}  resizeMode="contain"/>
                                    <View style={styles.cardFooter}>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={styles.name}>{item.product_name}</Text>
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
                                    <Text style={{ fontSize: 14,color:"#6E91EC" }}>Newset</Text>
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
                                    <Text style={{ fontSize: 14,color:"#6E91EC" }}>Available</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize} onPress={()=>this.SortingByData("low")}>
                                        <Text style={{ fontSize: 18 ,color:"#6E91EC" }}>$</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14,color:"#6E91EC" }}>Low</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize} onPress={()=>this.SortingByData("high")}>
                                        <Text style={{ fontSize: 18,color:"#6E91EC" }}>$$</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14,color:"#6E91EC" }}>High</Text>
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
                                <Title style={{ padding: 10,flex:1 }}>Filter By </Title>
                                <Title style={{ padding: 10,flex:1, alignItems:'flex-end',paddingHorizontal:20,color:'#6E91EC'}/* ,styles.resetButton  */}
                                onPress={()=>{
                                    //console.log("Test")
                                    this.resetEverything()
                                }}>Reset </Title>
                                        {/* <TouchableOpacity style={[styles.resetButton,{paddingHorizontal:10,alignSelf:'center',justifyContent:'center'}]}
                                                onPress={()=>this.resetPriceRange()}>
                                                    <Text style={styles.resetText}>
                                                        Reset
                                                    </Text>
                                        </TouchableOpacity> */}
                            </View>
                            <List.AccordionGroup>
                                <List.Accordion title="Categories" id="1" style={{ width: "100%" }}
                                        theme={{
                                        colors: { primary: "#6E91EC", underlineColor: "transparent" },
                                        }}>
                                        <SelectMultiple
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
                                        ?(<Text style={{color:'red',textAlign:'center',paddingVertical:10}}>Please choose a category first</Text>)
                                        :(<SelectMultiple
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
                                        ?(<Text style={{color:'red',textAlign:'center',paddingVertical:10}}>Please choose a sub-category first</Text>)
                                        :(<SelectMultiple
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
                                    <View>
                                        <TouchableOpacity
                                        onPress={()=>this.resetPriceRange()}>
                                            <Text style={styles.resetText}>
                                                Reset
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



