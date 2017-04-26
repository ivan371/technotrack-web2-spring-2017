import cookie from 'react-cookie';

function loadres(bool, type) {
    return {
        type,
        isLoading: bool
    };
}

function loadSuccess(apiResponse, normilizer, type) {
    const result = normilizer(apiResponse);
    return {
        type,
        result,
    };
}

function loadError(type) {
    return {
        type,
    };
}

export function FetchData(url, types, normilizer) {
    return (dispatch) => {
        dispatch(loadres(true, types[0]));
        fetch(url, {
           credentials: "same-origin",
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loadres(false, types[0]));
                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(loadSuccess(data.results, normilizer, types[1])))
            .catch(() => dispatch(loadError(true, types[2])))
            .catch(console.log);
    };
}
