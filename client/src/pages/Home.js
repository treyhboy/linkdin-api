import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as R from 'ramda';

import { signOut } from '../auth/actions';

import LoadingAnimation from './components/LoadingAnimation';

const HomeWrapper = styled.div`
  background-color: white;
  box-shadow: 1px 1px 1px 1px #C9C9C9;
  max-width: 500px;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 16px;
  opacity: 0.7;
`;

const SignOutButton = styled.button`
  border: none;
  color: #0073b1;
  cursor: pointer;
  font-size: 12px;
  outline: none;
  text-decoration: underline;
`;

const DataItem = styled.div`
  width: 50%;
  padding: 10px;
  background-color: ${props => props.isActive ? '#cce6ff' : 'white'}
`;

const Label = styled.div`
  line-height: 15px;
  font-size: 11px;
  opacity: 0.6;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchWrapper = styled.div`
  height: 35px;
  padding: 0 15px;
  display: flex;
  align-items: items;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 25px;
  border-radius: 12px;
  border: 1px solid #B8B8B8;
  padding: 0 10px;
  outline: none;
`;

@connect(
  (state) => ({ user: state.data.user }),
  { signOut }
)
class Home extends Component {

  static propTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func.isRequired,
  }

  state = {
    searchText: '',
  }

  renderDataItem = (item) => {
    const value = this.props.user[item.key];
    const { searchText } = this.state;
    const isActive = `${value || ''}`.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 && searchText !== '';
    return (
      <DataItem key={item.key} isActive={isActive}>
        <Label>{item.label}</Label>
        <Value>{value}</Value>
      </DataItem>
    );
  }

  render() {
    const { user } = this.props;
    const data = [
      { label: 'First Name', key: 'firstName' },
      { label: 'Last Name', key: 'lastName' },
      { label: 'Headline', key: 'headline' },
      { label: 'Number of Connections', key: 'numConnections' },
    ];
    return (
      <HomeWrapper>
        <Header>
          <Title>Your Profile Information</Title>
          <SignOutButton onClick={this.props.signOut}>Sign out</SignOutButton>
        </Header>
        <SearchWrapper>
          <SearchInput
            placeholder='Search...'
            value={this.state.searchText}
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
        </SearchWrapper>
        <Content>
          {!R.isNil(user) && data.map(this.renderDataItem)}
        </Content>
      </HomeWrapper>
    );
  }
}

export default Home;
