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
