import Overlay from "react-native-modal-overlay";
import React, { useEffect, useState } from "react";
import { CardField, confirmPayment, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import styles from '../Products/listing_style';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, SafeAreaView } from 'react-native'

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;



const OverlayComp = (props) => {

    const { confirmPayment } = useStripe();
    const [data, setData] = useState({});
    useEffect(()=>{
        console.log("PROPS:",props)
    },[])
    const check = async () => {
        const { error } = await confirmPayment();
        Alert.alert("Error", error.message)
    }

    const sendBack = (t) => {
        console.log("TEST: ",t)
        if(t.complete==true){
            props.onchange(t);
            apiPayment.complete

        }
    }

    return (
        <StripeProvider publishableKey={process.env.STRIPE_PK} merchantIdentifier="merchant.identifier">
            <SafeAreaView style={[styles2.docPicker, { display: !props.visible ? "none" : "flex" }]}>
                <CardField style={{ height: 50, }}
                    postalCodeEnabled={false}
                    onCardChange={(t) => {
                        sendBack(t)
                    }} />
            </SafeAreaView>
        </StripeProvider>
    )
}

const styles2 = StyleSheet.create({
    modalBoxInputs: {
        borderWidth: 0.5,
        borderColor: '#31c2aa',
        borderRadius: 10,
        width: screenwidth * 0.7,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5
    },
    docPicker: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray',
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
})

export default OverlayComp;