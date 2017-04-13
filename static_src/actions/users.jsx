export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';
export const LOAD_USER = 'LOAD_USER';

export function loadUser() {
    return {
        type: LOAD_USER,
    };
}

export function loadUserSuccess(apiResponse) {
    return {
        type: LOAD_USER_SUCCESS,
        apiResponse,
    };
}

export function loadUserError(user) {
    return {
        type: LOAD_USER_ERROR,
        user,
    };
}

export function loadUsers() {
    return {
        type: LOAD_USERS,
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
