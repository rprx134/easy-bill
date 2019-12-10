import React from 'react';
import Input from '../../../UI/Inputs/Input';

export const getFormElements = (obj) => {
    const formElementsArray = [];
    for (let key in obj.state.controls) {
        formElementsArray.push({
            id: key,
            config: obj.state.controls[key]
        });
    }
    return formElementsArray;
}

export const formGenerator = (obj) => {
    let form = getFormElements(obj).map(formElement => {
        return (
            <Input
                key={formElement.id}
                inputType={formElement.config.inputType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => obj.inputChangedHandler(event, formElement.id)} />
        );
    });
    return form;
}

