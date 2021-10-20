import React, { Component } from "react";
import * as Progress from "react-native-progress";
import * as APIProduct from "../../core/apis/apiProductServices";
import * as APIPortfolio from "../../core/apis/apiPortfolioServices";
import { addElements } from "./add_elements";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
import styles from "./add_style";
import TagInput from "react-native-tags-input";
import { docValidator } from "../../helpers/docValidator";
import * as DocumentPicker from "expo-document-picker";

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneIsEmpty: false,
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
      tags: {
        tag: "",
        tagsArray: [],
      },

      product_services_fetched_api: [],
      product_services_fetched: [],
      product_services: [],

      forFilteringCategories: {},
      fetchedCategories: [],
      category: null,
      fetchedSubCategories: [],
      subCategory: null,
      fetchedBrands: [],
      brand: null,
      loading: true,
      images: [],
    };
  }

  submit = () => {
    this.setState({ loading: true });
    let arrayOfImages = [];
    let arrayOfTags = [];
    let arrayOfServices = [];

    //changing data form for the api post call
    if (
      this.state.images.length < 1 ||
      this.state.tags.tagsArray.length < 1 ||
      this.state.product_services.length < 1
    ) {
      Alert.alert("Error", `Images, Tags and Services must not be empty`);
      this.setState({ loading: false });
      return;
    } else {
      this.state.product_services.map((item, index) => {
        let result = this.state.product_services_fetched_api.find(
          (element) => element.id === item.value
        );
        arrayOfServices.push({
          service_id: result.id,
          service_name: result.service_name,
          service_cost: result.service_cost,
          requested_document: result.requested_document,
        });
      });

      this.state.images.map((item, index) => {
        arrayOfImages.push({
          is_existing: true,
          media: item,
        });
      });

      this.state.tags.tagsArray.map((item, index) => {
        arrayOfTags.push({
          is_existing: true,
          tag_id: index + 1,
          tag_name: item,
        });
      });

      let payload = {
        product_name: this.state.product_name,
        product_sku: this.state.product_sku,
        weight: parseInt(this.state.product_weight),
        price: parseInt(this.state.product_price),
        offered_price: parseInt(this.state.product_offer_price),
        category_id: parseInt(this.state.category),
        sub_category_id: parseInt(this.state.subCategory),
        brand_id: parseInt(this.state.brand),
        width: parseInt(this.state.product_width),
        height: parseInt(this.state.product_height),
        depth: parseInt(this.state.product_depth),
        description: this.state.product_description,
        warranty_details: this.state.product_warranty,
        is_negotiable: this.state.product_negotiable,
        shipping_included: this.state.product_shipping,
        is_visible: this.state.product_visible,
        is_discount: this.state.product_discount,
        services:arrayOfServices,
        images: arrayOfImages,
        tags: arrayOfTags,
        product_id:this.props.route.params.id
      };

      console.log("PAYLOAD IS : ", payload);
      for (var key of Object.keys(payload)) {
        console.log(key + " --> " + payload[key]);
        console.log("typeof" + typeof payload[key]);
        switch (typeof payload[key]) {
          case "string":
            if (payload[key].length < 1) {
              Alert.alert(
                "Error",
                `Please fill the required field: ${key.replace(/_/g, " ")}`
              );
              this.setState({ loading: false });
              return;
            }
          case "number":
            if (payload[key] < 1) {
              Alert.alert(
                "Error",
                `${key.replace(/_/g, " ")}'s input must be a positive number`
              );
              this.setState({ loading: false });
              return;
            }
          case "object":
            break;
        }
      }

      this.setState({ loading: false });
      console.log("DATA THAT SHOULD BE SENT TO THE OTHER SCREEN: ", payload);
      this.props.navigation.navigate("edit2", {screen:payload,editdata:{...this.props.route.params}});
    }
  };

  async componentDidMount() {
    console.log("ROUTE PARAMS: ",this.props.route.params)
      let route = this.props.route.params;
      let images=[];
      let services=[];
      let tags=[]
      route.images.map((item)=>{
        images.push(item.media)
      })
      route.services.map((item)=>{
        services.push({label:item.service_name,value:item.service_id})
      })
      route.tags.map((item)=>{
        tags.push(item.tag_name)
      })
      this.setState({
        product_name:route.product_name,
        product_sku:route.product_sku,
        product_weight:route.weight+"",
        product_price:route.price+"",
        product_offer_price:route.offered_price+"",
        product_width:route.width+"",
        product_height:route.height+"",
        product_depth:route.depth+"",
        product_description:route.description,
        brand:{label:route.brand.brand_name,value:route.brand.id},
        subCategory:{label:route.subCategory.sub_category_name,value:route.subCategory.id},
        category:{label:route.category.category_name,value:route.category.id},
        product_negotiable:route.is_negotiable,
        product_shipping:route.shipping_included,
        product_visible:route.is_visible,
        product_discount:route.is_discount,
        product_warranty:route.warranty_details,
        tags:{
          tag:"",tagsArray:tags
        },
        images:images,
        product_services:services,

      })
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    APIProduct.getServices().then((res) => {
      console.log("SERVICES FROM API: ", res);
      let array = [];
      res.map((item) => {
        array.push({
          value: item.id,
          label: item.service_name,
          service_cost: item.service_cost,
          requested_doc: item.requested_doc,
        });
      });
      console.log("RES==>", res);
      this.setState({
        product_services_fetched: array,
        product_services_fetched_api: res,
      });
    });
    APIPortfolio.getSellerCategories().then((res) => {
      console.log("RES FROM THE FUNCTION: ", res);
      let arr = [];
      console.log("CATEGORYLIST: ", res.categoryList);
      res.categoryList.map((item) => {
        arr.push({
          value: item.category_id,
          label: item.category.category_name,
        });
      });
      console.log("ARRAY BECOMES: ", arr);
      console.log("RAN");
      this.setState({
        fetchedCategories: arr,
        forFilteringCategories: res,
        loading: false,
      });
    })
  }

  chooseImages = async (type) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    if (type == "product") {
      let ar = this.state.images;
      ar.push(pickerResult.uri);
      this.setState({ images: ar });
    } else if (type == "variant") {
      this.setState({ variantImage: pickerResult.uri });
    }
  };

  removePic(id) {
    let res = this.state.images.filter((item) => {
      return item != id;
    });
    this.setState({ images: res });
  }

  pickDocument = async (e, i) => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
      this.setState({ [e]: true });
    } else {
      //console.log(result);
      try {
        this.setState({ [i]: result, [e]: false });
      } catch (error) {
        console.log(error);
      }
    }
  };

  drawImages = () => {
    return (
      <>
        <TouchableOpacity
          onPress={
            this.state.images.length == 0
              ? () => this.chooseImages("product")
              : null
          }
        >
          <Image
            source={
              this.state.images.length < 1
                ? require("../../../assets/images/default-image.png")
                : { uri: this.state.images[0] }
            }
            style={{ width: screenwidth, height: screenheight * 0.3 }}
          />
          {this.state.images.length > 0 && (
            <TouchableOpacity
              style={[
                styles.closeIconContainer,
                { position: "absolute", top: 10, right: 10 },
              ]}
              onPress={() => this.removePic(this.state.images[0])}
            >
              <Ionicons
                name="md-close-sharp"
                size={30}
                color="red"
                onPress={() => this.removePic(this.state.images[0])}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <SafeAreaView>
          <ScrollView
            horizontal={true}
            style={{ marginVertical: 30, marginHorizontal: 10 }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.images.length > 1
                ? this.state.images.map((item, index) => {
                    if (index > 0)
                      return (
                        <View key={index}>
                          <TouchableOpacity
                            style={[
                              styles.closeIconContainer,
                              { position: "relative", top: 35, right: 10 },
                            ]}
                            onPress={() => this.removePic(item)}
                          >
                            <Ionicons
                              name="md-close-sharp"
                              size={30}
                              color="red"
                              onPress={() => this.removePic(item)}
                            />
                          </TouchableOpacity>
                          <Image
                            key={index}
                            source={{ uri: item }}
                            style={styles.smallImages}
                          />
                        </View>
                      );
                  })
                : null}
              {this.state.images.length > 0 && (
                <TouchableOpacity
                  style={styles.Btn}
                  onPress={() => this.chooseImages("product")}
                >
                  <Icon name="plus-thick" size={30} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };

  drawScreenOne = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {this.drawImages()}
          {addElements.map((item, index) => {
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
            if (item.type === "button") {
              return (
                <TouchableOpacity
                  onPress={() => this.submit()}
                  style={[styles.loginBtn]}
                >
                  <Text style={styles.loginBtnText}>{item.label}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    );
  };

  async handleCategories(type, value) {
    switch (type) {
      case "category":
        let array = [];
        console.log("VALUE: ", value);
        this.state.forFilteringCategories.subCategoryList.map((item) => {
            if (item.subCategory.category_id == value)
              array.push({
                label: item.subCategory.sub_category_name,
                value: item.subCategory.id,
              });
          }
        );
        console.log(`array will consist of ${array}`);/* 
        console.log("RESULT ARRAY IS: ", res);
        res.map((item) => {
          array.push({
            label: item.subCategory.sub_category_name,
            value: item.sub_category_id,
          });
        }); */
        this.setState({ fetchedSubCategories: array });
      case "subCategory":
        let array2 = [];
        console.log("VALUE: ", value);
        this.state.forFilteringCategories.brandList.map((item) => {
          console.log(`ITEM IS `,item)
            if (item.brand.sub_category_id == value)
              array2.push({ label: item.brand.brand_name, value: item.brand_id });
          }
        );
        this.setState({ fetchedBrands: array2 });
      case "brand":
        this.setState({ brand: item });
    }
  }

  renderPicker(item, index) {
    /* if(this.state[item.items].length>0) */
    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: "#C4C4C4",
          borderRadius: 4,
          marginHorizontal: 20,
          marginVertical: 10,
          height: 55,
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Picker
          style={{ marginLeft: 5 }}
          selectedValue={this.state[item.stateValue]}
          prompt={item.label}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ [item.stateValue]: itemValue });
            this.handleCategories(item.stateValue, itemValue);
          }}
        >
          {this.state[item.items].length > 0 &&
            this.state[item.items].map((it, index2) => (
              <Picker.Item label={it.label} value={it.value} key={index2} />
            ))}
        </Picker>
      </View>
    );
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
        outlineColor="#C4C4C4"
        onBlur={() => {
          if (
            this.state[item.stateValue].length < 1 ||
            this.state[item.stateValue] < 1
          )
            this.setState({
              [item.stateError]: true,
              oneIsEmpty: true,
            });
          else
            this.setState({
              [item.stateError]: false,
              oneIsEmpty: false,
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
          onBlur={() => {
            if (this.state[item.stateValue].length < 1)
              this.setState({ [item.stateError]: true, oneIsEmpty: true });
            else this.setState({ [item.stateError]: true, oneIsEmpty: false });
          }}
          deleteElement={
            <Ionicons name="md-close-sharp" size={24} color="white" />
          }
          tagsViewStyle={{ marginHorizontal: 10 }}
          tagStyle={{ backgroundColor: "#698EB7", paddingVertical: 10 }}
          tagTextStyle={{ color: "white" }}
          updateState={(state) =>{ 
            console.log("TAG: ",state)
            this.setState({ [item.stateValue]: state })
          }}
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
            onSelectionsChange={(selected) =>
              this.setState({ [item.stateValue]: selected })
            }
          />
        </CollapsibleList>
      </View>
    );
  }

  nextButton = () => {
    console.log("USER DATA IS: ", this.state);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Spinner visible={this.state.loading} />
        <View style={styles.progressBarContainer}>
          <Text style={styles.headerText}>Edit Product Info</Text>
          <Progress.Bar
            progress={0}
            color="#6E91EC"
            width={
              screenwidth * 0.4
            } /* indeterminateAnimationDuration={1000} indeterminate={true} */
          />
        </View>
        {this.drawScreenOne()}
      </SafeAreaView>
    );
  }
}
