import React, { useState, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/core";
import * as API from '../../core/apis/apiCampaignServices'; 
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ImageBackground,
  FlatList,
} from "react-native";
import { styles } from "./Campaign_style";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { BarChart } from "react-native-chart-kit";
import CollapsibleList from "react-native-collapsible-list";
import { campaignType,dummyData } from "./map";
import Spinner from "react-native-loading-spinner-overlay";

const Campaign = ({ navigation }) => {
  const screenWidth = Dimensions.get("screen").width;
  const [state,setState] = useState({data:[],isVisible:true,page:1,total:0})
  // const [data,setData] = useState([])r
  // const [isVisible,setIsVisible] = useState(true)
  // const [page,setPage] = useState(1);
  //const [total,setTotal]  = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      setState({...state,isVisible:true})
      API.getCampaigns(1).then((res)=>{
        console.log("RES: ",res)
        setState({...state,data:res,isVisible:false,total:50})
        // setData(res)
        // setIsVisible(false)
      })
    }, [])
  );

  /* useEffect(()=>{
    API.getCampaigns().then((res)=>{
      console.log("RES: ",res)
      setData(res)
      setIsVisible(false)
    })
  },[]) */

  const firstScreen = () => {
    return screenRenderer1();
  };
  const secondScreen = () => {
    return screenRenderer2();
  };
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Create Campaign" },
    { key: "second", title: "My Campaigns" },
  ]);

  const renderScene = SceneMap({
    first: firstScreen,
    second: secondScreen,
  });

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    }; 

  const loadMore = (p) =>{
    console.log("SOULD RENDER MORE");
    API.getCampaigns(p).then((res)=>{
      let result = state.data.concat(res);
      setState({...state,page:p,data:result,isVisible:false,total:result.length})
      // setPage(p)
      // setData(result)
      //setIsVisible(false)
    })
    //setIsVisible(false)
  }

  const screenRenderer2 = () => {
    return (
      <ImageBackground
        source={require("../../../assets/images/Login-bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          
          onScroll={({nativeEvent}) => {
            //console.log("length",this.state.total)
            if (isCloseToBottom(nativeEvent)&& state.data.length<state.total) {
               //nativeEvent.preventDefault();
                let p = state.page + 1; 
                setState({...state,isVisible:true})
                //setIsVisible(true);
                loadMore(p);
            }
          }}
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          {state.data.length>0 && state.data.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.cardContainer}
                key={index}
                onPress={() =>
                  //console.log("Tre")
                  navigation.navigate("CampaignDetailed", { id:item.id, type: item.category})
                }
              >
                <View style={styles.myCampaignTitleContainer}>
                  <View>
                    <Text style={[styles.bannerName]}>{item.name}</Text>
                  </View>
                  <View>
                    <Text style={[styles.bannerTitle]}>{item.category}</Text>
                  </View>
                <View style={[styles.insideContainer,{marginTop:10,}]}>
                  <Text style={styles.infoText}>Status: {item.status}</Text>
                </View>
                <View style={styles.insideContainer}>
                  <Text style={styles.infoText}>Payment: ${item.payment}</Text>
                </View>
                {(item.start_date==0 || item.to_duration ==0)?null:
                  <View style={styles.insideContainer}>
                  <Text style={styles.infoText}>From: {(new Date(item.start_date)+"").substring(0,15)}</Text>
                  <Text style={styles.infoText}>To: {(new Date(item.to_duration)+"").substring(0,15)}</Text>
                  </View>}
                </View> 
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>
    );
  };

  const screenRenderer1 = () => {
    return (
      <ImageBackground
        source={require("../../../assets/images/Login-bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ScrollView
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            backgroundColor: "#e9f3ff",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* <View>
        <Text style={styles.header}>Campaign</Text>
      </View> */}
          <TouchableOpacity
            style={[
              styles.cardContainer,
              { alignItems: "center", justifyContent: "center" },
            ]}
            onPress={() => navigation.navigate("Create", { name: "Banner Ad" })}
          >
            <Image
              source={require("../../../assets/images/ad.jpg")}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.bannerTitle}>Banner Ad</Text>
              <Text style={styles.bannerInfo}>Displayed on the home page</Text>
              <Text style={styles.bannerPrice}>
                Starting from 4,000 points or $20/week
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cardContainer,
              { alignItems: "center", justifyContent: "center" },
            ]}
            onPress={() =>
              navigation.navigate("Create", { name: "Sponsored Products" })
            }
          >
            <Image
              source={require("../../../assets/images/ad2.jpg")}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.bannerTitle}>Sponsored Products</Text>
              <Text style={styles.bannerInfo}>
                Add your products to the featured list
              </Text>
              <Text style={styles.bannerPrice}>
                Starting from 4,000 points or $20/week
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cardContainer,
              { alignItems: "center", justifyContent: "center" },
            ]}
            onPress={() => navigation.navigate("Create", { name: "Web Ad" })}
          >
            <Image
              source={require("../../../assets/images/ad2.jpg")}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.bannerTitle}>Web Ad</Text>
              <Text style={styles.bannerInfo}>
                Advertise your product throughout the platform
              </Text>
              <Text style={styles.bannerPrice}>
                Starting from 4,000 points or $20/week
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  };

  return (
    <>
      <Spinner visible={state.isVisible}/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        labelStyle={{ color: "black" }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "#fff" }}
            indicatorStyle={{ backgroundColor: "#7F67A9", height: 2 }}
            renderLabel={({ route, color }) => (
              <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
            )}
          />
        )}
        tabStyle={{ color: "red" }}
        indicatorContainerStyle={{ color: "red" }}
        contentContainerStyle={{ color: "red" }}
        indicatorContainerStyle={{ color: "red" }}
      />
    </>
  );
};

export default Campaign;
