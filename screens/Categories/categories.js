
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import * as ROUTE_LIST from "../../core/apis/apis-list"
import APIKit from "../../core/apis/APIKit"

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
        this.getCategoryDetails()
    }

    getCategoires = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.HOME_CATEGORIES}`).then((res) => {
            const result = res.data.data
            this.setState({ categories: result })
        });
    };

    getCategoryDetails = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.CATEGORIES}`).then((response) => {
            for (let i = 0; i < 1; i++) {
                var result = response.data.data.data[i].subcategory.map(option => ({ value: option.id, label: option.sub_category_name, key: option.id }))
                console.log(result)
            }
            this.setState({ SubCategories: result })
        });
    };

    clickEventListener(item) {

    }
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
                            <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F3FF'
    },
    list: {
        paddingHorizontal: 5,
    },
    listContainer: {
        alignItems: 'center'
    },
    /******** card **************/
    card: {
        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        borderColor: "#DCDCDC",
        borderWidth: 3,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#31c2aa",
        fontWeight: 'bold'
    }
});
