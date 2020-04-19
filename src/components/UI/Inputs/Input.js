import React from 'react';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [props.inputClass];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
    }

    switch (props.inputType) {
        case 'textBox':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                disabled={props.disabled} />;
            break;
        case 'textArea':
            inputElement = <textarea className="form-control InputElement" rows="5" {...props.elementConfig} value={props.value} onChange={props.changed} disabled={props.disabled} ></textarea>
            break;
        case 'select':
            inputElement = <select className="form-control InputElement" id={props.id} value={props.value} onChange={props.changed} disabled={props.disabled} >
                {
                    props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))
                }
            </select>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} disabled={props.disabled} />;
            break;

    }
    return (
        <React.Fragment>
            {inputElement}
        </React.Fragment>
    );
}

export default Input;