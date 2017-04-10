export const LOAD_FRIEND_SUCCESS = 'LOAD_FRIEND_SUCCESS';
export const LOAD_FRIEND_ERROR = 'LOAD_FRIEND_ERROR';
export const LOAD_FRIEND = 'LOAD_FRIEND';

export function loadFriend() {
    return {
        type: LOAD_FRIEND,
    };
}

export function loadFriendSuccess(apiResponse) {
    return {
        type: LOAD_FRIEND_SUCCESS,
        apiResponse,
    };
}

export function loadFriendError(user) {
    return {
        type: LOAD_FRIEND_ERROR,
        user,
    };
}
