
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView,TouchableOpacity, FlatList } from "react-native";
import { Button, Headline } from 'react-native-paper';
import styles from "./style";
import Spinner from 'react-native-loading-spinner-overlay';
import * as apiProducts from'../../core/apis/apiProductServices';
import Swiper from "react-native-web-swiper";

const BannerWidth = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

const Home =(props)=> {
    const [isVisible,setIsVisible] = useState(false);
    const [data,setData] = useState({topSelling:[],featured:[]})
    const [carousel,setCarousel] = useState([])
    const [categories,setCategories] = useState([])


    // const drawDummy = () =>{
    //     let r= [1,2,3,4,5]
    //   return  /* for(var i=0;i<5;i++) */r.map((item,i)=>{
    //         return <View key={i}>
    //         <Image source={{}} style={styles.categoryImage} resizeMode="stretch" resizeMethod="auto"/>
    //     </View>
    //     })
    // }

    useEffect(()=>{
        setIsVisible(true)
        apiProducts.getTopSellingAndFeatured().then((res)=>{
            //console.log("CONSOLE: ",res)
            setData({topSelling:res[0].top_selling_products,featured:res[0].product_details})
        }).catch(err=>console.log(":::",err.response.data.message))
        apiProducts.getGroupProducts().then((res)=>{
            setCarousel(res)
        }).catch(err=>console.log(":::",err.response.data.message))
        apiProducts.getHomeCategories().then((res)=>{
            console.log(":::: ",res)
            setCategories(res)
            setIsVisible(false)
        }).catch(err=>console.log(":::",err.response.data.message))
    },[])

    // useFocusEffect(
    //     useCallback(()=>{
    //         setIsVisible(true)
    //         apiProducts.getTopSellingAndFeatured().then((res)=>{
    //             //console.log("CONSOLE: ",res)
    //             setData({topSelling:res[0].top_selling_products,featured:res[0].product_details})
    //         }).catch(err=>console.log(":::",err.response.data.message))
    //         apiProducts.getGroupProducts().then((res)=>{
    //             setCarousel(res)
    //         }).catch(err=>console.log(":::",err.response.data.message))
    //         apiProducts.getHomeCategories().then((res)=>{
    //             console.log(":::: ",res)
    //             setCategories(res)
    //             setIsVisible(false)
    //         }).catch(err=>console.log(":::",err.response.data.message))
    //     },[props.route.name])
    // )

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
        <View style={styles.topProductContainer}>
                    <Headline>Top Products</Headline>
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={{ flexDirection: 'row-reverse' }}
                    onPress={()=>props.navigation.navigate("Product",{screen:"List"})}>
                        Show All
                    </Button>
                </View>
                <View style={styles.flatListSliderContainer} >
                    {data.featured.length>0 && <FlatList
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index})=>{
                            return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
                                <View style={styles.cardHeader}>
                                </View>
                                <View style={{marginBottom:100}}>
                                    <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode='cover' />
                                </View>
                                <View style={[styles.cardFooter,{position:'absolute',width:'100%',bottom:10}]}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.name,{textAlignVertical:'bottom'}]}>{item.product_name}</Text>
                                        <Text style={styles.position}></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />}
                </View>
                <View style={styles.topSellingContainer}>
                    <Headline>Top Selling</Headline>
                    <Button icon="chevron-right" color='#31C2AA' contentStyle={{ flexDirection: 'row-reverse' }}
                    onPress={()=>props.navigation.navigate("Product",{screen:"List"})}>
                        Show All
                    </Button>
                </View>
                <View style={styles.flatListSliderContainer2 }>
                    {data.topSelling.length>0 && <FlatList
                        data={data.topSelling}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index})=>{
                            return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
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
                    <Headline>Top Brands</Headline>
                </View>

                <View style={[styles.flatListSliderContainer2,{marginBottom:20}]}>
                    {data.featured.length>0 && <FlatList
                            data={data.featured}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item,index})=>{
                                return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
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
                <View style={[styles.flatListSliderContainer2,{marginBottom:20}]}>
                {data.featured.length>0 && <FlatList
                        data={data.featured}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index})=>{
                            return  <TouchableOpacity style={styles.card} onPress={() => console.log("TST")} key={index}>
                                <Image style={styles.userImage} source={{ uri: item?.images[0]?.media }} resizeMode='cover' />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center", flexWrap:'wrap', }}>
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