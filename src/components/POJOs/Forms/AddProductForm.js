const getProductFormFields = () => {
    const productControls = {
        name: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Product Name',
                id: "productName"
            },
            value: '',
            validation: {
                required: true,
                isEmail: false,
            },
            valid: false,
            touched: false,
            searchIdentifier: true,
        },
        basePrice: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Product Base Price in Rupees',
                id: "productBasePrice"
            },
            value: '',
            validation: {
                required: true,
                isMoney: true
            },
            valid: false,
            touched: false
        },
        sellingPrice: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Product Selling Price in Rupees',
                id: "productSellingPrice"
            },
            value: '',
            validation: {
                required: true,
                isMoney: true
            },
            valid: false,
            touched: false
        }
    }
    return productControls;
}

export default getProductFormFields;