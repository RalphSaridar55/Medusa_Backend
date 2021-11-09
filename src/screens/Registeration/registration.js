import React, { Component } from "react";
import SelectMultiple from "react-native-select-multiple";
import CollapsibleList from "react-native-collapsible-list";
import * as UserApi from "../../core/apis/apiUserServices";
import {
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Touchable,
  Dimensions,
  TextInput as TI,
} from "react-native";
import {
  Text,
  Button,
  IconButton,
  Card,
  RadioButton,
  Checkbox,
} from "react-native-paper";
import Autocomplete from "react-native-autocomplete-input";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { confirmPasswordValidator } from "../../helpers/confirmPasswordValidator";
import { docValidator } from "../../helpers/docValidator";
import { nameValidator } from "../../helpers/nameValidator";
import Spinner from "react-native-loading-spinner-overlay";
import MultiSelect from "react-native-multiple-select";
import apiUserServices from "../../core/apis/apiUserServices";
import _ from "lodash";
import * as ROUTE_LIST from "../../core/apis/apis-list";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import signupStyle from "./registrationStyle";
import DropDownPicker from "react-native-dropdown-picker";
import { registrationElements } from "./registrationElements";
import registrationStyle from "./registrationStyle";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";
import * as registrationServices from "./registrationServices";
import { AntDesign } from "@expo/vector-icons";
import styles from "./registrationStyle";
import { brand } from "expo-device";
import Overlay from "react-native-modal-overlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { terms } from "./Terms";

const typeList = [
  {
    label: "Seller & Buyer",
    value: "1",
  },
  {
    label: "Buyer",
    value: "2",
  },
];
const screenwidth = Dimensions.get("screen").width;
const dummyData = ["John", "Sara", "Jess"];

export default class Registartion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "buyer",
      accountType: 1,
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmPasswordError: "",
      company_name: "",
      companynameError: "",
      website: "",
      websiteError: "",
      financialNumber: "",
      financialNumberError: "",
      passport: {},
      passportError: true,
      trade: {},
      tradeError: true,
      countryCode: "",
      countryCodeError: "",
      phoneNumber: "",
      phoneNumberError: "",
      registeredAddress: "",
      registeredAddressError: "",
      state: "",
      stateError: "",
      city: "",
      cityError: "",
      street: "",
      streetError: "",
      postalCode: "",
      postalCodeError: "",
      terms: "",
      categories: "",
      categoriesError: "",

      subcategoriesError: "",

      brandsError: "",
      country: { value: 0, label: "Country" },
      countryError: "",
      docs: "",

      categoryData: [],

      fetchedApiCategory: {},

      fetchedCountries: [],
      fetchedcategories: [],
      fetchedSubcategories: [],
      fetchedBrands: [],
      loading: false,
      display: false,

      open: false,
      opensub: false,
      openBrand: false,
      value: null,
      category: [],
      subcategories: [],
      brands: [],
      show: "",
      query: "",
      query2: "",
      query3: "",

      categoryDB: [],
      subCategoryDB: [],
      brandsDB: [],

      isSetCategory: false,
      isSetSubCategory: false,

      categoryDb: [],

      apiCategories: [],
      apiSubCategory: [],
      apiBrands: [],

      overlay: "terms",
      verifiedNumber: false,
      checkRead: false,
      showTerms: false,

      otp: "",
    };
  }

  onValueChange = (radioBtnValue) => {
    this.setState({ userRole: radioBtnValue });
  };

  returnText = (arr) =>{
    let str = '';
    for(let i=0;i<2;i++)
      str+=arr[i].label.split(" ")[0]+", "
    if(arr.length>2)
      str+= ' + ...'
    return str;
  }

  getCategoryDetails = () => {
    apiPortFolioServices.getCategoryDetails().then((response) => {
      console.log(response);
      this.setState({ categoryData: response });
      const Categoryarry = [];
      for (let i = 0; i < response.length; i++) {
        var category = response[i].category_name;
        var id = response[i].id;
        Categoryarry.push({ label: category, value: id });
        this.setState({ fetchedcategories: Categoryarry });

        //this.state.fetchedCategories=[
        //    {label:"Electronics",value:1},
        //    {label:"Food",value:2},
        //];
      }
    });
  };

  getsub = () => {
    //this.state.fetchedCategories=[
    //    {label:"Electronics",value:1},
    //    {label:"Food",value:2},
    //];
    this.setState({ subcategories: [] });
    const filter = this.state.categoryData.filter(
      (option) => option.id === this.state.value
    );
    //this.state.fetchedCategories is a modified version
    //of categoryData
    //this.state.value is the category User's chosen
    //we filter only where the category id === this.state.value
    //e.g: filter = [{id:.... ,}]
    for (let i = 0; i < filter.length; i++) {
      const subDetails = filter[i].subcategory.map((option) => ({
        value: option.id,
        label: option.sub_category_name,
        key: option.id,
        Brands: option.brands,
      }));
      this.setState({ fetchedSubcategories: subDetails });
    }
    console.log("Data: ", this.state.fetchedSubcategories);
  };

  //working here
  getBrands = () => {
    console.log("\n\n\n\n", this.state.fetchedSubcategories);
    this.setState({ fetchedBrands: [] });
    let brands = [];
    let brandResult = [];
    for (let index = 0; index < this.state.subcategories.length; index++) {
      //   const id = this.state.subcategories[index];
      //   const filter = this.state.fetchedSubcategories.filter(option => option.value === id);
      //   brands.push({...filter});
    }

    for (let i = 0; i < brands.length; i++) {
      console.log(brands[i][0].Brands[0].brand_name);
    }
    //   brands[i].Brands.map(option => {
    //     console.log('res: ',option )
    //     ({ value: option.id, label: option.brand_name })
    //  })
    //console.log('--->-----> ', brandResult);
    //this.setState({ fetchedBrands:{ ...brands} })
  };

  pickDocument = async (e) => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
      e == "Trade"
        ? this.setState({ tradeError: true })
        : this.setState({ passportError: true });
    } else {
      //console.log(result);
      try {
        e == "Trade"
          ? this.setState({ trade: result, tradeError: false })
          : this.setState({ passport: result, passportError: false });
      } catch (error) {
        console.log(error);
      }
    }
    /* e.typeDoc==="Trade"?console.log("test"):console.log(123);
        this.setState({ docs: result.uri })
        alert(result.uri); */
  };

  verifyNumber = () =>{
    this.setState({overlay:"otp",showTerms:true})
    if(!this.state.verifiedNumber){
      if(this.state.phoneNumber<8 || this.state.countryCode<3){
        Alert.alert("Error","Please insert a valid country code and phone number before verifying.");
        return;
      } else {
        let payload = {
          owner_country_code: this.state.countryCode,
          owner_mobile_number: this.state.phoneNumber,
        };
        UserApi.sendOtp(payload)
          .then((res) => {
            console.log("RES:", res);
            if (res.statusCode) {
              this.setState({ overlay: "otp", showTerms: true });
            }
          })
          .catch((err) => {
            Alert.alert("Error", err.response.data.message);
          });
      }
    //   else{
    //     let payload={
    //       owner_country_code:this.state.countryCode,
    //       owner_mobile_number:this.state.phoneNumber
    //     }
    //     //this.setState({overlay:"otp",showTerms:true})
    //     UserApi.sendOtp(payload).then((res)=>{
    //       console.log("RES:",res);
    //       if(res.statusCode){
    //         this.setState({overlay:"otp",showTerms:true})
    //       }
    //     }).catch(err=>{
    //       Alert.alert("Error",err.response.data.message)
    //     })
    //   }
    // }else{
    //   Alert.alert("Verification","Phone number already verified")
    }
  };

  onRegister = () => {
    const emailError = emailValidator(this.state.email);
    const passwordError = passwordValidator(this.state.password);
    const confirmPasswordError = confirmPasswordValidator(
      this.state.password,
      this.state.confirmPassword
    );
    const companynameError = nameValidator(this.state.company_name);
    const websiteError = nameValidator(this.state.website);
    const financialNumberError = nameValidator(this.state.financialNumber);
    const phoneNumberError = nameValidator(this.state.phoneNumber);
    const countryCodeError = nameValidator(this.state.countryCode);
    const registeredAddressError = nameValidator(this.state.registeredAddress);
    const stateError = nameValidator(this.state.state);
    const cityError = nameValidator(this.state.city);
    const streetError = nameValidator(this.state.street);
    const postalCodeError = nameValidator(this.state.postalCode);
    const termsError = nameValidator(this.state.terms);
    const countryError = nameValidator(this.state.country);
    const tradeError = docValidator(this.state.trade.name);
    const passportError = docValidator(this.state.passport.name);

    console.log(
      "email: ",
      this.state.email,
      "\n",
      "company: ",
      this.state.company_name,
      "\n",
      "country: ",
      this.state.country,
      "\n",
      "website: ",
      this.state.website,
      "\n",
      "country code: ",
      this.state.countryCode,
      "\n",
      "phone: ",
      this.state.phoneNumber,
      "\n",
      "financial number: ",
      this.state.financialNumber,
      "\n",
      "registered address: ",
      this.state.registeredAddress,
      "\n",
      "city: ",
      this.state.city,
      "\n",
      "state: ",
      this.state.state,
      "\n",
      "street: ",
      this.state.street,
      "\n",
      "postal: ",
      this.state.postalCode,
      "\n",
      "passport: ",
      this.state.passport,
      "\n",
      "trade: ",
      this.state.trade,
      "\n",
      "password: ",
      this.state.password,
      "\n",
      "confirm pass: ",
      this.state.confirmPassword,
      "\n\n\n",
      "Database categories:\n",
      "Categories:",
      this.state.apiCategories,
      "\nSubCategories:",
      this.state.apiSubCategory,
      "\nBrands:",
      this.state.apiBrands
    );

    if (
      streetError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      companynameError ||
      websiteError ||
      financialNumberError ||
      phoneNumberError ||
      countryCodeError ||
      registeredAddressError ||
      stateError ||
      cityError ||
      postalCodeError ||
      countryError
    ) {
      this.setState({ emailError: emailError });
      this.setState({ passwordError: passwordError });
      this.setState({ confirmPasswordError: confirmPasswordError });
      this.setState({ companynameError: companynameError });
      this.setState({ websiteError: websiteError });
      this.setState({ financialNumberError: financialNumberError });
      this.setState({ phoneNumberError: phoneNumberError });
      this.setState({ countryCodeError: countryCodeError });
      this.setState({ registeredAddressError: registeredAddressError });
      this.setState({ countryCodeError: countryCodeError });
      this.setState({ stateError: stateError });
      this.setState({ cityError: cityError });
      this.setState({ streetError: streetError });
      this.setState({ postalCodeError: postalCodeError });
      this.setState({ termsError: termsError });
      this.setState({ countryError: countryError });
    } else if (passportError || tradeError) {
      Alert.alert("Document Error", "Please add the required document(s)");
    } else if (this.state.password !== this.state.confirmPassword) {
      alert("Password Error", "Passwords don't match");
    } else {
      let catdata = [];
      let error = false;
      if (this.state.userRole != "buyer") {
        if (this.state.apiCategories.length < 1) {
          Alert.alert(
            "Sign Up Error",
            "Please choose a category before registering"
          );
          error = true;
        } else {
          console.log("FORMULATING DATA:");
          this.state.apiCategories?.map((i, index) => {
            let subcatdata = [];
            let brandsdata = [];
            let data = {
              category_id: 0,
              subCategory: [],
            };
            data.category_id = i.id;
            console.log("I:", i);
            this.state.apiSubCategory.map((j, jindex) => {
              this.state.apiBrands.map((k, kindex) => {
                console.log("J:", j);
                console.log("K:", k);
                let res = j[0].brands.filter((h) => {
                  return h.id === k[0].id;
                });
                console.log("RES: ", res);
                //if (k[0].sub_category_id === j[0].id){
                if (res.length > 0) {
                  console.log("PUSHING TO ARRAY BRAND");
                  brandsdata.push({ brand_id: res[0].id });
                }
                //}
                //console.log("BRANDSDATA BECOMES:",brandsdata)
              });
              if (j[0].category_id === i[0].id) {
                subcatdata.push({
                  subCategory_id: j[0].id,
                  brands: brandsdata,
                });
              }
              brandsdata = [];
              console.log("SUB-CAT-DATA:", subcatdata);
              if (subcatdata[jindex]?.brands.length < 1) {
                Alert.alert(
                  "Brand Error",
                  `Please choose a brand for sub category:${j[0].sub_category_name}`
                );
                error = true;
                return;
              }
            });
            catdata.push({ category_id: i[0].id, subCategory: subcatdata });
            if (catdata[index]?.subCategory.length < 1) {
              Alert.alert(
                "Sub Category Error",
                `Please choose a sub category for category:${i[0].category_name}`
              );
              error = true;
              return;
            }
            brandsdata = [];
            subcatdata = [];
          });
          console.log("DATA FOR POST BECOMES:", catdata);
        }
      }

      catdata.map((i) => {
        i.subCategory.map((j) => {
          if (j.brands.length < 1) {
            Alert.alert(
              "Sub Category Error",
              "Please make sure you chose a brand for every sub category"
            );
            error = true;
          }
        });
      });

      if (!this.state.verifiedNumber) {
        Alert.alert("Error", "Please verify your number");
        return;
      }

      if (!this.state.checkRead) {
        Alert.alert(
          "Error",
          "Please agree to the terms and conditions before continuing"
        );
        return;
      }

      if (!error) {
        const payload = {
          owner_email: this.state.email,
          owner_country_code: this.state.countryCode,
          owner_mobile_number: this.state.phoneNumber,
          password: this.state.password,
          company_name: this.state.company_name,
          website: this.state.website,
          financial_number: this.state.financialNumber,
          registered_address: this.state.registeredAddress,
          country_id: this.state.country,
          state: this.state.state,
          city: this.state.city,
          street: this.state.street,
          postal_code: this.state.postalCode,
          user_type: this.state.userRole == "buyer" ? 1 : 4, //parseInt(this.state.accountType),
          company_reg_doc: this.state.passport.uri,
          trading_license_doc: this.state.trade.uri,
          categories: this.state.userRole == "buyer" ? [] : catdata,
        };

        // Show spinner when call is made
        this.setState({ loading: true });

        // api call
        apiUserServices
          .post(`/${ROUTE_LIST.REGISTER}`, payload)
          .then((res) => {
            alert(res.data.message);
            this.setState({ loading: false });
            this.props.navigation.navigate("Login");
          })
          .catch((error) => {
            console.log("ERROR REGISTERING: ", error);
            alert(error.response.data.message);
            this.setState({ loading: false });
          });
      }
    }
  };

  setOpen = (open) => {
    this.setState({
      open,
    });
  };
  //1
  setCategoryValue = async (callback) => {
    await this.setState((state) =>
      //console.log('state : ', state),
      ({
        value: callback(state.value),
      })
    );
    //console.log('--->',this.state.value)
    this.getsub();
  };

  //2
  setCategories = (callback) => {
    this.setState((state) => ({
      fetchedcategories: callback(state.fetchedcategories),
    }));
  };

  setCountryValue = async (callback) => {
    await this.setState((state) =>
      //console.log('state : ', state),
      ({
        country: callback(state.country),
      })
    );
    console.log("--->", this.state.country);
  };

  setCountries = (callback) => {
    this.setState((state) => ({
      fetchedCountries: callback(state.fetchedCountries),
    }));
  };

  setOpenSub = (opensub) => {
    this.setState({
      opensub,
    });
  };

  setSubCategory = async (callback) => {
    await this.setState((state) => ({
      subcategories: callback(state.subcategories),
    }));
    if (this.state.subcategories.length > 0) {
      this.getBrands();
    }
  };

  setSubCategories = (callback) => {
    this.setState((state) => ({
      fetchedSubcategories: callback(state.fetchedSubcategories),
    }));
  };

  setOpenBrands = (openBrand) => {
    this.setState({
      openBrand,
    });
  };

  setBrand = async (callback) => {
    alert("bnjr");
    await this.setState((state) => ({
      brands: callback(state.brands),
    }));
    alert(this.state.brands);
  };

  setBrands = (callback) => {
    this.setState((state) => ({
      fetchedBrands: callback(state.fetchedBrands),
    }));
  };

  onchange = async (itemValue) => {
    await this.setState({ accountType: itemValue });
    this.setState({ display: !display });
  };

  componentDidMount() {
    apiPortFolioServices.getCategories().then((result) => {
      console.log(result);
      let array = result;
      let data = [];
      array.map((item) =>
        data.push({ label: item.category_name, value: item.id })
      );
      this.setState({ fetchedcategories: data, fetchedApiCategory: result });
    });
    apiPortFolioServices.getCountries().then((result) => {
      return this.setState({ ...this.state, ...{ fetchedCountries: result } });
    });
  }

  /**
   *
   * @param {*} dropDownElement
   * @returns drop down data for registration element file to display them
   */
  onSelectionsChange = (selected) => {
    // selectedFruits is array of { label, value }
    this.setState({ subcategories: selected });
    console.log("---->", this.state.subcategories);
  };

  fetchCategories = (item, type) => {
    //console.log(item);
    console.log("TYPE: ", type);
    switch (type[0]) {
      case "query":
        /* if(this.state.isSetCategory){
              this.setState({isSetCategory:false,isSetSubCategory:false, fetchCategories:[], fetchedBrands:[], subcategories:[],brands:[]})
            }
            else{ */
        this.setState({ category: item });
        let r = [];
        let db = [];
        let apiCategories = [];
        console.log("ITEM:", item);
        console.log("FETCH API CATEGORY:", this.state.fetchedApiCategory);
        item.map((i, index) => {
          //filtering the item chosen by user
          let res = this.state.fetchedApiCategory.filter((i2) => {
            return i2.id === i.value;
          });
          apiCategories.push(res);
          console.log("RES: ", res);
          //1-for registering the user's permissions
          db.push({
            category_id: res[0].id,
            subCategory: [],
          });

          //2-fetching subcategories
          res[0].subcategory.map((i3) => {
            r.push({
              label: i3.sub_category_name + ` ( ${res[0].category_name})`,
              value: i3.id,
            });
          });
        });

        console.log("FETCHED ARRAY:", r);
        console.log("DATA TO BE POSTED:", db);
        this.setState({
          isSetCategory: true,
          fetchedSubcategories: r,
          categoryDb: db,
          apiCategories: apiCategories,
        });
        //}
        break;
      case "query2":
        /* if(this.state.isSetSubCategory){
          this.setState({isSetSubCategory:false,fetchedBrands:[], subcategories:[],brands:[]})
        }
        else{ */
        //console.log("FETCHED SUBCATEGORIES: ",this.state.fetchedSubcategories)
        console.log("ITEM: ", item);
        let r2 = [];
        let db2 = [];
        let api = [];
        let subCatApi = [];
        console.log("API TO HELP:", this.state.apiCategories);
        this.state.apiCategories.forEach((i, index) => {
          i.forEach((i2) => {
            subCatApi.push(i2.subcategory);
          });
        });
        //console.log("SUBCATAPI:",subCatApi)
        item.map((i) => {
          let subCategories = [];
          subCatApi.map((i2, index) => {
            i2.map((i3) => {
              i3.id === i.value ? subCategories.push(i3) : null;
            });
          });
          api.push(subCategories);
          console.log("CHOSEN SUBCATEGORIES:", api);
          //1-fetching brands for user

          api.map((i2) => {
            i2.map((i3) => {
              i3.brands.map((i4) => {
                if (i4.sub_category_id === i.value)
                  r2.push({
                    label: i4.brand_name + ` ( ${i3.sub_category_name} )`,
                    value: i4.id,
                    subcat_id: i4.sub_category_id,
                  });
              });
            });
          });

          console.log("BRANDS DATA: ", r2);
          console.log("API SUBCATS:", api);
        });
        this.setState({
          fetchedBrands: r2,
          subcategories: item,
          subCategoryDB: db2,
          apiSubCategory: api,
        });
        //}
        break;
      case "query3":
        let r3 = [];
        let api3 = [];
        let brandsApi = [];
        console.log("ITEM:", item);
        console.log("SUBCATAPI TO HELP:", this.state.apiSubCategory);
        this.state.apiSubCategory.forEach((i, index) => {
          i.forEach((i2) => {
            brandsApi.push(i2.brands);
          });
        });
        //console.log("FETCHEDSUBCATS:", this.state.fetchedSubcategories);
        console.log("BRANDS API:", brandsApi);
        item.map((it) => {
          let brands = [];
          brandsApi.map((i2) => {
            i2.map((i3) => {
              i3.id === it.value ? brands.push(i3) : null;
            });
          });
          api3.push(brands);
          console.log("CHOSEN BRANDS:", api3);
          //console.log("ITEM:",it)
          api3[0].map((i3) => {
            if (it.value === i3.id)
              r3.push({
                label: i3.brand_name,
                value: i3.id,
                subcat_id: i3.sub_category_id,
              });
          });
          /* let res = this.state.fetchedApiCategory.filter((i2, index) => {
            if (this.state.categoryDb[index])
              return i2.id === this.state.categoryDb[index].category_id;
          }); */
          /*  console.log("FETCHING:",res);
          res.map((i2)=>{
            i2.subcategory.map((i)=>{
              console.log("III:",i)
              let results = i.brands.filter((i5)=>{
                return i5.id === it.value
              })
              console.log("RESULTS:",results)
              if(results.length>0)
                r3.push({label:it.label,value:it.value,sub_category_id:results.sub_category_id})
              console.log("SUBCATEGORY:",i)
            })
          }) */

          console.log("DATA FOR REGISTRATION:", r3);
          console.log("SUB API:", api3);
          /* let res = this.state.fetchedApiCategory.filter((i2, index) => {
            if (this.state.categoryDb[index])
              return i2.id === this.state.categoryDb[index].category_id;
          });
          res.map((i2)=>{
            let resp= i2.subcategory.filter((i3,index)=>{
              if(this.state.subCategoryDB[index])
                return i3.id === this.state.subCategoryDB[index].id
            })
            console.log("RESP",resp)
          })

          console.log("BRAND RES",res);
          this.state.fetchedSubcategories.map((i) => {
            i.brands.map((k) => {
              if (k.id === it.value)
                br.push({ ...it, subcategory_id: k.sub_category_id });
            });
          }); */
        });

        this.setState({ brands: item, brandsDB: r3, apiBrands: api3 });
        break;
    }
  };

  MultiSelect = (element, index) => {
    return (element?.userRole === "sellerBuyer" &&
      this.state.userRole === "sellerBuyer") ||
      !element?.userRole ? (
      this.state[element.items].length > 0 ? (
        <View style={{ marginVertical: 10 }} key={index}>
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
                <Text style={{color:'gray'}}>{this.state[element.value].length<1?element.placeholder:this.state[element.value].length>1?/*( this.state[element.value].splice(0,2).map((item)=>(`${item.label.split(" ")[0]}, `)) */ this.returnText(this.state[element.value]):this.state[element.value][0].label.split(" ")[0]}</Text>
              </View>
            }
          >
            <SelectMultiple
              items={this.state[element.items]}
              selectedItems={this.state[element.value]}
              labelStyle={{ color: "black" }}
              selectedLabelStyle={{ color: "#698EB7" }}
              onSelectionsChange={(item) =>
                this.fetchCategories(item, [element.query])
              }
              /* renderLabel={(label)=>{
                [element.value]=="category"?tlabel:<Text>Label</Text>
              }} */
            />
          </CollapsibleList>
        </View>
      ) : (
        <View style={{ marginVertical: 10 }}>
          <CollapsibleList
            wrapperStyle={{
              borderWidth: 0.2,
              borderColor: "#A6A6A6",
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
                <Text style={{ color: "gray" }}>{element.placeholder}</Text>
              </View>
            }
          >
            <Text
              style={{ color: "red", paddingLeft: 10, paddingVertical: 10 }}
            >
              {element.text}
            </Text>
          </CollapsibleList>
        </View>
      )
    ) : null;
  };

  DropDownPickerForCountry = (dropDownElement, index) => {
    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: "#C4C4C4",
          borderRadius: 4,
          marginVertical: 10,
          height: 55,
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Picker
          style={{ marginLeft: 5 }}
          selectedValue={this.state[dropDownElement.value]}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ country: itemValue });
            console.log("COUNTRY CHOSEN: ", itemValue);
          }}
        >
          {this.state[dropDownElement.items].length < 1 ? (
            <Picker.Item label="Country" value={0} />
          ) : (
            this.state[dropDownElement.items].map((item, index2) => (
              <Picker.Item label={item.label} value={item.value} key={index2} />
            ))
          )}
        </Picker>
      </View>
    );
  };

  /**
   *
   * @returns loop over inout text dields
   */
  drawTextInputFields = () => {
    return registrationElements.map((element, index) => {
      if (element.type === "textInput") {
        return (
          <TextInput
            key={index}
            style={{ backgroundColor: "#fff" }}
            label={element.label}
            returnKeyType={element.returnKeyType}
            value={this.state[element.stateValue]}
            onChangeText={(text) =>
              this.setState({ [element.stateValue]: text, emailError: "" })
            }
            error={this.state[element.stateError]}
            errorText={this.state[element.stateError]}
            autoCapitalize="none"
            // keyboardType={element.keyBoardType}
            outlineColor="#C4C4C4"
            theme={{
              colors: { primary: "#31c2aa", underlineColor: "transparent" },
            }}
          />
        );
      }
      if (element.type === "countryPicker") {
        return this.DropDownPickerForCountry(element, index);
      }
      if (element.type === "multiSelect") {
        return this.MultiSelect(element, index);
      }
      if (element.type === "touchableOpacity") {
        return this.DrawTouchableOpacity(element, index);
      }
    });
  };

  DrawTouchableOpacity = (e, i) => {
    return (
      <View key={i}>
        <TouchableOpacity
          color="#6E91EC"
          icon="file"
          mode="outlined"
          onPress={() =>
            e.typeDoc == "Trading License"
              ? this.pickDocument("Trade")
              : this.pickDocument("Passport")
          }
          style={styles.docPicker}
        >
          <AntDesign name="file1" size={24} color="#6E91EC" />
          <Text style={{ color: "gray" }}>{e.typeDoc}</Text>
          {(e.typeDoc == "Company Registration" &&
            this.state.passportError == true) ||
          (e.typeDoc == "Trading License" && this.state.tradeError == true) ? (
            <AntDesign name="closecircle" size={24} color="red" />
          ) : (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    //console.log("render");
    return (
      <ImageBackground
        source={require("../../../assets/images/Login-bg.png")}
        resizeMode="cover"
        style={signupStyle.imgContainer}
      ><Overlay visible={this.state.showTerms} onClose={()=>this.setState({showTerms:false})} 
      containerStyle={[{backgroundColor: `rgba(255,255,255,0.95)`}]}
      closeOnTouchOutside>
                      
          <View style={styles.modalHeader}>
            <Text
              style={{
                fontSize: 26,
                color: "#31C2AA",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {this.state.overlay == "terms"
                ? "Terms and Conditions"
                : "OTP Verification"}
            </Text>
            <MaterialCommunityIcons
              name="close"
              size={24}
              color="red"
              onPress={() =>
                this.setState({ showTerms: false, overlay: "terms" })
              }
            />
          </View>
          <ScrollView style={{ flexDirection: "column", marginTop: 20 }}>
            {this.state.overlay == "terms" ? (
              <Text>{terms}</Text>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  width: screenwidth,
                  marginHorizontal: 20,
                }}
              >
                <TI
                  selectionColor="#31c2aa"
                  placeholder="OTP"
                  style={styles.modalBoxInputs}
                  label="1234"
                  value={this.state.otp}
                  //value={this.state[element.stateValue]}
                  onChangeText={(text) => this.setState({ otp: text })}
                  autoCapitalize="none"
                  // keyboardType={element.keyBoardType}
                  outlineColor="#C4C4C4"
                  theme={{
                    colors: {
                      primary: "#31c2aa",
                      underlineColor: "transparent",
                    },
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.otp > 3) {
                      //call an api
                      this.setState({
                        verifiedNumber: true,
                        overlay: "terms",
                        showTerms: false,
                      });
                    }
                  }}
                  style={{
                    backgroundColor: "#31C2AA",
                    borderRadius: 25,
                    alignItems: "center",
                    width: screenwidth * 0.7,
                    justifyContent: "center",
                    marginVertical: 10,
                    height: 30,
                  }}
                >
                  <Text style={styles.loginBtnText}>Verify</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                onPress={this.onRegister}
                style={[signupStyle.loginBtn]}
              >
                <Text style={styles.loginBtnText}>Verify</Text>
              </TouchableOpacity> */}
              </View>
            )}
          </ScrollView>
        </Overlay>
        <SafeAreaView style={signupStyle.container}>
          <Spinner visible={this.state.loading} />
          <Header>Create Account</Header>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card style={registrationStyle.cardContainer}>
              <RadioButton.Group
                onValueChange={this.onValueChange}
                value={this.state.userRole}
              >
                <View style={registrationStyle.radioBtn}>
                  <RadioButton.Item
                    label={"Just a buyer "}
                    value="buyer"
                    id="buyer"
                  />
                  <RadioButton.Item
                    label={"Seller & Buyer"}
                    value="sellerBuyer"
                    id="sellerBuyer"
                  />
                </View>
              </RadioButton.Group>
              {this.drawTextInputFields()}
              <View style={styles.verifyNumber}>
                <Text>
                  {this.state.countryCode} {this.state.phoneNumber}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {!this.state.verifiedNumber ? (
                    <AntDesign
                      name="closecircle"
                      size={20}
                      style={{ marginRight: 5 }}
                      color="red"
                    />
                  ) : (
                    <AntDesign
                      name="checkcircle"
                      size={20}
                      style={{ marginRight: 5 }}
                      color="green"
                    />
                  )}
                  <TouchableOpacity
                    style={{ height: 30, padding: 5 }}
                    onPress={() => this.verifyNumber()}
                  >
                    <Text
                      style={{
                        color: "#31C2AA",
                        textDecorationLine: "underline",
                      }}
                    >
                      Verify your number
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.verifyNumber}>
                <Checkbox
                  /* theme={{
                      colors: { primary: "#31c2aa", underlineColor: "transparent" },
                    }} */
                  status={this.state.checkRead ? "checked" : "unchecked"}
                  onPress={() => {
                    this.setState({ checkRead: !this.state.checkRead });
                  }}
                />
                <Text>
                  I Agree to the{" "}
                  <Text
                    style={{
                      color: "#31C2AA",
                      textDecorationLine: "underline",
                    }}
                    onPress={() => this.setState({ showTerms: true })}
                  >
                    Terms and conditions
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={this.onRegister}
                style={[signupStyle.loginBtn]}
              >
                <Text style={styles.loginBtnText}>Register</Text>
              </TouchableOpacity>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
