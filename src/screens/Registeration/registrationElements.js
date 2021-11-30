export let registrationElements = [
    {
        type: 'textInput',
        label: 'Owner Email *',
        stateValue: 'email',
        returnKeyType: 'next',
        stateError: 'emailError',
        stateErrorText: 'emailError',
        keyBoardType: 'email'
    },
    {
        type: 'textInput',
        label: 'Company Name *',
        stateValue: 'company_name',
        returnKeyType: 'next',
        stateError: 'companynameError',
        stateErrorText: 'companynameError',
        keyBoardType: ''
    },
    {
        type: 'countryPicker',
        placeholder: 'Country',
        multiple: false,
        open: 'open',
        value: 'country',
        items: 'fetchedCountries',
        setOpen: 'setOpen',
        setValue: 'setCountryValue',
        setItems: 'setCountries',
    },
    {
        type: 'textInput',
        label: 'Website *',
        stateValue: 'website',
        returnKeyType: 'next',
        stateError: 'websiteError',
        stateErrorText: 'websiteError',
        keyBoardType: ''
    },
    {
        type: 'textInput',
        label: 'Country Code *',
        stateValue: 'countryCode',
        returnKeyType: 'next',
        stateError: 'countryCodeError',
        stateErrorText: 'countryCodeError',
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'PhoneNumber *',
        stateValue: 'phoneNumber',
        returnKeyType: 'next',
        stateError: 'phoneNumberError',
        stateErrorText: 'phoneNumberError',
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Financial Number *',
        stateValue: 'financialNumber',
        returnKeyType: 'next',
        stateError: 'financialNumberError',
        stateErrorText: 'financialNumberError',
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Registered Address *',
        stateValue: 'registeredAddress',
        returnKeyType: 'next',
        stateError: 'registeredAddressError',
        stateErrorText: 'registeredAddressError',
        keyBoardType: ''
    },
    {
        type: 'textInput',
        label: 'city *',
        stateValue: 'city',
        returnKeyType: 'next',
        stateError: 'cityError',
        stateErrorText: 'CityError',
        keyBoardType: ''
    },
    {
        type: 'textInput',
        label: 'State *',
        stateValue: 'state',
        returnKeyType: 'next',
        stateError: 'stateError',
        stateErrorText: 'stateError',
        keyBoardType: ''
    },
    {
        type: 'textInput',
        label: 'Street *',
        stateValue: 'street',
        returnKeyType: 'next',
        stateError: 'streetError',
        stateErrorText: 'streetError',
        keyBoardType: ''
    },
    {
        type: 'textInput',
        label: 'Postal Code',
        stateValue: 'postalCode',
        returnKeyType: 'next',
        stateError: 'postalCodeError',
        stateErrorText: 'postalCodeError',
        keyBoardType: ''
    },
    {
        type: 'multiSelect',
        userRole : 'sellerBuyer',
        placeholder: 'Category *',
        multiple: false,
        query:'query',
        open: 'open',
        value: 'category',
        items: 'fetchedcategories',
        setOpen: 'setOpen',
        setValue: 'setCategoryValue',
        setItems: 'setCategories',
        text:'Loading Categories'
    },
    {
        type: 'multiSelect',
        userRole : 'sellerBuyer',
        placeholder: 'Sub Categories *',
        multiple: true,
        query:'query2',
        open: 'opensub',
        value: 'subcategories',
        items: 'fetchedSubcategories',
        setOpen: 'setOpenSub',
        setValue: 'setSubCategory',
        setItems: 'setSubCategories',
        text:'Please select a category first'
    },
    {
        type: 'multiSelect',
        userRole : 'sellerBuyer',
        placeholder: 'Brands *',
        multiple: true,
        open: 'openBrand',
        query:'query3',
        value: 'brands',
        items: 'fetchedBrands',
        setOpen: 'setOpenBrands',
        setValue: 'setBrand',
        setItems: 'setBrands',
        text:'Please select a sub-category first'
    },
    //added the following trade and passport here
    {
        type: 'touchableOpacity',
        returnKeyType: 'next',
        typeDoc:'Company Registration',
        stateError: 'passportError',
        stateErrorText: 'passportError',
    },
    {
        type: 'touchableOpacity',
        returnKeyType: 'next',
        typeDoc:'Trading License',
        stateError: 'tradeError',
        stateErrorText: 'tradeError',
    },
    //
    {
        type: 'textInput',
        label: 'Password *',
        stateValue: 'password',
        returnKeyType: 'next',
        stateError: 'passwordError',
        stateErrorText: 'passwordError',
        keyBoardType: '',
        secure:true
    },
    {
        type: 'textInput',
        label: 'Confirm Password *',
        stateValue: 'confirmPassword',
        returnKeyType: 'next',
        stateError: 'confirmPasswordError',
        stateErrorText: 'confirmPasswordError',
        keyBoardType: '',
        secure:true
    },
]