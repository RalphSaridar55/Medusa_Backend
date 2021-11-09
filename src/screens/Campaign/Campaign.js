import React, { useState } from "react";
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

const Campaign = ({ navigation }) => {
  const screenWidth = Dimensions.get("screen").width;

  const chart2config = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#5BC5C9`,
    labelColor: (opacity = 1) => `#6893B9`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.6,
    useShadowColorFromDataset: false, // optional,
    propsForBackgroundLines: {
      opacity: 0,
    },
    propsForHorizontalLabels: {
      opacity: 1,
      width: 0,
    },
    showValuesOnTopOfBars: false,
  };

  const firstScreen = () => {
    return screenRenderer1();
  };
  const secondScreen = () => {
    return screenRenderer2();
  };
  const dummyData = [
    {
      title: "banner Ad",
      image: `${require("../../../assets/images/mycampaign1.jpg")}`,
      dataSecondChart: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 70],
          },
        ],
      },
      name: "Campaign 1",
      points: 50,
      timeLeft: "1D 20H",
      clicks: 500,
    },
    {
      title: "Web Ad",
      image: `${require("../../../assets/images/mycampaign2.jpg")}`,
      dataSecondChart: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 70],
          },
        ],
      },
      name: "Campaign 2",
      points: 40,
      timeLeft: "1D 10H",
      clicks: 500,
    },
  ];
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
          {dummyData.map((item, index) => {
            return (
              <View
                style={styles.cardContainer}
                key={index}
                onPress={() =>
                  navigation.navigate("Create", { name: "Banner Ad" })
                }
              >
                <View style={styles.myCampaignTitleContainer}>
                  <Text style={[styles.bannerTitle]}>Banner Ad</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <Image
                    source={item.image}
                    style={{ width: "100%", height: 300 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={[styles.infoContainer, { flex: 1 }]}>
                  <CollapsibleList
                    buttonPosition="top"
                    numberOfVisibleItems={0}
                    buttonContent={
                      <View style={{ marginBottom: 20 }}>
                        <Text style={styles.collapsibleButton}>More Info</Text>
                      </View>
                    }
                  >
                    <BarChart
                      //style={graphStyle}
                      data={item.dataSecondChart}
                      width={screenWidth * 0.8}
                      height={220}
                      chartConfig={chart2config}
                      withInnerLines={false}
                      //withHorizontalLabels = {false}
                      propsForHorizontalLabels={{
                        opacity: 0,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        width: "100%",
                        padding: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>{item.name}</Text>
                        <Text>{item.clicks} Clicks</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>{item.timeLeft} Remaining</Text>
                        <Text style={{ color: "gray" }}>
                          {item.points} Points
                        </Text>
                      </View>
                    </View>
                  </CollapsibleList>
                </View>
             
              </View>
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
