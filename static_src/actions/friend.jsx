export const LOAD_FRIEND_SUCCESS = 'LOAD_FRIEND_SUCCESS';
export const LOAD_FRIEND_ERROR = 'LOAD_FRIEND_ERROR';
export const LOAD_FRIEND = 'LOAD_FRIEND';
export const FRIEND_PAGINATE = 'FRIEND_PAGINATE';
import { FetchData } from './load';
import { friendNormalize } from './../normilizers/friend';

export function usersFetchData(url) {
    const types = [
      LOAD_FRIEND, LOAD_FRIEND_SUCCESS, LOAD_FRIEND_ERROR, FRIEND_PAGINATE
    ];
    return FetchData(url, types, friendNormalize, 'get');
}
