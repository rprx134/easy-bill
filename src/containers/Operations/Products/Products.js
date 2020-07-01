import React, { Component, Fragment } from 'react';
import Product from '../../../components/Operations/Products/Product/Product';
import { showSnackbar } from '../../../redux/actionTypes/actionTypes';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Products extends Component {

    componentDidMount() {
        if (this.props.products.length === 0) {
            this.props.showSnackbar({
                message: 'No products present! Add one to get started.',
                id: Date.now(),
                variant: "info",
            });
        }
    }

    render() {
        const { products } = this.props;

        const renderItem = products.map(product => {
            return (
                <Product key={product._id}
                    name={product.name}
                    sellingprice={product.sellingprice}
                />
            );
        });
        return (
            <Fragment>
                {renderItem}
            </Fragment >
        );
    }
}

const mapStateToProps = state => ({
    products: state.products,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showSnackbar
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));