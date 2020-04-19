import React, { Component } from 'react';
import Button from '../../../../components/UI/BootstrapUI/Buttons/Button';
import { InputValidation } from '../../../../components/POJOs/Forms/FormGenerator/FormValidation/InputValidation';
import { formGenerator, getFormElements } from '../../../../components/POJOs/Forms/FormGenerator/FormGenerator';
import { addProduct } from '../../../../redux/actionTypes/actionTypes';
import { bindActionCreators } from 'redux';
import Alert from '../../../../components/UI/Modal/Alert/Alert';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import getProductFormFields from '../../../../components/POJOs/Forms/AddProductForm';
import '../../../../components/POJOs/Forms/Forms.css';
import './AddProduct.css';

class AddProduct extends Component {
    state = {
        productControls: getProductFormFields(),
        formValidity: true,
        pageIdentifier: "formPage"
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.productControls,
            [controlName]: {
                ...this.state.productControls[controlName],
                value: event.target.value,
                valid: InputValidation(event.target.value, this.state.productControls[controlName].validation),
                touched: true
            }
        };
        this.setState({ productControls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        let isFormValid = this.state.formValidity;
        let payload = {};
        let id;
        getFormElements(this, "productControls").forEach(formElement => {
            if (isFormValid) {
                isFormValid = formElement.config.valid;
            }
            switch (formElement.id) {
                case 'name':
                    payload = { ...payload, "name": formElement.config.value };
                    id = formElement.config.value;
                    break;
                case 'basePrice':
                    payload = { ...payload, "basePrice": formElement.config.value };
                    break;
                case 'sellingPrice':
                    payload = { ...payload, "sellingPrice": formElement.config.value };
                    break;
                default:
                    console.log('Error in form element id: ', formElement.id);
                    break;
            }
        });
        payload = { ...payload, "id": id };
        if (isFormValid) {
            this.props.addProduct(payload, this.props.history);
        } else {
            this.setState({ formValidity: isFormValid });
        }
    }

    resetFormValidity = () => {
        this.setState({ formValidity: true });
    }

    cancelHandler = () => {
        this.props.history.push('/dashboard/products/');
    }


    render() {
        const formToRender = formGenerator(this, "productControls");
        return (
            <React.Fragment>
                <div className="AddProduct">
                    <form onSubmit={this.submitHandler}>
                        <h4>Add Product</h4>
                        {formToRender}
                        <Button btnType="submit" btnVarient="primary" size="sm" block={false} btnTxt="ADD" btnID="addProduct" />
                        <Button btnType="button" btnVarient="secondary" size="sm" block={false} btnTxt="CANCEL" btnID="cancel" btnOnClick={this.cancelHandler} />
                        {this.state.formValidity ? null : <Alert show={!this.state.formValidity} resetFormValidity={this.resetFormValidity} alertMsg="Please fill the required fields with valid content" />}
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProduct
    }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));