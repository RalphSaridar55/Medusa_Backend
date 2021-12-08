import React,{useState,useEffect} from 'react';
import {ScrollView, View, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {styles} from './style_negotiationList';
import * as API from '../../core/apis/apiChatServices';

const List =({navigation}) =>{
  
  const [all,setAll] = useState({dataAll:[],totalAll:0,dataRejected:[],totalRejected:0,dataApproved:[],totalApproved:0,dataActive:[],totalActive:0,})
  const [visible,setVisible] = useState(true)
  const [page,setPage] = useState(1)

  const screenwidth = Dimensions.get("screen").width;
  const screenheight = Dimensions.get("screen").height;
  
  const loadMore = (page,data) => {
    setVisible(true)
    API.getChatList(data.status,page).then((res)=>{
      let resultArray = data.concat(res.data)
      switch (data.status){
        case 2:
            setAll({...all,dataActive:resultArray,totalActive:resultArray.length})
        case 4:
            setAll({...all,dataApproved:resultArray,totalApproved:resultArray.length})
        case 5:
            setAll({...all,dataRejected:resultArray,totalRedataRejected:resultArray.length})
        case 6:
            setAll({...all,dataAll:resultArray,totalAll:resultArray.length})
      setVisible(false)    
      }
      setPage(page)
    })
  }
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };

  useEffect(()=>{
      setVisible(true)
    API.getChatList(6,page).then((res)=>{
      console.log("API RESULT: ",res)
      const active = res.data.filter((i)=>i.status===2)
      const approved = res.data.filter((i)=>i.status===4)
      const rejected = res.data.filter((i)=>i.status===5)
      setAll({dataAll:res.data,totalAll:res.data.length,dataRejected:rejected,totalRejected:rejected.length,dataApproved:approved,totalApproved:approved.length,dataActive:active,totalActive:active.length,})
      //setActive({data:active,total:active.length});
      //setApproved({data:approved,total:approved.length});
      //setRejected({data:rejected,total:rejected.length});
      setVisible(false)
      console.log("ACTIVE: ",active)
    })
  },[])

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
        setVisible(true)
      API.getChatList(6,page).then((res)=>{
        console.log("API RESULT: ",res)
        const active = res.data.filter((i)=>i.status===2)
        const approved = res.data.filter((i)=>i.status===4)
        const rejected = res.data.filter((i)=>i.status===5)
        setAll({dataAll:res.data,totalAll:res.data.length,dataRejected:rejected,totalRejected:rejected.length,dataApproved:approved,totalApproved:approved.length,dataActive:active,totalActive:active.length,})
        setVisible(false)
        console.log("ACTIVE: ",active)
      })
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const screenRenderer = (status) =>{
    //console.log("STATUS: ",status)
    return <ScrollView style={styles.chatsContainer}
    onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent) && status.length<this.state.total_roles) {
            let pa = page + 1; 
            loadMore(pa,status);
        }
      }}
    >{status?.map((item,key)=>{
      return(
        <TouchableOpacity key={key} style={styles.containerChat}
        onPress={()=>{
          if(item.status==4){
            Alert.alert("Negotiation","Negotiation is already approved")
          }
          else if(item.status==5){
            Alert.alert("Negotiation","Negotiation is already rejected");
          }
          else
            navigation.navigate("Negotiation",{fromOrder:{...item,type:item.status}})
          }}>
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

  const firstScreen = () => {return screenRenderer(all.dataActive)}
  const secondScreen = () =>{ return screenRenderer(all.dataApproved)}
  const thirdScreen = () =>{ return screenRenderer(all.dataRejected)}
  const fourthScreen = () =>{ return screenRenderer(all.dataAll)}

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
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#fff'}}
      indicatorStyle={{ backgroundColor: '#7F67A9', height: 2 }}
      renderLabel={({route, color}) => (
        <Text style={{ color: 'black', margin: 8, fontFamily:'Adam-Bold' }}>
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