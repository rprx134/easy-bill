import React, { Component } from 'react';

import Button from '../../components/UI/BootstrapUI/Buttons/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InputValidation } from '../../components/POJOs/Forms/FormGenerator/FormValidation/InputValidation';
import Anchor from '../../components/UI/BootstrapUI/Anchor/Anchor';
import { formGenerator,getFormElements } from '../../components/POJOs/Forms/FormGenerator/FormGenerator';
import Aux from '../../hoc/Aux/Aux';
import Alert from '../../components/UI/Modal/Alert/Alert';
import '../../components/POJOs/Forms/Forms.css';

class Auth extends Component {

    state = {
        controls: {
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
        },
        formValidity: true
    }


    inputChangedHandler = (event, controlName) => {
        let validFormFlag = InputValidation(event.target.value, this.state.controls[controlName].validation);
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: validFormFlag,
                touched: true
            }
        };
        this.setState({ controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);*/
        
        let isFormValid = this.state.formValidity;
        getFormElements(this).forEach(formElement => {
            isFormValid = formElement.config.valid;
        });
        if(isFormValid){
            this.props.history.push("/dashboard");
        }else{
            this.setState({formValidity: isFormValid});
        }
    }

    resetFormValidity = () => {
        this.setState({formValidity: true});   
    }

    render() {
        return (
            <Aux>
                <Container fluid>
                    <Row className="forms">
                        <Col xl="4" md="6" sm="8">
                            <form onSubmit={this.submitHandler} noValidate>
                                <h4>Please sign in.</h4>
                                {formGenerator(this)}
                                <Button btnType="submit" btnVarient="primary" size="lg" block={true} btnTxt="LOGIN" btnID="login" />
                                <Anchor url="#" ancTxt="Forgot your email or password?" aID="resetCred" />
                                <Anchor url="#" ancTxt="Register Now" aID="signup" />
                                {this.state.formValidity?null:<Alert show={!this.state.formValidity} resetFormValidity={this.resetFormValidity} alertMsg="Please fill the required fields with valid content"/>}
                            </form>
                        </Col>
                    </Row>
                </Container>
            </Aux>
        );
    }
}

export default Auth;