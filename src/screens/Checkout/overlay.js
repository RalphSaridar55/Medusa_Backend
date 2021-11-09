import Overlay from "react-native-modal-overlay";
import React,{useEffect,useState} from "react";
import {CardField, confirmPayment, StripeProvider,useStripe} from '@stripe/stripe-react-native';
import styles from '../Products/listing_style';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Alert,SafeAreaView} from 'react-native'

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;



const OverlayComp = (props) =>{
    
    const { confirmPayment } = useStripe(); 
    const [data,setData] = useState({});
    /* useEffect(()=>{
        console.log("PROPS:",props)
    },[]) */
    const check = async() =>{
        const {error} = await confirmPayment();
        Alert.alert("Error",error.message)
    }
    
    const sendBack=()=>{
        props.onchange();
    }

    const StripeRender = () =>{
        //console.log("PROPS CHILD: ",props)
        return(
            <SafeAreaView style={[styles2.docPicker,{display:!props.visible?"none":"flex"}]}>
                <CardField style={{height:50,}} 
                postalCodeEnabled={false} 
                onCardChange={(t)=>{
                    console.log(t);
                    setData(t)
                    //props.onchange(t)/* ; */
                    /* props.onchange() */
                }}/>
            </SafeAreaView>
        )
    }

    return(
        /* <Overlay 
                {...props}
                containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
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
                        Order Placement
                        </Text>
                        <MaterialCommunityIcons name="close" size={24} color="red"  onPress={props.onClose}/>
                    </View>
                    <View style={{flexDirection:'column',marginTop:20,}}>
                        
                        <View style={{width:150,paddingHorizontal:10}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    check()
                                    }
                                }
                                style={[styles.loginBtn,{height:40,marginTop:20}]}
                            >
                                <Text style={styles.loginBtnText}>Pay Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay> */
                        <StripeProvider publishableKey="key" merchantIdentifier="merchant.identifier">
                            <StripeRender props={{...props}}/>
                        </StripeProvider>
    )
}

const styles2 = StyleSheet.create({
    modalBoxInputs:{
        borderWidth:0.5,
        borderColor:'#31c2aa',
        borderRadius:10,
        width:screenwidth*0.7,
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:5
    },
    docPicker:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'lightgray',
        marginBottom:20,
        marginTop:10,
        paddingHorizontal:5,
        justifyContent:'center',
    },
})

export default OverlayComp;