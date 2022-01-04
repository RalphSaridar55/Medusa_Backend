import React, { Component, useContext } from "react";
import {documentBlobConverter} from '../../helpers/documentBlobConverter'
import Spinner from 'react-native-loading-spinner-overlay';
import Overlay from './overlay';
import { docValidator } from "../../helpers/docValidator";
import {TouchableOpacityButton} from '../../components/TouchableOpacity'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
  LogBox,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style_delivery";
import * as ApiDocument from "../../core/apis/apiDocumentService";
import * as apiServices from "../../core/apis/apiAddressServices";
import * as apiProducts from '../../core/apis/apiProductServices';
import {
  Divider,
  Provider,
} from "react-native-paper";
import { RenderPicker } from "../../components/Picker";
import _ from "lodash";
import * as DocumentPicker from "expo-document-picker";
import TextInput from "../../components/TextInput";
import {TouchableDocumentPicker} from '../../components/DocumentPicker';
import * as apiPayment from '../../core/apis/apiPaymentServices';
import * as apiOrder from '../../core/apis/apiOrderServices';

//// Buttons
const containerStyle =
{
  borderWidth: 1,
  borderColor: "#C4C4C4",
  borderRadius: 4,
  marginVertical: 10,
  height: 55,
  justifyContent: "center",
  backgroundColor: "#fff",
}

export default class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardComplete:false,
      loading: true,
      visible: false,
      location: 0,
      cargo_method: 1,
      delivery_address: {
        address_id: null,
        address: null,
      },
      cargo_methods: [
        { label: "Land", value: 1 },
        { label: "Sea", value: 2 },
        { label: "Air", value: 3 },
      ],
      payment: 2,
      payments: [],
      filterLocations: [],
      filteredLocation: {
        Country: "",
        State: "",
        City: "",
        Street: "",
      },
      // data: [
      //   {
      //     id: 1,
      //     name: "116 Smart watch ",
      //     image:
      //       "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg",
      //     count: "100$",
      //     value: true,
      //   },
      //   {
      //     id: 3,
      //     name: "Z15 Smartwatch",
      //     image:
      //       "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg",
      //     count: "100$",
      //     value: false,
      //   },
      //   {
      //     id: 2,
      //     name: "Q12 Smartwatch",
      //     image:
      //       "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg",
      //     count: "100$",
      //     value: true,
      //   },
      //   {
      //     id: 4,
      //     name: "Z15 Smartwatch",
      //     image:
      //       "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg",
      //     count: "100$",
      //     value: false,
      //   },
      //   {
      //     id: 5,
      //     name: "Q12 Smartwatch",
      //     image:
      //       "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg",
      //     count: "100$",
      //     value: true,
      //   },
      //   {
      //     id: 6,
      //     name: "Z15 Smartwatch",
      //     image:
      //       "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg",
      //     count: "100$",
      //     value: false,
      //   },
      // ],
      Location: "",
      countries: [],
      locations: [],
      //payments: "",
      doc: "",
      docError: "",
      cargo: "",
      typeofservice: "",
      serviceLevel: "",

      products: [],
      dataFromRoute: null,
      payment_method_id:0,
      payment_method:'',
      overlay:false,

      fetchedServicesType:[],
      fetchedServices:[],
      serviceLevel:1,
      serviceLevelString:null,
      service:null,
      payment_token:null,
      cardInfo:null,
    };
  }

  // componentDidMount(){
  // }

  componentDidMount() {
    // this.effectFunction()  
    this.focusListener = this.props.navigation.addListener("focus", () => {
      
    //console.log("FROM CONTEXT:",this.product)
    // this.calculateTotal();
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

  this.changeServiceType(1)

  apiPayment.getPaymentMethods().then((res)=>{
    console.log("Result Payment: ",res)
    this.setState({payments:res})
  })
    });
  } 

  effectFunction = () =>{
    //console.log("FROM CONTEXT:",this.product)
    // this.calculateTotal();
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

  this.changeServiceType(1)

  apiPayment.getPaymentMethods().then((res)=>{
    console.log("Result Payment: ",res)
    this.setState({payments:res})
  })
  }

  calculateTotal() {
    let array = this.state.data.map((i) =>
      parseFloat(i.count.substring(0, this.state.data.length - 1))
    );
    //console.log(array)
    const total = array.reduce((pre, curr) => pre + curr);
    //console.log(total)
    this.setState({ total: total });
  }

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

  changeData=(e)=>{
    //console.log("TEST:",e)
    if(e.complete==true){
      console.log("true")
      this.setState({cardComplete: e.complete})
    }
    //console.log("Test 1234",e,"+++++");
    /* this.setState({cardInfo:e}) */
  }

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:false});
    let test = docValidator(result.name);
    if (test == true){
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or png type of files"
      );
    this.setState({docError:true, doc:null})
    }
    else {
      console.log(result);
      try {
        this.setState({ doc: result }); 
      } catch (error) {
        this.setState({ docError: error });
      }
    }
  };

  openMenu = () => {
    this.setState({ visible: true });
  };
  closeMenu = () => {
    this.setState({ visible: false });
  };
  clickEventListener = (item) => {
    this.setState({ userSelected: item }, () => {
      alert(item.name);
    });
  };

  pay() {
    this.setState({loading:true})
    if(this.state.doc.uri === undefined){
      Alert.alert("Error","Please choose a document first")
      this.setState({loading:false})
      return
    }
    console.log("PLACING ORDER DATA: ", this.state.dataFromRoute);
    let { delivery_address, payment, cargo_method, doc } = this.state;
    let payload = {
      order_method_id: this.props.route.name == "Delivery" ? 2 : 1,
      delivery_address: delivery_address,
      payment_method_id: payment,
      //payment_token_id: "",
      cargo_delivery_method: cargo_method,
      
      document: doc,
    };

    console.log("PAYLOAD: ", payload);
    let error = false;
    Object.keys(payload).map((item, index) => {
      switch (typeof item) {
        case "number":
          if (payload[item] == 0) {
            this.setState({loading:false})
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
        case "string":
          if (payload[item] == "") {
            this.setState({loading:false})
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
        default:
          if (payload[item].address_id == 0 || payload[item].address == "") {
            this.setState({loading:false})
            Alert.alert(
              "Error",
              `Please fill the input ${item.replace(/_/g, " ")}`
            );
            error=true;
            return;
          }
      }
    });
    if(!error){
    
      new Promise(async(resolve,rejection)=>{
        let payloadToSend = [{uri:this.state.doc.uri,name:this.state.doc.name}]
        console.log("DOCUMENT URI: ",payload.document.uri)
        let blob =await Promise.all(await documentBlobConverter(payloadToSend))
        resolve ({blob:blob, payloadToSend:payloadToSend})
      }).then((res)=>{
            let result = res.payloadToSend.map((item,index)=>{
              let docName = item.name
              return {document:res.blob[index], extension:docName.substring(docName.length-4, docName.length)}

            })
            return (result)
      }).then(async(res2)=>{
         console.log("document:",typeof res2[0].document,"\n",res2[0].extension)
         let result_data = await ApiDocument.uploadDoc({document:res2[0].document,extension:res2[0].extension})

        console.log("RESULT: ",result_data)
         payload.document = await result_data
      })
      .then((res)=>{
        let payload2 = {...payload, ...this.state.dataFromRoute,service_type: this.state.service, service_level: this.state.serviceLevel,}
        console.log("PAYLOAD2: ",payload2)
          if(this.state.payment!=4){  
            apiPayment.placeOrder(payload2).then((res)=>{
              console.log("SHOUDL BE SUCCESSFUL");
              this.setState({loading:false})
              Alert.alert("Payment",res,[
                {text:"Ok",onPress:()=>this.props.navigation.navigate("Home")}
              ])
            }).catch(err=>{
              this.setState({loading:false})
              Alert.alert("Error API",err.response.data.message)
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
      }).catch(err=>{
        Alert.alert("Error",err.response.data.message)
        this.setState({loading:false})
        return
      }) 
    }
  }

  render() {
    return (
      <Provider>
        <Spinner visible={this.state.loading} />
        <View style={{ margin: 10 }}>
          <Text style={[styles.header]}>Delivery</Text>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            <Text
              style={{
                padding: 10,
                marginLeft: 5,
                fontSize: 20,
                fontFamily:'Adam-Bold',
                // fontWeight: "bold",
                color: "#698EB7",
              }}
            >
              Order Summary
            </Text>

            {this.state.products.length>0 && <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.products}
              // ItemSeparatorComponent={() => {
              //     return (
              //         <View style={styles.separator} />
              //     )
              // }}
              keyExtractor={(item,index) => {
                return index.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <ScrollView>
                    <View>
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                          this.clickEventListener(item);
                        }}
                      >
                        <Image
                          style={styles.image}
                          source={{ uri: item?.images[0].media }}
                        />
                        <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.product_name}</Text>
                          {item?.value_added_services !== null ? (
                            <Text
                              style={{
                                display: item.value ? "flex" : "none",
                                color: "#31C2AA",
                                fontFamily:'Inter-Black-Light'
                              }}
                            >
                              Value added service{" "}
                            </Text>
                          ) : null}
                          <Text style={styles.count}>Price ${this.state?.dataFromRoute.is_buy_now?item.price:item.total}</Text>
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
                    </View>
                  </ScrollView>
                );
              }}
            />}
            <Divider></Divider>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  padding: 10,
                  marginLeft: 10,
                  fontSize: 17,
                  fontFamily:'Inter-Black-Light',
                  // fontWeight: "bold",
                  color: "#31C2AA",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  padding: 10,
                  marginLeft: 10,
                  fontSize: 17,
                  fontFamily:'Inter-Black-Light',
                  // fontWeight: "bold",
                  color: "#31C2AA",
                }}
              >
                $
                {(this.state.products.length > 0 &&!this.state?.dataFromRoute?.is_buy_now)
                  ? this.state.products.reduce((a, b) => ({
                      total: a.total + b.total,
                    }))["total"] + ""
                  : this.state?.dataFromRoute?.total}
              </Text>
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
                  fontSize: 20,
                  fontFamily:'Inter-Black-Light',
                  // fontWeight: "bold",
                  marginBottom: 20,
                  color: "#698EB7",
                }}
              >
                Shipment Details
              </Text>
              <RenderPicker
                  containerStyle={containerStyle} 
                  selectedValue={this.state.serviceLevel}
                  prompt="Service Level"
                  onValueChange={(itemValue, itemIndex) => {
                    this.changeServiceType(itemValue)
                  }}
                  map={this.state.fetchedServicesType}/>
                <RenderPicker
                    containerStyle={containerStyle} 
                  selectedValue={this.state.service}
                  prompt="Service Type"
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ service: itemValue });
                    
                  }}
                  map={this.state.fetchedServices}/>
              <RenderPicker
                  containerStyle={containerStyle} 
                  selectedValue={this.state.cargo_method}
                  prompt="Cargo Delivery Method"
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ location: itemValue });
                  }}
                  map={this.state.cargo_methods}/>
              <RenderPicker 
                  containerStyle={containerStyle} 
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
              </View>
          </View>
          <View style={{
                      marginRight:10,
                      marginLeft:10
                      }}>
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
                      // fontWeight: "bold",
                      fontFamily:'Inter-Black-Light',
                      marginBottom: 20,
                      color: "#698EB7",
                    }}
                  >
                    Payment Details
                  </Text>
                  <RenderPicker
                    containerStyle={containerStyle}
                      selectedValue={this.state.payment}
                      prompt="Payment Method"
                      onValueChange={(itemValue, itemIndex) => {
                        this.selectPayMethod(itemValue);
                      }}
                      map={this.state.payments}/>
                      
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
              </View>
              <TouchableOpacityButton
                onPress={() => this.pay()}
                text="Place Order" />
        </ScrollView>
      </Provider>
    );
  }
}
