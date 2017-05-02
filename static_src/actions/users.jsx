export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';
export const LOAD_USER = 'LOAD_USER';
export const USERS_PAGINATE = 'USERS_PAGINATE';
export const USER_PAGINATE = 'USER_PAGINATE';
export const MODAL_USER = 'MODAL_USER';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const PROFILE_CHANGE = 'PROFILE_CHANGE';
export const LOAD_PERSON_SUCCESS = 'LOAD_PERSON_SUCCESS';
import cookie from 'react-cookie';
import { FetchData } from './load';
import { userNormalize, simpleuserNormalize } from './../normilizers/users';

function opt(a) {
  return a;
}

export function loadUser(bool) {
    return {
        type: LOAD_USER,
        bool
    };
}

export function loadUserSuccess(apiResponse) {
    return {
        type: LOAD_USER_SUCCESS,
        apiResponse,
    };
}

export function modalUser() {
    return {
      type: MODAL_USER,
    };
}
export function modalClose() {
  return {
    type: MODAL_CLOSE,
  }
}

export function loadUserError(user) {
    return {
        type: LOAD_USER_ERROR,
        user,
    };
}

export function loadUsers(bool) {
    return {
        type: LOAD_USERS,
        bool
    };
}

export function loadUsersSuccess(apiResponse) {
    return {
        type: LOAD_USERS_SUCCESS,
        apiResponse,
    };
}

export function loadUsersError(users) {
    return {
        type: LOAD_USERS_ERROR,
        users,
    };
}

export function usersFetchData(url) {
    const types = [LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR, USERS_PAGINATE];
    return FetchData(url, types, userNormalize, 'get');
}
export function userFetchData(url) {
    const types = [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR, USER_PAGINATE];
    return FetchData(url, types, userNormalize, 'get');
}

export function personFetchData(url) {
    const types = [LOAD_USER, LOAD_PERSON_SUCCESS, LOAD_USER_ERROR, USER_PAGINATE];
    return FetchData(url, types, simpleuserNormalize, 'get', '', 'person');
}

export function updateProfileResult(apiResponse) {
  return {
    type: PROFILE_CHANGE,
    apiResponse,
  }
}


export function updateProfileFetchData(url, id, data) {
    console.log(data);
    return (dispatch) => {
        const csrftoken = cookie.load('csrftoken');
        fetch('/api/users/' + id + '/', {
          method: 'put',
          credentials: "same-origin",
          body: JSON.stringify(data),
          headers: {
            "X-CSRFToken": csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((response) =>  dispatch(updateProfileResult(response)))
        .catch(console.log);
      }
}
