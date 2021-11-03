import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Alert
} from 'react-native';
import { RenderPicker } from "../../components/Picker";
import {TouchableDocumentPicker} from "../../components/DocumentPicker";
import * as apiServices from "../../core/apis/apiAddressServices";
import * as apiProducts from '../../core/apis/apiProductServices';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, IconButton, Searchbar, Menu, Divider, Provider, Button } from 'react-native-paper';
import { Colors, Dialog, Avatar, Assets, PanningProvider, Typography, ActionBar } from 'react-native-ui-lib';
import dropdown from '../../../assets/down.png';
import {Picker} from '@react-native-picker/picker'
import styles from './style_pickup';
import _ from 'lodash';
import * as DocumentPicker from "expo-document-picker";
import Overlay from './overlay';
import TextInput from "../../components/TextInput";
import { AntDesign } from '@expo/vector-icons';

const Location = [
    { label: 'UAE, Dubai, Sheikh Zayed St.', value: 'uae' },
    { label: 'Lebanon, Beirut, Hamra St.', value: 'leb' },
    { label: 'UAE, Abu Dhabi, Al Sharqi St.', value: 'abu' },
];

const Payments = [
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'Cash on Delivery', value: 'Cash on Delivery' },
    { label: 'Letter of Credit', value: 'Letter of Credit' },
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Cash on Advance', value: 'Cash on Advance' },

];


renderDialog = modalProps => {
    const { visible, children, toggleModal, onDone } = modalProps;

    return (
        <Dialog
            migrate
            visible={visible}
            onDismiss={() => {
                onDone();
                toggleModal(false);
            }}
            bottom
            useSafeArea
            renderPannableHeader={this.dialogHeader}
            panDirection={PanningProvider.Directions.DOWN}
        >
            <ScrollView >{children}</ScrollView>
        </Dialog>
    );
};


export default class Pickup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromRoute:null,
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
            cargo: "",
            typeofservice: "",
            serviceLevel: "",
      
            dataFromRoute: null,
            payment_method_id:0,
            payment_method:'',
            overlay:false,

            fetchedServicesType:[],
            fetchedServices:[],
            serviceType:null,
            service:null,
        }
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
    let { delivery_address, payment, cargo_method, doc } = this.state;
    let payload = {
      order_method_id: this.props.route.name == "Delivery" ? 1 : 2,
      delivery_address: delivery_address,
      payment_method_id: payment,
      //payment_token_id: "",
      cargo_delivery_method: cargo_method,
      
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
        case "string":
          if (payload[item] == "") {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
        default:
          if (payload[item].address_id == 0 || payload[item].address == "") {
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
      }
    });
    let payload2 = {...payload, service_type: this.state.service, service_level: this.state.serviceLevel,}
    console.log("PAYLOAD2: ",payload2)
    if(!error)
      this.setState({overlay:true})
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

    componentDidMount(){
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
              /* let country_name = this.state.countries.filter((filtered)=>{
              return filtered.value === it.country_id;
            })
            return ({...it,country_name:country_name[0].label}) */
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
              /* let country_name = this.state.countries.filter((filtered)=>{
              return filtered.value === it.country_id;
            })
            return ({...it,country_name:country_name[0].label}) */
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
    }

    changeServiceType (id){
      //console.log
      apiProducts.getServiceType(id).then((res)=>{
        console.log("SERVICE: ",res)
        let ar = [];
        res.map((item)=>{
          ar.push({label:item.service_type,value:item.id})
        })
        this.setState({serviceType:id,fetchedServices:ar})
      })
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

    selectLocation(id) {
      let state = this.state.locations.filter((i) => i.value === id)[0];
      let filtResult = this.state.filterLocations.filter((i) => i.id === id)[0];
      console.log("FILTER RESULT: ", filtResult);
      let country = this.state.countries.filter(
        (i) => i.value === filtResult.country_id
      )[0];
      console.log("COUNTRY ", country);
      this.setState({
        delivery_address: {
          address_id: id,
          adress: state.label,
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
                Shipment Details
              </Text>
              <RenderPicker 
                  selectedValue={this.state.serviceType}
                  prompt="Service Level"
                  onValueChange={(itemValue, itemIndex) => {
                    this.changeServiceType(itemValue)
                  }}
                  map={this.state.fetchedServicesType}/>
              <RenderPicker 
                  selectedValue={this.state.service}
                  prompt="Service Type"
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ service: itemValue });
                    
                  }}
                  map={this.state.fetchedServices}/>
              <RenderPicker 
                  selectedValue={this.state.cargo_method}
                  prompt="Cargo Delivery Method"
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ location: itemValue });
                  }}
                  map={this.state.cargo_methods}/>
              <RenderPicker 
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
                    selectedValue={this.state.payment}
                    prompt="Payment Method"
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ payment: itemValue });
                    }}
                    map={this.state.payments}/>
              </View>
                <TouchableDocumentPicker 
                  color="#6E91EC"
                  icon="file"
                  mode="outlined"
                  onPress={() => this.pickDocument()}
                  style={styles.docPicker}
                  doc={this.state.doc}/>
              
              
        <Overlay visible={this.state.overlay}
         onClose={()=>this.setState({overlay:false})}  />
            </View>
            <View>
              <TouchableOpacity
                style={[styles.loginBtn, { marginHorizontal: 40 }]}
                onPress={() => this.pay()}
              >
                <Text style={styles.loginText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>
                </ScrollView >
            </Provider>
        );
    }
}