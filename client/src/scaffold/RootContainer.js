import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { authWrapper } from '../auth/AuthWrapper';
import Login from '../pages/Login';
import Verifying from '../pages/Verifying';
import Home from '../pages/Home';
import { getUserData } from '../auth/actions';

const RootContainerWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  padding: 10px;
`;

@connect(null, { getUserData })
class RootContainer extends Component {

  static propTypes = {
    getUserData: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (window.sessionStorage.getItem('token')) {
      const redirect = this.props.location.pathname;
      this.props.getUserData(
        () => {
          if (redirect !== this.props.location.pathname) {
            this.props.history.push(redirect);
          }
        },
      );
    }
  }

  render() {
    return (
      <RootContainerWrapper>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/home' component={authWrapper(Home)} />
          <Route path='/verifying' component={Verifying} />
          <Redirect from='/' to='/home' />
        </Switch>
      </RootContainerWrapper>
    );
  }
}

export default withRouter(RootContainer);
