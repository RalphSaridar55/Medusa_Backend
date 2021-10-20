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
import Contact from "../screens/Contact/contact";
import Login from "../screens/Login/login";
import Categories from "../screens/Categories/categories";
import CategoiresList from "../screens/Categories/categoires_list";
import { NavigationContainer } from "@react-navigation/native";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import * as apiServices from "../core/apis/apiUserServices";
import Registartion from "../screens/Registeration/registration";
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
import AboutStack from "./AboutStack";
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
function CustomDrawer(props) {
  /* const {index, routes} = props.navigation.dangerouslyGetState();
  const currentRoute = routes[index].name; */
  //console.log('current screen', props.route);
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <View>
        <View
        style={{display:'flex',alignItems:'center',marginVertical:50}}>
          <Image source={require('../../assets/images/logo.png')}/>
        </View>
        {/* {props.loggedIn && <View style={{backgroundColor:'red',marginBottom:30,display:'flex',alignItems:'center'}}>
          <Text style={{fontSize:26,color:'#6E91EC'}}>
              String
          </Text>
        </View>} */}
        {props.loggedIn&&
        (<View style={{display:'flex',alignItems:'center',marginBottom:10}}>
          <Text style={{color: "#6E91EC",fontSize:18}}>
            {props.userData?.owner_email}
          </Text>
          <Text style={{color: "#6E91EC",fontSize:14}}>
            {props.userType==4?"Seller":"Buyer"}
          </Text>
        </View>)}
        <DrawerItem
          label="Home"
          labelStyle={props.screenC=="Home" ? { color: "#6E91EC" } : { color: "black" }}
          onPress={() => {
            props.changeScreen("Home")
            props.navigation.navigate("Home");
            }}
          icon={(focused = true) => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={props.screenC=="Home" ? "#6E91EC" : "black"}
            />
          )}
        />
      </View>
      {props.loggedIn ? (
        <>
        {props.userType==4?(<View>
          <DrawerItem
            label="Dashboard"
            labelStyle={props.screenC=="Dashboard" ? { color: "#6E91EC" } : { color: "black" }}
            onPress={() => {
              props.changeScreen("Dashboard")
              props.navigation.navigate("Dashboard");
            }}
            icon={() => <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={props.screenC=="Dashboard" ? "#6E91EC" : "black"} />}
          />
        </View>):null}
          <View>
            <DrawerItem
              label="Product"
              labelStyle={props.screenC=="Product" ? { color: "#6E91EC" } : { color: "black" }}
              onPress={() => {
                props.changeScreen("Product")
                props.navigation.navigate("Product",{userType:props.userType, screen:"List"});
              }}
              icon={() => <Feather name="box" size={24} color={props.screenC=="Product" ? "#6E91EC" : "black"} />}
            />
          </View>
          <View>
            <DrawerItem
              label="Notifications"
              labelStyle={props.screenC=="Notifications" ? { color: "#6E91EC" } : { color: "black" }}
              onPress={() =>{
                props.changeScreen("Notifications")
                props.navigation.navigate("Notifications"),{screen:'NegotiationList'}}
              }
              icon={() => (
                <Ionicons
                  name="md-notifications-outline"
                  size={24}
                  color={props.screenC=="Notifications" ? "#6E91EC" : "black"}
                />
              )}
            />
          </View>
          <View>
            <DrawerItem
              label="Negotiations"
              labelStyle={props.screenC=="Negotiations" ? { color: "#6E91EC" } : { color: "black" }}
              onPress={() =>{
                props.changeScreen("Negotiations")
                props.navigation.navigate("Negotiations"),{screen:'NegotiationList'}}
              }
              icon={() => (
                <FontAwesome5
                  name="handshake"
                  size={24}
                  color={props.screenC=="Negotiations" ? "#6E91EC" : "black"}
                />
              )}
            />
          </View>
          <View>
            <DrawerItem
              label="Orders"
              labelStyle={props.screenC=="Orders" ? { color: "#6E91EC" } : { color: "black" }}
              onPress={() =>{ 
                props.changeScreen("Orders")
                props.navigation.navigate("Orders")}
              }
              icon={() => <Ionicons name="receipt-outline" size={24} 
              color={props.screenC=="Orders" ? "#6E91EC" : "black"} />}
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
                      props.navigation.navigate("User");
                      props.changeScreen("User")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="users" size={24} color={props.screenC =="User"?"#6E91EC":"black"} />
                    <Text style={props.screenC =="User"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      User Management
                    </Text>
                  </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>{
                      props.navigation.navigate("Adress", { screen: "Details" })
                      props.changeScreen("AdressDetails")
                      }}
                      style={{ flexDirection: "row", marginVertical: 10 }}>
                      <Feather name="user" size={24} color={props.screenC =="AdressDetails"?"#6E91EC":"black"} />
                    <Text style={props.screenC =="AdressDetails"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      Account Details
                    </Text>
                  </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", display:'flex', marginVertical: 10 }}
                    onPress={() =>{
                      props.navigation.navigate("Role", { screen: "Roles" })
                      props.changeScreen("Role")
                    }}>
                    <Feather name="lock" size={24}  color={props.screenC =="Role"?"#6E91EC":"black"} />
                    <Text style={props.screenC =="Role"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      Roles & Permissions
                    </Text>
                  </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>{
                      props.navigation.navigate("Adress",{screen:'List'})
                      props.changeScreen("Adress")
                      }}
                     style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Text style={props.screenC =="Adress"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      User Address
                    </Text>
                  </TouchableOpacity>
                  {props.userType==4?(<TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("Adress",{screen:"Selling"});
                      props.changeScreen("Selling")
                    }}
                    style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Feather name="book" size={24} color={props.screenC =="Selling"?"#6E91EC":"black"} />
                    <Text style={props.screenC =="Selling"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
                      Selling Details
                    </Text>
                  </TouchableOpacity>):null}
              </View>
            </CollapsibleList>
            {/* <DrawerItem label="Settings" onPress={() => alert('Link to help')}
            icon={()=>  <Ionicons name="settings-outline" size={24} color="black" />}/> */}
          </View>
        </>
      ) : null}<View
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: 20,
      }}
    >
      <CollapsibleList
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
              props.navigation.navigate("About",{screen:"AboutUs"});
              props.changeScreen("About")
            }}
            style={{ flexDirection: "row", marginVertical: 10 }}>
            <Feather name="globe" size={24} color={props.screenC =="About"?"#6E91EC":"black"} />
            <Text style={props.screenC =="About"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
              About us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("About",{screen:"Contact"});
              props.changeScreen("Contact")
            }}
            style={{ flexDirection: "row", marginVertical: 10 }}>
            <MaterialCommunityIcons name="cellphone" size={24} color={props.screenC =="Contact"?"#6E91EC":"black"} />
            <Text style={props.screenC =="Contact"?{ color: "#6E91EC", marginLeft: 30 }:{ color: "black", marginLeft: 30 }}>
              Contact us
            </Text>
          </TouchableOpacity>
    </View>
    </CollapsibleList>
    </View>
      {/* this will crash the app */}
      {props.userType==4 &&props.isUserLoggedIn?
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Auth", { screen: "Login" });
            }}
            style={{ flexDirection: "row", marginVertical: 15, marginLeft: 20 }}
          ><Fontisto name="arrow-swap" size={24} color="black" />
            <Text style={{ color: "black", marginLeft: 30 }}>Switch To {props.userType==4?"Buyer":"Seller"}</Text>
          </TouchableOpacity>
        </View>:null }
      {props.loggedIn ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              apiServices.logout().then((res) => {
                console.log("WHEN LOGGING OUT: ", res);
                AsyncStorage.clear();
                props.changeScreen("Home")
                props.navigation.navigate("Home")
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
              props.navigation.navigate("Auth", { screen: "Login" });
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
}

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
  /* async componentDidUpdate(prev){
    if(this.state.userData?.owner_email != prev.userData?.owner_email){
      console.log("ComponentDidUpdate ran")
      let user = JSON.parse( await AsyncStorage.getItem('user_details'));
      this.setState({userData:user})
    }
  } */

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
      {/* {!apiServices.isUserLoggedIn()(
                <>
                    <Stack.Screen
                        name="drawerTab"
                        component={this.createDrawer}
                        options={{ headerShown: false }} />
                </>
            ) :  (
                <>
                    <Stack.Screen
                        name="Login"
                        component={TestingNavigator}
                        options={{ headerShown: false }}
                        
                    />
                    <Stack.Screen
                        name="Registration"
                        component={Registartion}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="initialHome"
                        component={this.createDrawer}
                        options={{ headerShown: false }} />
                </>
            )} */}
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
      {/* <Drawer.Screen name="Categoires" component={Categories} />
      <Drawer.Screen name="CategoiresList" component={CategoiresList} /> */}
    </Drawer.Navigator>
  );

  render() {
    return <NavigationContainer>{this.authStack()}</NavigationContainer>;
  }
}
export default Nav;
