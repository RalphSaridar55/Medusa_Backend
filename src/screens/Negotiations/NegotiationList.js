import React from 'react';
import {ScrollView, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {styles} from './style_negotiationList';

const List =({navigation}) =>{
  
  const screenwidth = Dimensions.get("screen").width;
  const screenheight = Dimensions.get("screen").height;
  const dummyData = [
    {username:`User`,key:1,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Active'},
    {username:`Username`,key:2,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Active'},
    {username:`User`,key:3,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Active'},
    {username:`Username`,key:4,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Active'},
    {username:`User`,key:5,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Active'},
    {username:`Username`,key:6,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`User`,key:7,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`Username`,key:8,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`User`,key:9,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`Username`,key:10,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`User`,key:11,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`Username`,key:12,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`User`,key:13,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Approved'},
    {username:`Username`,key:14,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`User`,key:15,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`Username`,key:16,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`User`,key:17,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`Username`,key:18,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`User`,key:19,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`Username`,key:20,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`User`,key:21,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`Username`,key:22,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`User`,key:23,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`Username`,key:24,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`User`,key:25,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`Username`,key:26,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
    {username:`User`,key:27,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Rejected'},
  ]

  const screenRenderer = (status) =>{
    let data=[];
    if(status ==="")
      data = dummyData;
    else{
      data = dummyData.filter((item)=>{
        return item.status === status
      })
    }
    return <ScrollView style={styles.chatsContainer}>{data.map((item,key)=>{
      return(
        <TouchableOpacity key={key} style={styles.containerChat}
        onPress={()=>navigation.navigate("Negotiation")}>
        <View style={styles.pictureAndUsernameContainer}>
          <View
            style={[
              styles.pictureContainer, {backgroundColor: "#7F67A9" },
            ]}
          >
            <Text style={styles.name}>AB</Text>
          </View>
          <Text style={styles.username}>
            {item.username}
          </Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
          <Text style={styles.chatSubject}>{item.subject.length>40?item.subject.substring(0,40)+"...":item.subject}</Text>
          <Text style={styles.chatText}>{item.text.length>300?item.text.substring(0,300)+"...":item.text}</Text>
        </TouchableOpacity>
      )
    })}</ScrollView>
  }

  const firstScreen = () => {return screenRenderer("Active")}
  const secondScreen = () =>{ return screenRenderer("Approved")}
  const thirdScreen = () =>{ return screenRenderer("Rejected")}
  const fourthScreen = () =>{ return screenRenderer("")}

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Active' },
    { key: 'second', title: 'Approved' },
    { key: 'third', title: 'Rejected' },
    { key: 'fourth', title: 'All' },
  ]);

  const renderScene = SceneMap({
    first: firstScreen,
    second: secondScreen,
    third: thirdScreen,
    fourth: fourthScreen,
  });

  return(
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
      //initialLayout={{ width: layout.width }}
    />
    </>
  )
}

export default List 