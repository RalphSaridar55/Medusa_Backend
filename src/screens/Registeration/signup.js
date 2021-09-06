import React, { Component } from 'react';
import { SafeAreaView, View, ImageBackground, ScrollView, } from 'react-native'
import { Text, Button, IconButton, Card,RadioButton } from 'react-native-paper'
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
import signupStyle from './signupStyle'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Animatable from 'react-native-animatable';
import {registrationElements } from './registrationElements'



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

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole:'buyer',
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
            data: '',

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
        this.setState({userRole:radioBtnValue})
    }

    getCountries = () => {
        apiUserServices.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.COUNTRIES}`).then((res) => {
            var result = res.data.data.map(option => ({ value: option.id, label: option.name }));
            this.setState({ fetchedCountries: result })

        });
    };

    getCategoryDetails = () => {
        apiUserServices.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.CATEGORIES}`).then((response) => {
            this.setState({ data: response.data.data.data })
            const Categoryarry = []
            for (let i = 0; i < response.data.data.data.length; i++) {
                var category = response.data.data.data[i].category_name
                var id = response.data.data.data[i].id
                Categoryarry.push({ label: category, value: id })
                this.setState({ fetchedcategories: Categoryarry })
            }

        });
    };

    getsub = () => {
        console.log('--> inside get Sub')
        const id = this.state.value
        const filter = this.state.data.filter(option => option.id === id);
        for (let i = 0; i < filter.length; i++) {
            const subDetails = filter[i].subcategory.map(option => ({ value: option.id, label: option.sub_category_name, key: option.id, Brands: option.brands }))
            this.setState({ fetchedSubcategories: subDetails })
        }
        this.getBrands()
    }

    getBrands = () => {
        const label = this.state.brands
        const filter = this.state.fetchedSubcategories.filter(option => option.value === 1);
        for (let i = 0; i < filter.length; i++) {
            const brands = filter[i].Brands.map(option => ({ value: option.id, label: option.brand_name }))
            this.setState({ fetchedBrands: brands })
            console.log(brands)
        }

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
        console.log(payload)

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
        await this.setState(state => ({
            value: callback(state.value),
        }));
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
        alert('sub')
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
        this.getCountries();
    }

    DropDownPickerForSeller = ()=>{
        return(
            <><DropDownPicker
                placeholder='Select Category'
                searchable={true}
                categorySelectable={true}
                open={this.state.open}
                value={this.state.value}
                items={this.state.fetchedcategories}
                setOpen={this.setOpen}
                setValue={this.setCategoryValue}
                setItems={this.setCategories}
                zIndex={3}
                bottomOffset={100}
                dropDownDirection='AUTO' /><DropDownPicker
                    placeholder='Select Sub Categories'
                    searchable={true}
                    categorySelectable={true}
                    open={this.state.opensub}
                    value={this.state.subcategories}
                    items={this.state.fetchedSubcategories}
                    setOpen={this.setOpenSub}
                    setValue={this.setSubCategory}
                    setItems={this.setSubCategories}
                    multiple={true}
                    zIndex={2}
                    dropDownDirection='AUTO' /><DropDownPicker
                    placeholder='Select Brands'
                    searchable={true}
                    categorySelectable={true}
                    open={this.state.openBrand}
                    value={this.state.brands}
                    items={this.state.fetchedBrands}
                    setOpen={this.setOpenBrands}
                    setValue={this.setBrand}
                    setItems={this.setBrands}
                    zIndex={1}
                    multiple={true}
                    dropDownDirection='AUTO' /></>
        )
    }

    drawTextInputFields = () => {
        return (registrationElements.map((element, index) => {
            if( element.type === 'textInput'){
                return  <TextInput key={index}
                label={element.label}
                returnKeyType={element.returnKeyType}
                value={this.state[element.stateValue]}
                onChangeText={(text) => this.setState({[element.stateValue]: text, emailError: '' })}
                error={this.state[element.stateError]}
                errorText={this.state[element.stateError]}
                autoCapitalize='none'
                keyboardType={this.state[element.keyBoardType]}
                outlineColor='#C4C4C4'
                theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
            />
            }if(element.type ==='dropDownPicker'){
                return this.DropDownPickerForSeller();
            }

        }) )
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode='cover'
                style={signupStyle.imgContainer}>
                <SafeAreaView style={signupStyle.container}>
                    <Spinner visible={this.state.loading} />
                    <Header>Create Account</Header>
                    <ScrollView style={{backgroundColor:'transparent'}}>
                                            
                    {this.drawTextInputFields()}
                      {/* < Button mode='contained' onPress={this.onRegister} style={[signupStyle.loginBtn,]}>Register</Button> */}
                   
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        )
    }
}

export default Signup;