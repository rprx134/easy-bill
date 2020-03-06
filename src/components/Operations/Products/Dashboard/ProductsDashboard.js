import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from '../../../UI/BootstrapUI/Buttons/Button';
import Products from '../../../../containers/Operations/Products/Products';
import AddProduct from '../../../../containers/Operations/Products/AddProduct/AddProduct';
import { Switch, Route, } from 'react-router-dom';

import './ProductsDashboard.css';

const productsDashboard = (props) => {
    const addNewHandler = () => {
        props.history.push("/dashboard/products/addnew/");
    }
    return (
        <div className="ProductsDashboard">
                <Row>
                    <Button btnVarient="outline-dark ml-auto mr-3" btnSize="sm" block={false} btnType="button" btnID="addNewProduct" btnOnClick={addNewHandler} btnTxt="Add Prodcut" />
                </Row>
                <Row>
                    <Switch>
                        <Route
                            key="products"
                            exact path="/dashboard/products/"
                            component={Products}
                        />
                        <Route
                            key="addProduct"
                            exact path="/dashboard/products/addnew/"
                            component={AddProduct}
                        />
                    </Switch>
                </Row>
        </div>
    );
}

export default productsDashboard;