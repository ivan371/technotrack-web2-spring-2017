export const LOAD_CHATS = 'LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = 'LOAD_CHATS_ERROR';
export const CHAT_OPEN = 'CHAT_OPEN';
export const CHAT_CLOSE = 'CHAT_CLOSE';
export const MESSAGE_CREATE = 'MESSAGE_CREATE';
export const MESSAGE_LOAD = 'MESSAGE_LOAD';
export const MESSAGE_LOAD_SUCCESS = 'MESSAGE_LOAD_SUCCESS';
export const MESSAGE_LOAD_ERROR = 'MESSAGE_LOAD_ERROR';
export const MESSAGE_PAGINATE = 'MESSAGE_PAGINATE';
export const CHAT_CREATE = 'CHAT_CREATE';
export const CHAT_PAGINATE = 'CHAT_PAGINATE';
export const CHATUSER_OPEN = 'CHATUSER_OPEN';
export const CHATUSER_CLOSE = 'CHATUSER_CLOSE';
export const CHATUSER_ADD = 'CHATUSER_ADD';
export const LOAD_CHATUSER = 'LOAD_CHATUSER';
export const LOAD_CHATUSER_ERROR = 'LOAD_CHATUSER';

import { chatNormalize, messageNormalize, simplemessageNormalize, simplechatNormalize, chatuseradd } from './../normilizers/chats';
import { post } from './../promises/post';
import cookie from 'react-cookie';
import { FetchData } from './load';


export function chatFetchData(url) {
    const types = [LOAD_CHATS, LOAD_CHATS_SUCCESS, LOAD_CHATS_ERROR, CHAT_PAGINATE];
    return FetchData(url, types, chatNormalize, 'get');
}


export function messageFetchData(url) {
    const types = [MESSAGE_LOAD, MESSAGE_LOAD_SUCCESS, MESSAGE_LOAD_ERROR, MESSAGE_PAGINATE];
    return FetchData(url, types, messageNormalize, 'get')
}

export function loadChats() {
  return {
    type: LOAD_CHATS,
  }
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

export function chatuserOpen() {
  return {
    type: CHATUSER_OPEN,
  }
}

export function chatuserClose() {
  return {
    type: CHATUSER_CLOSE,
  }
}

export function ChatUserAddFetchData(url, author, chat) {
    console.log(author, chat);
    const types = [LOAD_CHATUSER, CHATUSER_ADD, LOAD_CHATUSER_ERROR, CHAT_PAGINATE];
    return FetchData(url, types, chatuseradd, 'post', JSON.stringify({author, chat}));
}

export function createChatFetchData(url, name) {
    const types = [LOAD_CHATS, CHAT_CREATE, LOAD_CHATS_ERROR, CHAT_PAGINATE];
    return FetchData(url, types, simplechatNormalize, 'post', JSON.stringify({name}));
}

export function createMessageFetchData(url, chat, content) {
    const types = [MESSAGE_LOAD, MESSAGE_CREATE, LOAD_CHATS_ERROR, CHAT_PAGINATE];
    return FetchData(url, types, simplemessageNormalize, 'post', JSON.stringify({chat, content}));
}
