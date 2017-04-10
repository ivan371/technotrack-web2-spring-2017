export const LOAD_CHATS = 'LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = 'LOAD_CHATS_ERROR';
export const CHAT_OPEN = 'CHAT_OPEN';
export const CHAT_CLOSE = 'CHAT_CLOSE';


export function loadChats() {
    return {
        type: LOAD_CHATS,
    };
}

export function loadChatsSuccess(apiResponse) {
    return {
        type: LOAD_CHATS_SUCCESS,
        apiResponse,
    };
}

export function loadChatsError(posts) {
    return {
        type: LOAD_CHATS_ERROR,
        posts,
    };
}

export function chatOpen(id) {
  return {
    type: CHAT_OPEN,
    id,
  }
}

export function chatClose() {
  return {
    type: CHAT_CLOSE,
  }
}
