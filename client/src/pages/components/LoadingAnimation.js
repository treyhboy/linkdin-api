import React, { Component } from 'react';
import styled from 'styled-components';

// adapted from https://loading.io/css/
const LoadingAnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  background-color: #0073b1;
`;

const Text = styled.div`
  color: white;
  font-size: 14px;
  text-align: center;
  width: 100%;
  opacity: 0.9;
`;

const LoadingAnimation = styled.div`
  height: 64px;
  margin: auto;
  position: relative;
  width: 64px;

  & > div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & > div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  & > div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & > div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & > div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
`;

const LoadingAnimationComponent = ({ text }) => (
  <LoadingAnimationWrapper>
    <LoadingAnimation>
      <div></div><div></div><div></div><div></div>
    </LoadingAnimation>
    <Text>{text}</Text>
  </LoadingAnimationWrapper>
);

export default LoadingAnimationComponent;
