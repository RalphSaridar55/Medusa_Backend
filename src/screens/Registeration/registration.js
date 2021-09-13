import React, { Component } from 'react';
import { SafeAreaView, View, ImageBackground, ScrollView, } from 'react-native'
import { Text, Button, IconButton, Card, RadioButton } from 'react-native-paper'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import Spinner from 'react-native-loading-spinner-overlay';
import apiUserServices from '../../core/apis/apiUserServices'
import _ from 'lodash';
import * as ROUTE_LIST from '../../core/apis/apis-list'
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import signupStyle from './registrationStyle'
import DropDownPicker from 'react-native-dropdown-picker';
import { registrationElements } from './registrationElements';
import registrationStyle from './registrationStyle';
import * as apiPortFolioServices from '../../core/apis/apiPortfolioServices';
import * as registrationServices from './registrationServices';

const typeList = [
    {
        label: 'Seller & Buyer',
        value: '1',
    },
    {
        label: 'Buyer',
        value: '2',
    },
]

export default class Registartion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: 'buyer',
            accountType: 1,
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            company_name: '',
            companynameError: '',
            website: '',
            websiteError: '',
            financialNumber: '',
            financialNumberError: '',
            countryCode: '961',
            countryCodeError: '',
            phoneNumber: '',
            phoneNumberError: '',
            registeredAddress: '',
            registeredAddressError: '',
            state: '',
            stateError: '',
            city: '',
            cityError: '',
            street: '',
            streetError: '',
            postalCode: '',
            postalCodeError: '',
            terms: '',
            categories: '',
            categoriesError: '',

            subcategoriesError: '',

            brandsError: '',
            country: '',
            countryError: '',
            docs: '',
            categoryData: {},

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
            subcategories: null,
            brands: null,
            show: ''
        };
    }

    onValueChange = (radioBtnValue) => {
        this.setState({ userRole: radioBtnValue })
    }

    getCategoryDetails = () => {
            apiPortFolioServices.getCategoryDetails().then((response) => {
            this.setState({ categoryData: response })
            const Categoryarry = []
            for (let i = 0; i < response.length; i++) {
                var category = response[i].category_name
                var id = response[i].id
                Categoryarry.push({ label: category, value: id })
                this.setState({ fetchedcategories: Categoryarry })
            }
        });
    };

    getsub = () => {
        this.setState({subcategories : []});
        const filter = this.state.categoryData.filter(option =>
            option.id === this.state.value
        );
        for (let i = 0; i < filter.length; i++) {
            const subDetails = filter[i].subcategory.map(option => ({ value: option.id, label: option.sub_category_name, key: option.id, Brands: option.brands }))
            this.setState({ fetchedSubcategories: subDetails })
        }
        this.getBrands();
    }

    //working here
    getBrands = () => {
        this.setState({fetchedBrands : []});
        let brands = [];
        let brandResult = [];
        for (let index = 0; index < this.state.subcategories.length; index++) {
          const id = this.state.subcategories[index];
          const filter = this.state.fetchedSubcategories.filter(option => option.value === id);
          brands.push({...filter});
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
    }

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        this.setState({ docs: result.uri })
        alert(result.uri);
    };

    onRegister = () => {
        const emailError = emailValidator(this.state.email)
        const passwordError = passwordValidator(this.state.password)
        const companynameError = nameValidator(this.state.company_name)
        const websiteError = nameValidator(this.state.website)
        const financialNumberError = nameValidator(this.state.financialNumber)
        const phoneNumberError = nameValidator(this.state.phoneNumber)
        const countryCodeError = nameValidator(this.state.countryCode)
        const registeredAddressError = nameValidator(this.state.registeredAddress)
        const stateError = nameValidator(this.state.state)
        const cityError = nameValidator(this.state.city)
        const streetError = nameValidator(this.state.street)
        const postalCodeError = nameValidator(this.state.postalCode)
        const termsError = nameValidator(this.state.terms)


        if (streetError || emailError || passwordError || companynameError || websiteError || financialNumberError || phoneNumberError || countryCodeError || registeredAddressError || stateError || cityError || postalCodeError || termsError) {
            this.setState({ emailError: emailError })
            this.setState({ companynameError: companynameError })
            this.setState({ websiteError: websiteError })
            this.setState({ financialNumberError: financialNumberError })
            this.setState({ phoneNumberError: phoneNumberError })
            this.setState({ countryCodeError: countryCodeError })
            this.setState({ registeredAddressError: registeredAddressError })
            this.setState({ countryCodeError: countryCodeError })
            this.setState({ stateError: stateError })
            this.setState({ cityError: cityError })
            this.setState({ streetError: streetError })
            this.setState({ postalCodeError: postalCodeError })
            this.setState({ termsError: termsError })
        }

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
            user_type: parseInt(this.state.accountType),
            company_reg_doc: this.state.docs,
            trading_license_doc: this.state.docs,
            categories: [
                {
                    category_id: parseInt(this.state.value),
                    subCategory: [
                        {
                            subCategory_id: parseInt(this.state.subcategories),
                            brands: [
                                {
                                    brand_id: parseInt(this.state.brands)
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        // Show spinner when call is made
        this.setState({ loading: true })

        // api call
        apiUserServices.post(`/${ROUTE_LIST.REGISTER}`, payload)
            .then((res) => {
                alert(res.data.message)
                this.setState({ loading: false })
                navigation.navigate(
                    'Home'
                )
            })
            .catch((error) => {
                alert(error.response.data.message)
                this.setState({ loading: false })
            })

    }

    setOpen = (open) => {
        this.setState({
            open
        });
    }
    //1
    setCategoryValue = async (callback) => {
         await this.setState(state => (
            //console.log('state : ', state),
            {
            value: callback(state.value)
          }));
          console.log('--->',this.state.value)
         this.getsub()
    }

    //2
    setCategories = (callback) => {
        this.setState(state => ({
            fetchedcategories: callback(state.fetchedcategories)
        }));
    }

    setOpenSub = (opensub) => {
        this.setState({
            opensub
        });
    }

    setSubCategory = async (callback) => {
        await this.setState(state => ({
            subcategories: callback(state.subcategories)
        }));
        if (this.state.subcategories.length > 0) {
            this.getBrands()
        }

    }

    setSubCategories = (callback) => {
        this.setState(state => ({
            fetchedSubcategories: callback(state.fetchedSubcategories)
        }));
    }


    setOpenBrands = (openBrand) => {
        this.setState({
            openBrand
        });
    }

    setBrand = async (callback) => {
        alert('bnjr')
        await this.setState(state => ({
            brands: callback(state.brands)
        }));
        alert(this.state.brands)
    }

    setBrands = (callback) => {
        this.setState(state => ({
            fetchedBrands: callback(state.fetchedBrands)
        }));
    }

    onchange = async (itemValue) => {
        await this.setState({ accountType: itemValue })
        this.setState({ display: !display })
    }

    componentDidMount() {
       this.getCategoryDetails();
        // apiPortFolioServices.getCategoryDetails().then((response) => {
        //     return (
        //         this.setState({ ...this.state,...{categoryData: response}}),
        //         this.setState({ ...this.state,...{fetchedcategories: registrationServices.filterCategory(response)}})
        //     )
        // })
        apiPortFolioServices.getCountries().then((result)=>{
           return this.setState({ ...this.state,...{fetchedCountries: result}})
    })}
    
    /**
     * 
     * @param {*} dropDownElement 
     * @returns drop down data for registration element file to display them
     */
    DropDownPickerForSeller = (dropDownElement,index) => {
        return (((dropDownElement?.userRole === 'sellerBuyer' && this.state.userRole === 'sellerBuyer') || !dropDownElement?.userRole) ? 
        <View key={index}>
            <DropDownPicker
            style={registrationStyle.dropDownPickerSellers}
            listMode="MODAL"
            multiple={dropDownElement.multiple}
            placeholder={dropDownElement.placeholder}
            searchable={true}
            categorySelectable={true}
            open={this.state[dropDownElement.open]}
            value={this.state[dropDownElement.value]}
            items={this.state[dropDownElement.items]}
            setOpen={this[dropDownElement.setOpen]}
            setValue={this[dropDownElement.setValue]}
            setItems={this[dropDownElement.setItems]} />
        </View>
         : null
        )
    }

    /**
     * 
     * @returns loop over inout text dields
     */
    drawTextInputFields = () => {
        return (registrationElements.map((element, index) => {
            if (element.type === 'textInput') {
                return <TextInput key={index}
                    label={element.label}
                    returnKeyType={element.returnKeyType}
                    value={this.state[element.stateValue]}
                    onChangeText={(text) => this.setState({ [element.stateValue]: text, emailError: '' })}
                    error={this.state[element.stateError]}
                    errorText={this.state[element.stateError]}
                    autoCapitalize='none'
                    // keyboardType={element.keyBoardType}
                    outlineColor='#C4C4C4'
                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                />
            } if (element.type === 'dropDownPicker') {
                return this.DropDownPickerForSeller(element,index);
            }

        }))
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode='cover'
                style={signupStyle.imgContainer}>
                <SafeAreaView style={signupStyle.container}>
                    <Spinner visible={this.state.loading} />
                    <Header>Create Account</Header>
                    <ScrollView >
                        <Card style={registrationStyle.cardContainer}>
                            <RadioButton.Group onValueChange={this.onValueChange} value={this.state.userRole}>
                                <View style={registrationStyle.radioBtn}>
                                    <RadioButton.Item label={'Just a buyer '} value='buyer' id='buyer' />
                                    <RadioButton.Item label={'Seller & Buyer'} value='sellerBuyer' id='sellerBuyer' />
                                </View>
                            </RadioButton.Group>
                            {this.drawTextInputFields()}
                            {/* < Button mode='contained' onPress={this.onRegister} style={[signupStyle.loginBtn,]}>Register</Button> */}
                        </Card>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        )
    }}