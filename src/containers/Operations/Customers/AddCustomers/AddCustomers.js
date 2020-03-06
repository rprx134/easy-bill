import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Aux from '../../../../hoc/Aux/Aux';
import Button from '../../../../components/UI/BootstrapUI/Buttons/Button';
import { InputValidation } from '../../../../components/POJOs/Forms/FormGenerator/FormValidation/InputValidation';
import { formGenerator, getFormElements } from '../../../../components/POJOs/Forms/FormGenerator/FormGenerator';
import { addCustomer } from '../../../../redux/actionTypes/actionTypes';
import Alert from '../../../../components/UI/Modal/Alert/Alert';

import '../../../../components/POJOs/Forms/Forms.css';
import './AddCustomers.css';

class AddProduct extends Component {
    state = {
        controls: {
            name: {
                inputType: 'textBox',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Customer Name',
                    id: "name"
                },
                value: '',
                validation: {
                    required: false,
                    isEmail: false,
                },
                valid: false,
                touched: false
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
        },
        formValidity: true,
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: InputValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        let isFormValid = this.state.formValidity;
        let payload = {};
        let id;
        getFormElements(this).forEach(formElement => {
            if (isFormValid) {
                isFormValid = formElement.config.valid;
            }
            switch (formElement.id) {
                case 'name':
                    payload = { ...payload, "name": formElement.config.value };
                    break;
                case 'mobile':
                    payload = { ...payload, "mobile": formElement.config.value };
                    id = formElement.config.value;
                    break;
                case 'email':
                    payload = { ...payload, "email": formElement.config.value };
                    break;
                case 'gstin':
                    payload = { ...payload, "gstin": formElement.config.value };
                    break;
                case 'doorno':
                    payload = { ...payload, "addresses": { ...payload.addresses, "doorno": formElement.config.value } };
                    break;
                case 'line1':
                    payload = { ...payload, "addresses": { ...payload.addresses, "line1": formElement.config.value } };
                    break;
                case 'line2':
                    payload = { ...payload, "addresses": { ...payload.addresses, "line2": formElement.config.value } };
                    break;
                case 'city':
                    payload = { ...payload, "addresses": { ...payload.addresses, "city": formElement.config.value } };
                    break;
                case 'state':
                    payload = { ...payload, "addresses": { ...payload.addresses, "state": formElement.config.value } };
                    break;
                case 'country':
                    payload = { ...payload, "addresses": { ...payload.addresses, "country": formElement.config.value } };
                    break;
                case 'pincode':
                    payload = { ...payload, "addresses": { ...payload.addresses, "pincode": formElement.config.value } };
                    break;
                default:
                    console.log('Error in form element id: ', formElement.id);
                    break;
            }
        });
        payload = { ...payload, "id": id };
        if (isFormValid) {
            this.props.addCustomer(payload, this.props.history);
        } else {
            this.setState({ formValidity: isFormValid });
        }
    }

    resetFormValidity = () => {
        this.setState({ formValidity: true });
    }

    cancelHandler = () => {
        this.props.history.push('/dashboard/customers/');
    }
    render() {
        return (
            <Aux>
                <div className="AddCustomer">
                    <form onSubmit={this.submitHandler}>
                        <h4>Add Customer</h4>
                        {formGenerator(this)}
                        <Button btnType="submit" btnVarient="primary" size="sm" block={false} btnTxt="ADD" btnID="addProduct" />
                        <Button btnType="button" btnVarient="secondary" size="sm" block={false} btnTxt="CANCEL" btnID="cancel" btnOnClick={this.cancelHandler} />
                        {this.state.formValidity ? null : <Alert show={!this.state.formValidity} resetFormValidity={this.resetFormValidity} alertMsg="Please fill the required fields with valid content" />}
                    </form>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addCustomer
    }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));