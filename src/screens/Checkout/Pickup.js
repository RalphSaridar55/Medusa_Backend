import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Alert,
    LogBox
} from 'react-native';
import { RenderPicker } from "../../components/Picker";
import {TouchableDocumentPicker} from "../../components/DocumentPicker";
import * as apiServices from "../../core/apis/apiAddressServices";
import * as apiProducts from '../../core/apis/apiProductServices';
import * as apiPayment from '../../core/apis/apiPaymentServices';
import * as apiOrder from '../../core/apis/apiOrderServices';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, IconButton, Searchbar, Menu, Divider, Provider, Button } from 'react-native-paper';
import dropdown from '../../../assets/down.png';
import {Picker} from '@react-native-picker/picker'
import styles from './style_pickup';
import _ from 'lodash';
import * as DocumentPicker from "expo-document-picker";
import Overlay from './overlay';
import TextInput from "../../components/TextInput";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacityButton } from '../../components/TouchableOpacity';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Pickup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            locations:[],
            visible: false,
            data: [
                { id: 1, name: "116 smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
                { id: 3, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 2, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
                { id: 4, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 5, name: "116 smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
                { id: 6, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 7, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
                { id: 8, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 9, name: "116 smart watch ", image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", count: "100$", value: true },
                { id: 10, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
                { id: 11, name: "Q12 Smartwatch", image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", count: "100$", value: true },
                { id: 12, name: "Z15 Smartwatch", image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", count: "100$", value: false },
            ],
            location: "",
            payments: "",
            total:0,
            delivery_address: {
              address_id: null,
              address: null,
            },
            cargo_methods: [
              { label: "Land", value: 1 },
              { label: "Sea", value: 2 },
              { label: "Air", value: 3 },
            ],
            payment: 1,
            payments: [
              { label: "Credit", value: 1 },
              { label: "Cash", value: 2 },
            ],
            filterLocations: [],
            filteredLocation: {
              Country: "",
              State: "",
              City: "",
              Street: "",
            },
            doc:'',
            docError:false,
            Location: "",
            countries: [],
            cargo: 1,
            typeofservice: "",
            serviceLevel: 1,
      
            dataFromRoute: null,
            payment_method_id:0,
            payment_method:'',
            overlay:false,

            fetchedServicesType:[],
            fetchedServices:[],
            serviceType:null,
            service:null,
            payment_token:null,
            cardInfo:null,
            loading:true,
        }
    }
    

    /* componentDidMount(){
        let {products,orders} = this.props.route.params
        console.log("PARAMS:",products)
        this.setState({products:products,dataFromRoute:orders})
        apiServices.getCountries().then((res) => {
            //console.log("RES COUNTRIES FROM THE FUNCTION:",res);
            this.setState({ countries: res });
          });
          apiServices.getAddresses().then((res) => {
            console.log("RES FROM THE FUNCTION:", res);
            let ad = [];
            res.data.map((it) => {
              ad.push({ label: it.registered_address, value: it.id });
            });
    
            this.setState({ locations: ad, filterLocations: res.data });
          });
          apiProducts.getServiceLevels().then((res)=>{
             console.log("RES FOR SERVICES: ",res)
            let ar = [];
            res.map((item)=>{
              ar.push({label:item.service_level,value:item.id})
            })
            this.setState({fetchedServicesType:ar})
          })
          //console.log(this.state.data.reduce((pre,cur)=>pre+cur))
          //this.setState({total:arr})
    }

    componentDidMount() {
      this.focusListener = this.props.navigation.addListener("focus", () => {
        
        let {products,orders} = this.props.route.params
        console.log("PARAMS:",products)
        this.setState({products:products,dataFromRoute:orders})
        apiServices.getCountries().then((res) => {
            //console.log("RES COUNTRIES FROM THE FUNCTION:",res);
            this.setState({ countries: res });
          });
          apiServices.getAddresses().then((res) => {
            console.log("RES FROM THE FUNCTION:", res);
            let ad = [];
            res.data.map((it) => {
              ad.push({ label: it.registered_address, value: it.id });
            });
    
            this.setState({ locations: ad, filterLocations: res.data });
          });
          apiProducts.getServiceLevels().then((res)=>{
             console.log("RES FOR SERVICES: ",res)
            let ar = [];
            res.map((item)=>{
              ar.push({label:item.service_level,value:item.id})
            })
            this.setState({fetchedServicesType:ar})
          })
          //console.log(this.state.data.reduce((pre,cur)=>pre+cur))
          //this.setState({total:arr})
      });
    } */

   componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      //console.log("FROM CONTEXT:",this.product)
    this.calculateTotal();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead'])
    apiOrder.getOrderBook(1).then((res)=>{
      console.log("ORDERBOOK: ",res)
      this.setState({products:res})
    })
    let { /* products, */ order } = this.props.route.params;
    //console.log("ROUTE PARAMS PRODUCTS: ", products);
    console.log("ROUTE PARAMS ORDER: ", order);
    this.setState({ dataFromRoute: order });
    apiServices.getCountries().then((res) => {
      //console.log("RES COUNTRIES FROM THE FUNCTION:",res);
      this.setState({ countries: res });
    });
    apiServices.getAddresses().then((res) => {
      console.log("RES FROM THE FUNCTION:", res);
      let ad = [];
      res.data.map((it) => {
        ad.push({ label: it.registered_address, value: it.id });
        /* let country_name = this.state.countries.filter((filtered)=>{
        return filtered.value === it.country_id;
      })
      return ({...it,country_name:country_name[0].label}) */
    });
    this.setState({ locations: ad, filterLocations: res.data });
  }) 
  apiProducts.getServiceLevels().then((res)=>{
     console.log("RES FOR SERVICES: ",res)
    let ar = [];
    res.map((item)=>{
      ar.push({label:item.service_level,value:item.id})
    })
    this.setState({fetchedServicesType:ar,loading:false})
  })

  apiPayment.getPaymentMethods().then((res)=>{
    console.log("Result Payment: ",res)
    this.setState({payments:res})
  })
      });
  }
    

  changeServiceType (id){
    //console.log
    /* console.log("LEVEL: ",id)*/
    console.log("STATE: ",this.state.fetchedServicesType) 
    let result = this.state.fetchedServicesType.filter((item)=>{
      return  item.value==id
    })[0];
    console.log("RESULT: ",result)
    apiProducts.getServiceType(id).then((res)=>{
      //console.log("SERVICE: ",res)
      let ar = [];
      res.map((item)=>{
        ar.push({label:item.service_type,value:item.id})
      })
      this.setState({serviceLevel:id,serviceLevelString:result?.label,fetchedServices:ar,})
    })
  }

    pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      let ext = result.name.split(".");
      console.log(ext[ext.length - 1]);
      if (ext[ext.length - 1] != "docx" && ext[ext.length - 1] != "pdf")
        Alert.alert(
          "Wrong Extensions",
          "Please only upload pdf or docx type of files"
        );
      else {
        console.log(result);
        try {
          this.setState({ doc: result.uri });
        } catch (error) {
          this.setState({ docError: error });
        }
      }
    };

    

  pay() {
    console.log("PLACING ORDER DATA: ", this.state.dataFromRoute);
    let { delivery_address, payment, doc, cargo } = this.state;
    let payload = {
      order_method_id: this.props.route.name == "Delivery" ? 1 : 2,
      delivery_address: delivery_address,
      payment_method_id: payment,
      //payment_token_id: "",
      cargo_delivery_method: cargo,
      document: doc,
    };
    console.log("PAYLOAD: ", payload);
    let error=false;
    Object.keys(payload).map((item, index) => {
      switch (typeof item) {
        case "number":
          if (payload[item] == 0) {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
          break;
        case "string":
          if (payload[item] == "") {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
          break;
        default:
          console.log("ITEM IN PAY ",item)
          if (payload[item].address_id == 0 || payload[item].address == "") {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
          break;
      }
    });
    let payload2 = {...payload,...this.state.dataFromRoute}
    console.log("PAYLOAD2: ",payload2)
    if(!error){
      if(this.state.payment!=4){  
        apiPayment.placeOrder(payload2).then((res)=>{
          console.log("SHOUDL BE SUCCESSFUL");
          this.setState({loading:false})
          Alert.alert("Payment",res,[
            {text:"Ok",onPress:()=>this.props.navigation.navigate("Home")}
          ])
        }).catch(err=>{
          this.setState({loading:false})
          Alert.alert("Error",err.response.data.message)
        })
      }
      else{
        if(!this.state.cardComplete){
          this.setState({loading:false})
          Alert.alert("Error","Please check your credit card credentials");
          return;
        }
        /* else{

        } */
      }
    }
    }

    placeOrder = () =>{
        console.log(this.state.location, "   ",this.state.payments)
        if(this.state.data.length<1){
            Alert.alert("Order not placed","Please add products before placing an order")
        }
        else if (this.state.location.label.length<1 || this.state.payments.label.length<1){
            Alert.alert("Order not placed","Please fill all the required fields")
        }
        else{
            //database stuff
            Alert.alert("Order has been placed","Thank you for your purchase")
            this.props.navigation.navigate('Home')
        }
    }

    calculateTotal(products){

        console.log("PRODUCTS:",products)
        let array = products?.reduce((a,b)=>({total:a.total+b.total}))['total']+""
        //console.log(array)\
        console.log("TOTAL: ",array)
        //const total = array.reduce((pre,curr)=>pre+curr);
        //console.log(total)
        this.setState({total:array})
    }

    removeItem = (id) => {
      Alert.alert("Remove Item", "Are you sure you want to remove this item", [
        { text: "No" },
        {
          text: "Yes",
          onPress: () =>
            this.setState({
              products: this.state.products.filter((i) => i.product_id !== id),
            }),
        },
      ]);
    };

    

  selectPayMethod(id){
    console.log("ID: ",id)
    let pay = this.state.payments.filter((i)=>i.value === id)[0]
    this.setState({payment_method_id:pay.value,payment_method:pay.label,payment:id})
    if(id==4){
      this.setState({loading:true})
      apiPayment.getClientToken().then((res)=>{
        this.setState({payment_token:res,loading:false})
        console.log("Fetched Client Token:",res)
      });
      this.setState({overlay:true});
    }
  }

    selectLocation(id) {
      let state = this.state.locations.filter((i) => i.value === id)[0];
      let filtResult = this.state.filterLocations.filter((i) => i.id === id)[0];
      console.log("FILTER RESULT: ", filtResult);
      console.log("STATE DELIVERY: ",{address_id:id, address:state.label})
      let country = this.state.countries.filter(
        (i) => i.value === filtResult.country_id
      )[0];
      console.log("COUNTRY ", country);
      this.setState({
        delivery_address: {
          address_id: id,
          address: state.label,
        },
        filteredLocation: {
          Country: country?.label,
          State: filtResult.state,
          City: filtResult.city,
          Street: filtResult.street,
        },
      });
      //console.log("COUNTRY CHOSEN: ",itemValue)
    }

    openMenu = () => {
        this.setState({ visible: true })
    }
    closeMenu = () => {
        this.setState({ visible: false })
    }
    render() {
        return (
            <Provider>
                <Spinner visible={this.state.loading} />
                <View style={{ marginHorizontal: 10,marginTop:10 }}>
                    <Text style={[styles.header]}>Pickup</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={{ padding: 10, marginBottom:10, marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: "#698EB7" }}>Order Summary</Text>
                        <View style={{alignItems:'center',}}>
                            <FlatList
                                style={[styles.contentList,{marginBottom:20}]}
                                columnWrapperStyle={styles.listContainer}
                                data={this.state.products}
                                // ItemSeparatorComponent={() => {
                                //     return (
                                //         <View style={styles.separator} />
                                //     )
                                // }}
                                keyExtractor={(item) => {
                                    return item.product_id;
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <ScrollView>
                                            <TouchableOpacity style={styles.card} >
                                                <Image style={styles.image} source={{ uri: item.images[0].media }} />
                                                <View style={[styles.cardContent,{marginLeft:10}]}>
                                                    <Text style={styles.name}>{item.product_name}</Text>
                                                    <Text style={{ display: item.value_added_services!==null ? 'flex' : 'none', color: '#31C2AA' }}>Value added service </Text>
                                                    <Text style={styles.count}>Price {item.total}</Text>
                                                </View>
                                                <TouchableOpacity
                                                onPress={() => this.removeItem(item.product_id)}
                                                >
                                                <MaterialCommunityIcons
                                                    name="close-thick"
                                                    size={20}
                                                    color="red"
                                                />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    )
                                }} />
                        </View>
                        <Divider></Divider>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 5 }}>
                            <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>Total:</Text>
                            <Text style={{ padding: 10, marginLeft: 10, fontSize: 17, fontWeight: 'bold', color: "#31C2AA" }}>${this.state.products.length>0 ?this.state.products?.reduce((a,b)=>({total:a.total+b.total}))['total']+"":"0"}  </Text>
                        </View>
                    </View>
                    
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingTop: 20,
                backgroundColor: "#fff",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#698EB7",
                }}
              >
                Pickup Details
              </Text>
              
              <RenderPicker 
              
                  containerStyle={styles.containerStyle} 
                  selectedValue={this.state.location}
                  prompt="Registered Address"
                  onValueChange={(itemValue, itemIndex) => {
                    this.selectLocation(itemValue);
                  }}
                  map={this.state.locations}/>
              {Object.keys(this.state.filteredLocation).map((i, index) => (
                <TextInput
                  MV={5}
                  key={index}
                  style={{ backgroundColor: "#fff", marginVertical: 0 }}
                  label={i}
                  disabled={true}
                  value={this.state.filteredLocation[i]}
                  autoCapitalize="none"
                  // keyboardType={element.keyBoardType}
                  outlineColor="#C4C4C4"
                  theme={{
                    colors: {
                      primary: "#31c2aa",
                      underlineColor: "transparent",
                    },
                  }}
                />
              ))}
              <View
                style={{
                  flex: 1,
                  /* marginLeft: 10,
                  marginRight: 10, */
                  paddingTop: 20,
                  backgroundColor: "#fff",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 20,
                    color: "#698EB7",
                  }}
                >
                  Payment Details
                </Text>
                <RenderPicker 
                    containerStyle={styles.containerStyle} 
                    selectedValue={this.state.payment}
                    prompt="Payment Method"
                    onValueChange={(itemValue, itemIndex) => {
                      this.selectPayMethod(itemValue);
                    }}
                    map={this.state.payments}/>
              </View>
              
              
              {this.state.payment_token?.length>0&&<Overlay visible={this.state.payment==4?true:false}
                  token={this.state.payment_token}
                  onClose={()=>this.setState({overlay:false})}
                  onchange={this.changeData}  />}
                <TouchableDocumentPicker 
                  color="#6E91EC"
                  icon="file"
                  mode="outlined"
                  onPress={() => this.pickDocument()}
                  style={styles.docPicker}
                  doc={this.state.doc}/>
            </View>
            <TouchableOpacityButton 
                onPress={() => this.pay()}
                text="Place Order"/>
            {/* <View>
              <TouchableOpacity
                style={[styles.loginBtn, { marginHorizontal: 40 }]}
                onPress={() => this.pay()}
              >
                <Text style={styles.loginText}>Place Order</Text>
              </TouchableOpacity>
            </View> */}
          </View>
                </ScrollView >
            </Provider>
        );
    }
}