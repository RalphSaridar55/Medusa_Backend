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
import styles from './preview_style';

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

