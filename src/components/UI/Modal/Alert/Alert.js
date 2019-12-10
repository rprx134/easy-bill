import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './Alert.css';

class ModalExample extends Component {
    state = {
        modelShow: this.props.show
    }
    handleClose = () => {
        this.setState({ modelShow: false });
        this.props.resetFormValidity();
    }
    render() {
        return (
            <Modal
                size="sm"
                show={this.state.modelShow}
                onHide={() => this.handleClose()}
                aria-labelledby="alertBox">
                <Modal.Header closeButton>
                    <Modal.Title>Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.alertMsg}</Modal.Body>
            </Modal>
        );
    }
}
export default ModalExample;