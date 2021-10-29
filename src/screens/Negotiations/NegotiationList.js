import React,{useState,useEffect} from 'react';
import {ScrollView, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {styles} from './style_negotiationList';
import * as API from '../../core/apis/apiChatServices';

const List =({navigation}) =>{
  
  const [active,setActive] = useState()
  const [approved,setApproved] = useState()
  const [rejected,setRejected] = useState()
  const [all,setAll] = useState()
  const [visible,setVisible] = useState(true)

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

  useEffect(()=>{
      setVisible(true)
    API.getChatList(6).then((res)=>{
      console.log("API RESULT: ",res)
      setAll(res)
      const active = res.filter((i)=>i.status===2)
      const approved = res.filter((i)=>i.status===4)
      const rejected = res.filter((i)=>i.status===5)
      setActive(active);
      setApproved(approved);
      setRejected(rejected);
      setVisible(false)
      console.log("ACTIVE: ",active)
    })
  },[])

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
        setVisible(true)
      API.getChatList(6).then((res)=>{
        console.log("API RESULT: ",res)
        setAll(res)
        const active = res.filter((i)=>i.status===2)
        const approved = res.filter((i)=>i.status===4)
        const rejected = res.filter((i)=>i.status===5)
        setActive(active);
        setApproved(approved);
        setRejected(rejected);
        setVisible(false)
        console.log("ACTIVE: ",active)
      })
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const screenRenderer = (status) =>{
    return <ScrollView style={styles.chatsContainer}>{status?.map((item,key)=>{
      return(
        <TouchableOpacity key={key} style={styles.containerChat}
        onPress={()=>navigation.navigate("Negotiation",{fromOrder:{...item,type:item.status}})}>
        <View style={styles.pictureAndUsernameContainer}>
          <View
            style={[
              styles.pictureContainer, {backgroundColor: "#7F67A9" },
            ]}
          >
            <Text style={styles.name}>{item.chat_sender_name.substring(0,2).toUpperCase()}</Text>
          </View>
          <Text style={styles.username}>
            {item.chat_sender_name}
          </Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.created_at.substring(0,10)}</Text>
          </View>
        </View>
  {/*         <Text style={styles.chatSubject}>{item.subject.length>40?item.subject.substring(0,40)+"...":item.subject}</Text> */}
          <Text style={styles.chatSubject}>{item.negotiate_reply.length>300?item.negotiate_reply.substring(0,300)+"...":item.negotiate_reply}</Text>
        </TouchableOpacity>
      )
    })}</ScrollView>
  }

  const firstScreen = () => {return screenRenderer(active)}
  const secondScreen = () =>{ return screenRenderer(approved)}
  const thirdScreen = () =>{ return screenRenderer(rejected)}
  const fourthScreen = () =>{ return screenRenderer(all)}

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
    <Spinner visible={visible} />
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
  )
}

export default List 