

import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, ImageBackground, ScrollView, } from 'react-native'
import {Text, Button, IconButton } from 'react-native-paper'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from "../../helpers/nameValidator"
import Spinner from 'react-native-loading-spinner-overlay';
import APIKit from "../../core/apis/APIKit"
import _ from 'lodash';
import * as ROUTE_LIST from "../../core/apis/apis-list"
import * as DocumentPicker from "expo-document-picker";
import { Picker } from '@react-native-picker/picker';


export default function Registration({ navigation }) {

    const getCategoires = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.HOME_CATEGORIES}`).then((res) => {
            const result = res.data.data.map(option => ({ id: option.id, item: option.category_name }));
            setftechedCategories(result)
        });
    };
    const getCountries = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.COUNTRIES}`).then((res) => {
            const COUNTRIES = res.data.data;
            var result = COUNTRIES.map(option => ({ value: option.id, label: option.name }));
            setftechedCountries(result)
        });
    };

    const getCategoryDetails = () => {
        APIKit.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.CATEGORIES}`).then((res) => {
            const results = res.data.data
            setftechedSubCategories(results)


        });
    };
    useEffect(() => {
        getCategoires()
        getCountries()
        getCategoryDetails()
    });


    const typeList = [
        {
            label: "Seller & Buyer",
            value: "1",
        },
        {
            label: "Buyer",
            value: "2",
        },
    ]

    const SubCategoriesList = [
        {
            label: "Phone",
            value: "1",
        }

    ];

    const BrandsList = [
        {
            label: "Samsung",
            value: "1",
        },

        {
            label: "Apple",
            value: "2",
        },
        {
            label: "Nokia",
            value: "3",
        }

    ];

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        setDocs(result.uri)
        alert(result.uri);
        console.log(result);
    };

    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirm_password, setConfirmPassword] = useState({ value: '', error: '' })
    const [company_name, setCompanyName] = useState({ value: '', error: '' })
    const [website, setWebsite] = useState({ value: '', error: '' })
    const [financialNumber, setfinancialNumber] = useState({ value: '', error: '' })
    const [countryCode, setCountryCode] = useState({ value: '', error: '' })
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' })
    const [registeredAddress, setRegisteredAddress] = useState({ value: '', error: '' })
    const [state, setState] = useState({ value: '', error: '' })
    const [city, setCity] = useState({ value: '', error: '' })
    const [street, setStreet] = useState({ value: '', error: '' })
    const [postalCode, setPostalCode] = useState({ value: '', error: '' })
    const [terms, setTerms] = useState({ value: '', error: '' })


    const [categories, setCategories] = useState("1")
    const [subCategories, setSubCategories] = useState("")
    const [brands, setBrands] = useState("")
    const [country, setCountry] = useState("")

    const [fetchedcategories, setftechedCategories] = useState([])
    const [fetchedCountries, setftechedCountries] = useState([])
    const [fetchedSubcategories, setftechedSubCategories] = useState([])


    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [accounttype, setType] = useState("")


    const [docs, setDocs] = useState("")

    const [isLoading, setLoading] = useState(false)


    const [ConfirmError, setConfirmError] = useState("")

    const [selectedCategories, setSelectedCategories] = useState([])

    function onMultiChange() {
        return (item) => setSelectedCategories(xorBy(selectedCategories, [item], 'id'))
    }


    const onRegister = () => {
        console.log(fetchedCountries)

        if (password !== confirm_password) {
            setConfirmError("Passwords doesn't match")
        }
        // Validation 
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const companynameError = nameValidator(company_name.value)
        const websiteError = nameValidator(website.value)
        const financialNumberError = nameValidator(financialNumber.value)
        const phoneNumberError = nameValidator(phoneNumber.value)
        const countryCodeError = nameValidator(countryCode.value)
        const registeredAddressError = nameValidator(registeredAddress.value)
        const stateError = nameValidator(state.value)
        const cityError = nameValidator(city.value)
        const streetError = nameValidator(street.value)
        const postalCodeError = nameValidator(postalCode.value)
        const termsError = nameValidator(terms.value)
        // const categoriesError = nameValidator(Categories.value)
        // const subCategoriesError = nameValidator(subCategories.value)
        // const brandsError = nameValidator(brands.value)


        // // Set Errors msgs
        if (streetError || ConfirmError || emailError || passwordError || companynameError || websiteError || financialNumberError || phoneNumberError || countryCodeError || registeredAddressError || stateError || cityError || postalCodeError || termsError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setCompanyName({ ...company_name, error: companynameError })
            setWebsite({ ...website, error: websiteError })
            setfinancialNumber({ ...financialNumber, error: financialNumberError })
            setPhoneNumber({ ...phoneNumber, error: phoneNumberError })
            setCountryCode({ ...countryCode, error: countryCodeError })
            setRegisteredAddress({ ...registeredAddress, error: registeredAddressError })
            setState({ ...state, error: stateError })
            setCity({ ...city, error: cityError })
            setPostalCode({ ...postalCode, error: postalCodeError })
            setStreet({ ...street, error: streetError })
            setTerms({ ...terms, error: termsError })
            // setConfirmPassword({ ...confirm_password, error: "Passwords don't match" })
            return
        }

        // Payload Data 
        const payload = {
            owner_email: email.value,
            owner_country_code: countryCode.value,
            owner_mobile_number: phoneNumber.value,
            password: password.value,
            company_name: company_name.value,
            website: website.value,
            financial_number: financialNumber.value,
            registered_address: registeredAddress.value,
            country_id: country,
            state: state.value,
            city: city.value,
            street: street.value,
            postal_code: postalCode.value,
            user_type: accounttype,
            company_reg_doc: docs,
            trading_license_doc: "string",
            categories: [
                {
                    category_id: categories,
                    subCategory: [
                        {
                            subCategory_id: 1,
                            brands: [
                                {
                                    brand_id: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        // Show spinner when call is made
        setLoading(true)

        // api call
        APIKit.post('/user-signup', payload)
            .then((res) => {
                alert(res.data.message)
                setLoading(false)
            })
            .catch((error) => {
                alert(error.response.data.message)
                setLoading(false)
            })
    }

    return (

        <ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
            style={{
                flex: 1,
            }}>
            <ScrollView>
                <View style={styles.container}>
                    <Spinner visible={isLoading} />
                    <Header>Create Account</Header>
                    <View>
                        <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
                            <Picker
                                selectedValue={accounttype}
                                onValueChange={(itemValue, itemIndex) =>
                                    setType(itemValue)
                                }>
                                {typeList.map((option) =>
                                    <Picker.Item
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}
                                    />
                                )}
                            </Picker>
                        </View>
                        <TextInput
                            label="Owner Email *"
                            returnKeyType="next"
                            value={email.value}
                            onChangeText={(text) => setEmail({ value: text, error: '' })}
                            error={!!email.error}
                            errorText={email.error}
                            autoCapitalize="none"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />

                        <TextInput
                            label="Company Name *"
                            returnKeyType="next"
                            value={company_name.value}
                            onChangeText={(text) => setCompanyName({ value: text, error: '' })}
                            error={!!company_name.error}
                            errorText={company_name.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />
                        <TextInput
                            label="Website *"
                            returnKeyType="next"
                            value={website.value}
                            onChangeText={(text) => setWebsite({ value: text, error: '' })}
                            error={!!website.error}
                            errorText={website.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />
                        <TextInput
                            label="Financial Number *"
                            returnKeyType="next"
                            value={financialNumber.value}
                            onChangeText={(text) => setfinancialNumber({ value: text, error: '' })}
                            error={!!financialNumber.error}
                            errorText={financialNumber.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />

                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ flex: 1, marginRight: 5 }}>
                                <TextInput
                                    label="Code *"
                                    returnKeyType="next"
                                    value={countryCode.value}
                                    onChangeText={(text) => setCountryCode({ value: text, error: '' })}
                                    error={!!countryCode.error}
                                    errorText={countryCode.error}
                                    autoCapitalize="none"
                                    outlineColor="#C4C4C4"

                                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                                />
                            </View>
                            <View style={{ flex: 2 }}>
                                <TextInput
                                    label="phoneNumber *"
                                    returnKeyType="next"
                                    value={phoneNumber.value}
                                    onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
                                    error={!!phoneNumber.error}
                                    errorText={phoneNumber.error}
                                    autoCapitalize="none"
                                    outlineColor="#C4C4C4"
                                    theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                                />
                            </View>
                        </View>

                        <TextInput
                            label="Registered Address *"
                            returnKeyType="next"
                            value={registeredAddress.value}
                            onChangeText={(text) => setRegisteredAddress({ value: text, error: '' })}
                            error={!!registeredAddress.error}
                            errorText={registeredAddress.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />
                        <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
                            <Picker
                                selectedValue={country}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCountry(itemValue)
                                }>
                                {fetchedCountries.map((option) =>
                                    <Picker.Item
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}
                                    />
                                )}
                            </Picker>
                        </View>
                        <TextInput
                            label="City *"
                            returnKeyType="next"
                            value={city.value}
                            onChangeText={(text) => setCity({ value: text, error: '' })}
                            error={!!city.error}
                            errorText={city.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />
                        <TextInput
                            label="State *"
                            returnKeyType="next"
                            value={state.value}
                            onChangeText={(text) => setState({ value: text, error: '' })}
                            error={!!state.error}
                            errorText={state.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />
                        <TextInput
                            label="Street *"
                            returnKeyType="next"
                            value={street.value}
                            onChangeText={(text) => setStreet({ value: text, error: '' })}
                            error={!!street.error}
                            errorText={street.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />
                        <TextInput
                            label="Postal Code *"
                            returnKeyType="next"
                            value={postalCode.value}
                            onChangeText={(text) => setPostalCode({ value: text, error: '' })}
                            error={!!postalCode.error}
                            errorText={postalCode.error}
                            autoCapitalize="none"
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
                        />
                        <View>
                            {/* <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
                                    <Picker
                                        selectedValue={categories}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setCategories(itemValue)
                                        }>
                                        {fetchedcategories.map((option) =>
                                            <Picker.Item
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                            />
                                        )}
                                    </Picker>
                                </View> */}
                            {/* <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff", marginTop: 10, marginBottom: 10 }}>
                                    <Picker
                                        selectedValue={subCategories}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSubCategories(itemValue)
                                        }>
                                        {categories === "1" ? SubCategoriesList.map((option) =>
                                            <Picker.Item
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                            />
                                        ) : <Picker.Item

                                            label=""
                                        />}
                                    </Picker>
                                </View> */}
                            {/* <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 4, paddingVertical: 15, backgroundColor: "#fff" }}>
                                    <Picker
                                        selectedValue={brands}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setBrands(itemValue)
                                        }>
                                        {BrandsList.map((option) =>
                                            <Picker.Item
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                            />
                                        )}
                                    </Picker>
                                </View> */}
                        </View>

                        <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 5, marginTop: 10 }}>
                            {/* <Avatar.Icon onPress={pickDocument} size={40} icon="plus" style={{ backgroundColor: '#698EB7' }} color="#fff" /> */}
                            <IconButton
                                icon="plus"
                                size={20}
                                onPress={pickDocument}
                                style={{ backgroundColor: '#698EB7' }} color="#fff"
                            />
                            <Text style={{ marginLeft: 10, color: "#698EB7", fontWeight: 'bold' }}>Company Registration Details .docx .pdf</Text>

                        </View>

                    </View>


                    <View>
                        <TextInput
                            label="Password *"
                            returnKeyType="done"
                            value={password.value}
                            onChangeText={(text) => setPassword({ value: text, error: '' })}
                            error={!!password.error}
                            errorText={password.error}
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}

                        />
                        <TextInput
                            label="Confirm Password *"
                            returnKeyType="done"
                            value={confirm_password.value}
                            onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                            error={!!confirm_password.error}
                            errorText={confirm_password.error}
                            outlineColor="#C4C4C4"
                            theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}

                        />
                        {/* 
                        <Checkbox.Item label="I agree to the Terms & Conditions" status="checked" position="leading" /> */}
                    </View>
                    < Button mode="contained" onPress={onRegister} style={styles.loginBtn}>Register</Button>
                </View>

            </ScrollView>
        </ImageBackground >


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center'
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    forgot: {
        color: "#31C2AA",
        fontSize: 12,
        textAlign: "right"
    },
    link: {
        color: "#31C2AA",
        textAlign: "center",
        marginTop: 5
    },
    loginBtn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    containerStyle: {
        flex: 1,
    },
    spacerStyle: {
        marginBottom: 15,
    },
    safeContainerStyle: {
        flex: 1,
        margin: 20,
        justifyContent: "center",
    },
})


