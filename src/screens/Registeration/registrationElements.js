export let registrationElements = [
    {
        type:'textInput',
        label:'Owner Email *',
        stateValue:'email',
        returnKeyType:'next',
        stateError:'emailError',
        stateErrorText:'emailError',
        keyBoardType:'email'
    },
    {
        type:'textInput',
        label:'Company Name *',
        stateValue:'company_name',
        returnKeyType:'next',
        stateError:'companynameError',
        stateErrorText:'companynameError',
        keyBoardType:''
    },
    {
        type:'textInput',
        label:'Website *',
        stateValue:'website',
        returnKeyType:'next',
        stateError:'websiteError',
        stateErrorText:'websiteError',
        keyBoardType:''
    },
    {
            type:'textInput',
            label:'PhoneNumber *',
            stateValue:'phoneNumber',
            returnKeyType:'next',
            stateError:'phoneNumberError',
            stateErrorText:'phoneNumberError',
            keyBoardType:'numeric'
    },
    {
        type:'textInput',
        label:'Financial Number *',
        stateValue:'financialNumber',
        returnKeyType:'next',
        stateError:'financialNumberError',
        stateErrorText:'financialNumberError',
        keyBoardType:''
},
{
    type:'picker'
},
{
        type:'textInput',
        label:'Registered Address *',
        stateValue:'registeredAddress',
        returnKeyType:'next',
        stateError:'registeredAddressError',
        stateErrorText:'registeredAddressError',
        keyBoardType:''
},
{
    type:'textInput',
    label:'city *',
    stateValue:'city',
    returnKeyType:'next',
    stateError:'cityError',
    stateErrorText:'CityError',
    keyBoardType:''  
},
{
    type:'textInput',
    label:'State *',
    stateValue:'state',
    returnKeyType:'next',
    stateError:'stateError',
    stateErrorText:'stateError',
    keyBoardType:''  
},
{
    type:'textInput',
    label:'Street *',
    stateValue:'street',
    returnKeyType:'next',
    stateError:'streetError',
    stateErrorText:'streetError',
    keyBoardType:''  
},
{
    type:'textInput',
    label:'Postal Code *',
    stateValue:'postalCode',
    returnKeyType:'next',
    stateError:'postalCodeError',
    stateErrorText:'postalCodeError',
    keyBoardType:''  
},
{
    type:'dropDownPicker',
},
{
    type:'textInput',
    label:'Password *',
    stateValue:'password',
    returnKeyType:'next',
    stateError:'passwordError',
    stateErrorText:'passwordError',
    keyBoardType:''
},
{
    type:'textInput',
    label:'Confirm Password *',
    stateValue:'Confirm Password',
    returnKeyType:'next',
    stateError:'passwordError',
    stateErrorText:'passwordError',
    keyBoardType:''
},
]