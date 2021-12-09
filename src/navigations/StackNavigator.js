import React, { Component, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, Ionicons, Feather, Fontisto, FontAwesome5} from "@expo/vector-icons";
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
import CategoriesStack from "./CategoryStack";
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
import Activity from "../screens/Activity/Activity";
import Categories from "../screens/Categories/categories";
import Negotiations from "../screens/Notifications/Notification";
import Products from "../screens/Products/product_list";
import Orders from "../screens/OrderBook/Reserved_Orders";
import Users from "../screens/Users/list";
import Spinner from "react-native-loading-spinner-overlay";
import SignContract from "../components/SignContract";
import Dashboard from "../screens/Dashboard/Dashboard";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// code below is just to test the api
const TStack = createStackNavigator();

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
      userApproved:null
    }
  }

  

  componentDidUpdate(prevProps, prevState){
    if(prevProps.userType !== this.state.userType){
      console.log("RUNNING123",this.props.userType);
      this.setState({userType:this.props.userType,userApproved:this.props.approved})}
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
        {this.props.loggedIn&&
        (<View style={{display:'flex',alignItems:'center',marginBottom:10}}>
          <Text style={[style.ff,{color: "#6E91EC",fontSize:20}]}>
            {this.props.userData?.owner_email}
          </Text>
          <Text style={[style.ff,{color: "#6E91EC",fontSize:16,marginTop:10}]}>
            {this.state.userType==4?"Seller":"Buyer"}
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
      </View>
      {this.props.loggedIn ? (
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
          </View>
          <View>
            <DrawerItem
              label="Product"
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
          <View>
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
    </CollapsibleList>
    </View>
      {/* this will crash the app */}
      {this.props.loggedIn ? (
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
    };
  }

  changeScreen=(item)=>{
    this.setState({chosenScreen:item})
    console.log("SCREEN:",item)
  }

  headerTitle = (title) =>{
    return <View style={{display:'flex',alignItems:'center'}}>
      <Text style={{fontFamily:'Adam-Bold',fontWeight:'800',fontSize:24}}>{title}</Text>
    </View>
  }

  async componentDidMount() {
    console.log("PROPS DR: ",this.props.navigation)
    let user = JSON.parse( await AsyncStorage.getItem('user_details'));
    console.log("USER DATA IS: ",user)
    this.setState({userData:user})
    //await apiServices.isUserLoggedIn();
    //console.log("RESULT INSIDE COMPOENNT: ",result)
    await apiServices.isUserLoggedIn().then((res) => {
      console.log("THIS STATE: ",this.state.userData)
        setTimeout(()=>this.setState({ isUserLoggedIn: res, loading:false, visible:true, }),1000);
    });
  }

  componentDidUpdate(prevState){
    if(prevState.userData == null)
      console.log(123)
  }

  componentDidUpdate() {
    setTimeout(async () => {
      await apiServices.isUserLoggedIn();
      apiServices.isUserLoggedIn().then(async(res) => {
        let user = JSON.parse( await AsyncStorage.getItem('user_details'));
        this.setState({ isUserLoggedIn: res, userData:user });
      }, 1000);
    });
  }

  authStack = () => {return<><Spinner visible={this.state.loading}/>{this.state.visible==false?null:<Stack.Navigator>
      <>
        <Stack.Screen
          name="drawerTab"
          component={this.createDrawer}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator>}</>
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
     return (this.state.visible==false?null:<Drawer.Navigator
      activeTintColor="red"
      drawerContent={(props) => (
        <CustomDrawer
          loggedIn={this.state.isUserLoggedIn}
          {...props}
          route={route}
          navigation={navigation}
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
        options={{ headerTitle:()=>this.headerTitle("Home") }}
      />
      <Drawer.Screen
        name="About"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:AboutStack}
        navigation={navigation}
        options={{ headerTitle:()=>this.headerTitle("About") }}
      />
      <Drawer.Screen
        name="Auth"
        component={(this.state.userData?.is_approved==3 && this.state.userData?.user_type==4)?()=><SignContract submitContract={this.submitContract} navigation={navigation}/>:AuthStack}
        navigation={navigation}
        options={{ headerShown: false }}
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
