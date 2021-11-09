import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../screens/Home/home";
/* import Contact from "../screens/Contact/contact";
import Login from "../screens/Login/login";
import Categories from "../screens/Categories/categories";
import CategoiresList from "../screens/Categories/categoires_list"; */
import { NavigationContainer } from "@react-navigation/native";
//import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import * as apiServices from "../core/apis/apiUserServices";
//import Registartion from "../screens/Registeration/registration";
import CollapsibleList from "react-native-collapsible-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importing Stacks
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import ProductStack from "./ProductStack";
import AdressStack from "./AdressStack";
import OrderStack from "./OrderStack";
import CheckoutStack from "./CheckoutStack";
import RoleStack from "./RoleStack";
import NotificationStack from "./NotificationsStack";
import NegotiationStack from "./NegotiationStack";
import DashboardStack from "../screens/Dashboard/Dashboard";
//import SellingDetail from "../screens/BuyerAccountDetails/sellingDetails";
import CampaignStack from "./CampaignStack";
import AboutStack from "./AboutStack";
import LoyaltyStack from "./LoyaltyStack";
//
import Negotiations from "../screens/Notifications/Notification";
import Products from "../screens/Products/product_list";
import Orders from "../screens/OrderBook/Reserved_Orders";
import Users from "../screens/Users/list";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// code below is just to test the api
const TStack = createStackNavigator();

/* const Drawer = () =>{
    return()
} */
class CustomDrawer extends Component {
  
  constructor(props) {
    super(props);
    this.firstRef = React.createRef();
    this.secondRef = React.createRef();
    this.thirdRef = React.createRef();
  }

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

  async changeUserType(currentType){
    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
    let change = {...user,user_type:currentType==4?1:4}
    AsyncStorage.setItem('user_details',JSON.stringify(change))
    this.props.userType=currentType==4?1:4;
  }

  render(){
  return (
    <DrawerContentScrollView {...this.props}>
      {/* <DrawerItemList {...props} /> */}
      <View>
        <View
        style={{display:'flex',alignItems:'center',marginVertical:50}}>
          <Image source={require('../../assets/images/logo.png')}/>
        </View>
        {this.props.loggedIn&&
        (<View style={{display:'flex',alignItems:'center',marginBottom:10}}>
          <Text style={{color: "#6E91EC",fontSize:18}}>
            {this.props.userData?.owner_email}
          </Text>
          <Text style={{color: "#6E91EC",fontSize:14}}>
            {this.props.userType==4?"Seller":"Buyer"}
          </Text>
        </View>)}
        <DrawerItem
          label="Home"
          labelStyle={this.props.screenC=="Home" ? { color: "#6E91EC" } : { color: "black" }}
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
      </View>
      {this.props.loggedIn ? (
        <>
        {this.props.userType==4?(<View>
          <DrawerItem
            label="Dashboard"
            labelStyle={this.props.screenC=="Dashboard" ? { color: "#6E91EC" } : { color: "black" }}
            onPress={() => {
              this.closeCollapsible();
              this.props.changeScreen("Dashboard")
              this.props.navigation.navigate("Dashboard");
            }}
            icon={() => <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={this.props.screenC=="Dashboard" ? "#6E91EC" : "black"} />}
          />
        </View>):null}
          <View>
            <DrawerItem
              label="Product"
              labelStyle={this.props.screenC=="Product" ? { color: "#6E91EC" } : { color: "black" }}
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
              label="Notifications"
              labelStyle={this.props.screenC=="Notifications" ? { color: "#6E91EC" } : { color: "black" }}
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
          </View>
          <View>
            <DrawerItem
              label="Negotiations"
              labelStyle={this.props.screenC=="Negotiations" ? { color: "#6E91EC" } : { color: "black" }}
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
          {this.props.userType==4?(<View>
            <DrawerItem
              label="Campaign"
              labelStyle={this.props.screenC=="Campaign" ? { color: "#6E91EC" } : { color: "black" }}
              onPress={() =>{ 
                this.closeCollapsible();
                this.props.changeScreen("Campaign")
                this.props.navigation.navigate("Campaign")}
              }
              icon={() => <Feather name="speaker" size={24} 
              color={this.props.screenC=="Campaign" ? "#6E91EC" : "black"} />}
            />
          </View>):null}
          {this.props.userType==4?(<View>
            <DrawerItem
              label="Loyalty Points"
              labelStyle={this.props.screenC=="LoyaltyPoints" ? { color: "#6E91EC" } : { color: "black" }}
              onPress={() =>{ 
                this.closeCollapsible();
                this.props.changeScreen("LoyaltyPoints")
                this.props.navigation.navigate("LoyaltyPoints",{screen:"Loyalty"})}
              }
              icon={() => <MaterialCommunityIcons name="chart-donut" size={24} 
              color={this.props.screenC=="LoyaltyPoints" ? "#6E91EC" : "black"} />}
            />
          </View>):null}
          <View>
            <DrawerItem
              label="Orders"
              labelStyle={this.props.screenC=="Orders" ? { color: "#6E91EC" } : { color: "black" }}
              onPress={() =>{ 
                this.closeCollapsible();
                this.props.changeScreen("Orders")
                this.props.navigation.navigate("Orders")}
              }
              icon={() => <Ionicons name="receipt-outline" size={24} 
              color={this.props.screenC=="Orders" ? "#6E91EC" : "black"} />}
            />
          </View>
          
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
                  <Text style={{ color: "black", marginLeft: 30 }}>
                    Settings
                  </Text>
                </View>
              }
            >
              <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("User");
                      this.props.changeScreen("User")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="users" size={24} color={this.props.screenC =="User"?"#6E91EC":"black"} />
                    <Text style={this.props.screenC =="User"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
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
                    <Text style={this.props.screenC =="AdressDetails"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      Account Details
                    </Text>
                  </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", display:'flex', marginVertical: 10 }}
                    onPress={() =>{
                      this.props.navigation.navigate("Role", { screen: "Roles" })
                      this.props.changeScreen("Role")
                    }}>
                    <Feather name="lock" size={24}  color={this.props.screenC =="Role"?"#6E91EC":"black"} />
                    <Text style={this.props.screenC =="Role"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
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
                    <Text style={this.props.screenC =="Adress"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      User Address
                    </Text>
                  </TouchableOpacity>
                  {this.props.userType==4?(<TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Adress",{screen:"Selling"});
                      this.props.changeScreen("Selling")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="book" size={24} color={this.props.screenC =="Selling"?"#6E91EC":"black"} />
                    <Text style={this.props.screenC =="Selling"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      Selling Details
                    </Text>
                  </TouchableOpacity>):null}
                  {this.props.userType==4?(<TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Adress",{screen:"Sponsored"});
                      this.props.changeScreen("Sponsored")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="dollar-sign" size={24} color={this.props.screenC =="Sponsored"?"#6E91EC":"black"} />
                    <Text style={this.props.screenC =="Sponsored"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      Promoted Products
                    </Text>
                  </TouchableOpacity>):null}
              </View>
            </CollapsibleList>
          </View>
        </>
      ) : null}
      <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: 20,
      }}
    >
      <CollapsibleList
        ref={this.secondRef}
        numberOfVisibleItems={0}
        buttonPosition="top"
        buttonContent={
          <View style={{ flexDirection: "row", marginVertical: 15 }}>
            <MaterialCommunityIcons name="information-outline" size={24} color="black" />
            <Text style={{ color: "black", marginLeft: 30 }}>
              About
            </Text>
          </View>
        }
      >
      <View style={{ marginLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("About",{screen:"AboutUs"});
              this.props.changeScreen("About")
            }}
            style={{ flexDirection: "row", marginVertical: 10 }}>
            <Feather name="globe" size={24} color={this.props.screenC =="About"?"#6E91EC":"black"} />
            <Text style={this.props.screenC =="About"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
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
            <Text style={this.props.screenC =="Contact"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
              Contact us
            </Text>
          </TouchableOpacity>
    </View>
    </CollapsibleList>
    </View>
      {/* this will crash the app */}
      {this.props.userType==4?<View>
          <TouchableOpacity
            onPress={() => {
              this.closeCollapsible();
              this.props.navigation.navigate('Home');
              this.changeUserType(this.props.userType)
            }}
            style={{ flexDirection: "row", marginVertical: 15, marginLeft: 20 }}
          ><Fontisto name="arrow-swap" size={24} color="black" />
            <Text style={{ color: "black", marginLeft: 30 }}>Switch To {this.props.userType==4?"Buyer":"Seller"}</Text>
          </TouchableOpacity>
        </View>:null }
      {this.props.loggedIn ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.closeCollapsible();
              apiServices.logout().then((res) => {
                console.log("WHEN LOGGING OUT: ", res);
                AsyncStorage.clear();
                this.props.changeScreen("Home")
                this.props.navigation.navigate("Home")
              });
            }}
            style={{ flexDirection: "row", marginVertical: 15, marginLeft: 20 }}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text style={{ color: "black", marginLeft: 30 }}>Logout</Text>
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
            <Text style={{ color: "black", marginLeft: 30 }}>Login</Text>
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
      userData:null
    };
  }

  changeScreen=(item)=>{
    this.setState({chosenScreen:item})
    console.log("SCREEN:",item)
  }

  async componentDidMount() {
    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
    console.log("USER DATA IS: ",user)
    this.setState({userData:user})
    await apiServices.isUserLoggedIn();
    //console.log("RESULT INSIDE COMPOENNT: ",result)
    apiServices.isUserLoggedIn().then((res) => {
      this.setState({ isUserLoggedIn: res });
    });
  }

  componentDidUpdate() {
    setTimeout(async () => {
      await apiServices.isUserLoggedIn();
      apiServices.isUserLoggedIn().then(async(res) => {
        let user = JSON.parse( await AsyncStorage.getItem('user_details'));
        this.setState({ isUserLoggedIn: res, userData:user });
      }, 100000);
    });
  }

  authStack = () => (
    <Stack.Navigator>
      <>
        <Stack.Screen
          name="drawerTab"
          component={this.createDrawer}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator>
  );

  closeDrawer = ({navigation}) =>{
    navigation.closeDrawer()
  }

  createDrawer = ({ navigation, route}) => (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer
          loggedIn={this.state.isUserLoggedIn}
          {...props}
          route={route}
          navigation={navigation}
          screenC={this.state.chosenScreen}
          changeScreen={this.changeScreen}
          closeDrawer={({navigation})=>{
            this.closeDrawer({navigation})
          }}
          userType={this.state.userData?.user_type}
          userData={this.state.userData}
        />
      )}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        navigation={navigation}
        options={{ title: "" }}
      />
      <Drawer.Screen
        name="About"
        component={AboutStack}
        navigation={navigation}
        options={{ title: "" }}
      />
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        navigation={navigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Product"
        component={ProductStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Negotiations"
        component={NegotiationStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="User"
        component={UserStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Role"
        component={RoleStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Adress"
        component={AdressStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Campaign"
        component={CampaignStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="LoyaltyPoints"
        component={LoyaltyStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
      <Drawer.Screen
        name="Checkout"
        component={CheckoutStack}
        navigation={navigation}
        options={{ headerShown: true, title: "" }}
      />
    </Drawer.Navigator>
  );

  render() {
    return <NavigationContainer>{this.authStack()}</NavigationContainer>;
  }
}
export default Nav;
