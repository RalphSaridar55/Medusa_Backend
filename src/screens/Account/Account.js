import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar, Button, Card, Divider, IconButton } from 'react-native-paper';
import accountStyle from "./accountStyle"
export default class Account extends Component {
    render() {
        return (
            <View style={}>
                <ScrollView style={accountStyle.scrollView}>
                    <Card style={accountStyle.cardPadding}>
                        <Button icon="login" contentStyle={{ flexDirection: 'row-reverse', }} mode="contained" style={{ backgroundColor: "#698EB7", padding: 5 }} onPress={() => this.props.navigation.navigate('Login')}>Login or Register </Button>
                    </Card>
                    <Card >
                        <Card.Title
                            style={accountStyle.card}
                            title="Account Details"
                            titleStyle={accountStyle.Title}
                            left={(props) => <Avatar.Icon {...props} icon="currency-usd" color="#fff" style={accountStyle.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('Login')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={accountStyle.card}
                            title="Currency"
                            titleStyle={accountStyle.Title}
                            left={(props) => <Avatar.Icon {...props} icon="currency-usd" color="#fff" style={accountStyle.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={accountStyle.card}
                            title="Country"
                            titleStyle={accountStyle.Title}
                            left={(props) => <Avatar.Icon {...props} icon="earth" color="#fff" style={accountStyle.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
                        />
                    </Card>
                    <Card style={{ marginTop: 10 }}>
                        <Card.Title
                            style={accountStyle.card}
                            title="About us"
                            titleStyle={accountStyle.Title}
                            left={(props) => <Avatar.Icon {...props} icon="information-outline" color="#fff" style={accountStyle.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={accountStyle.card}
                            title="Contact us"
                            titleStyle={accountStyle.Title}
                            left={(props) => <Avatar.Icon {...props} icon="cellphone" color="#fff" style={accountStyle.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={accountStyle.card}
                            title="Terms & Conditions"
                            titleStyle={accountStyle.Title}
                            left={(props) => <Avatar.Icon {...props} icon="drag" color="#fff" style={accountStyle.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
                        />
                        <Divider />
                        <Card.Title
                            style={accountStyle.card}
                            title="Privacy Policy"
                            titleStyle={accountStyle.Title}
                            left={(props) => <Avatar.Icon {...props} icon="shield-key-outline" color="#fff" style={accountStyle.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
                        />
                    </Card>
                </ScrollView>
            </View>
        )
    }
}


