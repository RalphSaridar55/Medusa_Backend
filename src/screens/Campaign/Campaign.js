import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity} from "react-native";
import { styles } from "./Campaign_style";

const Campaign = ({navigation}) => {
  return (
    <ScrollView style={{marginHorizontal:20,marginVertical:20,backgroundColor:'#e9f3ff'}}
    showsVerticalScrollIndicator={false}> 
      <View>
        <Text style={styles.header}>Campaign</Text>
      </View>
      <TouchableOpacity style={styles.cardContainer}
      onPress={()=>navigation.navigate("Create",{name:"Banner Ad"})}>
        <Image source={require('../../../assets/images/ad.jpg')} resizeMode="contain"/>
        <View style={styles.infoContainer}>
            <Text style={styles.bannerTitle}>Banner Ad</Text>
            <Text style={styles.bannerInfo}>Displayed on the home page</Text>
            <Text style={styles.bannerPrice}>Starting from 4,000 points or $20/week</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer}
      onPress={()=>navigation.navigate("Create",{name:"Sponsored Products"})}>
        <Image source={require('../../../assets/images/ad2.jpg')} resizeMode="contain"/>
        <View style={styles.infoContainer}>
            <Text style={styles.bannerTitle}>Sponsored Products</Text>
            <Text style={styles.bannerInfo}>Add your products to the featured list</Text>
            <Text style={styles.bannerPrice}>Starting from 4,000 points or $20/week</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer}
      onPress={()=>navigation.navigate("Create",{name:"Web Ad"})}>
        <Image source={require('../../../assets/images/ad2.jpg')} resizeMode="contain"/>
        <View style={styles.infoContainer}>
            <Text style={styles.bannerTitle}>Web Ad</Text>
            <Text style={styles.bannerInfo}>Advertise your product throughout the platform</Text>
            <Text style={styles.bannerPrice}>Starting from 4,000 points or $20/week</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Campaign;
