import React from 'react';
import {ScrollView, View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {styles} from './style_notificationList';

const List =({navigation}) =>{
  
  const screenwidth = Dimensions.get("screen").width;
  const screenheight = Dimensions.get("screen").height;
  const dummyData = [
    {username:`User`,key:1,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Read'},
    {username:`Username`,key:2,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Read'},
    {username:`User`,key:3,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Read'},
    {username:`Username`,key:4,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Read'},
    {username:`User`,key:5,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'Read'},
    {username:`Username`,key:6,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'NotRead'},
    {username:`User`,key:7,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'NotRead'},
    {username:`Username`,key:8,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'NotRead'},
    {username:`User`,key:9,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'NotRead'},
    {username:`Username`,key:10,subject:"Changing price",text:'Please do change the price of this item. Please do change the price of this item', date:'02-07-2021',status:'NotRead'},
  ]

  return(
    <><ScrollView style={styles.chatsContainer}>{dummyData.sort((i)=>i.status==="NotRead"?-1:1).map((item,key)=>{
      return (
        <TouchableOpacity key={key} style={styles.containerChat}
        onPress={ ()=>navigation.navigate("NotificationChat")}>
        <View style={styles.pictureAndUsernameContainer}>
          <Image style={styles.adminImage} source={require('../../../assets/images/logo.png')} resizeMode="contain"/>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.date}</Text>
            <TouchableOpacity style={[styles.readButton,item.status=="Read"?{backgroundColor: "#31C2AA",}:{backgroundColor: "#D0312D",}]}>
              <Text style={{color:'#fff'}}>Read</Text>
            </TouchableOpacity>
          </View>
        </View>
          <Text style={styles.chatSubject}>{item.subject.length>40?item.subject.substring(0,40)+"...":item.subject}</Text>
          <Text style={styles.chatText}>{item.text.length>300?item.text.substring(0,300)+"...":item.text}</Text>
        </TouchableOpacity>
      )
    })}</ScrollView>
    </>
  )
}

export default List 