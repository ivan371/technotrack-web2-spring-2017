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

export function createChatFetchData(url, name) {
    const types = [LOAD_CHATS, CHAT_CREATE, LOAD_CHATS_ERROR];
    return FetchData(url, types, simplechatNormalize, 'post', JSON.stringify({name}));
}

export function createMessageFetchData(url, chat, content) {
    const types = [LOAD_CHATS, MESSAGE_CREATE, LOAD_CHATS_ERROR];
    return FetchData(url, types, messageNormalize, 'post', JSON.stringify({chat, content}));
}
