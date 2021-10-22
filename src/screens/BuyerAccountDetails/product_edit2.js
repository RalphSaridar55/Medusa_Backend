import React, { Component } from "react";
import * as Progress from "react-native-progress";
import * as APIProduct from "../../core/apis/apiProductServices";
import { addElements2 } from "./add_elements_2";
import CollapsibleList from "react-native-collapsible-list";
import SelectMultiple from "react-native-select-multiple";
import { Picker } from "@react-native-picker/picker";
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
import { AntDesign } from "@expo/vector-icons";
import { docValidator } from "../../helpers/docValidator";
import * as DocumentPicker from "expo-document-picker";

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

export default class AddProduct extends Component {
  constructor(props) {

    super(props);
    this.state = {
      product_min_qty: 0,
      product_min_qty_error: false,
      product_max_qty: 0,
      product_max_qty_error: false,
      product_reserve_qty: 0,
      product_reserve_qty_error: false,
      product_downpayment: 0,
      product_downpayment_error: false,
      product_return_switch: false,
      product_return: 0,
      product_return_error: false,
      product_cancel_switch: false,
      product_cancel: 0,
      product_cancel_error: false,
      product_conditions_list: [
        { label: "New", value: 1 },
        { label: "Dusty", value: 2 },
        { label: "Packaging Damaged", value: 3 },
      ],
      product_condition: 1,

      product_packages: 0,
      product_packages_error: false,

      cargo_type_list: [],
      cargo_type_id: 0,
      cargo_type_name:"",

      product_stacking: 0,
      product_stacking_error: false,
      product_package_type: "",
      product_package_type_error: false,

      company_document: "",
      company_document_Error: true,
      cargo_document: "",
      cargo_document_Error: true,

      loading: true,
      dataSentFromScreen: {},
    };
  }

  submit = () => {
    this.setState({loading:true})
    if (
      parseInt(this.state.product_min_qty) >
      parseInt(this.state.product_max_qty)
    ) {
      Alert.alert(
        "Error",
        "Please make sure the maximum quantity is greater than the minimum"
      );
      return;
    } else if (this.state.product_downpayment > 100) {
      Alert.alert(
        "Error",
        "Please make sure the down payment rate is lower than 100"
      );
      return;
    } else if (
      (this.state.product_cancel_switch && this.state.product_cancel < 1) ||
      (this.state.product_return_switch && this.state.product_return < 1)
    ) {
      Alert.alert(
        "Error",
        "Please make sure return and cancel day have positive values if switched on"
      );
      return;
    } else {
      let cargo_type_name = this.state.cargo_type_list.filter((item)=>{
        return item.value == this.state.cargo_type_id 
      })[0].label
      let payload = {
        min_purchase_qty: parseInt(this.state.product_min_qty),
        max_purchase_qty: parseInt(this.state.product_max_qty),
        max_reserve_qty: parseInt(this.state.product_reserve_qty),
        down_payment: parseInt(this.state.product_downpayment),
        return_allowed: this.state.product_return_switch,
        cancel_allowed: this.state.product_cancel_switch,
        return_day: parseInt(this.state.product_return),
        cancel_day: parseInt(this.state.product_cancel),
        document: this.state.company_document,
        product_condition: this.state.product_condition,
        no_of_package: parseInt(this.state.product_packages),
        package_type: this.state.product_package_type,
        cargo_type_id: this.state.cargo_type_id,
        cargo_type_name: cargo_type_name,
        stacking: parseInt(this.state.product_stacking),
        cargo_document: this.state.cargo_document,
      };

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
            if (
              payload[key] < 1 &&
              key != "return_day" &&
              key != "cancel_day"
            ) {
              Alert.alert(
                "Error",
                `${key.replace(/_/g, " ")}'s input must be a positive number`
              );
              this.setState({ loading: false });
              return;
            }
          case "boolean":
            if (key == "return_allowed" || key == "cancel_allowed") {
              if (
                payload["return_allowed"] == true &&
                payload["return_day"] < 1
              ) {
                Alert.alert(
                  "Error",
                  `return days' input must be a positive number`
                );
                this.setState({ loading: false });
              } else if (
                payload["cancel_allowed"] == true &&
                payload["cancel_day"] < 1
              ) {
                Alert.alert(
                  "Error",
                  `cancel days' input must be a positive number`
                );
                this.setState({ loading: false });
              } else break;
            }
          case "object":
            break;
        }
      }
      let data = {...this.props.route.params.editdata,...payload}
      let send_to_api = {...payload,...this.props.route.params.screen/* ,product_id:this.props.route.params.screen.product_id */}
      console.log("DATA THAT SHOULD BE SENT TO THE OTHER SCREEN: ", payload);
      console.log("DATA THAT SHOULD BE SENT 2 API: ", send_to_api);
        APIProduct.editProduct(send_to_api).then((res)=>{  
          this.setState({ loading: false });
          Alert.alert("Successful","Product was edited successfully",[
            {text:"Ok",onPress:()=>this.props.navigation.navigate("SellingDetails")}
          ])
        }).catch(err=>{
          console.warn(err)
          this.setState({ loading: false });
          Alert.alert("Error","Something went wrong, Please check your inputs")
        })
    }
  };

  async componentDidMount() {
    console.log("ROUTE PARAMS: ", this.props.route.params.editdata,"\n\n\n");
    console.log("USER: ",this.props.route.params.editdata.user.company_reg_doc)
      let route = this.props.route.params.editdata
      let cargoerror=route.cargo_document?false:true;
      let companyerror=route.user.company_reg_doc?false:true;
      this.setState({
        product_min_qty:route.min_purchase_qty+"",
        product_max_qty:route.max_purchase_qty+"",
        product_reserve_qty:route.max_reserve_qty+"",
        product_downpayment:route.down_payment+"",
        product_return_switch:route.return_allowed,
        product_return:route.return_day+"",
        product_cancel_switch:route.cancel_allowed,
        product_cancel:route.cancel_day+"",
        product_condition:route.product_condition,
        product_packages:route.no_of_package+"",
        product_package_type:route.package_type+"",
        cargo_type_id:route.cargo_type_id,
        cargo_type_name:route.cargo_type_name,
        product_stacking:route.stacking+"",
        company_document:route.user.company_reg_doc,
        company_document_Error:companyerror,
        cargo_document:route.cargo_document,
        cargo_document_Error:cargoerror

      })
      console.log("OCUMNET: ",route.user.company_reg_doc)
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    APIProduct.getCargoTypeList().then((res) => {
      console.log("CARGO DATA: ", res);
      let array = [];
      res.map((item) => {
        array.push({ value: item.id, label: item.cargo_type_options });
      });
      this.setState({
        cargo_type_list: array,
        loading: false,
        dataSentFromScreen: this.props.route.params,
      });
    });
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
      console.log("DOC: ", result);
      try {
        this.setState({ [i]: result.uri, [e]: false });
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
                { position: "absolute", top: 15, right: 15 },
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
                              { position: "relative", top: 40, right: 15 },
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

  drawScreenTwo = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {addElements2.map((item, index) => {
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
            if (item.type === "button") {
              return (
                <TouchableOpacity
                  onPress={() => this.submit()}
                  style={[styles.loginBtn]}
                >
                  <Text style={styles.loginBtnText}>{this.props.route.params.type=="edit"?"Edit Product":item.label}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    );
  };

  renderDocument(item, index) {
    return (
      <View key={index}>
        <TouchableOpacity
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() => this.pickDocument(item.stateError, item.stateValue)}
          style={styles.document}
        >
          <AntDesign name="file1" size={24} color="#6E91EC" />
          <Text style={{ color: "gray" }}>{item.typeDoc}</Text>
          {this.state[item.stateError] ? (
            <AntDesign name="closecircle" size={24} color="red" />
          ) : (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  renderPicker(item, index) {
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
              console.log(
                "ITEM VALUE:",
                itemValue,
                "\nITEM INDEX:" , itemIndex,
              );
          }}
        >
          {this.state[item.items].map((it, index2) => (
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
        // keyboardType={element.keyBoardType}
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

  renderSwitchInput(item, index) {
    return (
      <View style={styles.switchContainer} key={index}>
        <TextInput
          style={{
            backgroundColor: "#fff",
            marginVertical: 10,
            flex: 1,
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
            if (
              this.state[item.stateValue] &&
              this.state[item.valueValue].length < 0
            )
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
            this.setState({ [item.stateValue]: i });
          }}
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
          <Text style={styles.headerText}>Edit Shipping Info</Text>
          <Progress.Bar
            progress={0.5}
            color="#6E91EC"
            width={
              screenwidth * 0.4
            } /* indeterminateAnimationDuration={1000} indeterminate={true} */
          />
        </View>
        {this.drawScreenTwo()}
      </SafeAreaView>
    );
  }
}
