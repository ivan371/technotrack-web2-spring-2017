export const LOAD_CHATS = 'LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = 'LOAD_CHATS_ERROR';
export const CHAT_OPEN = 'CHAT_OPEN';
export const CHAT_CLOSE = 'CHAT_CLOSE';
export const MESSAGE_CREATE = 'MESSAGE_CREATE';
export const CHAT_CREATE = 'CHAT_CREATE';
export const CHAT_PAGINATE = 'CHAT_PAGINATE';
export const CHATUSER_OPEN = 'CHATUSER_OPEN';
export const CHATUSER_CLOSE = 'CHATUSER_CLOSE';
import { chatNormalize, messageNormalize, simplechatNormalize } from './../normilizers/chats';
import { post } from './../promises/post';
import cookie from 'react-cookie';
import { FetchData } from './load';


export function chatFetchData(url) {
    const types = [LOAD_CHATS, LOAD_CHATS_SUCCESS, LOAD_CHATS_ERROR, CHAT_PAGINATE];
    return FetchData(url, types, chatNormalize, 'get');
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

export function createChatFetchData(url, name) {
    const types = [LOAD_CHATS, CHAT_CREATE, LOAD_CHATS_ERROR, CHAT_PAGINATE];
    return FetchData(url, types, simplechatNormalize, 'post', JSON.stringify({name}));
}

export function createMessageFetchData(url, chat, content) {
    const types = [LOAD_CHATS, MESSAGE_CREATE, LOAD_CHATS_ERROR, CHAT_PAGINATE];
    return FetchData(url, types, messageNormalize, 'post', JSON.stringify({chat, content}));
}
