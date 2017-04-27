export const LOAD_CHATS = 'LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = 'LOAD_CHATS_ERROR';
export const CHAT_OPEN = 'CHAT_OPEN';
export const CHAT_CLOSE = 'CHAT_CLOSE';
export const MESSAGE_CREATE = 'MESSAGE_CREATE';
export const CHAT_CREATE = 'CHAT_CREATE';
import { chatNormalize, messageNormalize, simplechatNormalize } from './../normilizers/chats';
import { post } from './../promises/post';
import cookie from 'react-cookie';
import { FetchData } from './load';

export function chatFetchData(url) {
    const types = [LOAD_CHATS, LOAD_CHATS_SUCCESS, LOAD_CHATS_ERROR];
    return FetchData(url, types, chatNormalize, 'get');
}

// export function loadChats() {
//     return {
//         type: LOAD_CHATS,
//     };
// }
//
// export function loadChatsSuccess(apiResponse) {
//     const result = chatNormalize(apiResponse);
//     console.log(result);
//     return {
//         type: LOAD_CHATS_SUCCESS,
//         result,
//     };
// }
//
// export function loadChatsError(posts) {
//     return {
//         type: LOAD_CHATS_ERROR,
//         posts,
//     };
// }

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

// export function creatChatResult(result) {
//   console.log(result);
//   return {
//     type: CHAT_CREATE,
//     result,
//   }
// }

export function createChatFetchData(url, name) {
    const types = [LOAD_CHATS, CHAT_CREATE, LOAD_CHATS_ERROR];
    return FetchData(url, types, simplechatNormalize, 'post', JSON.stringify({name}));
    // return (dispatch) => {
    //     const csrftoken = cookie.load('csrftoken');
    //     fetch('/api/chats/', {
    //       method: 'post',
    //       credentials: "same-origin",
    //       body: JSON.stringify({name}),
    //       headers: {
    //         "X-CSRFToken": csrftoken,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then((response) => response.json())
    //     .then((response) =>  dispatch(creatChatResult(response)))
    //     .catch(console.log);
    //   }
}

export function createMessageFetchData(url, chat, content) {
    const types = [LOAD_CHATS, MESSAGE_CREATE, LOAD_CHATS_ERROR];
    return FetchData(url, types, messageNormalize, 'post', JSON.stringify({chat, content}));
    // return (dispatch) => {
    //     const csrftoken = cookie.load('csrftoken');
    //     fetch('/api/messages/', {
    //       method: 'post',
    //       credentials: "same-origin",
    //       body: JSON.stringify({chat, content}),
    //       headers: {
    //         "X-CSRFToken": csrftoken,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then((response) => response.json())
    //     .then((response) =>  dispatch(messageCreate(response)))
    //     .catch(console.log);
    //   }
}


// export function messageCreate(apiResponse) {
//   const result = messageNormalize(apiResponse);
//   // console.log(chat);
//   // post('/api/messages/', {'chat': chat, 'content': message});
//   return {
//     type: MESSAGE_CREATE,
//     result,
//   }
// }
