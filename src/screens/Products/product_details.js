import React, { Component, createRef } from 'react';
import Carousel from 'react-native-banner-carousel';
import { Image, Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import styles from './details_style';
import Dialog from "react-native-dialog";
import ActionSheet from "react-native-actions-sheet";
import { Card, Text, List, Title, Chip, Paragraph, DataTable, Headline, Button } from 'react-native-paper';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 300;

const images = [
    "https://sc04.alicdn.com/kf/U01854b32af4b45a09df828bfb95a4679t.jpg",
    "https://sc04.alicdn.com/kf/U60b3294b8bca43b4be7ace957e90226ee.jpg",
    "https://sc04.alicdn.com/kf/U185220e1ddb64ef9ad7526daa9a169e6i.jpg",
    "https://sc04.alicdn.com/kf/Hf6c4d5d39fc64fac945778df0d59851ba.jpg"
];



const actionSheetRef = createRef();
const actionSheetRef_V = createRef();

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }


    showDialog = () => {
        this.setState({ visible: true })
    };

    handleCancel = () => {
        this.setState({ visible: false })
    };

    handleDelete = () => {
        this.setState({ visible: false })
    };



    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }
    render() {
        return (
            <View>
                <ScrollView >
                    <View style={styles.Bcontainer}>
                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}
                        >
                            {images.map((image, index) => this.renderPage(image, index))}
                        </Carousel>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Title>Wireless,Gamer,Rechargeable Mouse</Title>
                    </View>
                    <Card>
                        <Card.Title title="Variations" style={{ fontSize: 15 }} />
                        <Card.Content>
                            <Title style={{ fontSize: 14 }}>Colors:</Title>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <Image source={{ uri: "https://sc04.alicdn.com/kf/U0d1e94debab043c2b1578221e21cfb14W.jpg" }}
                                    style={styles.cardImage} ></Image>
                                <Image source={{ uri: "https://sc04.alicdn.com/kf/U60b3294b8bca43b4be7ace957e90226ee.jpg" }}
                                    style={styles.cardImage} ></Image>
                                <Image source={{ uri: "https://sc04.alicdn.com/kf/Hf6c4d5d39fc64fac945778df0d59851ba.jpg" }}
                                    style={styles.cardImage} ></Image>
                                <Image source={{ uri: "https://sc04.alicdn.com/kf/U60b3294b8bca43b4be7ace957e90226ee.jpg" }}
                                    style={styles.cardImage} ></Image>
                            </View>

                            <View >
                                <Title style={{ fontSize: 14 }}>Functionality:</Title>
                                <View>
                                    <View style={styles.functionalityContainer}>
                                        <Chip style={{ backgroundColor: '#fff', flex: 1, borderColor: '#5EB8C5', margin: 5 }} mode="flat" >Cable</Chip>
                                        <Chip style={{ backgroundColor: '#fff', flex: 1, borderColor: '#C4C4C4', margin: 5 }}>Wireless</Chip>
                                        <Chip style={{ backgroundColor: '#fff', flex: 1, borderColor: '#5EB8C5', margin: 5 }}>Cable</Chip>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>

                    <View >
                        <DataTable >
                            <DataTable.Header>
                                <DataTable.Title onPress={() => {
                                    actionSheetRef.current?.setModalVisible();
                                }}>Quick Details</DataTable.Title>
                                <DataTable.Title numeric onPress={() => {
                                    actionSheetRef.current?.setModalVisible();
                                }} >view more </DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>Model Number:</DataTable.Cell>
                                <DataTable.Cell numeric >Y-A2</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Brand Name:</DataTable.Cell>
                                <DataTable.Cell numeric>159</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Weight:</DataTable.Cell>
                                <DataTable.Cell numeric>237</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                        <ActionSheet ref={actionSheetRef}>
                            <View style={{ padding: 5 }}>
                                <Title  >Description:</Title>
                                <Paragraph>
                                    New wireless gamer simplicity mouse rechargeable white optical trackball gaming mouse lightweight for Office and Home Use
                                </Paragraph>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <DataTable>
                                    <ScrollView style={{ height: 400 }}>
                                        <DataTable.Header>
                                            <DataTable.Title>Quick Details</DataTable.Title>
                                        </DataTable.Header>
                                        <DataTable.Row>
                                            <DataTable.Cell>Model Number:</DataTable.Cell>
                                            <DataTable.Cell numeric >Y-A2</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Brand Name:</DataTable.Cell>
                                            <DataTable.Cell numeric>159</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Weight:</DataTable.Cell>
                                            <DataTable.Cell numeric>237</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Type</DataTable.Cell>
                                            <DataTable.Cell numeric>  2.4Ghz Wireless</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Power Type</DataTable.Cell>
                                            <DataTable.Cell numeric>RECHARGEABLE</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Application</DataTable.Cell>
                                            <DataTable.Cell numeric> Desktop, LAPTOP</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Model Number:</DataTable.Cell>
                                            <DataTable.Cell numeric >Y-A2</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Brand Name:</DataTable.Cell>
                                            <DataTable.Cell numeric>159</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Weight:</DataTable.Cell>
                                            <DataTable.Cell numeric>237</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Type</DataTable.Cell>
                                            <DataTable.Cell numeric>  2.4Ghz Wireless</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Power Type</DataTable.Cell>
                                            <DataTable.Cell numeric>RECHARGEABLE</DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>Application</DataTable.Cell>
                                            <DataTable.Cell numeric> Desktop, LAPTOP</DataTable.Cell>
                                        </DataTable.Row>
                                    </ScrollView>
                                </DataTable>
                            </View>
                        </ActionSheet>



                    </View>
                </ScrollView>
            </View>);
    }
}

export default ProductDetails;


/*
    <View style={{ padding: 10 }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <Headline>Similar products</Headline>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <Card>
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hf1bd3c0da31145ed835dab667efced6dP.jpg' }} style={{ height: 100 }} />
                                        <Card.Title title="Tops" subtitle="10 ~ 50 USD"></Card.Title>
                                    </Card>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                                    <Card >
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/HTB14p5ebyDxK1RjSsph762HrpXaT.png' }} style={{ height: 100 }} />
                                        <Card.Title title="Printer" subtitle="100 ~ 500 USD" ></Card.Title>
                                    </Card>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Card>
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hcaeb65c4343249649d5a8bb45af9408cI.jpg' }} style={{ height: 100 }} />
                                        <Card.Title title="Glasses" subtitle="1 ~ 5 USD"></Card.Title>
                                    </Card>
                                </View>
                            </View>
                        </View>

*/