``;
import React, { Component, createRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as APIOrder from '../../core/apis/apiOrderServices';
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
const screenwidth = Dimensions.get('screen').width;
const actionSheetCat = createRef();
const data1 = [
  {
    id: 1,
    image: require("../../../assets/images/mouse.png"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 1",
    status: "Reserved",
    status_id:1
  },
  {
    id: 2,
    image: require("../../../assets/images/mouse.png"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 2",
    status: "Reserved",
    status_id:1
  },
  {
    id: 3,
    image: require("../../../assets/images/mouse.png"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 3",
    status: "Reserved",
    status_id:1
  },
  {
    id: 4,
    image: require("../../../assets/images/mouse.png"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 4",
    status: "Completed",
    status_id:2
  },
  {
    id: 5,
    image: require("../../../assets/images/mouse.jpg"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 5",
    status: "Completed",
    status_id:2
  },
  {
    id: 6,
    image: require("../../../assets/images/mouse.png"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 6",
    status: "Completed",
    status_id:2
  },
  {
    id: 7,
    image: require("../../../assets/images/keyboard.jpg"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 7",
    status: "Pending",
    status_id:3
  },
  {
    id: 8,
    image: require("../../../assets/images/mouse.jpg"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 8",
    status: "Pending",
    status_id:3
  },
  {
    id: 9,
    image: require("../../../assets/images/mouse.png"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 9",
    status: "Pending",
    status_id:3
  },
  {
    id: 10,
    image: require("../../../assets/images/keyboard.jpg"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 10",
    status: "In Progress",
    status_id:4
  },
  {
    id: 11,
    image: require("../../../assets/images/mouse.jpg"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 11",
    status: "In Progress",
    status_id:4
  },
  {
    id: 12,
    image: require("../../../assets/images/mouse.png"),
    description:
      "Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
    price: 100,
    name: "Product 12",
    status: "In Progress",
    status_id:4
  },
];
export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current:[],
      test: "test",
      filterStatus:null,
      filterStatuses:[
        {value:1,label:"Reserved"},
        {value:2,label:"Completed"},
        {value:3,label:"Pending"},
        {value:4,label:"In Progress"},
        {value:5,label:"All"},
      ],
      forTab: {
        index: 0,
        routes: [
          { key: "first", title: "Order Book" },
          { key: "second", title: "Orders" },
        ],
      },
      filter:"",
      search: "",
      
      filterData:data1,
      showSearch: true,
      showFilter: true,

      spinner:true
    };
  }

  onclick = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
  };

  _changeFilter = (val) =>{
    console.log("VALUE IS:",val)
    if(val == 5)
      this.setState({filterData:data1})
    else{
      var data = data1
      var a = data.filter((i)=>i.status_id === val);
      this.setState({filterData:a})
    }
  }

  componentDidMount() {
    console.log(this.state.test);
      this.setState({spinner:true})
    //fetching current order book
    APIOrder.getOrderBook(1).then((res)=>{
      console.log("CURRENT ORDER BOOK: ",res)
      this.setState({spinner:false,current:res})
    })
  }

  componentDidMount() {
    this.setState({spinner:true})
    this.focusListener = this.props.navigation.addListener("focus", () => {
      APIOrder.getOrderBook(1).then((res)=>{
        console.log("CURRENT ORDER BOOK: ",res)
        this.setState({spinner:false,current:res})
      })
    });
  }

  DeleteOrder(id){
    Alert.alert("Delete","Are you sure you want to delete this order ?",[
      {text:"No"},
      {text:"Yes",onPress:()=>{
        this.setState({spinner:true})
        APIOrder.deleteOrder(id).then((res)=>{
          Alert.alert("Delete",res)
          this.setState({spinner:false})
        }).catch(err=>{
          Alert.alert("Error",err.response.data.message)
          this.setState({spinner:false})
        })
      }}
    ])
  }

  drawScreenOne = () => {
    return (
      <>
      <Spinner visible={this.state.spinner} />
      <ScrollView style={{paddingHorizontal:10}}>
        {this.state.current?.map((item, index) => {
          return (
            <TouchableOpacity
              style={[styles.container, styles.content,{marginLeft:0}]}
              key={index}
              onPress={()=>this.props.navigation.navigate('DetailedOrder',{item})}
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
                    {item.description.length > 40
                      ? item.description.substring(0, 40) + "..."
                      : item.description}
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
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name={(this.state.current.value_added_services===null ||this.state.current.value_added_services.length<1 )?"close":"check"}
                        size={16}
                        color={(this.state.current.value_added_services===null ||this.state.current.value_added_services.length<1 )?"red":"#31C2AA"}
                      />
                    </View>
                    <Text style={{ marginLeft: 5, color: "#6E91EC", textDecorationLine:'underline'}}>
                      Value added services
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="chatbox" size={24} color="#6E91EC" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total Price: ${this.state.current.length>0 && this.state.current.reduce((pre,cur)=>({total:pre+cur.total},0))['total']}</Text>
        <TouchableOpacity
                onPress={()=>console.log("Running")}
                style={styles.placeOrderButton}>
                <Text style={{color:'white'}}>Place Order</Text>
        </TouchableOpacity>
      </View>
      </>
    );
  };

  drawScreenTwoData = (item,index) =>{
    return (
    <TouchableOpacity
      style={[styles.container, styles.content,{marginLeft:0}]}
      key={index}
      onPress={()=>this.props.navigation.navigate('DetailedOrder',{item})}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.mainInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={{ width: "70%" }}>
            {item.description.length > 40
              ? item.description.substring(0, 40) + "..."
              : item.description}
          </Text>
        </View>
        <View style={[styles.contentContainer, { marginTop: 10 }]}>
          <Text>Price: ${item.price}</Text>
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
            title={
              this.state.filterData.filter((i) =>
                i.name.toLowerCase().includes(this.state.search.toLowerCase())
              ).length +
              " " +
              "Results"
            }
            onPress={this.setView}
            style={{ fontSize: 14 }}
          />
          <Appbar.Action
            icon="filter-menu"
            onPress={() => {
              this.setState({showFilter:!this.state.showFilter})
            }}
          />
          <Appbar.Action icon="magnify" onPress={this.onclick} />
        </Appbar>
        <View style={{paddingHorizontal:10,paddingVertical:10,
          display: this.state.showSearch ? "none" : "flex" }}>
          <Searchbar
            theme={{
              colors: { primary: "#6E91EC", underlineColor: "transparent" },
            }}
            onChangeText={(e) => this.setState({ search: e })}
            placeholder="Search"
          />
        </View>
        <View style={{paddingHorizontal:10,paddingVertical:10,
          display: this.state.showFilter ? "none" : "flex" }}>
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
              style={{marginLeft:5}}
              selectedValue={this.state.filterStatus}
              onValueChange={(itemValue, itemIndex) =>{
                this._changeFilter(itemValue)
              }
              }>{this.state.filterStatuses.map((item,index)=>{
                return <Picker.Item label={item.label} value={item.value} key={index}/>
              })}
            </Picker>
          </View>
        </View>
        <ScrollView style={{paddingHorizontal:10}}>
          {this.state.search.length>0?this.state.filterData.filter(i=>
                i.name.toLowerCase().includes(this.state.search.toLowerCase())).map((item, index) => {
                  return this.drawScreenTwoData(item,index)
          })
          :this.state.filterData.map((item, index) => {
                  return this.drawScreenTwoData(item,index)
          })}
          {/* <ActionSheet ref={actionSheetCat}>
          <ScrollView >
              <View >
                  <Title style={{ padding: 10 }}>Filter By </Title>
                  <List.AccordionGroup>
                      <List.Accordion title="Categories" id="1" style={{ width: "100%" }}>
                              <Text>Test</Text>
                      </List.Accordion>

                      <List.Accordion title="Sub-Categories" id="2">
                      <ScrollView style={{ maxHeight: 200 }}>
                              <Text>Test</Text>
                          </ScrollView>
                      </List.Accordion>

                      <List.Accordion title="Brand" id="3">
                      <ScrollView style={{ maxHeight: 200 }}>
                              <Text>Test</Text>
                          </ScrollView>
                      </List.Accordion>

                      <List.Accordion title="Color" id="4">
                      <ScrollView style={{ maxHeight: 200 }}>
                              <Text>Test</Text>
                          </ScrollView>
                      </List.Accordion>
                      <List.Accordion title="Price Range" id="5">
                              <Text>Test</Text>
                          
                              <Text>Test</Text>
                          <TouchableOpacity style={styles.resetButton}
                          onPress={()=>this.resetPriceRange()}>
                          <Text>Test</Text>
                          </TouchableOpacity>
                      </List.Accordion>
                  </List.AccordionGroup>
              </View>
          </ScrollView>
      </ActionSheet> */}
      </ScrollView>
      </>
    );
  };

  _renderScene = SceneMap({
    first: this.drawScreenOne,
    second: this.drawScreenTwo,
  });

  render() {
    return (
      /*
            <View style={{display:"flex",flexDirection:'row'}}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.status}>{item.status}</Text>
                </View>
            </View>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                  </View>
                  <Text>{item.description}</Text>
                  <Text style={styles.time}>WED, AUG 4, 08:51 AM</Text>
                </View>
              </View> */
      <TabView
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
      />
    );
  }
}
