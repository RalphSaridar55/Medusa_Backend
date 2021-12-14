import {View, Text, StyleSheet,ScrollView} from 'react-native';
import CountDown from 'react-native-countdown-component';
import React from 'react'

const TrackingList = () =>{
    const dummyData = [
        {id:1,order:"Addidas",timeleft:1000},
        {id:2,order:"Addidas",timeleft:2000},
        {id:3,order:"Addidas",timeleft:3000},
        {id:4,order:"Addidas",timeleft:4000},
        {id:5,order:"Addidas",timeleft:5000},
        {id:6,order:"Addidas",timeleft:6000},
    ]
    return(
    <View style={{backgroundColor:'#fff',flex:1}}>
        <ScrollView style={{flex:1}}>
            {dummyData.map((item,index)=>{
                return(
                    <View style={styles.cardContainer} key={index}>
                        <Text style={styles.orderTitle}>{item.order}</Text>
                        <CountDown
                            size={18}
                            until={item.timeleft}
                            onFinish={() => alert('Finished')}
                            digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#31C2AA'}}
                            digitTxtStyle={{color: '#31C2AA',fontFamily:'Adam-Bold'}}
                            timeLabelStyle={{color: '#7F67A9', fontFamily:'Adam-Bold',fontSize:16}}
                            separatorStyle={{color: '#31C2AA',}}
                            timeToShow={['D','H', 'M', 'S']}
                            timeLabels={{d:'',h:'',m: "", s: ""}}
                            showSeparator
                        />
                    </View>
                )
            })}
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:'#fff',
        borderBottomWidth:0.5,
        borderBottomColor:'lightgray',
        paddingVertical:30,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    orderTitle:{
        fontFamily:'Adam-Bold',
        fontSize:20
    },
    timeleft:{
        fontFamily:'Inter-Black-Light',
        fontSize:20,
        color: "#31C2AA",
    }
})

export default TrackingList