import React, { Component } from 'react';

import Button from '../../components/UI/BootstrapUI/Buttons/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { InputValidation } from '../../components/POJOs/Forms/FormGenerator/FormValidation/InputValidation';
import Anchor from '../../components/UI/BootstrapUI/Anchor/Anchor';
import { formGenerator, getFormElements } from '../../components/POJOs/Forms/FormGenerator/FormGenerator';
import Alert from '../../components/UI/Modal/Alert/Alert';
import getAuthFormFields from '../../components/POJOs/Forms/LoginForm';
import '../../components/POJOs/Forms/Forms.css';
import { authenticateUser } from '../../redux/actionTypes/actionTypes';

class Auth extends Component {

    state = {
        authControls: getAuthFormFields(),
        formValidity: true,
        pageIdentifier: "formPage",
    }

    inputChangedHandler = (event, controlName) => {
        let validFormFlag = InputValidation(event.target.value, this.state.authControls[controlName].validation);
        const updatedControls = {
            ...this.state.authControls,
            [controlName]: {
                ...this.state.authControls[controlName],
                value: event.target.value,
                valid: validFormFlag,
                touched: true
            }
        };
        this.setState({ authControls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);*/

        let isFormValid = this.state.formValidity;
        getFormElements(this).forEach(formElement => {
            isFormValid = formElement.config.valid;
        });
        if (isFormValid) {
            const payload = {
                email: this.state.authControls.email.value,
                password: this.state.authControls.password.value,
            };
            this.props.authenticateUser(payload, this.props.history);
        } else {
            this.setState({ formValidity: isFormValid });
        }
    }

    resetFormValidity = () => {
        this.setState({ formValidity: true });
    }

    render() {
        const anchorStyles = {
            padding: 0,
            marginTop: 8,
            marginBottom: 8,
            textAlign: 'left',
            display: 'block',
        };
        return (
            <React.Fragment>
                <Container>
                    <Row className="forms">
                        <Col xl="4" md="6" sm="8">
                            <form onSubmit={this.submitHandler} noValidate>
                                <h4>Please sign in.</h4>
                                {formGenerator(this, "authControls")}
                                <Button btnType="submit" btnVarient="primary" size="lg" block={true} btnTxt="LOGIN" btnID="login" />
                                <Anchor
                                    url="#"
                                    ancTxt="Forgot your email or password?"
                                    aID="resetCred"
                                    style={anchorStyles}
                                />
                                <Anchor
                                    url="#"
                                    ancTxt="Register Now"
                                    aID="signup"
                                    style={anchorStyles}
                                />
                                {this.state.formValidity ? null : <Alert show={!this.state.formValidity} resetFormValidity={this.resetFormValidity} alertMsg="Please fill the required fields with valid content" />}
                            </form>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment >
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authenticateUser
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Auth));
