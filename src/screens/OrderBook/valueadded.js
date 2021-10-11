import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as API from "../../core/apis/apiProductServices";
import { styles } from "./valueadded_style";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";

const data = {
  name: "Product 1",
  description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
};

const ValueAdded = ({ navigation }) => {
  const [fetchedServices, setFetchedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [total, setTotal] = useState(0);
  const [document,setDocument] = useState({value:{},error:true});

  const calculateTotal = (value) => {
    console.log("VALUE IS: ", value);
    console.log("ARRAY BECOMES: ", fetchedServices);
    if (value.length > 0) {
      let ar = [];
      value.map((i) => {
        console.log("RUNNING FUNCTION TOTAL: ", value);
        let res = fetchedServices.filter((item) => {
          return item.value === i.value;
        });
        console.log("RES: ", res);
        ar.push(res[0].cost);
      });
      console.log("ARRAY BECOMES IN FUNCTION: ", ar);
      let total = ar.reduce((pre, cur) => pre + cur);
      console.log(total + "$");
      setTotal(total);
    } else setTotal(0);
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
      setDocument({document,error:true})
    } else {
      //console.log(result);
      try {
        setDocument({value:result,error:false})
      } catch (error) {
        console.log(error);
      }
    }
    /* e.typeDoc==="Trade"?console.log("test"):console.log(123);
        this.setState({ docs: result.uri })
        alert(result.uri); */
  };

  useEffect(() => {
    API.getServices().then((res) => {
      console.log("RESULT: ", res);
      let array = [];
      res.map((item) => {
        array.push({
          label: item.service_name + ` ($${item.service_cost})`,
          value: item.id,
          cost: item.service_cost,
        });
      });
      setFetchedServices(array);
      setIsVisible(false);
    });
  }, []);
  return (
    <ScrollView style={{flex:1}}>
      <Spinner visible={isVisible} />
      <View style={{ backgroundColor: "red" }}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/images/mouse.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <Text>{data.description}</Text>
        <View>
          <Text>Here is services</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={{ fontWeight: "bold" }}>Cost:</Text>
          <Text>USD {total}</Text>
        </View>
        <View style={{ marginVertical: 20, flex: 1 }}>
          <CollapsibleList
            style={{ marginVertical: 10 }}
            wrapperStyle={{
              borderWidth: 0.2,
              borderColor: "gray",
              borderRadius: 5,
            }}
            buttonPosition="top"
            numberOfVisibleItems={0}
            buttonContent={
              <View
                style={[
                  styles.docPicker,
                  {
                    borderColor: "#A6A6A6",
                    backgroundColor: "#fff",
                    marginVertical: 0,
                  },
                ]}
              >
                <Text style={{ color: "gray" }}>Services</Text>
              </View>
            }
          >
            <SelectMultiple
              items={fetchedServices}
              selectedItems={services}
              labelStyle={{ color: "black" }}
              selectedLabelStyle={{ color: "#698EB7" }}
              onSelectionsChange={(item) => {
                console.log("CHOSEN OPTION IS: ", item);
                setServices(item);
                calculateTotal(item);
              }}
            />
          </CollapsibleList>
        </View>

        
      </View><View>
        <TouchableOpacity
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() =>pickDocument()
          }
          style={[styles.docPicker,{marginHorizontal:20,backgroundColor:'#fff',borderColor:'#808080'}]}
        >
          <AntDesign name="file1" size={24} color="#6E91EC" />
          <Text style={{ color: "gray" }}>Documents Needed:</Text>
          {document.error ? (
            <AntDesign name="closecircle" size={24} color="red" />
          ) : (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderList")}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>Add Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setServices([]);
              setTotal(0);
            }}
            style={[styles.loginBtn, { backgroundColor: "red" }]}
          >
            <Text style={styles.loginBtnText}>Discard</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default ValueAdded;
