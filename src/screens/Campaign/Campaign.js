import React,{useState} from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, Dimensions, Alert} from "react-native";
import { styles } from "./Campaign_style";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { BarChart } from 'react-native-chart-kit';
import CollapsibleList from "react-native-collapsible-list";
import { campaignType,dummyData } from "./map";

const Campaign = ({navigation}) => {
  const screenWidth = Dimensions.get('screen').width;

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
    propsForBackgroundLines:{
        opacity:0
    },
    propsForHorizontalLabels:  {
        opacity:1,
        width:0
    },
    showValuesOnTopOfBars:false
  }

  const firstScreen = () => {return screenRenderer1()}
  const secondScreen = () =>{ return screenRenderer2()}
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Create Campaign' },
    { key: 'second', title: 'My Campaigns' },
  ]);

  const renderScene = SceneMap({
    first: firstScreen,
    second: secondScreen,
  });

  const screenRenderer2 = () =>{
    return <ScrollView style={{marginHorizontal:20,marginVertical:20,backgroundColor:'#e9f3ff'}}
    showsVerticalScrollIndicator={false}> 
      {/* <View>
        <Text style={styles.header}>Campaign</Text>
      </View> */}
      {dummyData.map((item,index)=>{
        return(<View style={styles.cardContainer} key={index}
          onPress={()=>navigation.navigate("Create",{name:"Banner Ad"})}>
            <View style={styles.myCampaignTitleContainer}>
              <Text style={[styles.bannerTitle]}>Banner Ad</Text>
            </View>
            <View style={{width:'100%',alignItems:'center',paddingHorizontal:20}}> 
              <Image source={item.image} style={{width:'100%',height:400}} resizeMode="contain"/>
            </View>
            <View style={[styles.infoContainer,{flex:1}]}>
            <CollapsibleList
            buttonPosition="top"
            numberOfVisibleItems={0}
            buttonContent={
                <View style={{marginBottom:20}}>
                  <Text style={styles.collapsibleButton}>More Info</Text>
                </View>
              }>
              <BarChart
                  //style={graphStyle}
                  data={item.dataSecondChart}
                  width={screenWidth*0.8}
                  height={220}
                  chartConfig={chart2config}
                  withInnerLines	= {false}
                  //withHorizontalLabels = {false}
                  propsForHorizontalLabels = {{
                      opacity:0
                  }}
              />
              <View style={{flexDirection:'column',width:'100%',padding:20}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{item.name}</Text>
                        <Text>{item.clicks} Clicks</Text>
                  </View>
                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{item.timeLeft} Remaining</Text>
                        <Text style={{color:'gray'}}>{item.points} Points</Text>
                  </View>                
              </View>
            </CollapsibleList>
            
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                  onPress={()=>{
                    Alert.alert("End Campaign","Are you sure you want to end this campaign ?",[
                      {text:"No"},
                      {text:"Yes",onPress:()=>console.log("Deleted")}
                    ])
                  }}
                  style={[styles.loginBtn]}
                >
                  <Text style={styles.loginBtnText}>End Campaign</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
      })}
    </ScrollView>
  }

  const screenRenderer1 = () =>{
    return <ScrollView style={{marginHorizontal:20,marginVertical:20,backgroundColor:'#e9f3ff'}}
    showsVerticalScrollIndicator={false}> 
      {/* <View>
        <Text style={styles.header}>Campaign</Text>
      </View> */}
      {campaignType.map((item,index)=>{
        return(
          <TouchableOpacity style={[styles.cardContainer,{alignItems:'center',justifyContent:'center'}]}
          onPress={()=>navigation.navigate("Create",{name:item.name})} key={index}>
            <Image source={item.image} resizeMode="contain"/>
            <View style={styles.infoContainer}>
                <Text style={styles.bannerTitle}>{item.text1}</Text>
                <Text style={styles.bannerInfo}>{item.text2}</Text>
                <Text style={styles.bannerPrice}>{item.text3}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  }

  return (
    <>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      labelStyle={{color:'black'}}
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#fff'}}
      indicatorStyle={{ backgroundColor: '#7F67A9', height: 2 }}
      renderLabel={({route, color}) => (
        <Text style={{ color: 'black', margin: 8 }}>
          {route.title}
        </Text>
      )}/>}
      tabStyle={{color:'red'}}
      indicatorContainerStyle={{color:'red'}}
      contentContainerStyle={{color:'red'}}
      indicatorContainerStyle={{ color: 'red' }}
    />
    </>
    
  );
}

export default Campaign;
