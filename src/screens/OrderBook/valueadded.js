import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as API from "../../core/apis/apiProductServices";
import * as APIORder from '../../core/apis/apiOrderServices'
import * as ApiDocument from '../../core/apis/apiDocumentService'
import { styles } from "./valueadded_style";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";
import { docValidator } from "../../helpers/docValidator";
import {TouchableDocumentPicker} from '../../components/DocumentPicker';
import { documentBlobConverter } from "../../helpers/documentBlobConverter";

const data = {
  name: "Product 1",
  description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
};

const ValueAdded = ({ navigation,route }) => {
  const [fetchedServices, setFetchedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [total, setTotal] = useState(0);
  const [routeData,setRouteData] = useState();
  const [document,setDocument] = useState({value:null,error:true});

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
    let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:false});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
      setDocument({...document,error:true})
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

  const removeServices=()=>{
    console.log("TEst")
  }

  const addValue=()=>{
    setIsVisible(true)
    if(services.length<1){
      setIsVisible(false)
      Alert.alert("Error","Please select atleast one service")
      return
    }
    if(document.value.uri==undefined || document.value==null){
      setIsVisible(false)
      Alert.alert("Error","Please select a document")
      return
    }
    let arr = [];
    let doc =[];
    
    if(typeof(this.state.trading)!="string")
      new Promise (async(resolve,reject)=>{
        let payloadToSend = []
          payloadToSend.push({
            uri:document.value.uri,name:document.value.name
          })

        let blob =await Promise.all(await documentBlobConverter(payloadToSend))
        resolve ({blob:blob, payloadToSend:payloadToSend})
      }).then((res)=>{
        let docName = res.payloadToSend[0].name
        let formatted = {document:res.blob[0], extension:docName.substring(docName.length-4, docName.length)}
        ApiDocument.uploadDoc({document:formatted.document, extension:formatted.extension})
        .then((res)=>{
          doc.push(res)
        })
        .catch(err=>console.log("Error:",err.response.data.message))
      })
      else
        doc.push(document.value)
    services.map((item)=>{
      let res = fetchedServices.filter((item2) => {
        return item2.value === item.value;
      });
      arr.push({service_id:item.value,service_name:item.label.split(" ")[0],price:res[0].cost,document:doc})
    })
    let payload={
      cart_id:routeData.cart_id,
      value_added_services:arr,
    }
    console.log("PAYLOAD BECOMES: ",payload)

    APIORder.addValueAddedServices(payload).then((res)=>{
      setIsVisible(false)
      Alert.alert("Added Services",res,[
        {text:"Ok",onPress:()=>navigation.goBack()}
      ])
    }).catch(err=>{
      setIsVisible(false)
      Alert.alert("Error",err.response.data.message)
    })
  }

  useEffect(() => {
    console.log("ROTUE PARAMS: ",route.params)
    API.getServices().then((res) => {
      console.log("RESULT: ", res.item);
      let array = [];
      res.map((item) => {
        array.push({
          label: item.service_name + ` ($${item.service_cost})`,
          value: item.id,
          cost: item.service_cost,
        });
      });
      setRouteData(route.params.item)
      setFetchedServices(array);
      setIsVisible(false);
    });
  }, []);
  return (
    <ScrollView style={{flex:1}}>
      <Spinner visible={isVisible} />
      <View>
        <Image
          resizeMode="contain"
          source={{uri:routeData?.images[0].media}}
          style={styles.image}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={styles.name}>{routeData?.product_name}</Text>
          {routeData?.value_added_services!=null&&<AntDesign name="closecircle" size={24} color="red" onPress={()=>Alert.alert('Remove Services','Are you sure you want to remove added services',[
            {text:"No"},
            {text:"Yes",onPress:()=>removeServices()},
          ])}/>}
        </View>
        <Text>{routeData?.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={{ fontWeight: "bold" }}>Cost:</Text>
          <Text style={{color:'#6E91EC'}}>${total}</Text>
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

        
      </View>
        <TouchableDocumentPicker
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() =>pickDocument()}
          style={[styles.docPicker,{marginHorizontal:20,backgroundColor:'#fff',borderColor:'#808080'}]}
          doc={document.value}
          />
      <View
        style={styles.buttonsContainer}>
          
          <TouchableOpacity
            onPress={() => {
              setServices([]);
              setTotal(0);
            }}
            style={[styles.loginBtn, { backgroundColor: "red" }]}
          >
            <Text style={styles.loginBtnText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addValue()}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>Add Services</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default ValueAdded;
