import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
class ShowLoader extends Component {
    render() {
        return (
            <Loader
                type="MutatingDots"
                color="#007bff"
                height={100}
                width={100}
                secondaryColor="#007bff"
                style={{ position: "fixed", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
        );
    }
}
export default ShowLoader;