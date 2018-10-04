
import { callApi } from '../util/apiHelpers';

import * as AuthConstants from './constants';

export const getUserData = (onSuccess) => callApi({
  endpoint: '/api/linkedinData',
  method: 'GET',
  type: AuthConstants.GET_USER_DATA,
  onSuccess,
});

export const loginUser = (data, onSuccess) => callApi({
  endpoint: '/api/login',
  method: 'POST',
  json: data,
  type: AuthConstants.LOGIN_USER,
  onSuccess
});

export const signOut = () => ({
  type: AuthConstants.SIGN_OUT,
});
