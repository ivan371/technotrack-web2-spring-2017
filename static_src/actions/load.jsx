import cookie from 'react-cookie';

function loadres(bool, type) {
    return {
        type,
        isLoading: bool
    };
}

function loadSuccess(apiResponse, normilizer, type) {
    console.log(apiResponse);
    const result = normilizer(apiResponse);
    return {
        type,
        result,
    };
}

function loadError(type, id) {
    return {
        type,
        id,
    };
}

export function FetchData(url, types, normilizer, method, data, model, id) {
    let headers = null;
    let body = null;
    if (method == 'post' || method == 'put') {
      const csrftoken = cookie.load('csrftoken');
      headers = {
        "X-CSRFToken": csrftoken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      body = data;
    }
    console.log(types);
    console.log(model);
    return (dispatch) => {
        dispatch(loadres(true, types[0]));
        fetch(url, {
           credentials: "same-origin",
           method: method,
           headers: headers,
           body: body,
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loadres(false, types[0]));
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
              if (method == 'get') {
                  dispatch(loadSuccess(data.results, normilizer, types[1]))
              }
              else {
                if(model == 'like') {
                  dispatch(loadSuccess(data.target, normilizer, types[1]))
                }
                else {
                  dispatch(loadSuccess(data, normilizer, types[1]))
                }
              }
            })
            .catch(() => dispatch(loadError(types[2], id)))
            .catch(console.log);
    };
}
