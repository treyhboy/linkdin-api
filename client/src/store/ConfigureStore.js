import { apiMiddleware, CALL_API } from 'redux-api-middleware';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './RootReducer';

export const injectToken = () => (next) => (action) => {
  const callApi = action[CALL_API];
  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    callApi.headers = {
      ...callApi.headers,
      'x-access-token': window.sessionStorage.getItem('token') || '',
    };
  }

  // Pass the FSA to the next action.
  return next(action);
};

export default function configureStore() {
  const createStoreWithDevTools = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore);
  const createStoreWithMiddleware = applyMiddleware(injectToken, thunkMiddleware, apiMiddleware)(createStoreWithDevTools);
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}
