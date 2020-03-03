import React, { Component, Fragment } from 'react';
import Product from '../../../components/Operations/Products/Product/Product';

class Products extends Component {

    state = {
        products: [
            {
                id: 1,
                name: 'Paint',
                description: 'This is paint for cars',
                uom: 'Liters',
                unitPrice: 1400,
            },
            {
                id: 2,
                name: 'Brake Pad',
                description: 'This is break pad for cars',
                uom: 'Quantity',
                unitPrice: 5000,
            },
            {
                id: 3,
                name: 'Paint',
                description: 'This is paint for cars',
                uom: 'Liters',
                unitPrice: 1400,
            },
            {
                id: 4,
                name: 'Brake Pad',
                description: 'This is break pad for cars',
                uom: 'Quantity',
                unitPrice: 5000,
            },
        ]
    }

    render() {
        const products = this.state.products.map(product => {
            return (
                <Product key={product.id}
                    name={product.name}
                    description={product.description}
                    uom={product.uom}
                    unitPrice={product.unitPrice}
                />
            );
        });
        return (
            <Fragment>
                {products}
            </Fragment >
        );
    }
}

export default Products;