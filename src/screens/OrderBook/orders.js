``;
import React, { Component, createRef, useRef } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as APIOrder from '../../core/apis/apiOrderServices';
import Overlay from 'react-native-modal-overlay';
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
import { AntDesign } from "@expo/vector-icons";
import styles from "./orders_style";
import { Picker } from "@react-native-picker/picker";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setItemAsync } from "expo-secure-store";
import { withNavigation } from "react-navigation";
const screenwidth = Dimensions.get('screen').width;
const actionSheetCat = createRef();

 class Orders extends Component {

  constructor(props) {    
    
    super(props);
    this.filterRef = React.createRef();
    this.state = {
      current:[],
      data:[],
      userData:null,
      filterStatusesSeller :[
        {value:1,label:"Pending"},
        {value:2,label:"Picked up"},
        {value:3,label:"Awaiting Shipment"},
        {value:4,label:"Shipped "},
        {value:5,label:"Awaiting Payment"},
        {value:6,label:"Partly Paid"},
        {value:7,label:"Paid"},
        {value:8,label:"Reserved"},
        {value:9,label:"Extended"},
        {value:10,label:"Current"},
        {value:11,label:"Completed"},
      ],
  
      filterStatusesBuyer  :[
        {value:2,label:"Completed Order"},
        {value:3,label:"Reserved Order"},
        {value:4,label:"Pending Order"},
      ],
      filterStatusLabel:"",
      filterStatus:1,
      filterStatuses:[],
      forTab: {
        index: 0,
        routes: [
          { key: "first", title: "Order Book" },
          { key: "second", title: "Orders" },
        ],
      },
      filter:"",
      search: "",
      
      filterData:[],
      showSearch: false,
      showFilter: true,

      spinner:false,
      overlay:false,
      dataToCheckout:{
        is_buy_now: false,
        buyer_id: 0,
        total_service_count: 0,
        total_service_cost: 0,
        order_details: [
          {
            seller_id: 0,
            product_id: 0,
            quantity: 0,
            box: 0,
            price: 0,
            productvariant: [
              {
                id: 0,
                variant_option_id: 0,
                varientType: {
                  id: 0,
                  varient_type: "string"
                },
                varientValue: {
                  id: 0,
                  varient_value: "string"
                }
              }
            ],
            value_added_services: [
              {
                service_id: 0,
                service_name: "string",
                document: [
                  "string"
                ],
                price: 0
              }
            ]
          }
        ],
        cart_id: [
          0
        ],
        order_method_id: 0,
        location_id: 0,
        delivery_address: {
          address_id: 0,
          address: "string"
        },
        payment_method_id: 0,
        payment_token_id: "string",
        total: 0,
        cargo_delivery_method: 0,
        service_type: 0,
        service_level: 0,
        document: "string"
      },
    };
  }
  calculateTotalServiceAndCarts(){
    let count = 0;
    let price = 0;
    let cart = [];
    let total = 0;
    this.state.current.map((item,index)=>{
      cart.push(item.cart_id);
      total+=item.total;
      item.value_added_services?.map((item2,index2)=>{
        count+=1;
        price+=item2.price;
      })
    })
    console.log("TOTAL: ",total)
    return {count,price,cart,total};
  }

  fillDataForCheckout=()=>{
    //let userdata = JSON.parse(AsyncStorage.getItem('user_details'));
    console.log('USER DETAILS:' ,this.state.userData)
    console.log('ORDER DETAILS: ',this.state.current)
    let order_details=[];
    this.state.current.map((item,index)=>{
      let data= {};
      let dataservices = [];
      let datavariants = [];
      data.seller_id = item.seller_id;
      data.product_id = item.product_id;
      data.quantity = item.quantity;
      data.box = item.box;
      data.price = item.price;
      item?.value_added_services?.map((item2,index2)=>{
        dataservices.push({service_id:item2.service_id,service_name:item2.service_name,document:item2.document,price:item2.price})
      })
      data.productvariant = datavariants;
      data.value_added_services=dataservices;
      console.log("Data becomes: ",data)
      order_details.push(data)
    })
    let {count,price,cart,total} = this.calculateTotalServiceAndCarts()
    let {id} = this.state.userData;
    let reform = {
      is_buy_now:false,
      buyer_id:id,
      total_service_count:10,
      total_service_count:count,
      total_service_cost:price,
      cart_id:cart,
      order_details:order_details,

      total:total,

      //order_method_id: 0,
      //location_id: 0,
      //delivery_address: {
        //address_id: 0,
        //address: "string"
      //},
      //payment_method_id: 0,
      //payment_token_id: "string",
      //total: 0,
      //cargo_delivery_method: 0,
      //service_type: 0,
      //service_level: 0,
      //document: "string"
    }

    console.log("Reform: ",reform)
    this.setState({dataToCheckout:reform})
  }

  onclick = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
  };

  _changeFilter = (val) =>{
    let label = this.state.filterStatuses.filter((i)=>i.value===val)[0].label ;
    this.setState({spinner:true,filterStatus:val,filterStatusLabel:label})
    if(this.state.userData.user_type==4){
      APIOrder.getSellersOrder(val).then((res)=>{
        console.log('API RES: ',res)
        this.setState({data:res,filterData:res,spinner:false})
      }).catch(err=>{
        Alert.alert("Error",err.response.data.message)
        this.setState({spinner:false})
      })
    }
    else{
      APIOrder.getOrderBook(val).then((res)=>{
        console.log('API RES: ',res)
        this.setState({data:res,filterData:res,spinner:false})
      }).catch(err=>{
        Alert.alert("Error",err.response.data.message)
        this.setState({spinner:false})
      })
    }
  }

  chooseTypeOfPlacement(){
    if(this.state.current.length<1)
      Alert.alert('Error','Your current orderbook is empty')
    else
      this.setState({overlay:true})
  }
  
  /* async componentDidUpdate(prevProps){
    if(prevProps.isFocus !== this.props.isFocused){
      let userData = JSON.parse(await AsyncStorage.getItem('user_details'));
      console.log("USER DATA: ",userData)
      this.setState({spinner:true, userData:userData,filterStatuses:userData.user_type==4?this.state.filterStatusesSeller:this.state.filterStatusesBuyer})  
      APIOrder.getOrderBook(1).then((res)=>{
        console.log("CURRENT ORDER BOOK: ",res)
        this.setState({current:res})
      })
      APIOrder.getSellersOrder(10).then((res)=>{
        console.log("DATA: ",res)
        this.setState({spinner:false,data:res,filterData:res})
      })
      setTimeout(()=>this.fillDataForCheckout(),2000)
    }
  } */

async componentDidMount(){
    let userData = JSON.parse(await AsyncStorage.getItem('user_details'));
    console.log("USER DATA: ",userData)
    this.setState({spinner:true, userData:userData,filterStatuses:userData.user_type==4?this.state.filterStatusesSeller:this.state.filterStatusesBuyer})  
    if(userData.user_type==1){
      APIOrder.getOrderBook(1).then((res)=>{
        console.log("CURRENT ORDER BOOK: ",res)
        this.setState({current:res})
      })
      APIOrder.getOrderBook(4).then((res)=>{
        console.log("CURRENT ORDER BOOK: ",res)
        this.setState({spinner:false,filterData:res,filterStatusLabel:"Pending"})
      })
    }else
    APIOrder.getSellersOrder(10).then((res)=>{
      console.log("DATA: ",res)
      this.setState({spinner:false,data:res,filterData:res})
    })
    setTimeout(()=>this.fillDataForCheckout(),2000)
}

/* componentDidMount(){
  this.focusListener = this.props.navigation.addListener("focus", async() => {
    let userData = JSON.parse(await AsyncStorage.getItem('user_details'));
    console.log("USER DATA: ",userData)
    this.setState({spinner:true, userData:userData,filterStatuses:userData.user_type==4?this.state.filterStatusesSeller:this.state.filterStatusesBuyer})  
    userData.user_type==1?
    APIOrder.getOrderBook(1).then((res)=>{
      console.log("CURRENT ORDER BOOK: ",res)
      this.setState({spinner:false,current:res})
    }):
    APIOrder.getSellersOrder(10).then((res)=>{
      console.log("DATA: ",res)
      this.setState({spinner:false,data:res,filterData:res})
    })
    setTimeout(()=>this.fillDataForCheckout(),2000)
  })
  }
 */

 /*  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async() => {
      let userData = JSON.parse(await AsyncStorage.getItem('user_details'));
      console.log("USER DATA: ",userData)
      this.setState({spinner:true, userData:userData,filterStatuses:userData.user_type==4?this.state.filterStatusesSeller:this.state.filterStatusesBuyer})  
      APIOrder.getOrderBook(1).then((res)=>{
        console.log("CURRENT ORDER BOOK: ",res)
        this.setState({current:res})
      })
      APIOrder.getSellersOrder(10).then((res)=>{
        console.log("DATA: ",res)
        this.setState({spinner:false,data:res,filterData:res})
      })
      setTimeout(()=>this.fillDataForCheckout(),2000)
    })
    
  } */ 
    

  DeleteOrder(id){
    Alert.alert("Delete","Are you sure you want to delete this order ?",[
      {text:"No"},
      {text:"Yes",onPress:()=>{
        this.setState({spinner:true})
        APIOrder.deleteOrder(id).then((res)=>{
          Alert.alert("Delete",res)
          this.setState({spinner:false,current:this.state.current.filter((i)=>i.cart_id !== id)})
        }).catch(err=>{
          Alert.alert("Error",err.response.data.message)
          this.setState({spinner:false})
        })
      }}
    ])
  }

  drawScreenOne = () => {
    return (
      <><Overlay visible={this.state.overlay} onClose={()=>this.setState({overlay:false})} 
      containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
      closeOnTouchOutside>
                      
          <View style={styles.modalHeader}>
              <Text
              style={{
                  fontSize: 18,
                  color: "#31C2AA",
                  marginBottom: 5,
              }}
              >
              Order Placement
              </Text>
              <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>this.setState({overlay:false})}/>
          </View>
          <View style={{flexDirection:'column',marginTop:20}}>
              <View style={{width:150,paddingHorizontal:10}}>
                  <TouchableOpacity
                      onPress={()=>{
                          this.setState({overlay:false});
                          this.props.navigation.navigate("Checkout",{screen:"Delivery",params:{products:this.state.current, order:this.state.dataToCheckout}})
                        }}
                      style={[styles.loginBtn,{height:40,marginTop:20}]}
                  >
                      <Text style={[styles.loginBtnText,{color:'#31C2AA'}]}>Delivery</Text>
                  </TouchableOpacity>
              </View>
              <View style={{width:150,paddingHorizontal:10}}>
                  <TouchableOpacity
                      onPress={()=>{
                          this.setState({overlay:false});
                          this.props.navigation.navigate("Checkout",{screen:"Pickup",params:{products:this.state.current, order:this.state.dataToCheckout}})
                      }}
                      
                      style={[styles.loginBtn,{height:40,marginTop:20}]}
                  >
                      <Text style={[styles.loginBtnText,{color:'#31C2AA'}]}>Pickup</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Overlay>
      <ScrollView style={{paddingHorizontal:10}}>
        {this.state.current?.map((item, index) => {
          return (
            <View
              style={[styles.container, styles.content,{marginLeft:0}]}
              key={index}
            >
              <View style={styles.imageContainer}>
                <Image source={{uri: item.images[0].media}} style={styles.image} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.contentContainer}>
                  <View style={styles.mainInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <TouchableOpacity
                    onPress={()=>this.DeleteOrder(item.cart_id)}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={24}
                        color="red"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={{ width: "70%" }}>
                    {/* {item.description.length > 40
                      ? item.description.substring(0, 40) + "..."
                      : item.description} */}
                  </Text>
                </View>
                <View style={[styles.contentContainer, { marginTop: 10 }]}>
                  <Text>Total: ${item.total}</Text>
                </View>
                <View
                  style={[
                    styles.contentContainer,
                    { marginTop: 10, justifyContent: "space-between" },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.iconTextContainer}
                    onPress={() => this.props.navigation.navigate("ValueAdded",{item})}
                  >
                    <View style={[styles.iconContainer,(this.state.current.value_added_services===null ||this.state.current.value_added_services?.length<1 )?{borderColor:'red'}:{borderColor:'#31C2AA'}]}>
                      <MaterialCommunityIcons
                        name={(this.state.current.value_added_services==null ||this.state.current.value_added_services?.length<1 )?"close":"check"}
                        size={16}
                        color={(this.state.current.value_added_services==null ||this.state.current.value_added_services?.length<1 )?"red":"#31C2AA"}
                      />
                    </View>
                    <Text style={{ marginLeft: 5, color: "#6E91EC", textDecorationLine:'underline'}}>
                      Value added services
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={()=>this.props.navigation.navigate("Negotiations",{screen:"Negotiation",params:{fromOrder:item}})}>
                    <Ionicons name="chatbox" size={24} color="#6E91EC" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total Price: ${this.state.current.length>0 ? this.state.current.reduce((pre,cur)=>({total:pre.total+cur.total}))["total"]+"":"0"}</Text>
        <TouchableOpacity
                onPress={()=>this.chooseTypeOfPlacement()}
                style={styles.placeOrderButton}>
                <Text style={{color:'white'}}>Place Order</Text>
        </TouchableOpacity>
      </View>
      </>
    );
  };

  drawScreenTwoDataBuyer = (item,index) =>{
    return(<TouchableOpacity
      style={[styles.container, styles.content,{marginLeft:0}]}
      key={index}
      onPress={()=>this.props.navigation.navigate('DetailedOrder',{item})}
    >
      <View style={{ flex: 1, flexDirection:'row', justifyContent:'space-between',alignItems:'center' }}>
        <Text style={styles.orderText}>Order Number #{item.order_id}</Text>
        <View style={{ flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
          {item?.box ?<><Text style={styles.orderQty}>{item?.box}</Text>
          <Feather name="box" size={24} color="#6E91EC" /></>:<Text style={{ color:'#6E91EC'}}>{item.status}</Text>}
        </View>
      </View>
    </TouchableOpacity>
    )
  }

  drawScreenTwoData = (item,index) =>{
    return (
    <TouchableOpacity
      style={[styles.container, styles.content,{marginLeft:0}]}
      key={index}
      onPress={()=>this.props.navigation.navigate('DetailedOrder',{item})}
    >
      <View style={styles.imageContainer}>
        <Image source={item?.image} style={styles.image} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.mainInfo}>
            <Text style={styles.name}>{item?.buyer_name}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={{ width: "70%" }}>
            {/* {item?.description.length > 40
              ? item.description.substring(0, 40) + "..."
              : item.description} */}
          </Text>
        </View>
        <View style={[styles.contentContainer, { marginTop: 10 }]}>
          <Text>Amount: ${item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  }

  drawScreenTwo = () => {
    return (
      <>
      <Spinner visible={this.state.spinner} />
        <Appbar style={{ backgroundColor: "#E9F3FF", color: "#fff" }}>
          <Appbar.Content
            title={this.state.filterStatusLabel}/* {
              this.state.filterData.filter((i) =>
                i?.name.toLowerCase().includes(this.state.search.toLowerCase())
              ).length +
              " " +
              "Results"
            } */
            onPress={this.setView}
            titleStyle={{ fontSize: 18,fontWeight:'100' }}
          />
          <Appbar.Action
            icon="filter-menu"
            onPress={() => {
              //console.log(this.filterRef)
              this.filterRef.current.pickerRef.current.focus()
              this.setState({showFilter:!this.state.showFilter})
            }}
          />
          <Appbar.Action icon="magnify" onPress={()=>this.onclick()}
          style={this.state.showSearch&&{backgroundColor:'#31C2AA'}}  color={this.state.showSearch?"#E9F3FF":"black"} />
        </Appbar>
        <View style={{paddingHorizontal:10,paddingVertical:10,display: this.state.showSearch?"flex":"none" }}>
          <Searchbar
            theme={{
              colors: { primary: "#6E91EC", underlineColor: "transparent" },
            }}
            onChangeText={(e) => this.setState({ search: e })}
            placeholder="Search"
          />
        </View>
        <View style={{paddingHorizontal:10,paddingVertical:10,
          display: "none"}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#C4C4C4",
              borderRadius: 4,
              marginVertical: 10,
              height:55,
              justifyContent:'center',
              backgroundColor:'#fff'
            }}
          >
            <Picker
              ref={this.filterRef}
              style={{marginLeft:5}}
              selectedValue={this.state.filterStatus}
              onValueChange={(itemValue, itemIndex) =>{
                console.log(itemValue)
                this._changeFilter(itemValue)
              }
              }>{this.state.filterStatuses.map((item,index)=>{
                return <Picker.Item label={item.label} value={item.value} key={index}/>
              })}
            </Picker>
          </View>
        </View>
        <View style={{flex:1}}>
          <ScrollView style={{paddingHorizontal:10}}>
            {this.state.filterData.map((item, index) => {
                    return this.state.userData?.user_type==1?this.drawScreenTwoDataBuyer(item,index):this.drawScreenTwoDataBuyer(item,index)
            })}
                </ScrollView>
        </View>
      </>
    );
  };

  _renderScene = SceneMap({
    first: this.drawScreenOne,
    second: this.drawScreenTwo,
  });

  render() {
    return (

       this.state.userData?.user_type==1?( <TabView
        navigationState={this.state.forTab}
        renderScene={this._renderScene}
        onIndexChange={this._handleIndexChange}
        //renderTabBar={this._renderTabBar}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "#fff" }}
            //scrollEnabled={false}
            indicatorStyle={{ backgroundColor: "#31c2aa", height: 2 }}
            renderLabel={({ route, color }) => (
              <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
            )}
          />
        )}
      />) :this.drawScreenTwo()
     );
  }
}

export default Orders