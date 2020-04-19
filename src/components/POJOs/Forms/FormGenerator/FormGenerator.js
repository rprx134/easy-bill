import React from 'react';
import Input from '../../../UI/Inputs/Input';

export const getFormElements = (obj, formToRender) => {
    const formElementsArray = [];
    let controls = {};
    switch (formToRender) {
        case 'customerControls':
            controls = obj.state.customerControls;
            break;
        case 'productControls':
            controls = obj.state.productControls;
            break;
        case 'authControls':
            controls = obj.state.authControls;
            break;
        default:
            break;
    }
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }
    return formElementsArray;
}

export const formGenerator = (obj, formToRender) => {
    let form = getFormElements(obj, formToRender).map(formElement => {
        return (
            <div className={obj.state.pageIdentifier} key={formElement.id}>
                <Input
                    key={formElement.id}
                    inputType={formElement.config.inputType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => obj.inputChangedHandler(event, formElement.id, formToRender)}
                    inputClass={obj.state.pageIdentifier === "formPage" ? "FormElement" : "MiniFormElement"}
                    disabled={obj.state.disableInputs ? true : false} />
            </div>
        );
    });
    return form;
}

