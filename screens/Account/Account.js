import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Divider, IconButton } from 'react-native-paper';
import styles from "./style"
export default class Account extends Component {
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#E9F3FF', }}>
                <ScrollView style={{ padding: 10 }}>
                    <Card style={{ marginBottom: 10 }}>
                        <Button icon="login" contentStyle={{ flexDirection: 'row-reverse', }} mode="contained" style={{ backgroundColor: "#698EB7", padding: 5 }} onPress={() => this.props.navigation.navigate('Login')}>Login or Register </Button>
                    </Card>
                    <Card >
                        <Card.Title
                            style={styles.card}
                            title="Account Details"
                            titleStyle={styles.Title}
                            left={(props) => <Avatar.Icon {...props} icon="currency-usd" color="#fff" style={styles.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('Login')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={styles.card}
                            title="Currency"
                            titleStyle={styles.Title}
                            left={(props) => <Avatar.Icon {...props} icon="currency-usd" color="#fff" style={styles.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={styles.card}
                            title="Country"
                            titleStyle={styles.Title}
                            left={(props) => <Avatar.Icon {...props} icon="earth" color="#fff" style={styles.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
                        />

                    </Card>

                    <Card style={{ marginTop: 10 }}>

                        <Card.Title
                            style={styles.card}
                            title="About us"
                            titleStyle={styles.Title}
                            left={(props) => <Avatar.Icon {...props} icon="information-outline" color="#fff" style={styles.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={styles.card}
                            title="Contact us"
                            titleStyle={styles.Title}
                            left={(props) => <Avatar.Icon {...props} icon="cellphone" color="#fff" style={styles.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => this.props.navigation.navigate('')} />}
                        />
                        <Divider />
                        <Card.Title
                            style={styles.card}
                            title="Terms & Conditions"
                            titleStyle={styles.Title}
                            left={(props) => <Avatar.Icon {...props} icon="drag" color="#fff" style={styles.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
                        />
                        <Divider />
                        <Card.Title
                            style={styles.card}
                            title="Privacy Policy"
                            titleStyle={styles.Title}
                            left={(props) => <Avatar.Icon {...props} icon="shield-key-outline" color="#fff" style={styles.avatarbg} size={30} />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
                        />
                    </Card>

                </ScrollView>
            </View>
        )
    }
}


