export const LOAD_NEWS = 'LOAD_NEWS';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';
export const LOAD_NEWS_ERROR = 'LOAD_NEWS_ERROR';
import {newsNormalize} from './../normilizers/news';
import cookie from 'react-cookie';
import { FetchData } from './load';

export function loadNews(bool) {
    return {
        type: LOAD_NEWS,
        isLoading: bool
    };
}

export function loadNewsSuccess(apiResponse) {
    console.log('here', apiResponse);
    console.log('after', newsNormalize(apiResponse));
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
    const types = [LOAD_NEWS, LOAD_NEWS_SUCCESS, LOAD_NEWS_ERROR];
    return FetchData(url, types, newsNormalize, 'get');
}

export function getnew(type, target) {
  
}
