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
        <TouchableOpacity
            style={[styles.videoContainer]}
            onPress={() => onPress(item)}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Card>
                        <Card.Cover source={{ uri: item[imageKey] }} style={{height:100 , resizeMode:'contain'}} />
                        <Card.Title title={item.name} subtitle={item.status}></Card.Title>
                    </Card>
                </View>
            </View>

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    videoContainer: {
        //paddingVertical: 28,
        margin: 10,
    },
    videoPreview: {
        width: 275,
        height: 155,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    desc: {
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        marginTop: 18,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
  
});