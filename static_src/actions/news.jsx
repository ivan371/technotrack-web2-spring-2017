export const LOAD_NEWS = 'LOAD_NEWS';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';
export const LOAD_NEWS_ERROR = 'LOAD_NEWS_ERROR';
import newsNormalize from './../normilizers/news';
import cookie from 'react-cookie';

export function loadNews(bool) {
    return {
        type: LOAD_NEWS,
        isLoading: bool
    };
}

export function loadNewsSuccess(apiResponse) {
    const result = newsNormalize(apiResponse);
    return {
        type: LOAD_NEWS_SUCCESS,
        result,
    };
}

export function loadNewsError(news) {
    return {
        type: LOAD_NEWS_ERROR,
        news,
    };
}


export function newsFetchData(url) {
    return (dispatch) => {
        dispatch(loadNews(true));
        fetch(url, {
           credentials: "same-origin",
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loadNews(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(loadNewsSuccess(data.results)))
            .catch(() => dispatch(loadNewsError(true)))
            .catch(console.log);
    };
}
