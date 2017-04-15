export const LOAD_CHATS = 'LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = 'LOAD_CHATS_ERROR';
export const CHAT_OPEN = 'CHAT_OPEN';
export const CHAT_CLOSE = 'CHAT_CLOSE';
export const MESSAGE_CREATE = 'MESSAGE_CREATE';
import { chatNormalize, messageNormalize } from './../normilizers/chats';
import { post } from './../promises/post';

export function loadChats() {
    return {
        type: LOAD_CHATS,
    };
}

export function loadChatsSuccess(apiResponse) {
    const result = chatNormalize(apiResponse);
    console.log(result);
    return {
        type: LOAD_CHATS_SUCCESS,
        result,
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

export function messageCreate(chat, message) {
  console.log(chat);
  post('/api/messages/', {'chat': chat, 'content': message});
  // const result = {
  //   chat: {0: {id: 0, title, content, author: 0}},
  //   message: {0: 0},
  // };
  // console.log(result);
  return {
    type: MESSAGE_CREATE,
    // result,
  }
}
