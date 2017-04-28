export const LOAD_NEWS = 'LOAD_NEWS';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';
export const LOAD_NEWS_ERROR = 'LOAD_NEWS_ERROR';
export const NEWS_PAGINATE = 'NEWS_PAGINATE';
import {newsNormalize} from './../normilizers/news';
import cookie from 'react-cookie';
import { FetchData } from './load';

export function loadNews() {
    return {
        type: LOAD_NEWS,
    };
}

export function newsFetchData(url) {
    const types = [LOAD_NEWS, LOAD_NEWS_SUCCESS, LOAD_NEWS_ERROR, NEWS_PAGINATE];
    return FetchData(url, types, newsNormalize, 'get');
}
