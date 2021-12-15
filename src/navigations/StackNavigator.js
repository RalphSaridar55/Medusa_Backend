import React, { Component, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Touchable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, Ionicons, Feather, Fontisto, FontAwesome5, FontAwesome} from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../screens/Home/home";
import { NavigationContainer } from "@react-navigation/native";
import * as apiServices from "../core/apis/apiUserServices";
import CollapsibleList from "react-native-collapsible-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importing Stacks
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import ProductStack from "./ProductStack";
import AdressStack from "./AdressStack";
import OrderStack from "./OrderStack";
import CategoriesStack from "./CategoryStack";
import CheckoutStack from "./CheckoutStack";
import RoleStack from "./RoleStack";
import NotificationStack from "./NotificationsStack";
import NegotiationStack from "./NegotiationStack";
import DashboardStack from "../screens/Dashboard/Dashboard";
import CampaignStack from "./CampaignStack";
import LoyaltyStack from "./LoyaltyStack";
//

import Deals from '../screens/Deals/Deals'
import ContactScreen from "../screens/Contact/contact";
import AboutScreen from "../screens/About/about";
import Activity from "../screens/Activity/Activity";
import Categories from "../screens/Categories/categories";
import Negotiations from "../screens/Notifications/Notification";
import Faq from '../screens/Faq/Faq';
import TrackingList from "../screens/Tracking/TrackingList";

import Spinner from "react-native-loading-spinner-overlay";
import SignContract from "../components/SignContract";
import Dashboard from "../screens/Dashboard/Dashboard";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// code below is just to test the api
const TStack = createDrawerNavigator();

const style = {
  ff:{fontFamily:'Adam-Bold',textAlignVertical:'center'}
}
/* const Drawer = () =>{
    return()
} */
class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    /* const didBlurSubscription = this.props.navigation.addListener(
    'didFocus',
    payload => {
          console.log('didFocus');
    }); */
    this.firstRef = React.createRef();
    this.secondRef = React.createRef();
    this.thirdRef = React.createRef();
    this.state={
      userType:null,
      userApproved:null,
      loggedIn:false,
      userData:null,
    }
  }
  componentDidMount(){
    // this.props.closeDrawer()
    console.log("NAV: ",this.props.navigation)
    this.props.navigation.toggleDrawer()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.userType !== this.state.userType){
      console.log("RUNNING123",this.props.userData);
      this.setState({userType:this.props.userType,userApproved:this.props.approved,loggedIn:this.props.loggedIn,userData:this.props.userData})
    }
      //this.setState({userType: this.props.userType})
  }

  /* componentWillMount(){
      this.focusListener = this.props.navigation.addListener("focus",()=>{
        
    console.log("CIOMP: ",this.props)
      console.log("RUNNING123 FROM FOCUS",this.props.userType)
      this.setState({userType: this.props.userType})
    })
  } */

  closeCollapsible(){
    let first = this.firstRef.current
    let second = this.secondRef.current
    let third = this.thirdRef.current
    if(first?.state.collapsed)
      first.toggle()
    if(second?.state.collapsed)
      second.toggle()
    if(third?.state.collapsed)
      third.toggle()
  }
  async SignContract(){
    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
    let change = {...user,is_approved:1}
    AsyncStorage.setItem('user_details',JSON.stringify(change))
    this.setState({userApproved:1})
    //this.props.userType=currentType==4?1:4;
    //console.log("BECOMES: ",this.props.userType)
  }

  async changeUserType(currentType){
    console.log("Current Type: ",currentType)
    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
    let change = {...user,user_type:currentType==4?1:4}
    AsyncStorage.setItem('user_details',JSON.stringify(change))
    this.setState({userType:currentType==4?1:4})
  }

  render(){
    
    return (
    <DrawerContentScrollView {...this.props} showsVerticalScrollIndicator={false}>
      <View>
        <View
        style={{display:'flex',alignItems:'center',marginVertical:0}}>
          <Image source={require('../../assets/images/drawerlogo.png')} style={{width:300,height:200}}/>
        </View>
        {this.state.loggedIn&&
        (<View style={{display:'flex',alignItems:'center',marginBottom:10}}>
          <Text style={[style.ff,{color: "#6E91EC",fontSize:20}]}>
            {this.state.userData?.company_name}
          </Text>
          <Text style={[style.ff,{color: "#6E91EC",fontSize:16,marginTop:10}]}>
            Logged in as: {this.state.userType==4?"Seller":"Buyer"}
          </Text>
        </View>)}
        <DrawerItem
          label="Home"
          labelStyle={[style.ff,{ color:this.props.screenC=="Home"?"#6E91EC":"black"}]}
          onPress={() => {
            this.props.changeScreen("Home")
            this.props.navigation.navigate("Home");
            this.closeCollapsible();
            }}
          icon={(focused = true) => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={this.props.screenC=="Home" ? "#6E91EC" : "black"}
            />
          )}
        />
        {this.state.userType==1 && this.props.userTypeStatic==1?<>
        <DrawerItem
          label="Become a Seller"
          labelStyle={[style.ff,{color:'black'}]}
          onPress={() => {
            // this.props.changeScreen("Home")
              this.closeCollapsible();
              apiServices.logout().then(async(res) => {
                this.setState({userType:null})
                console.log("WHEN LOGGING OUT: ", res);
                let changing = JSON.parse(await AsyncStorage.getItem('user_details'))
                await AsyncStorage.setItem('user_details',JSON.stringify({...changing,user_type:1,user_type_static:1}))
                // await AsyncStorage.clear();
                await AsyncStorage.removeItem("company_name");
                await AsyncStorage.removeItem("user_id");
                await AsyncStorage.removeItem("user_details");
                changing = JSON.parse(await AsyncStorage.getItem('user_details'))
                // console.log("ASYNC: ",changing);
                this.props.navigation.navigate("Auth",{screen:'Registration'})
            })
          }}
          icon={(focused = true) => (
            <Ionicons name="create-outline" size={24} color="black" />
          )}
        /></>:null}
      </View>
      {this.state.loggedIn ? (
        <>
      {this.props.userTypeStatic==4?<View>
          <TouchableOpacity
            onPress={() => {
              this.closeCollapsible();
              this.props.navigation.navigate('Home');
              this.changeUserType(this.state.userType)
            }}
            style={{ flexDirection: "row", marginVertical: 15, marginLeft: 20 }}
          ><Fontisto name="arrow-swap" size={24} color="black" />
            <Text style={[style.ff,{ color: "black", marginLeft: 30 }]}>Switch To {this.state.userType==4?"Buyer":"Seller"}</Text>
          </TouchableOpacity>
        </View>:null }
        
      {this.props.userTypeStatic==1 || this.state.userType==1 ?
        <DrawerItem
          label="Tracking"
          labelStyle={[style.ff,{color:this.props.screenC=="Tracking"?"#6E91EC":"black"}]}
          onPress={() => {
            this.closeCollapsible();
            this.props.changeScreen("Tracking")
            this.props.navigation.navigate("Tracking");
          }}
          icon={() => <MaterialIcons name="local-shipping" size={24} color={this.props.screenC=="Tracking" ? "#6E91EC" : "black"} />}
        />:null}
        {this.state.userType==4?(<><View>
          <DrawerItem
            label="Dashboard"
            labelStyle={[style.ff,{color:this.props.screenC=="Dashboard"?"#6E91EC":"black"}]}
            onPress={() => {
              this.closeCollapsible();
              this.props.changeScreen("Dashboard")
              this.props.navigation.navigate("Dashboard");
            }}
            icon={() => <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={this.props.screenC=="Dashboard" ? "#6E91EC" : "black"} />}
          />
        </View></>):null}
        
        
        <View>
            <DrawerItem
              label="Orders"
              labelStyle={[style.ff,{color:this.props.screenC=="Orders" ?"#6E91EC":"black"}]}
              onPress={() =>{ 
                this.closeCollapsible();
                this.props.changeScreen("Orders")
                this.props.navigation.navigate("Orders")}
              }
              icon={() => <Ionicons name="receipt-outline" size={24} 
              color={this.props.screenC=="Orders" ? "#6E91EC" : "black"} />}
            />
          </View>
          <View>
            <DrawerItem
              label="Deals"
              labelStyle={[style.ff,{color:this.props.screenC=="Deals" ?"#6E91EC":"red"}]}
              onPress={() => {
                this.closeCollapsible();
                this.props.changeScreen("Deals")
                this.props.navigation.navigate("Deals");
              }}
              icon={() => <MaterialIcons name="local-offer" size={24} color={this.props.screenC=="Deals" ? "#6E91EC" : "red"} />}
            />
          </View>
          <View>
            <DrawerItem
              label="Products"
              labelStyle={[style.ff,{color:this.props.screenC=="Product" ?"#6E91EC":"black"}]}
              onPress={() => {
                this.closeCollapsible();
                this.props.changeScreen("Product")
                this.props.navigation.navigate("Product",{userType:this.props.userType, screen:"List"});
              }}
              icon={() => <Feather name="box" size={24} color={this.props.screenC=="Product" ? "#6E91EC" : "black"} />}
            />
          </View>
          
            <View>
            <DrawerItem
              label="Negotiations"
              labelStyle={[style.ff,{color:this.props.screenC=="Negotiations" ?"#6E91EC":"black"}]}
              onPress={() =>{
                this.closeCollapsible();
                this.props.changeScreen("Negotiations")
                this.props.navigation.navigate("Negotiations", {screen:'NegotiationList'})
              }}
              icon={() => (
                <FontAwesome5
                  name="handshake"
                  size={20}
                  color={this.props.screenC=="Negotiations" ? "#6E91EC" : "black"}
                />
              )}
            />
          </View>
          
          
          {this.state.userType==4?(<><View>
            <DrawerItem
              label="Loyalty Points"
              labelStyle={[style.ff,{color:this.props.screenC=="LoyaltyPoints" ?"#6E91EC":"black"}]}
              onPress={() =>{ 
                this.closeCollapsible();
                this.props.changeScreen("LoyaltyPoints")
                this.props.navigation.navigate("LoyaltyPoints",{screen:"Loyalty"})}
              }
              icon={() => <MaterialCommunityIcons name="chart-donut" size={24} 
              color={this.props.screenC=="LoyaltyPoints" ? "#6E91EC" : "black"} />}
            />
          </View><View>
            <DrawerItem
              label="Campaign"
              labelStyle={[style.ff,{color:this.props.screenC=="Campaign" ?"#6E91EC":"black"}]}
              onPress={() =>{ 
                this.closeCollapsible();
                this.props.changeScreen("Campaign")
                this.props.navigation.navigate("Campaign")}
              }
              icon={() => <Feather name="speaker" size={24} 
              color={this.props.screenC=="Campaign" ? "#6E91EC" : "black"} />}
            />
          </View><View>
          <DrawerItem
            label="Activity"
            labelStyle={[style.ff,{color:this.props.screenC=="Activity" ?"#6E91EC":"black"}]}
            onPress={() => {
              this.closeCollapsible();
              this.props.changeScreen("Activity")
              this.props.navigation.navigate("Activity");
            }}
            icon={() => <Ionicons name="newspaper-outline" size={24} color={this.props.screenC=="Activity" ? "#6E91EC" : "black"} />}
          />
        </View></>):null}
          {/* <View>
            <DrawerItem
              label="Categories"
              labelStyle={[style.ff,{color:this.props.screenC=="Categories" ?"#6E91EC":"black"}]}
              onPress={() => {
                this.closeCollapsible();
                this.props.changeScreen("Categories")
                this.props.navigation.navigate("Categories");
              }}
              icon={() => <MaterialIcons name="category" size={24} color={this.props.screenC=="Categories" ? "#6E91EC" : "black"} />}
            />
          </View> */}
          
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 20,
            }}
          >
            <CollapsibleList
              ref={this.thirdRef}
              numberOfVisibleItems={0}
              buttonPosition="top"
              buttonContent={
                <View style={{ flexDirection: "row", marginVertical: 15 }}>
                  <Ionicons name="settings-outline" size={24} color="black" />
                  <Text style={[style.ff,{ color: "black", marginLeft: 30}]}>
                    Settings
                  </Text>
                </View>
              }
            >
              <View style={{ marginLeft: 30 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("User");
                      this.props.changeScreen("User")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="users" size={24} color={this.props.screenC =="User"?"#6E91EC":"black"} />
                    <Text style={[style.ff,{color:this.props.screenC =="User"?"#6E91EC":"black",marginLeft: 30 }]}>
                      User Management
                    </Text>
                  </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>{
                      this.props.navigation.navigate("Adress", { screen: "Details" })
                      this.props.changeScreen("AdressDetails")
                      }}
                      style={{ flexDirection: "row", marginVertical: 10 }}>
                      <Feather name="user" size={24} color={this.props.screenC =="AdressDetails"?"#6E91EC":"black"} />
                      <Text style={[style.ff,{color:this.props.screenC =="AdressDetails"?"#6E91EC":"black",marginLeft: 30 }]}>
                      Account Details
                    </Text>
                  </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", display:'flex', marginVertical: 10 }}
                    onPress={() =>{
                      this.props.navigation.navigate("Role", { screen: "Roles" })
                      this.props.changeScreen("Role")
                    }}>
                    <Feather name="lock" size={24}  color={this.props.screenC =="Role"?"#6E91EC":"black"} />
                    <Text style={[style.ff,{color:this.props.screenC =="Role"?"#6E91EC":"black",marginLeft: 30 }]}>
                      Roles & Permissions
                    </Text>
                  </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>{
                      this.props.navigation.navigate("Adress",{screen:'List'})
                      this.props.changeScreen("Adress")
                      }}
                     style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Text style={[style.ff,{color:this.props.screenC =="Adress"?"#6E91EC":"black",marginLeft: 30 }]}>
                      User Address
                    </Text>
                  </TouchableOpacity>
                  {this.state.userType==4?(<TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Adress",{screen:"Selling"});
                      this.props.changeScreen("Selling")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="book" size={24} color={this.props.screenC =="Selling"?"#6E91EC":"black"} />
                    <Text style={[style.ff,{color:this.props.screenC =="Selling"?"#6E91EC":"black",marginLeft: 30 }]}>
                      Selling Details
                    </Text>
                  </TouchableOpacity>):null}
                  {/* {this.state.userType==4?(<TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Adress",{screen:"Sponsored"});
                      this.props.changeScreen("Sponsored")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="dollar-sign" size={24} color={this.props.screenC =="Sponsored"?"#6E91EC":"black"} />
                    <Text style={[style.ff,{color:this.props.screenC =="Sponsored"?"#6E91EC":"black",marginLeft: 30 }]}>
                      Promoted Products
                    </Text>
                  </TouchableOpacity>):null} */}
              </View>
            </CollapsibleList>
          </View>
        </>
      ) : null}
      <View>
          <DrawerItem
              label="About Us"
              labelStyle={[style.ff,{color:this.props.screenC=="About Us" ?"#6E91EC":"black"}]}
              onPress={() =>{ 
                this.closeCollapsible();
                this.props.changeScreen("About Us")
                this.props.navigation.navigate("About")
              }}
              icon={() => <Feather name="globe" size={24} 
              color={this.props.screenC=="About Us" ? "#6E91EC" : "black"} />}
            />
      </View>
      <View>
        <DrawerItem
          label="Contact Us"
          labelStyle={[style.ff,{color:this.props.screenC=="Contact Us" ?"#6E91EC":"black"}]}
          onPress={() =>{ 
          this.closeCollapsible();
          this.props.changeScreen("Contact Us")
          this.props.navigation.navigate("Contact")
              }}
              icon={() => <MaterialCommunityIcons name="cellphone" size={24} 
              color={this.props.screenC=="Contact Us" ? "#6E91EC" : "black"} />}
            />
      </View>
      
      <View>
        <DrawerItem
          label="FAQ"
          labelStyle={[style.ff,{color:this.props.screenC=="FAQ" ?"#6E91EC":"black"}]}
          onPress={() =>{ 
          this.closeCollapsible();
          this.props.changeScreen("FAQ")
          this.props.navigation.navigate("FAQ")
              }}
              icon={() => <MaterialCommunityIcons name="comment-question-outline" size={24} 
              color={this.props.screenC=="FAQ" ? "#6E91EC" : "black"} />}
            />
      </View>
      {this.state.loggedIn&&<View>
            <DrawerItem
              label="Notifications"
              labelStyle={[style.ff,{color:this.props.screenC=="Notifications" ?"#6E91EC":"black"}]}
              onPress={() =>{
                this.closeCollapsible();
                this.props.changeScreen("Notifications")
                this.props.navigation.navigate("Notifications",{screen:'Notification'})
              }}
              icon={() => (
                <Ionicons
                  name="md-notifications-outline"
                  size={24}
                  color={this.props.screenC=="Notifications" ? "#6E91EC" : "black"}
                />
              )}
            />
        </View>}
      {/* <TouchableOpacity
          onPress={() =>{
            this.props.navigation.navigate("Adress", { screen: "Details" })
            this.props.changeScreen("AdressDetails")
          }}
          style={{ flexDirection: "row", marginVertical: 10 }}>
          <Feather name="user" size={24} color={this.props.screenC =="AdressDetails"?"#6E91EC":"black"} />
          <Text style={[style.ff,{color:this.props.screenC =="AdressDetails"?"#6E91EC":"black",marginLeft: 30 }]}>
          Account Details
        </Text>
      </TouchableOpacity> */}
      {/* <CollapsibleList
        ref={this.secondRef}
        numberOfVisibleItems={0}
        buttonPosition="top"
        buttonContent={
          <View style={{ flexDirection: "row", marginVertical: 15 }}>
            <MaterialCommunityIcons name="information-outline" size={24} color="black" />
            <Text style={[style.ff,{ color: "black", marginLeft: 30 }]}>
              About
            </Text>
          </View>
        }
      >
      <View style={{ marginLeft: 30 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("About",{screen:"AboutUs"});
              this.props.changeScreen("About")
            }}
            style={{ flexDirection: "row", marginVertical: 10 }}>
            <Feather name="globe" size={24} color={this.props.screenC =="About"?"#6E91EC":"black"} />
            <Text style={[style.ff,{color:this.props.screenC =="About"?"#6E91EC":"black", marginLeft: 30 }]}>
              About us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("About",{screen:"Contact"});
              this.props.changeScreen("Contact")
            }}
            style={{ flexDirection: "row", marginVertical: 10 }}>
            <MaterialCommunityIcons name="cellphone" size={24} color={this.props.screenC =="Contact"?"#6E91EC":"black"} />
            <Text style={[style.ff,{color:this.props.screenC =="Contact"?"#6E91EC":"black", marginLeft: 30 }]}>
              Contact us
            </Text>
          </TouchableOpacity>
    </View>
    </CollapsibleList> */}
      {/* this will crash the app */}
      {this.state.loggedIn ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.closeCollapsible();
              apiServices.logout().then(async(res) => {
                this.setState({userType:null})
                console.log("WHEN LOGGING OUT: ", res);
                let changing = JSON.parse(await AsyncStorage.getItem('user_details'))
                await AsyncStorage.setItem('user_details',JSON.stringify({...changing,user_type:1,user_type_static:1}))
                // await AsyncStorage.clear();
                await AsyncStorage.removeItem("company_name");
                await AsyncStorage.removeItem("user_id");
                await AsyncStorage.removeItem("user_details");
                changing = JSON.parse(await AsyncStorage.getItem('user_details'))
                console.log("ASYNC: ",changing);
                this.props.changeScreen("Home")
                this.props.navigation.navigate("Home")
              });
            }}
            style={{ flexDirection: "row", marginVertical: 15, marginLeft: 20 }}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text style={[style.ff,{ color: "black", marginLeft: 30 }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Auth", { screen: "Login" });
            }}
            style={{ flexDirection: "row", marginVertical: 15, marginLeft: 20 }}
          >
            <MaterialCommunityIcons name="login" size={24} color="black" />
            <Text style={[style.ff,{ color: "black", marginLeft: 30 }]}>Login / Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </DrawerContentScrollView>
  );
}}

const TestingNavigator = () => {
  return (
    <TStack.Navigator>
      <TStack.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <TStack.Screen
        name="Negotiations"
        component={Negotiations}
        options={{ headerShown: false }}
      />
    </TStack.Navigator>
  );
};
//

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      chosenScreen: "Home",
      isUserLoggedIn: false,
      userData:null,
      loading:true,
      visible:false,
      search:""
    };
  }

  changeScreen=(item)=>{
    this.setState({chosenScreen:item})
    console.log("SCREEN:",item)
  }

  headerTitle = (title,navigation,loggedIn) =>{
    // let user = AsyncStorage.getItem('user_details');
    // alert(user.id!=undefined)
    return <View style={{display:'flex',alignItems:'center',/* justifyContent:'space-between', */flexDirection:'row',flex:1,width:'100%',}}>
      {title!="Home"&&<Text style={{fontFamily:'Adam-Bold',fontWeight:'800',fontSize:24}}>{title}</Text>}
      {title=="Home"&&<View style={{borderRadius:10,borderWidth:1,borderColor:'lightgray',marginLeft:15,flexDirection:'row',alignItems:'center'}}>
          <TextInput style={{width:200,paddingHorizontal:5}} placeholder="Search"
          onChangeText={(e)=>this.setState({search:e})}/>
          <TouchableOpacity style={{borderLeftColor:'lightgray', borderLeftWidth:1,paddingLeft:10}}
            onPress={()=>{
              navigation.navigate("Product",{screen:"List", params:{query:this.state.search}})
            }}>
            <Feather name="search" size={14} color="lightgray" style={{marginRight:10,}}/>
          </TouchableOpacity>
        </View>}
        {(title=="Home"&& <>  
        <FontAwesome name="envelope-o" size={24} color="#6E91EC"
        style={{marginLeft:15}} onPress={()=>1==1?navigation.navigate("Notifications"):navigation.navigate("Auth",{screen:'Login'})}
        />
          </>)}
    </View>
  }

  async componentDidMount() {
    console.log("PROPS DR: ",this.navigation)
    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
    console.log("USER DATA IS: ",user)
    this.setState({userData:user})
    //await apiServices.isUserLoggedIn();
    //console.log("RESULT INSIDE COMPOENNT: ",result)
    await apiServices.isUserLoggedIn().then((res) => {
      console.log("THIS STATE: ",this.state.userData)
      this.setState({ isUserLoggedIn: res, loading:false, visible:true, })
    });
  }

  componentDidUpdate() {
    setTimeout(async () => {
      // alert(123)
      // this.forceUpdate()
      await apiServices.isUserLoggedIn();
      apiServices.isUserLoggedIn().then(async(res) => {
        let user = JSON.parse( await AsyncStorage.getItem('user_details'));
        this.setState({ isUserLoggedIn: res, userData:user });
      }, 1000);
    });
  }

  authStack = () => {
    return<><Stack.Navigator>
      <>
        <Stack.Screen
          name="drawerTab"
          component={this.createDrawer}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator></>
  }

  closeDrawer = (navigation) =>{
    navigation.closeDrawer()
  }

  submitContract=async()=>{
    console.log("Running")
    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
    let change = {...user,is_approved:1}
    AsyncStorage.setItem('user_details',JSON.stringify(change))
    this.setState({userData:change})
    this.forceUpdate()
  }

  RenderComponent=(usertype,approved)=>{
    if(usertype==4 && approved==3)
      return <SignContract submitContract={this.submitContract}/>
    else 
      return <Dashboard />
    }

  createDrawer = ({ navigation, route}) => {
    
     return (<Drawer.Navigator
      options={{
        lazy:false,
      }}
      activeTintColor="red"
      drawerContent={(props) => (
        <CustomDrawer
          loggedIn={this.state.isUserLoggedIn}
          {...props}
          route={route}
          // navigation={navigation}
          submitContract={this.submitContract}
          screenC={this.state.chosenScreen}
          changeScreen={this.changeScreen}
          closeDrawer={(navigation)=>{
            this.closeDrawer(navigation)
          }}
          userType={this.state.userData?.user_type}
          userTypeStatic = {this.state.userData?.user_type_static}
          userApproved = {this.state.userData?.is_approved}
          userData={this.state.userData}
        />
      )}
    >
      <Drawer.Screen
        name="Home"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:Home}
        navigation={navigation}
        options={{ headerTitle:()=> <View style={{display:'flex',alignItems:'center',/* justifyContent:'space-between', */flexDirection:'row',flex:1,width:'100%',}}>
            {/* <Text style={{fontFamily:'Adam-Bold',fontWeight:'800',fontSize:24}}>Home</Text> */}
        <   View style={{borderRadius:10,borderWidth:1,borderColor:'lightgray',marginLeft:15,flexDirection:'row',alignItems:'center'}}>
            <TextInput style={{width:200,paddingHorizontal:5}} placeholder="Search"
            onChangeText={(e)=>this.setState({search:e})}/>
            <TouchableOpacity style={{borderLeftColor:'lightgray', borderLeftWidth:1,paddingLeft:10}}
              onPress={()=>{
                navigation.navigate("Product",{screen:"List", params:{query:this.state.search}})
              }}>
              <Feather name="search" size={14} color="lightgray" style={{marginRight:10,}}/>
            </TouchableOpacity>
          </View>
          <>  
          <TouchableOpacity onPress={()=>this.state.userData?.id!=undefined?navigation.navigate("Notifications"):navigation.navigate("Auth",{screen:'Login'})}>
            <FontAwesome name="envelope-o" size={24} color="#6E91EC"
            style={{marginLeft:15}}
            />
          </TouchableOpacity>
         </>
      </View> }}
      />
      <Drawer.Screen
        name="About"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:AboutScreen}
        navigation={navigation}
        options={{ headerTitle:()=>this.headerTitle("About Us") }}
      />
      <Drawer.Screen
        name="Contact"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:ContactScreen}
        navigation={navigation}
        options={{ headerTitle:()=>this.headerTitle("Contact Us") }}
      />
      <Drawer.Screen
        name="FAQ"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:Faq}
        navigation={navigation}
        options={{ headerTitle:()=>this.headerTitle("FAQ") }}
      />
      <Drawer.Screen
        name="Auth"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:AuthStack}
        navigation={navigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Deals"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:Deals}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Deals") }}
      />
      <Drawer.Screen
        name="Product"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:ProductStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Products") }}
      />
      <Drawer.Screen
        name="Notifications"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:NotificationStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Notifications") }}
      />
      <Drawer.Screen
        name="Negotiations"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:NegotiationStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Negotiations") }}
      />
      <Drawer.Screen
        name="Orders"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:OrderStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Orders") }}
      />
      <Drawer.Screen
        name="User"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:UserStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Sub Users") }}
      />
      <Drawer.Screen
        name="Role"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:RoleStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Roles") }}
      />
      <Drawer.Screen
        name="Adress"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:AdressStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Addresses") }}
      />
      <Drawer.Screen
        name="Dashboard"
        //component={()=><SignContract submitContract={this.submitContract} navigation={navigation}/>}
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:DashboardStack}
        //component={}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Dashboard") }}
      />
      <Drawer.Screen
        name="Campaign"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:CampaignStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Campaign") }}
      />
      <Drawer.Screen
        name="LoyaltyPoints"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:LoyaltyStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Loyalty Points") }}
      />
      <Drawer.Screen
        name="Checkout"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:CheckoutStack}
        navigation={navigation}
        options={{ headerShown: true, headerTitle:()=>this.headerTitle("Checkout" )}}
      />
      <Drawer.Screen
      name="Categories"
      component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:Categories}
      options={{ headerShown: true, headerTitle:()=>this.headerTitle("Categories")}}
      navigation={navigation}
      />
      <Drawer.Screen
      name="Tracking"
      component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:TrackingList}
      options={{ headerShown: true, headerTitle:()=>this.headerTitle("Tracking")}}
      navigation={navigation}
      />
      <Drawer.Screen
      name="Activity"
      component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:Activity}
      options={{ headerShown: true, headerTitle:()=>this.headerTitle("Activity")}}
      navigation={navigation}
      />
      <Drawer.Screen
      name="Contract"
      children={()=><SignContract submitContract={this.submitContract} navigation={navigation}/>}
      //component={SignContract}
      options={{ headerShown: true, title:""}}
      navigation={navigation}
      />
    </Drawer.Navigator>)
  };

  render() {
    return <NavigationContainer>{this.authStack()}</NavigationContainer>;
  }
}
export default Nav;