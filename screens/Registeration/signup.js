import React, { Component } from 'react';
import { View } from 'react-native-ui-lib';
import * as ROUTE_LIST from "../../core/apis/apis-list"
import APIKit from "../../core/apis/APIKit"
import { ImageBackground, ScrollView } from 'react-native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedCategoires: [],
            fetchedCountries: [],
            fetchedSubCategories: [],
            selectedAccount: [],
            typeList: [
                {
                    item: "Seller & Buyer",
                    id: "1",
                },
                {
                    item: "Buyer",
                    id: "2",
                },
            ]
        }
    }

    componentDidMount() {
        this.getCategoires();
        this.getCountries();
        this.getCategoryDetails();
    }

    getCategoires = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.HOME_CATEGORIES}`).then((res) => {
            const result = res.data.data.map(option => ({ value: option.id, label: option.category_name }));
            this.setState({ fetchedCategoires: result })
        });
    };
    getCountries = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.COUNTRIES}`).then((res) => {
            const COUNTRIES = res.data.data.map(option => ({ value: option.id, label: option.name }));
            this.setState({ fetchedCountries: COUNTRIES })
        });
    };

    getCategoryDetails = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.CATEGORIES}`).then((res) => {
            const results = res.data.data
            this.setState({ fetchedSubCategories: results })
        });
    };


    onMultiChange = (item) => {
        this.setState({ selectedAccount: xorBy(item) })
    }
 
    render() {
        return (
            <ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
                style={{
                    flex: 1,
                }}>
                <ScrollView>
                    <View>
                        <View>
                            <SelectBox
                                label="Select multiple"
                                options={this.state.typeList}
                                selectedValues={this.state.selectedAccount}
                                onMultiSelect={this.onMultiChange}
                                onTapClose={this.onMultiChange}
                                isMulti
                            />
                        </View>
                    </View>
                </ScrollView>

            </ImageBackground>);
    }
}

export default Signup;