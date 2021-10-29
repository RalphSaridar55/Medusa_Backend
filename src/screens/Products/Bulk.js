import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert,Linking } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import styles from "./listing_style";
import * as DocumentPicker from "expo-document-picker";
import * as API from '../../core/apis/apiProductServices'
import Spinner from "react-native-loading-spinner-overlay";
import FileViewer from 'react-native-file-viewer'
//import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Asset } from 'expo';

const Bulk = () => {
  const [document, setDocument] = useState({ value: "", error: true, spinner:false });
  const [result,setResult]= useState();

  const openUrl = async() =>{
    await Linking.openURL("https://cmsblobstorage1.blob.core.windows.net/cmsblobcontainer/bulk_upload_sheet.xls?sv=2020-06-12&st=2021-10-29T09%3A25%3A11Z&se=9999-12-31T00%3A00%3A00Z&sr=b&sp=r&sig=Dv7NliNCNq2oR4qzEsFn3QtFUlYy1MD7gkhjVipL1tA%3D");
  }

  const uploadBulk = () =>{
    if(document.value?.name.length>1 && document.value.name!=null){
        setDocument({...document,spinner:true})
        /* var formdata = new FormData();
        formdata.append("file", "test", document.value.uri);
        console.log("FORMDATA: ",formdata,"\n",document.value) */
        API.uploadBulk(document.value.uri).then((res)=>{
            if(res/* .includes('Error') */){
                console.log("API RESPONSE: ",res.statusCode)
                setDocument({...document,spinner:false})
                //Alert.alert("Error","Excel file was not uploaded.\nPlease check your column names and values.")
            }
        }).catch(err=>{
          Alert.alert("Error",err.response.data.message);
          setDocument({...document,spinner:false})
        })
    }
    else
      Alert.alert("Error","Please insert an excel file")
  }

  const docValidator = (doc) => {
    let ext;
    if (!doc) return true;
    else {
      ext = doc.split(".");
      console.log(ext[ext.length - 1]);
    }
    if (doc.length < 1) return true;
    else if ( ext[ext.length - 1] != "xlsx")
      return true;
    return "";
  };

  const openDocumentRef= async()=>{
    FileSystem.downloadAsync(
      'http://www.africau.edu/images/default/sample.pdf',
      FileSystem.documentDirectory + 'sample.pdf'
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
        this.share(uri);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const pickDocument = async (e) => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only an excel file with the following Extensions (.xlsx)"
      );
      setDocument({ value: "", error: true });
    } else {
      //console.log(result);
      try {
        setDocument({ value: result, error: false });
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
          onPress={() =>openUrl()}
          style={[styles.docPicker]}
        >
          <AntDesign name="download" size={24} color="#6E91EC" />
          <Text style={{ color: "gray"}}>
            Download File as a Reference
          </Text>
          <View></View>
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
            Upload your Excel file ( .xlsx)
          </Text>
          {document.error ? (
            <AntDesign name="closecircle" size={24} color="red" />
          ) : (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
        <View style={{display:'flex',alignItems:'center',marginTop:20,}}>
          <TouchableOpacity
            onPress={() => uploadBulk()}
            style={[styles.loginBtn,{width:'50%'}]}
          >
            <Text style={styles.loginBtnText}>Upload Excel</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default Bulk;
