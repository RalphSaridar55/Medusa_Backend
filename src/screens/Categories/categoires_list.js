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
import { List } from 'react-native-paper';


class CategoiresList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            SubCategories: [],
            Brands: [],
            id: this.props.route.params.id,

        }
    }

    componentDidMount() {
        this.getCategoryDetails()
    }

    componentDidUpdate(prevState) {
        if (prevState.id !== this.props.route.params.id) {
            this.getCategoryDetails()
            prevState.id = this.props.route.params.id
        }
    }


    getCategoryDetails = () => {
        this.setState({ SubCategories: [] })
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.CATEGORIES}`).then((response) => {
            const name = this.props.route.params.id
            var Res = response.data.data.data.filter(option => option.category_name === name)
            if (Res.length > 0) {
                var Ind = response.data.data.data.indexOf(option => option.category_name === name) + 1
                var find = Res[Ind].subcategory.map(option => ({ value: option.id, label: option.sub_category_name, key: option.id, Brands: option.brands }))
                this.setState({ SubCategories: find })
                var Dee = this.state.SubCategories.map(val => val.Brands)
                const arr = []
                for (let i = 0; i < 4; i++) {
                    arr.push({ value: Dee[Ind][i].brand_name, key: Dee[Ind][i].id })
                }
                this.setState({ Brands: arr })
            }
            else {
                alert("No Data yet ")
            }
        });
    };

    updateView = () => {
        if (this.state.SubCategories.length > 0) {
            return <View>
                <List.AccordionGroup>
                    {this.state.SubCategories.map((sub) => (
                        <List.Accordion title={sub.label} id={sub.key} key={sub.key}>
                            {this.state.Brands.map((brand) => {
                                return (
                                    <List.Item title={brand.value} id={brand.key} key={brand.key} />
                                );
                            })}
                        </List.Accordion>))}
                </List.AccordionGroup>
            </View>;
        } else {
            return <View style={{ justifyContent: 'center', flex: 1, fontSize: 18, alignItems: 'center', padding: 20, margin: 20 }} ><Text>No Data </Text></View>;
        }
    }
    render() {

        return (
            <View>
                {this.updateView()}
            </View>
        )
    }

}

export default CategoiresList;
