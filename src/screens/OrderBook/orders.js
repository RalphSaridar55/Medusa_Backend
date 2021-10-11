``;
import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons'; 
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Searchbar, Headline } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import styles from "./orders_style";
import { Picker } from "@react-native-picker/picker";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "test",
      forTab: {
        index: 0,
        routes: [
          { key: "first", title: "Order Book" },
          { key: "second", title: "Orders" },
        ],
      },
      data1: [
        {
          id: 1,
          image: require('../../../assets/images/mouse.png'),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 1",
          status: "Delivered ",
        },
        {
          id: 2,
          image:
            require("../../../assets/images/mouse.png"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,  
          name: "Product 2",
          status: "status",
        },
        {
          id: 3,
          image: require("../../../assets/images/mouse.png"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 3",
          status: "status",
        },
        {
          id: 4,
          image: require("../../../assets/images/mouse.png"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 4",
          status: "status",
        },
        {
          id: 5,
          image: require("../../../assets/images/mouse.jpg"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 5",
          status: "status",
        },
        {
          id: 6,
          image: require("../../../assets/images/mouse.png"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 6",
          status: "status",
        },
        {
          id: 7,
          image: require("../../../assets/images/keyboard.jpg"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 7",
          status: "status",
        },
        {
          id: 8,
          image: require("../../../assets/images/mouse.jpg"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 8",
          status: "status",
        },
        {
          id: 9,
          image: require("../../../assets/images/mouse.png"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 9",
          status: "status",
        },
        {
          id: 10,
          image: require("../../../assets/images/keyboard.jpg"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 10",
          status: "status",
        },
        {
          id: 11,
          image: require("../../../assets/images/mouse.jpg"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 11",
          status: "status",
        },
        {
          id: 12,
          image: require("../../../assets/images/mouse.png"),
          description:"Item Description Item Description Item Description Item Description Item Description Item Description Item Description",
          price:100,
          name: "Product 12",
          status: "status",
        },
      ],
    };
  }
  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
  };

  componentDidMount() {
    console.log(this.state.test);
  }

  drawScreenOne = () => {
    return (
        <ScrollView>
          {this.state.data1.map((item) => {
            return (
            
              <TouchableOpacity style={[styles.container,styles.content]}>
                  <View style={styles.imageContainer}>
                      <Image source={item.image} style={styles.image}/>
                  </View>
                  <View style={{flex:1}}>
                      <View style={styles.contentContainer}>
                          <View style={styles.mainInfo}>
                              <Text style={styles.name}>{item.name}</Text>
                              <TouchableOpacity>
                                  <MaterialCommunityIcons name="close-thick" size={24} color="red" />
                              </TouchableOpacity>
                          </View>
                      </View>
                      <View style={styles.contentContainer}>
                          <Text style={{width:'70%'}}>{item.description.length>40?item.description.substring(0,40)+"...":item.description}</Text>
                      </View>
                      <View style={[styles.contentContainer,{marginTop:10}]}>
                          <Text>Price: ${item.price}</Text>
                      </View>
                      <View style={[styles.contentContainer,{marginTop:10,justifyContent:'space-between'}]}>
                          <TouchableOpacity style={styles.iconTextContainer}
                          onPress={()=>this.props.navigation.navigate("ValueAdded")}>
                              <View style={styles.iconContainer}>
                                  <MaterialCommunityIcons name="plus-thick" size={16} color="#6E91EC" />
                              </View>
                              <Text style={{marginLeft:5,color:'#6E91EC'}}>Value added services</Text>
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
    );
  };

  drawScreenTwo = () => {
    return (
        <ScrollView>
          {this.state.data1.map((item) => {
            return (
              <TouchableOpacity style={[styles.container,styles.content]}>
                  <View style={styles.imageContainer}>
                      <Image source={item.image} style={styles.image}/>
                  </View>
                  <View style={{flex:1}}>
                      <View style={styles.contentContainer}>
                          <View style={styles.mainInfo}>
                              <Text style={styles.name}>{item.name}</Text>
                              <Text style={styles.status}>{item.status}</Text>
                          </View>
                      </View>
                      <View style={styles.contentContainer}>
                          <Text style={{width:'70%'}}>{item.description.length>40?item.description.substring(0,40)+"...":item.description}</Text>
                      </View>
                      <View style={[styles.contentContainer,{marginTop:10}]}>
                          <Text>Price: ${item.price}</Text>
                      </View>
                      <View style={[styles.contentContainer,{marginTop:10,justifyContent:'space-between'}]}>
                          <TouchableOpacity style={styles.iconTextContainer}>
                              <View style={styles.iconContainer}>
                                  <MaterialCommunityIcons name="plus-thick" size={16} color="#6E91EC" />
                              </View>
                              <Text style={{marginLeft:5,color:'#6E91EC'}}>Value added services</Text>
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
    )
  }
}
