import React from 'react';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = ["InputElement"];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
    }

    switch (props.inputType) {
        case 'textBox':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'textArea':
            inputElement = <textarea className="form-control InputElement" rows="5" {...props.elementConfig} value={props.value} onChange={props.changed}></textarea>
            break;
        case 'select':
            inputElement = <select className="form-control InputElement" id={props.id} value={props.value} onChange={props.changed}>
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
                onChange={props.changed} />;
            break;

    }
    return (
        <div className={"Input"}>
            {inputElement}
        </div>
    );
}

export default Input;