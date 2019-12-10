import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import Button from '../../../../components/BootstrapUI/Buttons/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InputValidation } from '../../../../components/POJOs/Forms/FormGenerator/FormValidation/InputValidation';
import { formGenerator } from '../../../../components/POJOs/Forms/FormGenerator/FormGenerator';

import '../../../../components/POJOs/Forms/Forms.css';

class AddProduct extends Component {
    state = {
        controls: {
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
                touched: false
            },
            description: {
                inputType: 'textArea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Description',
                    id: "productDescription"
                },
                value: '',
                validation: {
                    required: false,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            uom: {
                inputType: 'select',
                elementConfig: {
                    type: 'text',
                    placeholder: 'UOM',
                    id: "uom",
                    options: [
                        {
                            value: "quantity",
                            displayValue: "Quantity"
                        },
                        {
                            value: "meters",
                            displayValue: "Meters"
                        }
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },
            unitPrice: {
                inputType: 'textBox',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Unit Price in Rupees',
                    id: "price"
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
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);*/
        this.props.history.push('/dashboard');
    }


    render() {
        console.log("hi");
        return (
            <Aux>
                
                            <form onSubmit={this.submitHandler}>
                                <h4>Add Product</h4>
                                {formGenerator(this)}
                                <Button btnType="submit" btnVarient="primary" size="sm" block={false} btnTxt="ADD" btnID="addProduct" />
                                <Button btnType="button" btnVarient="secondary" size="sm" block={false} btnTxt="CANCEL" btnID="cancel" />
                            </form>
                       
            </Aux>
        );
    }
}

export default AddProduct;