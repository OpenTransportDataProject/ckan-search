import fetchJSON from '../utils/http';


export default function callAPI({
  type,
  method = 'get',
  endpoint,
  body,
  files,
  meta,
  isRequestNeeded = () => true,
  headers = {},
  timeout,
  json
}) {
  return (dispatch, getState) => {
    if (isRequestNeeded && isRequestNeeded(getState()) === false) {
      return Promise.resolve();
    }

    const options = {
      method,
      body,
      json,
      files,
      timeout,
      headers,
    };

    const fullUrl = (~endpoint.indexOf('https://') || ~endpoint.indexOf('http://'));
    const apiUrl = fullUrl ? endpoint : `api/${endpoint}`;

    return dispatch(({
      type,
      meta: {
        ...meta,
        apiUrl,
        body,
      },
      payload: fetchJSON(apiUrl, options)
        .then(({ json, response }) => ({
          response,
          json
        })),
    }));
  };
}
