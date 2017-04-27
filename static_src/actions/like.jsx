export const LOAD_LIKE = 'LOAD_LIKE';
export const LOAD_LIKE_SUCCESS = 'LOAD_LIKE_SUCCESS';
export const LOAD_LIKE_ERROR = 'LOAD_LIKE_ERROR';
import cookie from 'react-cookie';
import { FetchData } from './load';
import { simplepostNormalize } from './../normilizers/post';


export function likeFetchData(url, id) {
    const types = [LOAD_LIKE, LOAD_LIKE_SUCCESS, LOAD_LIKE_ERROR];
    console.log(id);
    return FetchData(
      url,
      types,
      simplepostNormalize,
      'post',
      JSON.stringify({power: 1}),
      'like',
      id
    );
}
