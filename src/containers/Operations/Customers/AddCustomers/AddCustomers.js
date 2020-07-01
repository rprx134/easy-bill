import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../../../../components/UI/BootstrapUI/Buttons/Button';
import { InputValidation } from '../../../../components/POJOs/Forms/FormGenerator/FormValidation/InputValidation';
import { formGenerator, getFormElements } from '../../../../components/POJOs/Forms/FormGenerator/FormGenerator';
import { addCustomer } from '../../../../redux/actionTypes/actionTypes';
import Alert from '../../../../components/UI/Modal/Alert/Alert';
import getCustomerFormFields from '../../../../components/POJOs/Forms/AddCustomerForm';

import '../../../../components/POJOs/Forms/Forms.css';
import './AddCustomers.css';

class AddCustomer extends Component {
    state = {
        customerControls: getCustomerFormFields(),
        formValidity: true,
        pageIdentifier: "formPage",
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.customerControls,
            [controlName]: {
                ...this.state.customerControls[controlName],
                value: event.target.value,
                valid: InputValidation(event.target.value, this.state.customerControls[controlName].validation),
                touched: true
            }
        };
        this.setState({ customerControls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        let payload = {};
        let id;
        let isFormValid = this.state.formValidity;
        getFormElements(this, "customerControls").forEach(formElement => {
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
        const formToRender = formGenerator(this, "customerControls");
        return (
            <React.Fragment>
                <div className="AddCustomer">
                    <form onSubmit={this.submitHandler}>
                        <h4>Add Customer</h4>
                        {formToRender}
                        <Button btnType="submit" btnVarient="primary" size="sm" block={false} btnTxt="ADD" btnID="addCustomer" />
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
        addCustomer
    }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCustomer));