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

  const uploadBulk = () =>{
    if(document.value.length>1){
        setDocument({...document,spinner:true})
        API.uploadBulk(document).then((res)=>{
            if(res/* .includes('Error') */){
                console.log("API RESPONSE: ",res.statusCode)
                setDocument({...document,spinner:false})
                //Alert.alert("Error","Excel file was not uploaded.\nPlease check your column names and values.")
            }
        }).catch(err=>{
          Alert.alert("Error","Something went wrong,\n Please edit your file and try again.");
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
    else if (ext[ext.length - 1] != "xls" && ext[ext.length - 1] != "xlsx")
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
    /* Linking.openURL("https://www.youtube.com/watch?v=_mrXOgg4VXg")
    const path = `${FileSystem.cacheDirectory}12124`
    const file = await FileSystem.downloadAsync("http://techslides.com/demos/sample-videos/small.mp4",path)
    setResult(file.uri) */
    /* const downloadResumable = FileSystem.createDownloadResumable(
      'http://techslides.com/demos/sample-videos/small.mp4',
      FileSystem.documentDirectory + 'small.mp4',
      {},
      (()=>console.log("Done"))
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
    } catch (e) {
      console.error(e);
    } */

    /* let filename = "small.mp4";
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    const downloadedFile = await FileSystem.downloadAsync("http://techslides.com/demos/sample-videos/small.mp4", fileUri);
    
    if (downloadedFile.status != 200) {
      handleError();
    } */
    /* const pdfURI = await Asset.fromModule(require('./Lorem_ipsum.pdf')).uri;
    console.log("URI :",pdfURI) */

    /* const path = // absolute-path-to-my-local-file.
    FileViewer.open(path)
    .then(() => {
      // success
    })
    .catch(error => {
      // error
    }); */
    
    /* 
    const file = 'Lorem_ipsum.pdf'; // this is your file name

  // feel free to change main path according to your requirements
  const dest = `${RNFS.DocumentDirectoryPath}/${file}`;
  
  RNFS.copyFileAssets(file, dest)
  .then(() => FileViewer.open(dest))
  .then(() => {
     // success
     console.log(12)
  })
  .catch(error => {
     console.log(error)
  }); */
    /* try {
      const cUri = await FileSystem.getContentUriAsync(path);
                 
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
          type: "application/pdf",
      });
    }catch(e){
        console.log(e.message);
    } */
    /* FileViewer.open(path)
    .then(() => {
      // success
      console.log("True")
    })
    .catch(error => {
      // error
      console.log(error)
    }); */
  }

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
          onPress={() =>openDocumentRef()}
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
