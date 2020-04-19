const getAuthFormFields = () => {
    const loginControls = {
        email: {
            inputType: 'textBox',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address',
                id: 'loginEmail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            inputType: 'textBox',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
                id: 'loginPassword'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    }
    return loginControls;
}
export default getAuthFormFields;