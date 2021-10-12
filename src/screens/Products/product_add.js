import React, { Component } from "react";
import {SubmitData} from './submit';
import * as APIProduct from "../../core/apis/apiProductServices";
import * as APIPortfolio from "../../core/apis/apiPortfolioServices";
import { addElements } from "./add_elements";
import { addElements2 } from "./add_elements_2";
import { addElements3 } from "./add_elements_3";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import {
  View,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  LogBox,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Button,
  Touchable,
} from "react-native";
import { TextInput, Switch } from "react-native-paper";
//import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import styles from "./add_style";
//import { launchCamera, launchImageLibrary } from "react-native-image-picker";
//import { ScrollView } from "react-native-gesture-handler";
import TagInput from "react-native-tags-input";
import { AntDesign } from "@expo/vector-icons";
import { docValidator } from "../../helpers/docValidator";
import * as DocumentPicker from "expo-document-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneIsEmpty:false,
      product_name: "",
      product_name_error: false,
      product_sku: "",
      product_sku_error: false,
      product_weight: 0,
      product_weight_error: false,
      product_price: 0,
      product_name_error: false,
      product_offer_price: 0,
      product_offer_price_error: false,
      product_width: 0,
      product_width_error: false,
      product_height: 0,
      product_height_error: false,
      product_depth: 0,
      product_depth_error: false,
      product_description: "",
      product_description_error: false,
      product_negotiable: false,
      product_shipping: false,
      product_visible: false,
      product_discount: false,
      product_warranty: "",
      product_warranty_error: false,
      product_min_qty: 0,
      product_min_qty_error: false,
      product_max_qty: 0,
      product_max_qty_error: false,
      product_reserve_qty:0,
      product_reserve_qty_error: false,
      product_downpayment: 0,
      product_downpayment_error: false,
      product_return_switch:false,
      product_return:0,
      product_return_error:false,
      product_cancel_switch:false,
      product_cancel:0,
      product_cancel_error:false,
      product_conditions_list:[
        {label:'New',id:1},
        {label:'Dusty',id:2},
        {label:'Packaging Damaged',id:3},
      ],
      product_condition:{},
      tags: {
        tag: "",
        tagsArray: [],
      },
      product_packages: 0,
      product_packages_error: false,

      product_services_fetched_api: [],
      product_services_fetched: [],
      product_services: [],
      cargo_type_list:[],
      cargo_type:{},

      product_stacking:0,
      product_stacking_error:false,
      product_package_type:'',
      product_package_type_error:false,

      company_document:{},
      company_document_Error:true,
      cargo_document:{},
      cargo_document_Error:true,

      forFilteringCategories:{},
      fetchedCategories:[],
      category:null,
      fetchedSubCategories:[],
      subCategory:null,
      fetchedBrands:[],
      brand:null,

      variants:[],
      variant_stock_qty_switch:false,
      variant_stock_qty:0,
      variant_stock_qty_error:0,
      variant_piece_qty_switch:false,
      variant_piece_qty:0,
      variant_piece_qty_error:0,
      variant_package_qty_switch:false,
      variant_package_qty:0,
      variant_package_qty_error:0,
      variant_discount_switch:false,
      variant_discount:0,
      variant_discount_error:0,
      variant_minqty_switch:false,
      variant_minqty:0,
      variant_minqty_error:0,

      filter_variant_list:[],
      variant_type_list:[],
      variant_type:{},
      variant_value_list:[],
      variant_value:{},

      images: [],
      variantImage:'',
      loading: true,
      forTab:{
        index: 0,
        routes: [
        { key: "first", title: "Product" },
        { key: "second", title: "Packaging" },
        { key: "third", title: "Variant" },
      ],
     }
    };
  }

  submit=()=>{
    if(this.state.product_min_qty>this.state.product_max_qty){
      Alert.alert("Error","Product minimum quantity is greater than maximum");
      return;
    }
    if(this.state.product_downpayment>100 ||this.state.product_downpayment<0){
      Alert.alert("Error","Product down payment can't be greater than 100 or lower than 0");
      return;
    }
    let filteredTags=[];
    this.state.tags.tagsArray.map((item,index)=>{
      filteredTags.push({is_existing:true,tag_id:index+1,tag_name:item})
    })
    let resImages = this.state.images.map((item)=>{
      return ({is_existing:true, media:item})
    })
    console.log("SERVICES FETCHED: ",this.state.product_services_fetched);
    let resServices = this.state.
    product_services_fetched_api.map((item)=>{
      let id = this.state.product_services.find((i)=> i===item.value)
      if(item.value === id)
        return ({
          service_id:item.id,
          service_name:item.service_name,
          service_cost:item.service_cost,
          requested_document:item.requested_document
        });
    })
    console.log("ARRAY BECOMES: ",resServices)
    let payload={
        product_name: this.state.product_name,
        price: this.state.product_price,
        offered_price: this.state.product_offer_price,
        category_id: this.state.category,
        sub_category_id: this.state.subCategory,
        brand_id: this.state.brand,
        product_sku: this.state.product_sku,
        is_negotiable: this.state.product_negotiable,
        width: this.state.product_width,
        height: this.state.product_height,
        depth: this.state.product_depth,
        weight: this.state.product_weight,
        description: this.state.product_description,
        shipping_included: this.state.product_shipping,
        images:resImages,
        warranty_details: this.state.product_warranty,
        tags: filteredTags,
        is_visible: this.state.product_visible,
        is_discount: this.state.product_discount,
        services:resServices,
        min_purchase_qty:  this.state.product_min_qty,
        max_purchase_qty:  this.state.product_max_qty,
        max_reserve_qty: this.state.product_reserve_qty,
        down_payment: this.state.product_downpayment,
        return_allowed: this.state.product_return_switch,
        cancel_allowed: this.state.product_cancel_switch,
        return_day: this.state.product_return,
        cancel_day: this.state.product_cancel,
        document: "s",
        product_condition: this.state.product_condition,
        variant: {
          variant_image: "string",
          is_variant_by_piece: this.state.variant_piece_qty_switch,
          is_variant_by_package: this.state.variant_package_qty_switch,
          is_variant_min_qty: this.variant_min_qty_switch,
          is_variant_stock: this.state.variant_stock_qty_switch,
          is_discount: this.state.variant_discount_switch,
          discount: this.state.variant_discount,
          variant_by_piece: this.state.variant_piece_qty,
          discount_start_date: 0,
          discount_end_date: 0,
          variant_by_package: this.state.variant_package_qty,
          variant_min_qty: this.state.variant_minqty,
          variant_stock: this.state.variant_stock_qty,
          variant_types: [
            {
              variant_type_id: this.state.variant_type,
              variant_value_id: this.state.variant_value,
            }
          ]
        },
        no_of_package: this.state.product_packages,
        package_type: this.state.product_package_type,
        cargo_type_id: this.state.cargo_type.value,
        cargo_type_name: this.state.cargo_type.label,
        stacking: this.state.product_stacking,
        cargo_document: this.state.cargo_document.uri
    }
    SubmitData(payload);
    /* APIProduct.sellerPostProduct(payload).then((res)=>{
      Alert.alert("Product Creation",res)
    }); */
    console.log("Should run everything and the state is:",this.state.oneIsEmpty);
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
  }

  async componentDidMount(){
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    APIProduct.getServices().then((res) => {
      console.log("SERVICES FROM API: ", res);
      let array = [];
      res.map((item) => {
        array.push({ value: item.id, label: item.service_name, service_cost:item.service_cost, requested_doc:item.requested_doc });
      });
      console.log("RES==>", res);
      this.setState({ product_services_fetched: array, product_services_fetched_api:res});
    });
    APIProduct.getCargoTypeList().then((res)=>{
      console.log("CARGO DATA: ",res);
      let array = [];
      res.map((item)=>{
        array.push({ value:item.id, label:item.cargo_type_options })
      })
      this.setState({ cargo_type_list:array })
    })
    APIPortfolio.getSellerCategories().then((res)=>{
      console.log("RES FROM THE FUNCTION: " ,res);
       let arr = [];
       console.log("CATEGORYLIST: ",res.categoryList)
      res.categoryList.map((item)=>{
        arr.push({value:item.category_id, label:item.category.category_name})
      })
      console.log("ARRAY BECOMES: ",arr)
      console.log("RAN");
      this.setState({fetchedCategories:arr,forFilteringCategories:res,loading:false}) 
    })
  }

  chooseImages = async(type) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    if(type=="product"){  
      let ar=this.state.images;
      ar.push(pickerResult.uri)
      this.setState({images:ar});
    }
    else if(type=="variant"){
      this.setState({variantImage:pickerResult.uri});
    }
  };

  removePic(id){
    let res = this.state.images.filter((item)=>{
      return item != id;
    })
    this.setState({images:res})
  }

  pickDocument = async (e,i) => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
      this.setState({ [e]: true })
    } else {
      //console.log(result);
      try { this.setState({ [i]: result, [e]: false })
      } catch (error) {
        console.log(error);
      }
    }
    /* e.typeDoc==="Trade"?console.log("test"):console.log(123);
        this.setState({ docs: result.uri })
        alert(result.uri); */
  };

  drawImages = () => {
    return (
      <>
        <TouchableOpacity onPress={()=>this.chooseImages("product")}>
          <Image
            source={require("../../../assets/images/default-image.png")}
            style={{ width: screenwidth, height: screenheight * 0.3 }}
          />
        </TouchableOpacity>
        <SafeAreaView>
        <ScrollView horizontal={true} style={{ marginVertical: 30,marginHorizontal:10 }}>
          {this.state.images.length > 0
            ? this.state.images.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity  style={[styles.closeIconContainer,{position:'relative',top:40,right:15}]}
                      onPress={()=>this.removePic(item)}>
                      <Ionicons name="close-circle" size={30} color="red"
                      onPress={()=>this.removePic(item)}/>
                    </TouchableOpacity>
                      <Image key={index} source={{uri:item}} style={styles.smallImages} />
                  </View>
                );
              })
            : null}
        </ScrollView>
        </SafeAreaView>
      </>
    );
  };

  drawScreenOne = () => {
    //console.log("STATE CALLED FROM FUNCTION: ",this.state)
    return (
      <SafeAreaView>
      <ScrollView>
        {this.drawImages()}
        {addElements.map((item, index) => {
          //console.log("STATE VALUE: ",this.state)
          //console.log(`ITEM: ${index+1}`,item)
          if (item.type == "textInput") {
            return this.renderTextInput(item, index);
          }
          if (item.type === "picker") {
            return this.renderPicker(item, index);
          }
          if (item.type === "switch") {
            return this.renderSwitch(item, index);
          }
          if (item.type === "checkbox") {
            return this.renderCheckBox(item, index);
          }
          if (item.type == "tags") {
            return this.renderTag(item, index);
          }
        })}
      </ScrollView>
      </SafeAreaView>
    );
  };

  

  drawScreenTwo = () => {
    //console.log("STATE CALLED FROM FUNCTION: ",this.state)
    return (
      <SafeAreaView>
      <ScrollView>
        {addElements2.map((item, index) => {
          //console.log("STATE VALUE: ",this.state)
          //console.log(`ITEM: ${index+1}`,item)
          if (item.type == "textInput") {
            return this.renderTextInput(item, index);
          }
          if (item.type === "picker") {
            return this.renderPicker(item, index);
          }
          if (item.type === "switchInput") {
            return this.renderSwitchInput(item, index);
          }
          if (item.type === "checkbox") {
            return this.renderCheckBox(item, index);
          }
          if (item.type == "document") {
            return this.renderDocument(item, index);
          }
        })}
      </ScrollView>
      </SafeAreaView>
    );
  };

  drawImage(){
    return (
      <>
        <TouchableOpacity onPress={()=>this.chooseImages("variant")}>
          {this.state.variantImage.length>0 && <Ionicons style={{position:'absolute',flex:1,zIndex:10,right:10,top:10}} name="close-sharp" size={30} color="red" 
          onPress={()=>this.setState({variantImage:''})}/>
          }
          <Image
            source={
              this.state.variantImage.length<1?
              require("../../../assets/images/default-image.png"):
              {uri:this.state.variantImage}
            }
            style={{ width: screenwidth, height: screenheight * 0.3 }}
          />
        </TouchableOpacity>
      </>
    );
  }

  drawScreenThird = () => {
    //console.log("STATE CALLED FROM FUNCTION: ",this.state)
    return (
      <SafeAreaView>
      <ScrollView>
        {this.drawImage()}
        {addElements3.map((item, index) => {
          //console.log("STATE VALUE: ",this.state)
          //console.log(`ITEM: ${index+1}`,item)
          if (item.type == "textInput") {
            return this.renderTextInput(item, index);
          }
          if (item.type === "switchInput") {
            return this.renderSwitchInput(item, index);
          }
          if (item.type === "picker") {
            return this.renderPicker(item, index);
          }
          if(item.type === "date"){
            return this.renderDate(item,index)
          }
          if(item.type === "button"){
            return <TouchableOpacity
            onPress={()=>this.submit()}
            style={[styles.loginBtn]}
          >
            <Text style={styles.loginBtnText}>Submit</Text>
          </TouchableOpacity>
          }
          /* if (item.type == "document") {
            return this.renderDocument(item, index);
          } */
        })}
      </ScrollView>
      </SafeAreaView>
    );
  };

  async handleCategories(type,value){
    switch(type){
      case 'category':
        let array = [];
        console.log("VALUE: ",value)
        let res = this.state.forFilteringCategories.
        subCategoryList.filter((item)=>{
          if(item.subCategory.category_id == value)
            return ({label:item.subCategory.sub_category_name, value:item.subCategory.id})
        })
        console.log("RESULT ARRAY IS: ",res)
        res.map((item)=>{
          array.push({label:item.subCategory.sub_category_name,value:item.sub_category_id})
        })
        this.setState({fetchedSubCategories:array})
        APIProduct.getVarientTypes(value).then((res)=>{
          console.log("VARIENTS: ",res)
          let result = [];
          res.map((item)=>{
            result.push({label:item.varient_type,value:item.id})
          })
          console.log("RESULT BECOMES: ",result)
          this.setState({variant_type_list:result,filter_variant_list:res})
        })
      case 'subCategory':
          let array2 = [];
          console.log("VALUE: ",value)
          let res2 = this.state.forFilteringCategories.
          brandList.filter((item)=>{
            if(item.brand_id == value)
              return ({label:item.brand.brand_name, value:item.brand_id})
          })
          console.log("RESULT ARRAY IS: ",res2)
          res2.map((item)=>{
            array2.push({label:item.brand.brand_name,value:item.brand_id})
          })
          this.setState({fetchedBrands:array2})
      case 'variant_type':
          //this.setState({loading:true})
          console.log("VALUE IS: ",value,"\nLIST CONSISTS OF: ",this.state.variant_type_list)
          this.setState({variant_type:value});
          let ar=[];
          let values = this.state.filter_variant_list.filter((i)=> i.id === value);
          console.log("VARIANTS VALUE BECOMES: ",values[0])
          values[0].varientvalue.map((item)=>{
            ar.push({label:item.varient_value,value:item.id})
          })
          this.setState({variant_value_list:ar,loading:false})
      case 'variant_value':
          this.setState({variant_value:value})
    }
  }
  

  renderDocument(item,index){
    return(
      <View key={index}>
        <TouchableOpacity
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() =>this.pickDocument(item.stateError,item.stateValue)}
          style={styles.document}
        >
          <AntDesign name="file1" size={24} color="#6E91EC" />
          <Text style={{ color: "gray" }}>{item.typeDoc}</Text>
          {this.state[item.stateError]  ? (
            <AntDesign name="closecircle" size={24} color="red" />
          ) : (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
    )
  }
  
  renderPicker(item,index){
    return(
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: "#C4C4C4",
          borderRadius: 4,
          marginHorizontal:20,
          marginVertical: 10,
          height:55,
          justifyContent:'center',
          backgroundColor:'#fff'
        }}
      >
        <Picker
          style={{marginLeft:5}}
          selectedValue={this.state[item.stateValue]}
          prompt={item.label}
          onValueChange={(itemValue, itemIndex) =>{
            this.setState({[item.stateValue]:itemValue});
            this.handleCategories(item.stateValue,itemValue);
          }
          }>{this.state[item.items].map((it,index2)=>(
             <Picker.Item label={it.label} value={it.value} key={index2}/>
            ))}
        </Picker>
      </View>
      )
  }

  renderDate(item,index){
    return (
      <RNDateTimePicker display="spinner" />
    )
  }

  renderTextInput(item, index) {
    return (
      <TextInput
        key={index}
        style={{
          backgroundColor: "#fff",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
        label={item.label}
        value={this.state[item.stateValue]}
        keyboardType={item.keyBoardType}
        multiline={item.multiline == "false" ? false : true}
        onChangeText={(text) => this.setState({ [item.stateValue]: text })}
        error={this.state[item.stateError]}
        autoCapitalize="none"
        // keyboardType={element.keyBoardType}
        outlineColor="#C4C4C4"
        onBlur={() => {
          if (this.state[item.stateValue].length < 1 || this.state[item.stateValue]<1)
            this.setState({
              [item.stateError]: true,
              oneIsEmpty:true,
            });
          else
            this.setState({
              [item.stateError]: false,
              oneIsEmpty:false,
            });
        }}
        theme={{
          colors: { primary: "#31c2aa", underlineColor: "transparent" },
        }}
      />
    );
  }

  renderSwitch(item, index) {
    return (
      <View style={styles.switchContainer} key={index}>
        <Text style={styles.switchText}>{item.label}</Text>
        <Switch
          value={this.state[item.stateValue]}
          onValueChange={(i) => {
            //console.log("CHOSEN: ",i);
            this.setState({ [item.stateValue]: i });
          }}
        />
      </View>
    );
  }

  renderSwitchInput(item, index) {
    return (
      <View style={styles.switchContainer} key={index}>
        <TextInput
          style={{
            backgroundColor: "#fff",
            marginVertical: 10,
            flex:1
          }}
          label={item.label}
          placeholder={item.placeholder}
          disabled={!this.state[item.stateValue]}
          value={this.state[item.valueValue]}
          keyboardType={item.keyBoardType}
          multiline={item.multiline == "false" ? false : true}
          onChangeText={(text) => this.setState({ [item.valueValue]: text })}
          error={this.state[item.stateError]}
          autoCapitalize="none"
          // keyboardType={element.keyBoardType}
          outlineColor="#C4C4C4"
          onBlur={() => {
            if (this.state[item.stateValue] && this.state[item.valueValue].length < 0)
              this.setState({
                [item.stateError]: true,
              });
            else
              this.setState({
                [item.stateError]: false,
              });
          }}
          theme={{
            colors: { primary: "#31c2aa", underlineColor: "transparent" },
          }}
        />
        <Switch
          value={this.state[item.stateValue]}
          onValueChange={(i) => {
            //console.log("CHOSEN: ",i);
            this.setState({ [item.stateValue]: i, });
          }}
        />
      </View>
    );
  }

  /* changeSwitchValue = (item) =>{

} */

  renderTag(item, index) {
    return (
      <View style={{ marginVertical: 10 }} key={index}>
        <TagInput
          style={[
            styles.docPicker,
            {
              borderColor: "#A6A6A6",
              backgroundColor: "#fff",
              marginVertical: 0,
              marginHorizontal: 10,
              flex: 1,
            },
          ]}
          placeholder="Tags *"
          onBlur={()=>{
            if(this.state[item.stateValue].length<1)
              this.setState({[item.stateError]:true,oneIsEmpty:true})
            else
              this.setState({[item.stateError]:true,oneIsEmpty:false})
          }}
          deleteElement={
            <Ionicons name="close-circle" size={24} color="white" />
          }
          tagsViewStyle={{marginHorizontal:10}}
          tagStyle={{ backgroundColor: "#698EB7", paddingVertical: 10 }}
          tagTextStyle={{ color: "white" }}
          updateState={(state) => this.setState({ [item.stateValue]: state })}
          tags={this.state[item.items]}
        />
      </View>
    );
  }

  renderCheckBox(item, index) {
    return (
      <View style={{ marginVertical: 10, marginHorizontal: 20 }} key={index}>
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
              <Text style={{ color: "gray", textAlignVertical: "center" }}>
                {item.label}
              </Text>
            </View>
          }
        >
          <SelectMultiple
            items={
              this.state[item.items].length > 0 ? this.state[item.items] : []
            }
            selectedItems={this.state[item.stateValue]}
            labelStyle={{ color: "black" }}
            selectedLabelStyle={{ color: "#698EB7" }}
            onSelectionsChange={(selected) =>this.setState({[item.stateValue]:selected})
            }
          />
        </CollapsibleList>
      </View>
    );
  }

firstScreen = () => {
 return this.drawScreenOne();
};

secondScreen = () => {
  return this.drawScreenTwo();
};

thirdScreen = () => {
  return this.drawScreenThird();
};


_renderScene = SceneMap({
  first: this.drawScreenOne,
  second: this.drawScreenTwo,
  third: this.drawScreenThird,
});

nextButton=()=>{
  console.log("USER DATA IS: ",this.state)
}
  render() {
    //console.log("FROM THE RENDER FUNCTION: ",this.state)

    return (
      <SafeAreaView style={{flex:1}}>
        <Spinner visible={this.state.loading} />
        {/* {this.drawScreenTwo()} */}
        {/* {this.drawScreenOne()}
        <TouchableOpacity
          onPress={()=>this.nextButton()}
          style={[styles.loginBtn]}
        >
          <Text style={styles.loginBtnText}>Next</Text>
        </TouchableOpacity> */}
        {/* {this.drawScreenOne()} */}
         <TabView
            navigationState={this.state.forTab}
            renderScene={this._renderScene}
            onIndexChange={this._handleIndexChange}
            //renderTabBar={this._renderTabBar}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={{ backgroundColor: "#fff" }}
                //scrollEnabled={false}
                indicatorStyle={{ backgroundColor: "#31c2aa", height: 2 }}
                renderLabel={({ route, color }) => (
                  <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
                )}
              />
            )}
      //initialLayout={{ width: layout.width }}
      />
      </SafeAreaView>
    );
  }
}
