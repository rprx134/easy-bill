import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { showSnackbar } from '../../redux/actionTypes/actionTypes';
import { dismissSnackbar } from '../../redux/actionTypes/actionTypes';
import SnackbarContentWrapper from '../../components/UI/MaterialUI/Alerts/SnackbarContentWrapper';
import { Snackbar } from '@material-ui/core';

class SnackbarProvider extends PureComponent {
  state = {
    open: false,
    message: null,
    variant: 'success',
    extraProps: null,
    action: null
  }

  direction = {
    vertical: 'bottom',
    horizontal: 'right'
  };

  getChildContext() {
    return {
      snackbar: {
        show: this.props.show
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.snackbar !== prevProps.snackbar) {
      if (this.props.snackbar) {
        if (this.state.open) {
          this.setState({ open: false })
        } else {
          this.processQueue()
        }
      }
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    this.setState({ open: false, handleAction: null })
  }

  handleExited = () => {
    this.processQueue()
  }

  handleActionClick = () => {
    this.handleClose()
    //this.state.handleAction()
  }

  processQueue = () => {
    if (this.props.snackbar) {
      const { message, action, handleAction, variant } = this.props.snackbar;
      const extraProps = {
        ...this.state.extraProps,
        ...this.props.snackbar.extraProps
      }

      this.setState({ open: true, message, action, handleAction, variant, extraProps })
      this.props.dismiss(this.props.snackbar.id)
    }
  }

  render() {
    const { children, SnackbarProps = {} } = this.props;
    const { /*action,*/ message, variant, extraProps, open } = this.state;

    if (extraProps && extraProps.direction) {
      this.direction = extraProps.direction;
    }

    return (
      <React.Fragment>
        {children}
        <Snackbar {...SnackbarProps}
          anchorOrigin={this.direction}
          open={open}
          onClose={this.handleClose}
          onExited={this.handleExited}>
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant={variant || 'success'}
            message={message || ''} />
        </Snackbar>
      </React.Fragment>
    )
  }
}

SnackbarProvider.childContextTypes = {
  snackbar: PropTypes.object
}

SnackbarProvider.propTypes = {
  children: PropTypes.node,
  SnackbarProps: PropTypes.object
}

const mapStateToProps = state => ({
  snackbar: state.snackbar.queue[0] || null
});

const mapDispatchToProps = dispatch => ({
  show: (message, variant, extraProps, action, handleAction) => dispatch(showSnackbar({ message, variant, extraProps, action, handleAction })),
  dismiss: (id) => dispatch(dismissSnackbar({ id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarProvider)