import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { privacy } from './Data';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';

const Privacy = (props) => {

    const [visible, setVisible] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setVisible(false);
        }, [])
    )

    return (<View style={styles.body}>

        <View style={styles.container}>
            <Spinner visible={visible} />
            <Text style={styles.header}>Privacy</Text>
            <Text style={styles.text}>{privacy}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    body: { backgroundColor: "#fff", flex: 1 },
    header: {
        fontFamily: 'Adam-Bold',
        fontSize: 24,
        marginVertical: 20
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        marginHorizontal: 20,
    },
    text: {
        fontFamily: 'Inter-Black-Light',
        fontSize: 14
    }
})

export default Privacy