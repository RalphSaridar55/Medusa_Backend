import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Text, ImageBackground, ScrollView, Image, Dimensions, Alert} from 'react-native';
import { styles } from './Campaign_style';
import { BarChart } from "react-native-chart-kit";
import * as API from '../../core/apis/apiCampaignServices'
import { TouchableOpacityOutlined } from '../../components/TouchableOpacityOutlined';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { CardField, /* confirmPayment, */ StripeProvider, useStripe  } from '@stripe/stripe-react-native';
import { stripePk } from "../../config/env";

const Detailed = (props) => {
  const screenWidth = Dimensions.get("screen").width;
  const [data,setData] = useState();
  const [cardData,setCardData] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const [dataSecondChart] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 70],
      },
    ],
  })

  const [chart2config] = useState({
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#5BC5C9`,
    labelColor: (opacity = 1) => `#6893B9`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.6,
    useShadowColorFromDataset: false, // optional,
    propsForBackgroundLines: {
      opacity: 0,
    },
    propsForHorizontalLabels: {
      opacity: 1,
      width: 0,
    },
    showValuesOnTopOfBars: false,
  })

  useFocusEffect(
    React.useCallback(() => {
        console.log("tests")
        let id = props.route.params.id
        API.getCampaignDetails(id).then((res)=>{
            console.log("REs: ",res)
            setData(res)
            setIsVisible(false)
        })
    }, [])
  );

  /* useEffect(()=>{
      let id = props.route.params.id
      API.getCampaigndDetails(id).then((res)=>{
          console.log("REs: ",res)
          setData(res)
      })
  },[]) */
  const pay = () =>{
    console.log("PAY")
  }

  const EndCampaign = (id) =>{
      Alert.alert("End Campaign","Are you sure you want to end this campaign ?",[
          {text:"No"},
          {text:"Yes",onPress:()=>{
              setIsVisible(true)
              API.endCampaign(id).then((res)=>{
              Alert.alert("End Campaign",res,[
                  {text:"Ok",onPress:()=>props.navigation.goBack()}
              ]);
              setIsVisible(false)
          }).catch(err=>{
              Alert.alert("Error",err.response.data.message);
              setIsVisible(false)
          })}
        },
      ])
  }

    return (
        <ImageBackground
            source={require("../../../assets/images/Login-bg.png")}
            resizeMode="cover"
            style={{
                flex: 1,
                justifyContent: "center",
            }}
        >
            <Spinner visible={isVisible}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    marginHorizontal: 20,
                    marginVertical: 20,
                }}
            >
                <View
                    style={styles.cardContainer}
                >
                <View style={styles.myCampaignTitleContainer}>
                  <View>
                    <Text style={[styles.bannerName]}>{data?.campaign_name}</Text>
                  </View>
                  <View>
                    <Text style={[styles.bannerTitle]}>{data?.campaign_type}</Text>
                  </View>
                  <View>
                    <Text style={{color:'gray'}}>Status: {data?.status}</Text>
                 </View>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            paddingHorizontal: 20,
                        }}
                    >
                        <Image
                            source={{uri:data?.campaign_images}}
                            style={{ width: "100%", height: 300 }}
                            resizeMode="contain"
                        />
                    </View>
                    
                    {/* <BarChart
                      //style={graphStyle}
                      data={dataSecondChart}
                      width={screenWidth * 0.8}
                      height={220}
                      chartConfig={chart2config}
                      withInnerLines={false}
                      //withHorizontalLabels = {false}
                      propsForHorizontalLabels={{
                        opacity: 0,
                      }}
                    /> */}
                    <View style={{marginTop:20}}>
                        <View>
                            <Text style={{fontSize:16}}>Cost: ${data?.usd}</Text>
                            <Text style={{fontSize:16}}>{data?.points>0?"Points Left: "+data?.points:data?.time_remains}</Text>
                        </View>
                    </View>
                </View>
                    <View style={{position:'relative',marginTop:20}}>
                        
                      {(data?.status=="Approved" || data?.status=="Expired" 
                      )?<><View style={{display:"flex",flexDirection:"row",justifyContent:'center'}}>
                        <StripeProvider publishableKey={stripePk.STRIPE_PK} merchantIdentifier="merchant.identifier">
                            <SafeAreaView style={[styles.docPicker]}>
                                <CardField style={{ height: 50}}
                                    placeholder={{
                                      number: '4242 .... .... .... ',
                                    }}
                                    postalCodeEnabled={false}
                                    onCardChange={(t) => {
                                        console.log("PAY: ",t)/* sendBack(t) */
                                    }} />
                            </SafeAreaView>
                        </StripeProvider>
                      </View>
                        <TouchableOpacityOutlined
                        text={data?.status=="Approved"?"Pay":data?.status=="Expired"?"Renew":null}
                        additionalContainerStyle={{marginHorizontal:60}}
                        onPress={()=>{
                          pay()
                        }}/></>:null}

                        <TouchableOpacityOutlined
                        text="End Campaign"
                        additionalContainerStyle={{marginHorizontal:60}}
                        additionalButtonStyle={{borderColor:'red'}}
                        additionalTextStyle={{color:'red'}}
                        onPress={()=>{
                            if(data?.status == "Pending")
                                Alert.alert("Error","Campaign is not active")
                            else
                                EndCampaign(data?.campaign_id)
                        }}/>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    ) 

}

export default Detailed