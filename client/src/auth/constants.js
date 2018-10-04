import { apiBuilder } from '../util/apiHelpers';

export const LOGIN_USER = apiBuilder('auth', 'LOGIN_USER');
export const GET_USER_DATA = apiBuilder('auth', 'GET_USER_DATA');
export const SIGN_OUT = 'auth/SIGN_OUT';
