export let addElements = [
    {
        type: 'textInput',
        label: 'Product Name *',
        stateValue: 'product_name',
        returnKeyType: 'next',
        stateError: 'product_name_error',
        multiline:"false",
        keyBoardType: 'default'
    },
    {
        type: 'textInput',
        label: 'Product SKU *',
        stateValue: 'product_sku',
        returnKeyType: 'next',
        stateError: 'product_sku_error',
        multiline:"false",
        keyBoardType: 'default'
    },
    {
        type: 'textInput',
        label: 'Product Weight (in Kg)*',
        stateValue: 'product_weight',
        returnKeyType: 'next',
        stateError: 'product_weight_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Product Price (in Usd) *',
        stateValue: 'product_price',
        returnKeyType: 'next',
        stateError: 'product_price_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Product Offer Price (in Usd) *',
        stateValue: 'product_offer_price',
        returnKeyType: 'next',
        stateError: 'product_offer_price_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Width (in Cm) *',
        stateValue: 'product_width',
        returnKeyType: 'next',
        stateError: 'product_width_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Height (in Cm) *',
        stateValue: 'product_height',
        returnKeyType: 'next',
        stateError: 'product_height_error',
        multiline:"false",
        keyBoardType: 'numeric'
    },
    {
        type: 'textInput',
        label: 'Depth (in Cm) *',
        stateValue: 'product_depth',
        returnKeyType: 'next',
        stateError: 'product_depth_error',
        multiline:"false",
        keyBoardType: 'numeric'
    }, 
    {
        type: 'textInput',
        label: 'Description *',
        stateValue: 'product_description',
        returnKeyType: 'next',
        stateError: 'product_description_error',
        multiline:"true",
        keyBoardType: 'default'
    },
    {
        type:'picker',
        label:'Category',
        items:'fetchedCategories',
        stateValue:'category',
    },
    {
        type:'picker',
        label:'Sub Category',
        items:'fetchedSubCategories',
        stateValue:'subCategory',
    },
    {
        type:'picker',
        label:'Brand',
        items:'fetchedBrands',
        stateValue:'brand',
    },
    {
        type: 'switch',
        label: 'Negotiable',
        stateValue: 'product_negotiable',
        returnKeyType: 'next',
    },
    {
        type: 'switch',
        label: 'Shipping',
        stateValue: 'product_shipping',
        returnKeyType: 'next',
    },
    {
        type: 'switch',
        label: 'Visible',
        stateValue: 'product_visible',
        returnKeyType: 'next',
    },
    {
        type: 'switch',
        label: 'Discount',
        stateValue: 'product_discount',
        returnKeyType: 'next',
    },
    {
        type: 'textInput',
        label: 'Warranty Details *',
        stateValue: 'product_warranty',
        returnKeyType: 'next',
        stateError: 'warranty_error',
        multiline:"true",
        keyBoardType: 'default'
    },
    {
        type: 'tags',
        label: 'Tags',
        stateValue: 'tags',
        stateError:'tags_error',
        items:'tags',
    },
    {
        type: 'checkbox',
        label: 'Services *',
        stateValue: 'product_services',
        items:'product_services_fetched',
    },
    {
        type:'button',
        label:'Next'
    }
]