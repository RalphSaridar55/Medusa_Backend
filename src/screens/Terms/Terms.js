import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { terms, privacy } from './Data';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';

const Terms = (props) => {

    const [screenType, setScreenType] = useState("terms");
    const [visible, setVisible] = useState(true);

    useFocusEffect(
        useCallback(() => {
            console.log(props.route)
            setScreenType(props.route.params.type)
            setVisible(false);
        }, [])
    )

    return (
        <ScrollView style={{ flex: 1 }}>
            <Spinner visible={visible} />
            <Text style={styles.header}>{screenType == "terms" ? "Terms & Conditions" : "Privacy Policy"}</Text>
            <Text style={styles.text}>{screenType == "terms" ? terms : privacy}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'Adam-Bold',
        fontSize: 24
    },
    text: {
        fontFamily: 'Inter-Black-Light',
        fontSize: 18
    }
})

export default Terms