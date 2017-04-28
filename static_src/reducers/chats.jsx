import {
  LOAD_CHATS,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_ERROR,
  CHAT_OPEN,
  CHAT_CLOSE,
  CHAT_CREATE,
  MESSAGE_CREATE} from './../actions/chats';
import {
  LOAD_NEWS_SUCCESS
} from './../actions/news';
import update from 'react-addons-update';
import { chatNormalize, messageNormalize } from './../normilizers/chats';

const inititalStore = {
    chatList: [],
    chats: {},
    isLoading: false,
    chat: null,
    messageList: [],
    messages: {},
    chatopen: false,
    count: null,
};


export default function router (store = inititalStore, action) {
    let id = 0;
    let result = {};
    if (action.hasOwnProperty('result')) {
      if (action.result.hasOwnProperty('entities')){
        if (action.result.entities.hasOwnProperty('chat')){
          store = update(store, {
            chats: {
              $merge: action.result.entities.chat,
            },
          });
        }
        if (action.result.entities.hasOwnProperty('message')){
          store = update(store, {
            messages: {
              $merge: action.result.entities.message,
            },
          });
        }
      }
    }
    switch (action.type) {
      case LOAD_CHATS:
        return update(store,
          { isLoading: { $set: action.bool } },
        );
      case LOAD_CHATS_SUCCESS:
        return update(store, {
          isLoading: { $set: action.bool },
           chatList: { $set: action.result.result },
        },
        );
        return store;
      case CHAT_CREATE:
        return update(store, {
          chatList: { $push: [parseInt(action.result.result)] },
        });
      case MESSAGE_CREATE:
        console.log(action.result);
        return update(store, {
          messageList: { $push: [parseInt(action.result.result)] },
        })
      case LOAD_CHATS_ERROR:
        return update(store, { isLoading: { $set: false } });
      case CHAT_OPEN:
        return update(store, {
          messageList: { $merge: store.chats[action.id].message_set },
          chatopen: { $set: true },
          chat: { $set: action.id},
         });
      case CHAT_CLOSE:
        return update(store, {
          chatopen: { $set: false },
          messageList: { $set: []},
        });
      default:
        return store;
    }
}
