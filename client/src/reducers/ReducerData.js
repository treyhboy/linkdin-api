
import * as AuthConstants from '../auth/constants';

const initialState = {
  isAuthenticated: false,
};

const reducerData = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthConstants.LOGIN_USER.success: {
      window.sessionStorage.setItem('token', payload.token);
      return {
        isAuthenticated: true,
      };
    }
    case AuthConstants.GET_USER_DATA.success: {
      return {
        user: payload.data,
        isAuthenticated: true,
      };
    }
    case AuthConstants.SIGN_OUT: {
      window.sessionStorage.setItem('token', null);
      return initialState;
    }
    default:
      return state;
  }
};

export default reducerData;
