export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';

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
