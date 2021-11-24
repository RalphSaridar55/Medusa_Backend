import React, { useState, useEffect } from "react";
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
} from "react-native";
import { styles } from "./Campaign_style";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { BarChart } from "react-native-chart-kit";
import CollapsibleList from "react-native-collapsible-list";
import { campaignType,dummyData } from "./map";
import Spinner from "react-native-loading-spinner-overlay";

const Campaign = ({ navigation }) => {
  const screenWidth = Dimensions.get("screen").width;
  const [data,setData] = useState([])
  const [isVisible,setIsVisible] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      setIsVisible(true)
      API.getCampaigns().then((res)=>{
        console.log("RES: ",res)
        setData(res)
        setIsVisible(false)
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

  const screenRenderer2 = () => {
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
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          {data.length>0 && data.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.cardContainer}
                key={index}
                onPress={() =>
                  //console.log("Tre")
                  navigation.navigate("CampaignDetailed", { id:item.id })
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
                  {(item.start_date==0 || to_duration ==0)?null:
                  <View style={styles.insideContainer}>
                  <Text style={styles.infoText}>From: {item.start_date}</Text>
                  <Text style={styles.infoText}>To: {item.to_duration}</Text>
                  </View>}
                </View>
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
      <Spinner visible={isVisible}/>
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
