
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import * as ROUTE_LIST from "../../core/apis/apis-list";
import * as apiUserServices from "../../core/apis/apiUserServices";
import styles from './categories_style';

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            SubCategories: []
        }
    }

    componentDidMount() {
        this.getCategoires()

    }

    getCategoires = () => {
        apiUserServices.APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.HOME_CATEGORIES}`).then((res) => {
            const result = res.data.data
            console.log(result)
            this.setState({ categories: result })
        });
    };



    render() {
        return (

            <View style={styles.container}>
                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={this.state.categories}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={() => { this.props.navigation.navigate('CategoiresList', { id: item.category_name }); }}>
                                <View style={styles.cardHeader}>

                                </View>
                                <Image style={styles.userImage} source={{ uri: item.category_image }} />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.name}>{item.category_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>

        );
    }
}

