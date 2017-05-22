export const LOAD_GROUPS = 'LOAD_GROUPS';
export const LOAD_GROUPS_SUCCESS = 'LOAD_GROUPS_SUCCESS';
export const LOAD_GROUPS_ERROR = 'LOAD_GROUPS_ERROR';
export const POSTGROUP_CREATE = 'POSTGROUP_CREATE';
export const POSTGROUP_LOAD = 'POSTGROUP_LOAD';
export const POSTGROUP_LOAD_SUCCESS = 'POSTGROUP_LOAD_SUCCESS';
export const POSTGROUP_LOAD_ERROR = 'POSTGROUP_LOAD_ERROR';
export const POSTGROUP_PAGINATE = 'POSTGROUP_PAGINATE';
export const GROUPS_CREATE = 'GROUPS_CREATE';
export const GROUPS_PAGINATE = 'GROUPS_PAGINATE';
export const GROUPUSER_OPEN = 'GROUPUSER_OPEN';
export const GROUPUSER_CLOSE = 'GROUPUSER_CLOSE';
export const GROUPUSER_ADD = 'GROUPUSER_ADD';
export const LOAD_GROUPUSER = 'LOAD_GROUPUSER';
export const LOAD_GROUPUSER_ERROR = 'LOAD_GROUPUSER';

// import { chatNormalize, messageNormalize, simplemessageNormalize, simplechatNormalize, chatuseradd } from './../normilizers/chats';
import { groupNormalize, simplegroupNormalize } from './../normilizers/groups';
import { FetchData } from './load';


export function groupFetchData(url) {
    const types = [LOAD_GROUPS, LOAD_GROUPS_SUCCESS, LOAD_GROUPS_ERROR, GROUPS_PAGINATE];
    return FetchData(url, types, groupNormalize, 'get');
}

//
// export function messageFetchData(url) {
//     const types = [MESSAGE_LOAD, MESSAGE_LOAD_SUCCESS, MESSAGE_LOAD_ERROR, MESSAGE_PAGINATE];
//     return FetchData(url, types, messageNormalize, 'get')
// }
//
export function loadGroups() {
  return {
    type: LOAD_GROUPS,
  }
}
//
// export function chatOpen(id) {
//   return {
//     type: CHAT_OPEN,
//     id,
//   }
// }
//
// export function chatClose() {
//   return {
//     type: CHAT_CLOSE,
//   }
// }
//
// export function chatuserOpen() {
//   return {
//     type: CHATUSER_OPEN,
//   }
// }
//
// export function chatuserClose() {
//   return {
//     type: CHATUSER_CLOSE,
//   }
// }
//
// export function ChatUserAddFetchData(url, author, chat) {
//     console.log(author, chat);
//     const types = [LOAD_CHATUSER, CHATUSER_ADD, LOAD_CHATUSER_ERROR, CHAT_PAGINATE];
//     return FetchData(url, types, chatuseradd, 'post', JSON.stringify({author, chat}));
// }
//
export function createGroupFetchData(url, name) {
    const types = [LOAD_GROUPS, GROUPS_CREATE, LOAD_GROUPS_ERROR, GROUPS_PAGINATE];
    return FetchData(url, types, simplegroupNormalize, 'post', JSON.stringify({name}));
}
//
// export function createMessageFetchData(url, chat, content) {
//     const types = [MESSAGE_LOAD, MESSAGE_CREATE, LOAD_CHATS_ERROR, CHAT_PAGINATE];
//     return FetchData(url, types, simplemessageNormalize, 'post', JSON.stringify({chat, content}));
// }
