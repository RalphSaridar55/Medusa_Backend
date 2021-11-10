import React,{useEffect, useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { styles } from "./style_notificationList";
import { Avatar, Card, IconButton } from "react-native-paper";
import * as apiPortfolio from '../../core/apis/apiPortfolioServices'
import Spinner from "react-native-loading-spinner-overlay";

const List = ({ navigation }) => {
  const screenwidth = Dimensions.get("screen").width;
  const screenheight = Dimensions.get("screen").height;
  const dummyData = [
    {
      username: `User`,
      key: 1,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 2,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 3,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 4,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 5,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 6,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 7,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 8,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 9,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 10,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
  ];

  //public key for stripe eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwidXNlcl90eXBlIjo0LCJpZCI6MjIsIm93bmVyX2VtYWlsIjoibmV3c2VsbGVyQHlvcG1haWwuY29tIiwiY29tcGFueV9uYW1lIjoibmV3c2VsbGVyQHlvcG1haWwuY29tIiwib3duZXJfbW9iaWxlX251bWJlciI6IjEyMzQ1Njc4OSIsIm93bmVyX2NvdW50cnlfY29kZSI6Ijk2MSIsInBsYXRmb3JtIjoxLCJkZXZpY2VfaWQiOiJzdHJpbmciLCJhY2NvdW50X2xldmVsIjoiU0VMTEVSIiwidGltZXpvbmUiOjMsImlzX3N1Yl91c2VyIjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjEtMDktMjhUMTM6NDM6NTMuMTE0WiIsImlhdCI6MTYzNjU0NzU5OSwiZXhwIjoxNjUyMDk5NTk5fQ.tRwv5JXXLvZHFUrpFF8ioS_gj4_4JkV8_CiMmqr-SdQ

  /* useEffect(()=>{
    apiPortfolio.getNotifications().then((res)=>{
      setData({data:res,visible:false})
    });
  },[]) */
  const [data,setData] = useState({data:[],visible:true});

  useFocusEffect(
    React.useCallback(() => {
      apiPortfolio.getNotifications().then((res)=>{
        setData({data:res,visible:false})
      })
    }, [navigation])
  );


  return (
    <View>
      <Spinner visible={data.visible} />
      <ScrollView style={styles.chatsContainer}>
        {data.data
          .map((item, key) => {
            return (
              <View
                key={key}
                style={{ backgroundColor: "#E9F3FF" }}
              >
                <TouchableOpacity
                  style={styles.containerChat}
                  onPress={() =>{
                    console.log("id;",item.id)
                    apiPortfolio.readNotification({notification_id:item.id}).then((res)=>{
                      console.log("FROM NAV: ",res)
                    }).catch(err=>console.log(err.message))
                    
                      
                    navigation.navigate("Notifications", {
                      screen: "NotificationChat",
                      params:{...item}
                    })
                  }}
                >
                  <Card.Title
                    title={item.senderData.name}
                    titleStyle={{ fontSize: 17}}
                    subtitle={item.message}
                    subtitleNumberOfLines={2}
                    left={(props) => (
                      <Avatar.Icon size={20} {...props} icon="bell"/>
                    )}
                    right={(props) =><View>
                      <Avatar.Icon size={16} backgroundColor="#31C2AA" marginVertical={10} {...props} icon="check"/>
                      {/* <Text style={{color:"#31C2AA"}}>{item.read_status==true?"Read":""}</Text> */}
                      <Text style={{color:"#31C2AA"}}>{item.created_at.substring(0,10)}</Text>
                      </View>}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default List;
