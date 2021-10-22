import React, { useState, useEffect } from "react";
import { styles } from "./Loyalty_style";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import Overlay from "react-native-modal-overlay";
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//import { TextInput } from "react-native-paper";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Loyalty = ({ navigation }) => {
  const [visible, setVisible] = useState({ spinner: true, modal: false });
  const [userData,setUserData] = useState({points:0,amount:"$0",payment:null});
  const [paymentlist,setPaymentlist]= useState([
      {label:"Visa", value:1},
      {label:"Cash", value:2}
  ])
  useEffect(() => {
    setVisible({ spinner: false, modal: false });
  }, []);
  const historyData = [
    {
      Number: 1305,
      Campaign: "Campaign #1",
      Date: "24/02/2015",
      Points: 1000,
      Status: "active",
    },
    {
      Number: 1306,
      Campaign: "Campaign #2",
      Date: "24/02/2015",
      Points: 2000,
      Status: "active",
    },
    {
      Number: 1307,
      Campaign: "Campaign #3",
      Date: "24/02/2015",
      Points: 3000,
      Status: "active",
    },
  ];
  const data = [
    {
      name: "Total",
      points: 32000,
      color: "#7F67A9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Active",
      points: 16000,
      color: "#5BC5C9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor:'#e9f3ff'}}>
      <Spinner visible={visible.spinner} />
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { flex: 2 }]}>Loyalty Points</Text>
        <TouchableOpacity
          onPress={() => setVisible({ ...visible, modal: true })}
          style={styles.loginBtn}
        >
          <Text style={styles.loginBtnText}>Buy Points</Text>
        </TouchableOpacity>
      </View>

      <Overlay
        visible={visible.modal}
        onClose={() => setVisible({ ...visible, modal: false })}
        closeOnTouchOutside
        containerStyle	={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
        /* childrenWrapperStyle={{
            borderWidth:1,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,}} */
      >
        <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 21,
                color: "#31C2AA",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Buy Points
            </Text>
            <MaterialCommunityIcons name="close" size={24} color="red"  onPress={()=>setVisible({ ...visible, modal: false })}/>
        </View>
          <View style={{marginVertical:20}}>
              <TextInput
                selectionColor="#31c2aa"
                label="Points"
                style={styles.modalBoxInputs}
                placeholder="Buy Points"
                value={userData.points+""}
                //value={this.state[element.stateValue]}
                onChangeText={(text) =>
                  setUserData({...userData,points:text,amount:"$"+(text*100)})
                }
                autoCapitalize="none"
                // keyboardType={element.keyBoardType}
                outlineColor="#C4C4C4"
                theme={{
                  colors: { primary: "#31c2aa", underlineColor: "transparent" },
                }}
              />
              <TextInput
                selectionColor="#31c2aa"
                label="Amount"
                style={[styles.modalBoxInputs]}
                placeholder="Amount in USD"
                value={userData.amount+""}
                //value={this.state[element.stateValue]}
                disabled
                autoCapitalize="none"
                // keyboardType={element.keyBoardType}
                outlineColor="#C4C4C4"
                theme={{
                  colors: { primary: "#31c2aa", underlineColor: "transparent" },
                }}
              />
              <View style={[styles.modalBoxInputs]}>
                  <Picker
                        
                        prompt="Payment Method"
                        selectedValue={userData.payment}
                        onValueChange={(itemValue, itemIndex) =>
                            setUserData({...userData,payment:itemValue})
                        }
                  >
                      {paymentlist.map((item,index)=>{
                          return(
                              <Picker.Item label={item.label} value={item.value} key={index}/>
                          )
                      })}
                              </Picker>
              </View>
              <TouchableOpacity
              onPress={() => console.log("test")}
              style={{
                backgroundColor: "#31C2AA",
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",marginVertical:10,
                height: 30,}}
            >
              <Text style={styles.loginBtnText}>Buy</Text>
            </TouchableOpacity>
          </View>
      </Overlay>
      <ScrollView
        style={{ marginHorizontal: 20, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.cardContainer,
            {
              flex: 1,
              display: "flex",
              alignItems: "center",
              marginVertical: 40,
            },
          ]}
        >
          <PieChart
            data={data}
            //width={screenWidth}
            width={screenWidth * 0.8}
            height={200}
            //chartConfig={chartConfig}
            //hasLegend={false}
            chartConfig={{
              backgroundColor: "#1cc910",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor={"points"}
            backgroundColor={"transparent"}
            absolute
          />
        </View>
        <Text style={styles.header}>History Points</Text>
        {historyData.map((item,index) => {
          return (
            <View
              key={index}
              style={[
                styles.cardContainer,
                {
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingVertical: 40,
                },
              ]}
            >
              {Object.keys(item).map((res,index) => {
                return (
                  <View
                  key={index}
                    style={[
                      styles.cardHistory,
                      {
                        borderBottomColor: "lightgray",
                        borderBottomWidth: 1,
                        paddingTop: 5,
                        paddingBottom: 10,
                      },
                    ]}
                  >
                    <Text style={{ flex: 1, color: "#6E91EC" }}>{res}:</Text>
                    <Text
                      style={{ flex: 1, textAlign: "right", color: "#6E91EC" }}
                    >
                      {item[res]}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Loyalty;
