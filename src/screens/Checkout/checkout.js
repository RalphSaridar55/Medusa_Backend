import React, { Component } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Delivery from './Delivery';

import Pickup from './Pickup';


const renderScene = SceneMap({
    first: Pickup,
    second: Delivery,
});

export default function Checkout() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Pickup' },
        { key: 'second', title: 'Delivery' },
    ]);

    return (
        <TabView
            style={{marginTop:40}}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}