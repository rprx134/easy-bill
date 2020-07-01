/* eslint no-console:0 */
import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';
import React from 'react';
import Col from 'react-bootstrap/Col';

class BagDetailsToggle extends React.Component {
    state = {
        quantityValue: 0,
        sellingprice: this.props.sellingprice,
        name: this.props.name
    };
    quantityOnChange = (value) => {
        if (Number.isInteger(value) && value <= 100) {
            this.setState({ quantityValue: value }, () => {
                this.props.addToBag(this.props.id, this.state.quantityValue, this.state.sellingprice, this.state.name);
            });
        }
    }

    sellingPriceOnChange = (value) => {
        if (!isNaN(value) && value >= 0) {
            this.setState({ sellingprice: value }, () => {
                this.props.addToBag(this.props.id, this.state.quantityValue, this.state.sellingprice, this.state.name);
            });
        }
    }

    render() {
        const quantity = this.props.quantityInBag ? this.props.quantityInBag : this.state.quantityValue;
        const sellingPrice = this.props.sellingPriceInBag ? this.props.sellingPriceInBag : this.state.sellingprice;
        return (
            <React.Fragment>
                <Col xs={6} lg={6}>
                    <InputNumber
                        aria-label="Product Quantity"
                        min={0}
                        max={100}
                        style={{ width: 75 }}
                        value={quantity}
                        onChange={this.quantityOnChange}
                    />
                </Col>
                <Col xs={6} lg={6}>
                    <InputNumber
                        aria-label="Product Selling Price"
                        min={0}
                        style={{ width: 75 }}
                        value={sellingPrice}
                        onChange={this.sellingPriceOnChange}
                    />
                </Col>
            </React.Fragment>
        );
    }
}

export default BagDetailsToggle;