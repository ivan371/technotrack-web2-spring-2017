export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';
export const LOAD_USERS = 'LOAD_USERS';

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

export function loadUsersError(user) {
    return {
        type: LOAD_USERS_ERROR,
        user,
    };
}
