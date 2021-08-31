
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { Card, Button, Avatar, Headline } from 'react-native-paper';
import Carousel from 'react-native-banner-carousel';
import styles from "./style";
import { FlatListSlider } from 'react-native-flatlist-slider';
import Preview from './preview';
import Footer from '../../components/footer/footer';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

const images = [
    "https://images.zoodmall.com/app/banner/main_banner_60ebe5af36df7.jpg",
    "https://images.zoodmall.com/app/banner/main_banner_60dc615c5fceb.jpg",
    "https://images.zoodmall.com/app/banner/main_banner_60face123151e.jpg"
];

const info = [
    {
        image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg",
        name: "Q12 Smartwatch ",
        status: "$0.66 - $3.46 / Piece",
    },
    {
        image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg",
        name: "Q13 Smartwatch", status: "$0.76 - $3.46 / Piece",
    },
    {
        image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg",
        name: "116 smart watch",
        status: "$0.66 - $3.46 / Piece",
    },
    {
        image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg",
        name: "Z15 Smartwatch", status: "$0.76 - $3.46 / Piece",
    },

    {
        image: "https://sc04.alicdn.com/kf/Hb1a7df7c8ea041e780440827874d67ddn.jpg",
        name: "G102 Gaming", status: "$0.76 - $3.46 / Piece",
    },
]
const top = [
    {
        image: 'https://sc04.alicdn.com/kf/Hf1bd3c0da31145ed835dab667efced6dP.jpg',
        name: "Tops ",
        status: "$0.66 - $3.46 / Piece",
    },
    {
        image: 'https://sc04.alicdn.com/kf/HTB14p5ebyDxK1RjSsph762HrpXaT.png',
        name: "Printer ",
        status: "$0.66 - $3.46 / Piece",
    },
    {
        image: 'https://sc04.alicdn.com/kf/Hf1bd3c0da31145ed835dab667efced6dP.jpg',
        name: "Tops ",
        status: "$0.66 - $3.46 / Piece",
    }
]
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderSlider(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

    render() {

        return (<View style={styles.container}>
            <ScrollView>
                <View style={styles.Bcontainer}>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => this.renderSlider(image, index))}
                    </Carousel>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 10, marginBottom: 5 }}>
                    <Headline>Top Products</Headline>
                    {/* //    onPress={() => this.props.navigation.navigate('Categories')}  */}
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={{ flexDirection: 'row-reverse' }}
                    >
                        Show All
                    </Button>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10 }} >
                    <FlatListSlider
                        data={info}
                        width={300}
                        timer={5000}
                        component={<Preview />}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorActiveWidth={10}
                    />
                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Image source={{ uri: 'https://ossgw.alicdn.com/creatives-assets/image/3h7n3/2021/05/26/f78a5880-be6b-4537-99ff-133e118d113a.jpg' }}
                        style={{ width: 400, height: 100 }} />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 10, marginBottom: 5 }}>
                    <Headline>Top Selling</Headline>
                    {/* // onPress={() => this.props.navigation.navigate('Users')} */}
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={{ flexDirection: 'row-reverse' }}
                    >
                        Show All
                    </Button>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                    <FlatListSlider
                        data={top}
                        width={300}
                        timer={5000}
                        component={<Preview />}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorActiveWidth={10}
                    />
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

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 10, marginBottom: 5 }}>
                    <Headline>Summer Fashion</Headline>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hb505616b56654fe4b0c505b7b891b6a9s.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops & Tees" ></Card.Title>
                        </Card>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.zoodmall.com/app/homePageLayout/1626674906688.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Accessories"></Card.Title>
                        </Card>
                    </View>
                </View>


                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Image source={{ uri: 'https://img.alicdn.com/imgextra/i2/O1CN01XZACYu1XzkuPt6xSN_!!6000000002995-0-tps-990-400.jpg' }}
                        style={{ width: 400, height: 100 }} />
                </View>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 10, marginBottom: 5 }}>
                    <Headline>Top Brands</Headline>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hb505616b56654fe4b0c505b7b891b6a9s.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops & Tees" ></Card.Title>
                        </Card>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.zoodmall.com/app/homePageLayout/1626674906688.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Accessories"></Card.Title>
                        </Card>
                    </View>
                </View>

                <View style={styles.Bcontainer}>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => this.renderSlider(image, index))}
                    </Carousel>
                </View>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 10, marginBottom: 5 }}>
                    <Headline>Top</Headline>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hb505616b56654fe4b0c505b7b891b6a9s.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops & Tees" ></Card.Title>
                        </Card>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.zoodmall.com/app/homePageLayout/1626674906688.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Accessories"></Card.Title>
                        </Card>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hb505616b56654fe4b0c505b7b891b6a9s.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops & Tees" ></Card.Title>
                        </Card>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.zoodmall.com/app/homePageLayout/1626674906688.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Accessories"></Card.Title>
                        </Card>
                    </View>
                </View>
            </ScrollView>
            <Footer/>
        </View >
        );
    }
}

export default Home;