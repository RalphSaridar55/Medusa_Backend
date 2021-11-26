import { FontAwesome } from '@expo/vector-icons';
import React,{useEffect,useState} from 'react'
import {View, Text, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from './activity_styles';
import {dummyData} from './dummyData';

const Activity = (props) =>{

    const [isVisible,setIsVisible] = useState(true);
    const [data,setData] = useState([]);
    const [util,setUtil] = useState({total:0,page:1});

    useEffect(()=>{
        setIsVisible(false)
        setUtil({...util,total:dummyData.length})
    },[])
    
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  }; 

    const loadMore = (page) =>{
        setIsVisible(true);
        setUtil({...util,page:page})
        console.log("SOULD RENDER MORE");
        setIsVisible(false)
    }

    return (
        <View style={styles.page}>
            <Spinner visible={isVisible} />
            <ScrollView
                        showsVerticalScrollIndicator={false}
                        onScroll={({nativeEvent}) => {
                            //console.log("length",this.state.total)
                            if (isCloseToBottom(nativeEvent) && dummyData.length<util.total) {
                                let page = page + 1; 
                                loadMore(page);
                            }
                          }}>
                {dummyData.map((item,index)=>{
                    return (
                        <View key={index} style={styles.elementContainer}>
                            <View style={styles.child}>
                                <View style={styles.left}>
                                    <View style={styles.iconContainer}>
                                        <FontAwesome name="user-circle-o" size={30} color="#6E91EC"/>
                                    </View>
                                    <View>
                                        <Text style={styles.username}>{item.name}</Text>
                                        <Text style={styles.action}>{item.action}</Text>
                                    </View>
                                </View>
                                <Text style={styles.date}>{item.date}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Activity