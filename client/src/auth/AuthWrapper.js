import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const wrapper = WrappedComponent =>
  class extends Component {

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    }

    render() {
      if (!this.props.isAuthenticated) {
        return (
          <Redirect to={{
            pathname: '/login',
          }} />
        );
      } else {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
  };

export const authWrapper = comp =>
  connect(state => ({ isAuthenticated: state.data.isAuthenticated }))(wrapper(comp));
