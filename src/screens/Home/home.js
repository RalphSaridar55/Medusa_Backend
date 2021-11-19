
import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView,TouchableOpacity, FlatList } from "react-native";
import { Card, Button, Avatar, Headline } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';
import Carousel from 'react-native-banner-carousel';
import styles from "./style";
import { FlatListSlider } from 'react-native-flatlist-slider';
import Preview from './preview';
import Spinner from 'react-native-loading-spinner-overlay';
import Footer from '../../components/footer/footer';
import * as apiPortFolioService from'../../core/apis/apiPortfolioServices';
import * as apiProducts from'../../core/apis/apiProductServices';
import Swiper from "react-native-web-swiper";

const BannerWidth = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;
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
const Home =(props)=> {
    const [isVisible,setIsVisible] = useState(true);
    const [data,setData] = useState({topSelling:[],featured:[]})
    const [carousel,setCarousel] = useState([])
    const [categories,setCategories] = useState([])

    /* const  renderSlider = (item, index) => {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: item.card_image }} />
            </View>
        );
    } */

    const drawDummy = () =>{
        let r= [1,2,3,4,5]
      return  /* for(var i=0;i<5;i++) */r.map((item,i)=>{
            return <View key={i}>
            <Image source={{}} style={styles.categoryImage} resizeMode="stretch" resizeMethod="auto"/>
        </View>
        })
    }

    useFocusEffect(
        useCallback(()=>{
            apiProducts.getTopSellingAndFeatured().then((res)=>{
                //console.log("CONSOLE: ",res)
                setData({topSelling:res[0].top_selling_products,featured:res[0].product_details})
            })
            apiProducts.getGroupProducts().then((res)=>{
                setCarousel(res)
            })
            apiProducts.getHomeCategories().then((res)=>{
                //console.log("ERROR: ",res)
                setCategories(res)
                setIsVisible(false)
            })
        },[props.route.name])
    )

        return(
        <View style={styles.container}>
            <Spinner visible={isVisible} />
            <ScrollView>
                
        <View style={st.container}>
            {carousel.length>0&&<Swiper
                    from={1}
                    minDistanceForAction={0.1}
                    loop={true}
                    timeout={10}
                    dotActiveStyle={{backgroundColor:'red',color:'red'}}
                    controlsProps={{
                      dotsTouchable: true,
                      prevPos: 'left',
                      nextPos: 'right',
                      nextTitle: '>',
                      nextTitleStyle: { color: '#6E91EC', fontSize: 24, fontWeight: '500' },
                      PrevComponent: ({ onPress }) => (
                        <TouchableOpacity onPress={onPress}>
                          <Text style={{ color: 'white', fontSize: 24, fontWeight: '500' }}>
                            {'<'}
                          </Text>
                        </TouchableOpacity>
                      ),
                    }}
                  >
                      {carousel?.map((item,index)=> <View style={st.slideContainer} key={index}>
                            <Image source={{uri:item.card_image}} style={{flex:1,height:height,width:BannerWidth}} resizeMode="stretch"/>
                      </View>
                      )}
            </Swiper>}
        </View>
        <ScrollView
        style={styles.categoryContainer}
        horizontal>
            {categories.length<1?drawDummy():categories.map((item,index)=>{
                return <TouchableOpacity key={index} onPress={()=>props.navigation.navigate("Product",{screen:"List"})}>
                    <Image source={{uri:item.category_image}} style={styles.categoryImage} resizeMode="stretch" resizeMethod="auto"/>
                </TouchableOpacity>
            })}
        </ScrollView>
        <View style={styles.topProductContainer}>
                    <Headline>Top Products</Headline>
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={{ flexDirection: 'row-reverse' }}
                    onPress={()=>props.navigation.navigate("Product",{screen:"List"})}>
                        Show All
                    </Button>
                </View>
                <View style={styles.flatListSliderContainer} >
                    {/* {data.featured.length>0&&<FlatListSlider
                        data={data.featured}
                        width={300}
                        timer={5000}
                        component={<Preview />}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorActiveWidth={10}
                    />} */}
                    {data.featured.length>0 && <FlatList
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index})=>{
                            return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item.images[0].media }} resizeMode='cover' />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.name}>{item.product_name}</Text>
                                        <Text style={styles.position}></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />}
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'https://ossgw.alicdn.com/creatives-assets/image/3h7n3/2021/05/26/f78a5880-be6b-4537-99ff-133e118d113a.jpg' }}
                        style={styles.image} />
                </View>
                <View style={styles.topSellingContainer}>
                    <Headline>Top Selling</Headline>
                    {/* // onPress={() => this.props.navigation.navigate('Users')} */}
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={{ flexDirection: 'row-reverse' }}
                    onPress={()=>props.navigation.navigate("Product",{screen:"List"})}>
                        Show All
                    </Button>
                </View>
                <View style={styles.flatListSliderContainer2 }>
                    {/* {data.topSelling.length>0 && <FlatListSlider
                        data={data.topSelling}
                        width={300}
                        timer={5000}
                        component={<Preview />}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorActiveWidth={10}
                    />} */}
                    {data.topSelling.length>0 && <FlatList
                        data={data.topSelling}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index})=>{
                            return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item.images[0].media }} resizeMode='cover' />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.name}>{item.product_name}</Text>
                                        <Text style={styles.position}></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />}
                    {/* <View style={styles.card}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hf1bd3c0da31145ed835dab667efced6dP.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops" subtitle="10 ~ 50 USD"></Card.Title>
                        </Card>
                    </View>
                    <View style={styles.card2}>
                        <Card >
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/HTB14p5ebyDxK1RjSsph762HrpXaT.png' }} style={{ height: 100 }} />
                            <Card.Title title="Printer" subtitle="100 ~ 500 USD" ></Card.Title>
                        </Card>
                    </View>
                    <View style={styles.card}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hcaeb65c4343249649d5a8bb45af9408cI.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Glasses" subtitle="1 ~ 5 USD"></Card.Title>
                        </Card>
                    </View> */}
                </View>


                <View style={styles.imageAdContainer}>
                    <Image source={{ uri: 'https://img.alicdn.com/imgextra/i2/O1CN01XZACYu1XzkuPt6xSN_!!6000000002995-0-tps-990-400.jpg' }}
                        style={{ width: 400, height: 100 }} />
                </View>

                <View style={styles.headlineTitle}>
                    <Headline>Summer Fashion</Headline>
                </View>
                    <View style={[styles.flatListSliderContainer2,{marginBottom:30}]}>
                        {data.featured.length>0 && <FlatList
                            data={data.featured}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item,index})=>{
                                return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
                                    <View style={styles.cardHeader}>
                                    </View>
                                    <Image style={styles.userImage} source={{ uri: item.images[0].media }} resizeMode='cover' />
                                    <View style={styles.cardFooter}>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={styles.name}>{item.product_name}</Text>
                                            <Text style={styles.position}></Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }}
                        />}
                    </View>
                {/* <View style={styles.headlineContainer}>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hb505616b56654fe4b0c505b7b891b6a9s.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops & Tees" ></Card.Title>
                        </Card>
                    </View>
                    <View style={styles.insideHeadline}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.zoodmall.com/app/homePageLayout/1626674906688.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Accessories"></Card.Title>
                        </Card>
                    </View>
                </View> */}


                <View style={styles.imageAdContainer}>
                    <Image source={{ uri: 'https://img.alicdn.com/imgextra/i2/O1CN01XZACYu1XzkuPt6xSN_!!6000000002995-0-tps-990-400.jpg' }}
                        style={{ width: 400, height: 100 }} />
                </View>

                <View style={styles.topBrandTitle}>
                    <Headline>Top Brands</Headline>
                </View>
                {/* <View style={styles.topBrandContainer}>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hb505616b56654fe4b0c505b7b891b6a9s.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops & Tees" ></Card.Title>
                        </Card>
                    </View>
                    <View style={styles.insideTopBrand}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.zoodmall.com/app/homePageLayout/1626674906688.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Accessories"></Card.Title>
                        </Card>
                    </View>
                </View> */}

                <View style={[styles.flatListSliderContainer2,{marginBottom:20}]}>
                    {data.featured.length>0 && <FlatList
                            data={data.featured}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item,index})=>{
                                return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
                                    <View style={styles.cardHeader}>
                                    </View>
                                    <Image style={styles.userImage} source={{ uri: item.images[0].media }} resizeMode='cover' />
                                    <View style={styles.cardFooter}>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={styles.name}>{item.product_name}</Text>
                                            <Text style={styles.position}></Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }}
                        />}
                </View>
                <View style={styles.Bcontainer}>
                    {/* <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => renderSlider(image, index))}
                    </Carousel> */}
            
        <View style={st.container}>        
            {carousel.length>0&&<Swiper
                    from={1}
                    minDistanceForAction={0.1}
                    loop={true}
                    timeout={10}
                    dotActiveStyle={{backgroundColor:'red',color:'red'}}
                    controlsProps={{
                      dotsTouchable: true,
                      prevPos: 'left',
                      nextPos: 'right',
                      nextTitle: '>',
                      nextTitleStyle: { color: '#6E91EC', fontSize: 24, fontWeight: '500' },
                      PrevComponent: ({ onPress }) => (
                        <TouchableOpacity onPress={onPress}>
                          <Text style={{ color: 'white', fontSize: 24, fontWeight: '500' }}>
                            {'<'}
                          </Text>
                        </TouchableOpacity>
                      ),
                    }}
                  >
                      {carousel?.map((item,index)=> <View style={[st.slideContainer,st.slide1]} key={index}>
                            <Image source={{uri:item.card_image}} style={{flex:1,height:height,width:BannerWidth}} resizeMode="stretch"/>
                      </View>
                      )}
            </Swiper>}
            </View>
                </View>

                <View style={styles.topTitle}>
                    <Headline>Top</Headline>
                </View>
{/*                 <View style={styles.topContainer}>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hb505616b56654fe4b0c505b7b891b6a9s.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Tops & Tees" ></Card.Title>
                        </Card>
                    </View>
                    <View style={styles.insideTopContainer}>
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
                    <View style={styles.insideTopContainer}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.zoodmall.com/app/homePageLayout/1626674906688.jpg' }} style={{ height: 100 }} />
                            <Card.Title title="Accessories"></Card.Title>
                        </Card>
                    </View>
                </View> */}
                <View style={[styles.flatListSliderContainer2,{marginBottom:20}]}>
                {data.featured.length>0 && <FlatList
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index})=>{
                            return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item.images[0].media }} resizeMode='cover' />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.name}>{item.product_name}</Text>
                                        <Text style={styles.position}></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />}
                </View>
            </ScrollView>
        </View >
        );
    }

    const st = StyleSheet.create({
        container: {
          flex: 1,
          height:height*0.3
        },
        slideContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      });

export default Home;