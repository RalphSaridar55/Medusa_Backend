import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import styles from "./listing_style";
import * as DocumentPicker from "expo-document-picker";
import * as API from '../../core/apis/apiProductServices'
import Spinner from "react-native-loading-spinner-overlay";

const Bulk = () => {
  const [document, setDocument] = useState({ value: "", error: true, spinner:false });

  const uploadBulk = () =>{
    if(document.value.length>1){
        setDocument({...document,spinner:true})
        API.uploadBulk(document).then((res)=>{
            if(res/* .includes('Error') */){
                setDocument({...document,spinner:false})
                Alert.alert("Error","Excel file was not uploaded.\nPlease check your column names and values.")
            }
        })
    }
  }

  const docValidator = (doc) => {
    let ext;
    if (!doc) return true;
    else {
      ext = doc.split(".");
      console.log(ext[ext.length - 1]);
    }
    if (doc.length < 1) return true;
    else if (ext[ext.length - 1] != "xls" && ext[ext.length - 1] != "xlsx")
      return true;
    return "";
  };

  const pickDocument = async (e) => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only an excel file with the following Extensions (.xls, .xlsx)"
      );
      setDocument({ value: "", error: true });
    } else {
      //console.log(result);
      try {
        setDocument({ value: result.uri, error: false });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Spinner visible={document.spinner} />
      <View
        style={{
          margin: 20 /* flexDirection:'row',justifyContent:'space-between' */,
        }}
      >
        <Text
          style={{
            fontSize: 21,
            color: "#6E91EC",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          Bulk Upload
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() => console.log("TEst")}
          style={[styles.docPicker]}
        >
          <AntDesign name="download" size={24} color="#6E91EC" />
          <Text style={{ color: "gray"}}>
            Download File as a Reference
          </Text>
          <MaterialCommunityIcons
            name="microsoft-excel"
            size={24}
            color="#6E91EC"
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() => pickDocument()}
          style={styles.docPicker}
        >
          <MaterialCommunityIcons
            name="microsoft-excel"
            size={24}
            color="#6E91EC"
          />
          <Text style={{ color: "gray", }}>
            Upload your Excel file (.xls, .xlsx)
          </Text>
          {document.error ? (
            <AntDesign name="closecircle" size={24} color="red" />
          ) : (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => uploadBulk()}
          style={[styles.loginBtn]}
        >
          <Text style={styles.loginBtnText}>Upload Excel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Bulk;
