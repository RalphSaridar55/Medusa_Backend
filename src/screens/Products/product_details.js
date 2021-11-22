import React, { Component, createRef, useEffect, useImperativeHandle, useState, forwardRef } from "react";
import Carousel from "react-native-banner-carousel";
import {table,users} from './table_element';
import {
  Image,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
  StyleSheet,
  SafeAreaView
} from "react-native";
import TI from '../../components/TextInput';
import * as APIProduct from '../../core/apis/apiPortfolioServices';
import * as APIOrder from '../../core/apis/apiOrderServices';
import * as APIPayment from '../../core/apis/apiPaymentServices';
import Overlay from 'react-native-modal-overlay';
import styles from "./details_style";
import Dialog from "react-native-dialog";
import ActionSheet from "react-native-actions-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Card,
  Text,
  List,
  Title,
  Chip,
  Paragraph,
  DataTable,
  Headline,
  Button,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { stripePk } from "../../config/env";
import { CardField, /* confirmPayment, */ StripeProvider, useStripe  } from '@stripe/stripe-react-native';


const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;



const OverlayComp = forwardRef((props,ref) => {

    const { confirmPayment } = useStripe();
    const [data, setData] = useState({});
    useEffect(()=>{
        console.log("PROPS:",props)
    },[])
    /* const check = async () => {
        const { error, paymentIntent } = await confirmPayment();
        Alert.alert("Error", error.message)
    } */

    useImperativeHandle(ref,()=>{
      confPay = async() =>{
              //console.log(stripePk.)
              const {error} = await confirmPayment(props.token,{
                  type:'Card',
                  billingDetails:{
                      email:'joe@hotmail.com'
                  }
              });
              if(error)
                  console.log("Error: ",error.message)
              else
                  Alert.alert("Payment","Successful")
              //apiPayment.complete
      }
    })

    const sendBack = (t) => {
        console.log("TEST: ",t)
        if(t.complete==true){
            props.onchange(t);
            console.log(props.token)
            confPay()
        }
    }

    return (
        <StripeProvider publishableKey="pk_test_51JOxxsGCJMztZgE0TKoLJYbdwY3hYLwYI5LREVQ9YJhdHCKxAZVd1tISdFIahVMNSIN3gHlkjvBmz5aJd7kgv1BY00aF7Ni4gh"/* {stripePk.STRIPE_PK} */ merchantIdentifier="merchant.identifier">
            <SafeAreaView style={[styles2.docPicker, { display: !props.visible ? "none" : "flex" }]}>
                <CardField 
                    //ref={props.reference}
                    style={{ height: 50, }}
                    postalCodeEnabled={false}
                    onCardChange={(t) => {
                        sendBack(t)
                    }} />
            </SafeAreaView>
        </StripeProvider>
    )
})

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 300;

const images = [
  "https://sc04.alicdn.com/kf/U01854b32af4b45a09df828bfb95a4679t.jpg",
  "https://sc04.alicdn.com/kf/U60b3294b8bca43b4be7ace957e90226ee.jpg",
  "https://sc04.alicdn.com/kf/U185220e1ddb64ef9ad7526daa9a169e6i.jpg",
  "https://sc04.alicdn.com/kf/Hf6c4d5d39fc64fac945778df0d59851ba.jpg",
];

const actionSheetRef = createRef();
const actionSheetRef_V = createRef();

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.paymentRef = React.createRef()
    this.state = {
      order:null,
      visible: false,
      modalVisible:false,
      typeOverlay:'buy',
      dataFromRoute: null,
      selectedVariant:null,

      payment_token:null,
      isComplete:false,
      
      chosenPieces: 1,
      chosenBoxes: 1,
    
      seller:null,
      userData:null,
      reserveDays:0,
      reserveQuantity:0,
      reserveCost:0,
      //variant states
      variantId:0,
      variant_id:0,
      variant_option_id:0,
      varientType: {
        id: 0,
        varient_type: ""
      },
      varientValue: {
        id: 0,
        varient_value: ""
      },

      //cart
      cart:1,

      spinner:true,
      dataFromApi:null,
    };
  }

  handleAddAndSub(type, addOrSub) {
    //console.log(type);
    console.log(typeof this.state[type])
    /* if(this.state.selectedVariant==null){
      Alert.alert("Error","Please select a variant first")
      return
    } */
    ///else{
      if (addOrSub == "add")
        this.setState((prev) => ({ [type]: parseInt(prev[type]) + 1 }));
      else if (this.state[type] > 1)
        this.setState((prev) => ({ [type]: parseInt(prev[type]) - 1 }));
    //}
  }

  changeData(t){
    this.setState({isComplete:t.complete})
  }

  Reserve(){
    let sum = (this.state.chosenPieces * this.state.chosenBoxes)
    let {max_reserve_qty} = this.state.dataFromApi
    console.log('\nMAX: ',max_reserve_qty)
    if(this.state.reserveDays<1){
      Alert.alert("Error","Reserve days must be alteast 1 Day")
      return;
    }
    else if(this.state.reserveQuantity>max_reserve_qty || this.state.reserveQuantity>sum){
      Alert.alert("Error",`Reserve Quantity must be less than ${max_reserve_qty<sum?max_reserve_qty:sum}`)
      return;
    }
    else if(!this.state.isComplete){
      Alert.alert("Error",'Please enter your crredit card credentials')
      return;
    }
    else{
      console.log("PAMENT REF : ",this.paymentRef)
      Alert.alert("Should be successful")
    }
  }

  async componentDidMount() {
    let user = JSON.parse(await AsyncStorage.getItem('user_details'));
    console.log("ASYNC:",user) 
    console.log("ROUTE PARAMS: ", this.props.route.params);
    console.log("ROUTE IS NEGOTIABLE: ", this.props.route.params.item.user.id);
    APIProduct.getProductDetails(this.props.route.params.item.id).then((res)=>{
      console.log("API RESULT REGARDING DETAILED PRODUCT:",res)
      this.setState({spinner:false,dataFromApi:res})
    })
    this.setState({ dataFromRoute: this.props.route.params.item, userData:user,seller:this.props.route.params.item.user });
  }

  AddToCart = (type) =>{
    console.log("type of chosenPieces: ",typeof this.state.chosenPieces)
    console.log("type of chosenBoxes: ",typeof this.state.chosenBoxes)
    console.log("TOTAL ITEMS: ",this.state.chosenPieces*this.state.chosenBoxes)
    let pieces= parseInt(this.state.chosenPieces)
    let boxes= parseInt(this.state.chosenBoxes)
    console.log("TOTAL ITEMS: ",pieces*boxes)
    if(this.state.selectedVariant==null){
      Alert.alert("Error","Please select a variant first")
      return;
    }
    if(this.state.dataFromApi.current_stock<1){
      Alert.alert("Error","Product is no longer available")
      return;
    }
    else{
      if(/* pieces<this.state.dataFromApi.min_purchase_qty ||  */(boxes*pieces)<this.state.dataFromApi.min_purchase_qty){
        Alert.alert("Error",`Please make sure your purchase quantity is greater than ${this.state.dataFromApi.min_purchase_qty}`)
        return;
      }
      if(/* pieces<this.state.dataFromApi.min_purchase_qty ||  */(boxes*pieces)>this.state.dataFromApi.current_stock){
        Alert.alert("Error",`Available product quantity is: ${this.state.dataFromApi.current_stock}`)
        return;
      }
      if(/* pieces>this.state.dataFromApi.max_purchase_qty ||  */(pieces * boxes)>this.state.dataFromApi.max_purchase_qty){
        Alert.alert("Error",`Please make sure your purchase quantity is lesser than ${this.state.dataFromApi.max_purchase_qty}`)
        return;
      }
      let variant_qty = this.state.dataFromApi.productvariant.filter((i)=>i.id===this.state.variantId)[0].variant_stock
      console.log("VARIANT QTY IS: ",variant_qty)
      if(/* pieces>variant_qty ||  */(boxes*pieces)>variant_qty){
        Alert.alert("Error",`Variant quantity for this product is: ${variant_qty}`)
        return;
      }
    }
      console.log("TST")
      let payload = {
        buyer_id:this.state.userData.id,
        seller_id:this.state.seller.id,
        product_id:this.state.dataFromApi.id,
        quantity:this.state.chosenPieces,
        box:this.state.chosenBoxes,
        price:this.state.dataFromApi.offered_price,
        productvariant: [
          {
            id: this.state.variant_id,
            variant_option_id: this.state.variant_option_id,
            varientType: {
              id: this.state.varientType.id,
              varient_type:  this.state.varientType.varient_type
            },
            varientValue: {
              id: this.state.varientValue.id,
              varient_value:  this.state.varientValue.varient_value
            }
          }
        ],
        total:this.state.chosenPieces*this.state.dataFromApi.offered_price
      }
      console.log("PAYLOAD BECOMES: ",payload)
      if(type=="order"){
        this.setState({spinner:true})
        //api shouldnt be there
        //it should be called after the user chooses all the variants he wants
        //dont delete
        APIOrder.addToOrderBook(payload).then((res)=>{
          console.log("RESULT FROM ADD TO ORDER BOOK API: ",res)
          this.setState({
            spinner:false,
            variantId:0,
            variant_id:0,
            variant_option_id:0,
            varientType: {
              id: 0,
              varient_type: ""
            },
            varientValue: {
              id: 0,
              varient_value: ""
            },
            selectedVariant:null,
            chosenPieces: 1,
            chosenBoxes: 1,
          })
          Alert.alert("Order",res,[
            {text:"Ok", onPress:()=>this.props.navigation.navigate("Home")}
          ])
        }).catch(err=>{
          Alert.alert("Error",err.response?.data.message)
          this.setState({spinner:false})
        })
      }
      else if(type=="buy"){
        let {buyer_id,box,price,seller_id,product_id,quantity,productvariant,total} = payload;
       
        sendToRoute ={
          is_buy_now:true,
          buyer_id:buyer_id,
          total_service_count: 0,
          total_service_cost: 0,
          order_details:[
            {
              seller_id:seller_id,
              box:box,
              price:price,
              product_id:product_id,
              quantity:quantity,
              productvariant:productvariant,
            }
          ],
          total:total
        }

        console.log("TIS TATE : ",this.state.dataFromApi)
        this.setState({modalVisible:true,order:sendToRoute,typeOverlay:'buy'})
      }
      else{
        APIPayment.getClientToken().then((res)=>{
          this.setState({payment_token:res})
        }).then((res2)=>{
          this.setState({modalVisible:true,typeOverlay:'save'})
        })
      }
    }

  NegotiatePrice = () =>{
    if(this.state.dataFromApi.current_stock<1){
      Alert.alert("Error","Product is no longer available")
      return;
    }
    else{
      this.props.navigation.navigate("Negotiations",{screen:"Negotiation"})
    }
  }

  drawRestOfTable(){
      return(
          <>
        <View style={{ padding: 20 }}>
        <Title>Description:</Title>
        <Paragraph>
          {this.state.dataFromApi?.description}
        </Paragraph>
      </View>
      <View style={{ marginTop: 10 }}>
        <DataTable>
          <ScrollView style={{ height: 400 }}>
            <DataTable.Header>
              <DataTable.Title>Details</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Brand Name:</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.dataFromApi?.brand.brand_name}</DataTable.Cell>
            </DataTable.Row>
            {table.map((item,index)=>{
                return(
                <DataTable.Row key={index}>
                    <DataTable.Cell>{item.label}</DataTable.Cell>
                    <DataTable.Cell numeric>{this.state.dataFromApi?.[item.value]+""}{item.additional}</DataTable.Cell>
                </DataTable.Row>
                )
            })}
            {users.map((item,index)=>{
                return(
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.label}</DataTable.Cell>
                        <DataTable.Cell numeric onPress={()=>{
                            if(item.type)
                                Linking.openURL(/* `http://${item.label}` */"http://"+item.value)
                            else
                                return null
                    }}>{this.state.dataFromApi?.user[item.value]+""}{item.additional}</DataTable.Cell>
                    </DataTable.Row>
                )
            })}
            
          </ScrollView>
        </DataTable>
      </View>
      </>
      )
  }

  handleChangingVariant(item,variant){
    console.log("PRODUCT VARIANT ID: ",item)
    if(this.state.selectedVariant==item.id){
      console.log("STATE SELECTED VARIANT: ",this.state.selectedVariant)
      this.setState({selectedVariant:null})
    }
    else{
      console.log("STATE SELECTED VARIANT: ",this.state.selectedVariant)
      this.setState({selectedVariant:item.id,variant_option_id:item.variant_option_id,variantId:variant.id,variant_id:item.id,varientType:{id:item.varientType.id,varient_type:item.varientType.varient_type},varientValue:{id:item.varientValue.id,varient_value:item.varientValue.varient_value}})
    }
  }

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: image.media }}
        />
      </View>
    );
  }

  fillDataForCheckout=()=>{
    //let userdata = JSON.parse(AsyncStorage.getItem('user_details'));
    //console.log('USER DETAILS:' ,this.state.userData)
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

  render() {
    return (
      <View>
        <Spinner visible={this.state.spinner} />
        <Overlay visible={this.state.modalVisible} onClose={()=>this.setState({modalVisible:false,typeOverlay:'buy'})} 
      containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
      closeOnTouchOutside>
                      
          <View style={styles.modalHeader/* ,this.state.typeOverlay=="cart"&&{flex:1} */}>
              <Text
              style={{
                  fontSize: 21,
                  color: "#31C2AA",
                  fontWeight: "bold",
                  marginBottom: 5,
              }}
              >
                {this.state.typeOverlay=="buy"?"Order Placement":"Reserve Product"}
              </Text>
              <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
          </View>
          <View style={{flexDirection:'column',marginVertical:20}}>
          {this.state.typeOverlay=="buy"?<><View style={{width:150,paddingHorizontal:10}}>
                  <TouchableOpacity
                      onPress={()=>{
                          this.setState({modalVisible:false});
                          this.props.navigation.navigate("Checkout",{screen:"Delivery",params:{products:this.state.dataFromApi, order:this.state.order,type:"buy"}})
                        }}
                        style={[styles.loginBtn,{height:40,marginTop:20,backgroundColor:'#fff'}]}
                  >
                      <Text style={[styles.loginBtnText,{color:'#31C2AA'}]}>Delivery</Text>
                  </TouchableOpacity>
              </View>
              <View style={{width:150,paddingHorizontal:10}}>
                  <TouchableOpacity
                      onPress={()=>{
                          this.setState({modalVisible:false});
                          this.props.navigation.navigate("Checkout",{screen:"Pickup",params:{products:this.state.dataFromApi, order:this.state.order,type:"buy"}})
                      }}
                      style={[styles.loginBtn,{height:40,marginTop:20,backgroundColor:'#fff'}]}
                  >
                      <Text style={[styles.loginBtnText,{color:'#31C2AA'}]}>Pickup</Text>
                  </TouchableOpacity>
              </View>
            </>
          :
          <View style={{width:BannerWidth*0.8,paddingHorizontal:10}}>            
            <TI
              style={{ backgroundColor: "#fff" }}
              label="Days"
              placeholder="10"
              keyboardType="numeric"
              value={""+this.state.reserveDays}
              onChangeText={(text) =>
                this.setState({ reserveDays: text })
              }
              outlineColor="#C4C4C4"
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
            />            
            <TI
              style={{ backgroundColor: "#fff" }}
              label="Price"
              disabled={true}
              keyboardType="numeric"
              value={"$"+this.state.reserveCost}
              outlineColor="#C4C4C4"
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
            />           
            <TI
              style={{ backgroundColor: "#fff" }}
              label="Quantity"
              keyboardType="numeric"
              value={""+this.state.reserveQuantity}
              outlineColor="#C4C4C4"
              onChangeText={(text)=>{
                if(this.state.reserveDays>0)
                  this.setState({reserveQuantity:text,reserveCost:this.state.reserveDays*10+(0.1*this.state.reserveQuantity)})
              }}
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
            />
            <OverlayComp 
                  ref={this.paymentRef}
                  visible={true}
                  token={this.state.payment_token}
                  onClose={()=>this.setState({overlay:false})}
                  onchange={(t)=>this.changeData(t)}  />
              <TouchableOpacity
                onPress={() => this.Reserve()}
                style={[styles.loginBtn]}
              >
                <Text style={styles.loginBtnText}>Reserve</Text>
              </TouchableOpacity>
          </View>}
          </View>
      </Overlay>
        <ScrollView>
          <View style={styles.Bcontainer}>
            {this.state.dataFromApi && (
              <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth}
              >
                {this.state.dataFromApi?.images.map((image, index) =>
                  this.renderPage(image, index)
                )}
              </Carousel>
            )}
          </View>
          <View
            style={{
              paddingLeft: 15,
              padding: 10 /*  display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'space-between' */,
            }}
          >
            <Title>{this.state.dataFromApi?.product_name}</Title>
            {/* 
                        <Text>{this.state.dataFromRoute?.subCategory.sub_category_name}, {this.state.dataFromRoute?.brand.brand_name}</Text> */}
          </View>
          {/* <Card>
                        <Card.Title title="Description" style={{ fontSize: 15 }} />
                        <Card.Content>
                            <Text style={{marginTop:10,color:'gray'}}>{this.state.dataFromRoute?.description}</Text>
                        </Card.Content>
                    </Card> */}
          {/* <Card>
              <View style={styles.cartHeader}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#6E91EC'}}>Cart</Text>
                <MaterialCommunityIcons name="cart" size={24} color="#6E91EC"/>
              </View>
          </Card> */}
          <Card>
            {/* <View style={styles.cartIconContainer}>
              <MaterialCommunityIcons name="cart" size={30} color="#6E91EC" style={{paddingTop:5}}
              onPress={()=>this.setState({modalVisible:true,typeOverlay:'cart'})}/>
            </View> */}
            <Card.Title title="Variations" style={{ fontSize: 15 }} />
            <Card.Content>
              {this.state.dataFromApi?.productvariant.map((variant,index) => (
                variant.variant_stock>0?<View key={index}>
                  <Title style={{ fontSize: 14 }}>
                    {variant.productvariantopt[0].varientType.varient_type}:
                  </Title>
                  <ScrollView
                    style={{ display: "flex", flexDirection: "row" }}
                    horizontal
                  >
                    {variant.productvariantopt.map((item, index2) => (
                      <View key={index2}>
                        <TouchableOpacity onPress={()=>
                          this.handleChangingVariant(item,variant)
                          }>
                          <Image
                            source={{ uri: variant.variant_image }}
                            key={index2}
                            style={[styles.cardImage,this.state.selectedVariant==item.id?{borderColor:'#31C2AA'}:null]}
                          />
                        </TouchableOpacity>
                        <Text style={this.state.selectedVariant==item.id?{color:'#31C2AA'}:{color:'gray'}}>qty: {variant.variant_stock}</Text>
                        <Text style={this.state.selectedVariant==item.id?{color:'#31C2AA'}:{color:'gray'}}>
                          type: {item.varientValue?.varient_value}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>:null
              ))}

              <View style={styles.priceHeader}>
                <View style={{ flex: 3 }}>
                  <Title>
                    ${this.state.dataFromApi?.offered_price} - $
                    {this.state.dataFromApi?.price}
                  </Title>
                </View>
                {(this.state.dataFromApi?.is_negotiable && this.state.userData.user_type == 1 && this.state?.userData?.id !== this.state?.seller?.id) && <TouchableOpacity
                  onPress={() =>  this.NegotiatePrice()}
                  style={[styles.loginBtn, { flex: 2, height:30, backgroundColor:'#fff',borderColor:'#31C2AA', borderWidth:1 }]}
                >
                  <Text style={[styles.loginBtnText,{color: "#31C2AA",}]}>Negotiate Price</Text>
                </TouchableOpacity>}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title>Available:</Title>
                <Text style={{ color: "gray", fontSize:16 }}>
                  {this.state.dataFromApi?.current_stock} Pieces Available
                </Text>
              </View>
              {this.state.userData?.user_type==4 || this.state?.userData?.id === this.state?.seller?.id?null:(<><View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginVertical: 20,
                }}
              >
                <View style={styles.buttonOptionsContainer}>
                  <View style={styles.buttonOptions}>
                    <TouchableOpacity
                      onPress={() =>
                        this.handleAddAndSub("chosenPieces", "add")
                      }
                    >
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                    <TextInput style={{ color: "#31C2AA", fontSize: 24 }} value={this.state.chosenPieces+""} keyboardType="numeric"
                    onChangeText={(e)=>{
                      //if(this.state.selectedVariant==null)
                        //Alert.alert("Error","Please select a variant first")
                      /* else if(e.length==0)
                        this.setState({chosenPieces:0})
                      else  */this.setState({chosenPieces:e})
                      }} />
                    <TouchableOpacity
                      onPress={() =>
                        this.handleAddAndSub("chosenPieces", "minus")
                      }
                    >
                      <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonInfo}>
                    <Text style={{ color: "#31C2AA", fontSize: 18 }}>
                      Pieces/{this.state.chosenPieces} pieces
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonOptionsContainer}>
                  <View style={styles.buttonOptions}>
                    <TouchableOpacity
                      onPress={() => this.handleAddAndSub("chosenBoxes", "add")}
                    >
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                    <TextInput style={{ color: "#31C2AA", fontSize: 24 }} value={this.state.chosenBoxes+""} keyboardType="numeric"
                    onChangeText={(e)=>{
                      /* if(this.state.selectedVariant==null)
                        Alert.alert("Error","Please select a variant first")
                      else  */if(e.length==0)
                          this.setState({chosenBoxes:1})
                      else this.setState({chosenBoxes:e})
                      }} />
                    <TouchableOpacity
                      onPress={() =>
                        this.handleAddAndSub("chosenBoxes", "minus")
                      }
                    >
                      <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonInfo}>
                    <Text style={{ color: "#31C2AA", fontSize: 18 }}>
                      Box/{this.state.chosenBoxes} pieces
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginHorizontal:60,marginVertical:10}}>
                  <TouchableOpacity
                    onPress={() => this.AddToCart("buy")}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Buy Now</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginHorizontal:60,marginVertical:10}}>
                  <TouchableOpacity
                    onPress={() => this.AddToCart("order")}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Add to Cart</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginHorizontal:60,marginVertical:10}}>
                  <TouchableOpacity
                    onPress={() => this.AddToCart("Save")}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Save for Later</Text>
                  </TouchableOpacity>
              </View></>)}
            </Card.Content>
          </Card>

          <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title
                  onPress={() => {
                    actionSheetRef.current?.setModalVisible();
                  }}
                >
                  Details
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  onPress={() => {
                    actionSheetRef.current?.setModalVisible();
                  }}
                >
                  view more{" "}
                </DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>Brand Name:</DataTable.Cell>
                <DataTable.Cell numeric>{this.state.dataFromApi?.brand.brand_name}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Cargo Type:</DataTable.Cell>
                <DataTable.Cell numeric>{this.state.dataFromApi?.cargo_type_name}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <ActionSheet ref={actionSheetRef}>
              {this.drawRestOfTable()}
            </ActionSheet>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles2 = StyleSheet.create({
  modalBoxInputs: {
      borderWidth: 0.5,
      borderColor: '#31c2aa',
      borderRadius: 10,
      width: screenwidth * 0.7,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginVertical: 5
  },
  docPicker: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'lightgray',
      marginBottom: 20,
      marginTop: 10,
      paddingHorizontal: 5,
      justifyContent: 'center',
  },
})

export default ProductDetails;

/*
    <View style={{ padding: 10 }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <Headline>Similar products</Headline>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <Card>
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hf1bd3c0da31145ed835dab667efced6dP.jpg' }} style={{ height: 100 }} />
                                        <Card.Title title="Tops" subtitle="10 ~ 50 USD"></Card.Title>
                                    </Card>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                                    <Card >
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/HTB14p5ebyDxK1RjSsph762HrpXaT.png' }} style={{ height: 100 }} />
                                        <Card.Title title="Printer" subtitle="100 ~ 500 USD" ></Card.Title>
                                    </Card>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Card>
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hcaeb65c4343249649d5a8bb45af9408cI.jpg' }} style={{ height: 100 }} />
                                        <Card.Title title="Glasses" subtitle="1 ~ 5 USD"></Card.Title>
                                    </Card>
                                </View>
                            </View>
                        </View>

*/
