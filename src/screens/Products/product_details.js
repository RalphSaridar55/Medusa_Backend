import React, { Component, createRef } from "react";
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
  TextInput
} from "react-native";
import * as APIProduct from '../../core/apis/apiPortfolioServices'
import * as APIOrder from '../../core/apis/apiOrderServices'
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
    this.state = {
      visible: false,
      modalVisible:false,
      typeOverlay:'buy',
      dataFromRoute: null,
      selectedVariant:null,
      chosenPieces: 1,
      chosenBoxes: 1,
      seller:null,
      userData:null,

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
    if(this.state.selectedVariant==null){
      Alert.alert("Error","Please select a variant first")
      return
    }
    else{
      if (addOrSub == "add")
        this.setState((prev) => ({ [type]: prev[type] + 1 }));
      else if (this.state[type] > 1)
        this.setState((prev) => ({ [type]: prev[type] - 1 }));
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

  showDialog = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleDelete = () => {
    this.setState({ visible: false });
  };

  BuyNow = () =>{
    if(this.state.dataFromApi.current_stock<1){
      Alert.alert("Error","Product is no longer available")
      return;
    }
    else{
      this.setState({modalVisible:true})
    }
  }

  AddToCart = () =>{
    if(this.state.dataFromApi.current_stock<1){
      Alert.alert("Error","Product is no longer available")
      return;
    }0
    if(this.state.selectedVariant==null){
      Alert.alert("Error","Please select a variant first")
      return;
    }
    if(this.state.chosenBoxes<1){
      Alert.alert("Error","Please make sure number of boxes is greater than 0")
      return;
    }
    else{
      if(this.state.chosenPieces<this.state.dataFromApi.min_purchase_qty || (this.state.chosenBoxes*this.state.chosenPieces)<this.state.dataFromApi.min_purchase_qty){
        Alert.alert("Error",`Please make sure your purchase quantity is greater than ${this.state.dataFromApi.min_purchase_qty}`)
        return;
      }
      if(this.state.chosenPieces>this.state.dataFromApi.max_purchase_qty || (this.state.chosenPieces * this.state.chosenBoxes)>this.state.dataFromApi.max_purchase_qty){
        Alert.alert("Error",`Please make sure your purchase quantity is lesser than ${this.state.dataFromApi.max_purchase_qty}`)
        return;
      }
      let variant_qty = this.state.dataFromApi.productvariant.filter((i)=>i.id===this.state.variantId)[0].variant_stock
      console.log("VARIANT QTY IS: ",variant_qty)
      if(this.state.chosenPieces>variant_qty || (this.state.chosenBoxes*this.state.chosenPieces)>variant_qty){
        Alert.alert("Error",`Please make sure your purchase quantity is lesser than ${variant_qty}`)
        return;
      }
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
      this.setState({spinner:true})
      console.log("PAYLOAD BECOMES: ",payload)
      //api shouldnt be there
      //it should be called after the user chooses all the variants he wants
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
        Alert.alert("Order",res)
      }).catch(err=>{
        Alert.alert("Error",err.response?.data.message)
        this.setState({spinner:false})
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

  renderTypeOverlay(type){
    switch(type){
      case 'buy':
        return <><View style={{flexDirection:'column',marginTop:20,alignItems:'center'}}>
        <View style={{width:150,paddingHorizontal:10}}>
            <TouchableOpacity
                onPress={()=>{
                    this.setState({modalVisible:false});
                    this.props.navigation.navigate("Checkout",{screen:"Pickup"})}
                }
                style={[styles.loginBtn,{height:40,marginTop:20},{ backgroundColor:'#fff',borderColor:'#31C2AA', borderWidth:1, }]}
            >
                <Text style={[styles.loginBtnText,{color:'#31C2AA'}]}>Pickup</Text>
            </TouchableOpacity>
        </View>
        <View style={{width:150,paddingHorizontal:10}}>
            <TouchableOpacity
                onPress={()=>{
                    this.setState({modalVisible:false});
                    this.props.navigation.navigate("Checkout",{screen:"Delivery"})}
                }
                style={[styles.loginBtn,{height:40,marginTop:20},{ backgroundColor:'#fff',borderColor:'#31C2AA', borderWidth:1, }]}
            >
                <Text style={[styles.loginBtnText,{color:'#31C2AA'}]}>Delivery</Text>
            </TouchableOpacity>
        </View>
    </View></>
    case 'cart':
      return <View>
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20}}>
          <Text>Total:</Text>
          <Text>$2100</Text>
        </View> */}
        <ScrollView style={{flexDirection:'column'}}>
      <View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View><View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View><View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5,marginBottom:10}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View><View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View>
      <View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View>
      <View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View>
      <View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View>
      <View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View>
      <View style={{flexDirection:'column',borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingBottom:5}}>
        <View style={styles.cartItemContainer}>
          <Image source={require('../../../assets/images/mouse.png')} style={{width:100,height:100}} resizeMode="contain" />
          <Text style={{color:'#31C2AA',fontSize:18}}> x 90</Text>
          <Text style={{color:'#31C2AA',fontSize:18}}> total: $300</Text>
          <MaterialCommunityIcons name="close" size={18} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
        </View>
        <View style={[styles.cartItemContainer,{justifyContent:'space-around'}]}>
          <Text>Variant Type: Test</Text>
          <Text>Variant Value: Test</Text>
        </View>
      </View>
  </ScrollView></View>
  
    }
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
                {this.state.typeOverlay=="buy"?"Buying Options":"My Cart"}
              </Text>
              <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>this.setState({modalVisible:false,typeOverlay:'buy'})}/>
          </View>
          <View style={{width:Dimensions.get('screen').width}}>{this.renderTypeOverlay(this.state.typeOverlay)}</View>
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
            <View style={styles.cartIconContainer}>
              <MaterialCommunityIcons name="cart" size={30} color="#6E91EC" style={{paddingTop:5}}
              onPress={()=>this.setState({modalVisible:true,typeOverlay:'cart'})}/>
            </View>
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
                {(this.state.dataFromApi?.is_negotiable && this.state.userData.user_type == 1) && <TouchableOpacity
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
              {this.state.userData?.user_type==1?(<><View
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
                    onChangeText={(e)=>this.setState({chosenPieces:e})} />
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
                    onChangeText={(e)=>this.setState({chosenBoxes:e})} />
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
                    onPress={() => this.BuyNow()}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Buy Now</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginHorizontal:60,marginVertical:10}}>
                  <TouchableOpacity
                    onPress={() => this.AddToCart()}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Add to Cart</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginHorizontal:60,marginVertical:10}}>
                  <TouchableOpacity
                    onPress={() => console.log("Test")}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Save for Later</Text>
                  </TouchableOpacity>
              </View></>):null}
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
