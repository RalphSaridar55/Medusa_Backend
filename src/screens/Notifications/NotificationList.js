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
      {data.data.length>0?<ScrollView style={styles.chatsContainer}>
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
                    titleStyle={{ fontSize: 18,fontFamily:'Adam-Bold'}}
                    subtitleStyle={{ fontSize:12, fontFamily:'Inter-Black-Light'}}
                    subtitle={item.message}
                    subtitleNumberOfLines={2}
                    left={(props) => (
                      <Avatar.Icon size={20} {...props} icon="bell"/>
                    )}
                    right={(props) =><View>
                      <Avatar.Icon size={16} backgroundColor="#31C2AA" marginVertical={10} {...props} icon="check"/>
                      {/* <Text style={{color:"#31C2AA"}}>{item.read_status==true?"Read":""}</Text> */}
                      <Text style={{color:"#31C2AA",fontFamily:'Inter-Black-Light'}}>{item.created_at.substring(0,10)}</Text>
                      </View>}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>:<Text style={{textAlign:'center',marginTop:20,fontFamily:'Adam-Bold',fontSize:16}}>No New Notifications</Text>}
    </View>
  );
};

export default List;
