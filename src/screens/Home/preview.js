import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';
import { Card } from 'react-native-paper';

export default (Preview = ({
    style,
    item,
    imageKey,
    onPress,
    index,
    active,
    local,
}) => {
    return (

        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <View style={styles.cardHeader}>
            </View>
            <Image style={styles.userImage} source={{ uri: item[imageKey] }} />
            <View style={styles.cardFooter}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    cardFooter: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: "flex-start",
        color: "#000",
        fontWeight: 'bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        alignSelf: "flex-start",
        color: "#696969"
    },
});

