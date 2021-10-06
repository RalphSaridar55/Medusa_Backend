export let addElements2 = [
    {
        type: 'textInput',
        label: 'Min. Purchase Qty*',
        stateValue: 'product_min_qty',
        returnKeyType: 'next',
        stateError: 'product_min_qty_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Max. Purchase Qty*',
        stateValue: 'product_max_qty',
        returnKeyType: 'next',
        stateError: 'product_max_qty_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Max. Reserve Qty*',
        stateValue: 'product_reserve_qty',
        returnKeyType: 'next',
        stateError: 'product_reserve_qty_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Down Payment (%)*',
        stateValue: 'product_downpayment',
        returnKeyType: 'next',
        stateError: 'product_downpayment_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'switchInput',
        label: 'Return Product Day',
        placeholder:'Days',
        stateValue: 'product_return_switch',
        valueValue:'product_return',
        returnKeyType: 'next',
        stateError: 'product_return_error',
        keyBoardType:"numeric",
    },
    {
        type: 'switchInput',
        placeholder:'Days',
        label: 'Cancel Product Day',
        stateValue: 'product_cancel_switch',
        valueValue:'product_cancel',
        returnKeyType: 'next',
        stateError: 'product_return_error',
        keyBoardType:"numeric",
    },
    {
        type:'picker',
        label:'Product Condition',
        items:'product_conditions_list',
        stateValue:'product_condition',
    },
    {
        type: 'textInput',
        label: 'No of Packages *',
        stateValue: 'product_packages',
        returnKeyType: 'next',
        stateError: 'product_packages_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Package Type *',
        stateValue: 'product_package_type',
        returnKeyType: 'next',
        stateError: 'product_package_type_error',
        multiline:"false",
        keyBoardType: 'default'
    },
    {
        type:'picker',
        label:'Cargo Type',
        items:'cargo_type_list',
        stateValue:'cargo_type',
    },
    {
        type: 'textInput',
        label: 'Stacking *',
        stateValue: 'product_stacking',
        returnKeyType: 'next',
        stateError: 'product_stacking_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'document',
        typeDoc:'Company Registration',
        stateValue:'company_document',
        stateError: 'company_document_Error',
        stateErrorText: 'company_document_Error',
    },
    {
        type: 'document',
        typeDoc:'Cargo Document',
        stateValue:'cargo_document',
        stateError: 'cargo_document_Error',
        stateErrorText: 'cargo_document_Error',
    },
]