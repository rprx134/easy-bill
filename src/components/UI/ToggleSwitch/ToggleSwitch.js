import React, { Component } from "react";
import Switch from "react-switch";
import './ToggleSwitch.css';

class ToggleSwitch extends Component {
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
        this.props.toggleSwitch(checked);
    }

    render() {
        return (
            <label className="invoice-page-cutomer-toggle">
                <span>{this.props.toggleLabel}</span>
                <div className="toggle-spacer">
                    <Switch
                        onChange={this.handleChange}
                        checked={this.state.checked}
                        onColor="#329DD6"
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={45}
                    />
                </div>
            </label>
        );
    }
}

export default ToggleSwitch;