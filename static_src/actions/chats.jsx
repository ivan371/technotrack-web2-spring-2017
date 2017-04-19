export const LOAD_CHATS = 'LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = 'LOAD_CHATS_ERROR';
export const CHAT_OPEN = 'CHAT_OPEN';
export const CHAT_CLOSE = 'CHAT_CLOSE';
export const MESSAGE_CREATE = 'MESSAGE_CREATE';
export const CHAT_CREATE = 'CHAT_CREATE';
export const CHAT_CREATEL = 'CHAT_CREATEL';
import { chatNormalize, messageNormalize } from './../normilizers/chats';
import { post } from './../promises/post';
import cookie from 'react-cookie';

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

export function creatChatResult(result) {
  console.log(result);
  return {
    type: CHAT_CREATE,
    result,
  }
}

export function createChatFetchData(url, name) {
    return (dispatch) => {
        const csrftoken = cookie.load('csrftoken');
        fetch('/api/chats/', {
          method: 'post',
          credentials: "same-origin",
          body: JSON.stringify({name}),
          headers: {
            "X-CSRFToken": csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((response) =>  dispatch(creatChatResult(response)))
        .catch(console.log);
      }
}


export function messageCreate(chat, message) {
  console.log(chat);
  post('/api/messages/', {'chat': chat, 'content': message});
  return {
    type: MESSAGE_CREATE,
    // result,
  }
}
