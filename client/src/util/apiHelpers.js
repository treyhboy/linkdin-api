
import { CALL_API } from 'redux-api-middleware';

export const apiBuilder = (type, val) => ({
  request: `${type}/${val.toUpperCase()}_REQUEST`,
  success: `${type}/${val.toUpperCase()}_SUCCESS`,
  failure: `${type}/${val.toUpperCase()}_FAILURE`,
});

export const callApi = ({ endpoint, method, body, type, json, onSuccess, onFailure, nextAction, headers, meta }) =>
  async (dispatch) => {
    let data = body;
    if (json !== undefined) {
      data = JSON.stringify(json);
    }
    const actionResponse = await dispatch({
      [CALL_API]: {
        headers: headers || { 'Content-Type': 'application/json' },
        endpoint,
        method,
        body: data,
        types: [
          type.request,
          { type: type.success, meta },
          { type: type.failure, meta },
        ],
      },
    });

    if (actionResponse.type === type.success && onSuccess) {
      onSuccess(actionResponse.payload);
    }

    if (actionResponse.type === type.failure && onFailure) {
      onFailure(actionResponse.payload);
    }

    if (actionResponse.type === type.success && nextAction) {
      return dispatch(nextAction(actionResponse));
    }

    return actionResponse;
  };
