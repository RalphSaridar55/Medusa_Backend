import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {TouchableOpacityButton} from '../components/TouchableOpacity'
import Spinner from 'react-native-loading-spinner-overlay';
import * as ApiPortfolio from '../core/apis/apiPortfolioServices'

const screenWidth = Dimensions.get('screen').width;
const SignContract = (props) => {
    useEffect(()=>{
        console.log("Props: ",props)
    },[])
    const [visible, setVisible] = useState({modal:false,spinner:false});
    const signContract = () =>{
        //props.submitContract()
        setVisible({...visible,spinner:true})
        ApiPortfolio.userSignContract().then((res)=>{
            console.log("1")
            Alert.alert("Contract","Contract signed successfully")
            setVisible({modal:false,spinner:false})
            props.submitContract()
        }).then((res)=>{
            console.log("2")
            setVisible({modal:false,spinner:false})
            props.submitContract()
            props.navigation.navigate("Home")
        }).catch((err)=>{
            Alert.alert("Error","test")
            setVisible({modal:false,spinner:false})
        })
        setVisible({modal:false,spinner:false})
        //props.submitContract()
        //console.log("PROPS: ",props)
        //props.submitContract()
    } 

    return (
        <View>
            <Spinner visible={visible.spinner} />
            <TouchableOpacity onPress={() => setVisible({...visible,modal:true})} style={styles.contractStyle}>
                <Text style={{color:'white'}}>Your Profile has been Approved, download and sign your contract</Text>
            </TouchableOpacity>
            <Overlay visible={visible.modal} onClose={() => setVisible({...visible,modal:false})}
                containerStyle={[{ backgroundColor: `rgba(255,255,255,0.95)` }]}
                closeOnTouchOutside>

                <View style={styles.modalHeader}>
                    <Text
                        style={{
                            fontSize: 21,
                            color: "#31C2AA",
                            fontWeight: "bold",
                            marginBottom: 5,
                        }}
                    >
                        Contract
                    </Text>
                    <MaterialCommunityIcons name="close" size={24} color="red" onPress={() => setVisible({...visible,modal:false})} />
                </View>
                <ScrollView style={{marginVertical:20}}>
                    <Text>
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form, by injected humour,
                        or randomised words which don't look even slightly believable.
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                        embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend
                        to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                        It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures,
                        to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition,
                        injected humour, or non-characteristic words etc.
                    </Text>
                </ScrollView>
                <TouchableOpacityButton 
                text="Sign Contract" 
                onPress={()=>signContract()}
                additionalButtonStyle={{paddingHorizontal:10}}/>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth,
        paddingHorizontal: 20
    },
    contractStyle: {
        marginHorizontal:20,
        paddingHorizontal:20,
        paddingVertical:10,
        marginVertical:20,
        borderRadius:100,
        backgroundColor:'#31C2AA'
    }
})

export default SignContract