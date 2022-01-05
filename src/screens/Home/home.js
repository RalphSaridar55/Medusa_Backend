
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, FlatList, TextInput } from "react-native";
import { Button, Headline } from 'react-native-paper';
import styles from "./style";
import Spinner from 'react-native-loading-spinner-overlay';
import * as apiProducts from '../../core/apis/apiProductServices';
import Swiper from "react-native-web-swiper";
import { useFocusEffect } from '@react-navigation/core';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/Tabs';
import { Entypo, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import Overlay from 'react-native-modal-overlay';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Footer from '../../components/footer/footer';

const BannerWidth = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Home = (props) => {

    const scrollRef = useRef();

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }
    const [loggedIn,setLoggedIn] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [data, setData] = useState({ topSelling: [], featured: [] })
    const [carousel, setCarousel] = useState([])
    const [categories, setCategories] = useState([])
    const [showArrow, setShowArrow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [overlayType, setOverlayType] = useState("disclaimer")
    const [searchQuery,setSearchQuery] = useState("");

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        if (contentOffset.y >= 400)
            return true
        else
            return false
    };

    // useEffect(() => {
    //     const runEffect = async()=>{
    //         const user = await AsyncStorage.getItem('user_details')
    //         user==null?setLoggedIn(false):setLoggedIn(true)
    //         apiProducts.getTopSellingAndFeatured().then((res) => {
    //             setData({ topSelling: res[0].top_selling_products, featured: res[0].product_details })
    //         }).catch(err => console.log(":::", err.response.data.message))
    //         apiProducts.getGroupProducts().then((res) => {
    //             setCarousel(res)
    //         }).catch(err => console.log(":::", err.response.data.message))
    //         apiProducts.getHomeCategories().then((res) => {
    //             console.log(":::: ", res)
    //             setCategories(res)
    //             setIsVisible(false)
    //         }).catch(err => console.log(":::", err.response.data.message))
    //     }
    //     runEffect()
    // }, [])

    const runEffect = async() =>{
        const user = await AsyncStorage.getItem('user_details')
        user==null?setLoggedIn(false):setLoggedIn(true)
            // props.navigation.setOptions({
            //   headerTitle: ()=><View style={{display:'flex',alignItems:'center',/* justifyContent:'space-between', */flexDirection:'row',flex:1,width:'100%',}}>
            //   <View style={{borderRadius:10,borderWidth:1,borderColor:'lightgray',marginLeft:15,flexDirection:'row',alignItems:'center'}}>
            //       <TextInput style={{width:200,paddingHorizontal:5}} placeholder="Search"
            //       value={searchQuery}
            //       onChangeText={(e)=>{
            //           setSearchQuery(e)
            //         //   alert(searchQuery)
            //        }}/>
            //       <TouchableOpacity style={{borderLeftColor:'lightgray', borderLeftWidth:1,paddingLeft:10}}
            //         onPress={()=>{
            //             alert(searchQuery)
            //             //   props.navigation.navigate("Product",{screen:"List", params:{query:search}})
            //         }}>
            //         <Feather name="search" size={14} color="lightgray" style={{marginRight:10,}}/>
            //       </TouchableOpacity>
            //     </View>
            //     <FontAwesome name="envelope-o" size={24} color="#6E91EC"
            //     style={{marginLeft:15}} onPress={()=>user?props.navigation.navigate("Notifications"):props.navigation.navigate("Auth",{screen:"Login"})}
            //     />
            // </View>
            // })
        apiProducts.getTopSellingAndFeatured().then((res) => {
            setData({ topSelling: res[0].top_selling_products, featured: res[0].product_details })
        }).catch(err => console.log(":::", err.response.data.message))
        apiProducts.getGroupProducts().then((res) => {
            setCarousel(res)
        }).catch(err => console.log(":::", err.response.data.message))
        apiProducts.getHomeCategories().then((res) => {
            console.log(":::: ", res)
            setCategories(res)
            setIsVisible(false)
        }).catch(err => console.log(":::", err.response.data.message))
    }

    useFocusEffect(
        useCallback(()=>{
            runEffect()
        },[props.route.name])
    )

    return (
        <View style={styles.container}>
            <Spinner visible={isVisible} />
            <ScrollView
                ref={scrollRef}
                onScroll={({ nativeEvent }) => {
                    //console.log("length",this.state.total)
                    if (isCloseToBottom(nativeEvent)) {
                        // console.log("Arrow")
                        setShowArrow(true)
                    }
                    else
                        setShowArrow(false)
                }}>

                <View style={st.container}>
                    {carousel.length > 0 && <Swiper
                        from={1}
                        minDistanceForAction={0.1}
                        loop={true}
                        timeout={10}
                        dotActiveStyle={{ backgroundColor: 'red', color: 'red' }}
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
                        {carousel?.map((item, index) => <View style={st.slideContainer} key={index}>
                            <Image source={{ uri: item.card_image }} style={{ flex: 1, height: height, width: BannerWidth }} resizeMode="stretch" />
                        </View>
                        )}
                    </Swiper>}
                </View>
                <View style={styles.topProductContainer}>
                    <Headline style={styles.headerTitle}>Top Products</Headline>
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={styles.ButtonShowAll} labelStyle={[styles.ButtonShowAll, { textAlignVertical: 'center' }]}
                        onPress={() => props.navigation.navigate("Product", { screen: "List" })}>
                        Show All
                    </Button>
                </View>
                <View style={styles.flatListSliderContainer} >
                    {data.featured.length > 0 && <FlatList
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item,index)=>index.toString()}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity style={styles.card} onPress={() =>{
                                if(loggedIn==false)
                                    props.navigation.navigate("Auth",{screen:'Login'})
                            }} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <View style={{ marginBottom: 100 }}>
                                    <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode='cover' />
                                </View>
                                <View style={[styles.cardFooter, { position: 'absolute', width: '100%', bottom: 10 }]}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.name, { textAlignVertical: 'bottom' }]}>{item.product_name}</Text>
                                        <Text style={styles.position}></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />}
                </View>
                {/* <View style={styles.topSellingContainer}>
                    <Headline style={styles.headerTitle}>Top Selling</Headline>
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={styles.ButtonShowAll} labelStyle={[styles.ButtonShowAll, { textAlignVertical: 'center' }]}
                        onPress={() => props.navigation.navigate("Product", { screen: "List" })}>
                        Show All
                    </Button>
                </View> */}
                <View style={styles.flatListSliderContainer2}>
                    {data.topSelling.length > 0 && <FlatList
                        keyExtractor={(item,index)=>index.toString()}
                        data={data.topSelling}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity style={styles.card} onPress={() =>{
                                if(loggedIn==false)
                                    props.navigation.navigate("Auth",{screen:'Login'})
                            }} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode='cover' />
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


                <View style={styles.imageAdContainer}>
                    <Image source={{ uri: 'https://img.alicdn.com/imgextra/i2/O1CN01XZACYu1XzkuPt6xSN_!!6000000002995-0-tps-990-400.jpg' }}
                        style={{ width: BannerWidth, height: 100 }} />
                </View>

                <View style={styles.headlineTitle}>
                    <Headline style={styles.headerTitle}>Summer Fashion</Headline>
                </View>
                <View style={[styles.flatListSliderContainer2, { marginBottom: 30 }]}>
                    {data.featured.length > 0 && <FlatList
                        keyExtractor={(item,index)=>index.toString()}
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity style={styles.card} onPress={() =>{
                                if(loggedIn==false)
                                    props.navigation.navigate("Auth",{screen:'Login'})
                            }} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode='cover' />
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


                <View style={styles.imageAdContainer}>
                    <Image source={{ uri: 'https://img.alicdn.com/imgextra/i2/O1CN01XZACYu1XzkuPt6xSN_!!6000000002995-0-tps-990-400.jpg' }}
                        style={{ width: BannerWidth, height: 100 }} />
                </View>

                <View style={styles.topBrandTitle}>
                    <Headline style={styles.headerTitle}>Top Brands</Headline>
                </View>

                <View style={[styles.flatListSliderContainer2, { marginBottom: 20 }]}>
                    {data.featured.length > 0 && <FlatList
                        keyExtractor={(item,index)=>index.toString()}
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity style={styles.card} onPress={() =>{
                                if(loggedIn==false)
                                    props.navigation.navigate("Auth",{screen:'Login'})
                            }} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode='cover' />
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

                    <View style={st.container}>
                        {carousel.length > 0 && <Swiper
                            from={1}
                            minDistanceForAction={0.1}
                            loop={true}
                            timeout={10}
                            dotActiveStyle={{ backgroundColor: 'red', color: 'red' }}
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
                            {carousel?.map((item, index) => <View style={[st.slideContainer, st.slide1]} key={index}>
                                <Image source={{ uri: item.card_image }} style={{ flex: 1, height: height, width: BannerWidth }} resizeMode="stretch" />
                            </View>
                            )}
                        </Swiper>}
                    </View>
                </View>

                <View style={styles.topTitle}>
                    <Headline style={styles.headerTitle}>Top</Headline>
                </View>
                <View style={[styles.flatListSliderContainer2, { marginBottom: 20 }]}>
                    {data.featured.length > 0 && <FlatList
                        keyExtractor={(item,index)=>index.toString()}
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity style={styles.card} onPress={() =>{
                                if(loggedIn==false)
                                    props.navigation.navigate("Auth",{screen:'Login'})
                            }} key={index}>
                                <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode='cover' />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center", flexWrap: 'wrap', }}>
                                        <Text style={styles.name}>{item.product_name}</Text>
                                        <Text style={styles.position}></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />}
                </View>
               {/*  <Footer
                    closeOrOpen={(e) => {
                        setModalVisible(e)
                    }}
                    changeOverlay={(e) => {
                        setOverlayType(e)
                    }} /> */}
            </ScrollView>

            <Overlay visible={modalVisible} onClose={() => setModalVisible(false)}
                containerStyle={[{ backgroundColor: `rgba(255,255,255,0.95)` }]}
                closeOnTouchOutside>

                <View style={st.modalHeader}>
                    <Text
                        style={{
                            fontSize: 24,
                            color: "#31C2AA",
                            marginBottom: 5,
                            fontFamily: 'Adam-Bold'
                        }}
                    >
                        {overlayType == "disclaimer" ? "Disclaimer" : "Conditions and Terms"}
                    </Text>
                    <MaterialCommunityIcons name="close" size={24} color="red" onPress={() => setModalVisible(false)} />
                </View>
                <ScrollView style={{ marginVertical: 20 }}>
                    <Text style={st.overlayText}>
                        {overlayType == "disclaimer"
                            ? "A disclaimer is generally any statement intended to specify or delimit the scope of rights and obligations that may be exercised and enforced by parties in a legally recognized relationship"
                            : "There are many variations of passages of Lorem Ipsum available,but the majority have suffered alteration in some form, by injected humour,or randomised words which."}
                    </Text>
                </ScrollView>
            </Overlay>
            {showArrow &&
                <Entypo name="arrow-with-circle-up" size={36} color="#6E91EC"
                    style={{ paddingVertical: 20, display: 'flex', zIndex: 100, position: 'absolute', right: 20 , bottom:10}} onPress={() => scrollToTop()} />}
            {/* <Tabs navigation={props.navigation} loggedIn={loggedIn}/> */}
        </View >
    );
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        height: height * 0.3
    },
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth,
        paddingHorizontal: 20
    },
    contractStyle: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 20,
        borderRadius: 100,
        backgroundColor: '#31C2AA'
    },
    overlayText: {
        fontFamily: 'Inter-Black-Light',
        fontSize: 14
    }
});

export default Home;