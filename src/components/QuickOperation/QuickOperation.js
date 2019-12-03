import React, { Component } from 'react';
import './QuickOperation.css';
import Input from '../UI/Input/Input';

class QuickOperation extends Component {
    state = {
        controls: {
            email: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'Add Invoice',
                        displayValue: 'Add Invoice'
                    },{
                        value: 'Add Bill',
                        displayValue: 'Add Bill'
                    }]
                },
                value: '',
                validation: {

                },
                valid: false,
                touched: false
            }
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        return (<div className="QuickOperation">{form}</div>);
    }
}

export default QuickOperation;