const getCustomerFormFields = () => {
    const customerControls = {
        name: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Customer Name',
                id: "name",
            },
            value: '',
            validation: {
                required: false,
                isEmail: false,
            },
            valid: false,
            searchIdentifier: true,
            touched: false,
        },
        mobile: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Mobile Number',
                id: "mobile"
            },
            value: '',
            validation: {
                required: true,
                isEmail: false,
                isPhone: true,
            },
            valid: false,
            touched: false
        },
        email: {
            inputType: 'textBox',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                id: "email"
            },
            value: '',
            validation: {
                required: false,
                isEmail: true,
            },
            valid: false,
            touched: false
        },
        gstin: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'GSTIN',
                id: "gstin"
            },
            value: '',
            validation: {
                required: false,
            },
            valid: true,
            touched: false
        },
        doorno: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Door no.',
                id: "doorno"
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        line1: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Address Line 1',
                id: "line1"
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        line2: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Address Line 2',
                id: "line2"
            },
            value: '',
            validation: {
                required: false,
            },
            valid: false,
            touched: false
        },
        city: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'City',
                id: "city"
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        state: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'State',
                id: "state"
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        country: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
                id: "country"
            },
            value: 'India',
            validation: {
                required: true,
            },
            valid: true,
            touched: false
        },
        pincode: {
            inputType: 'textBox',
            elementConfig: {
                type: 'text',
                placeholder: 'Pin Code',
                id: "pincode"
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
    }
    return customerControls;
}

export default getCustomerFormFields;