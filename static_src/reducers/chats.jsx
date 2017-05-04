import {
  LOAD_CHATS,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_ERROR,
  CHAT_OPEN,
  CHAT_CLOSE,
  CHAT_CREATE,
  MESSAGE_CREATE,
  CHAT_PAGINATE,
  CHATUSER_OPEN,
  CHATUSER_CLOSE,
  CHATUSER_ADD,
} from './../actions/chats';
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
    modalopen: false,
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
      // case CHATUSER_ADD:
      //   return updata(store,
      //     { chats: { }}
      //   );
      case CHAT_PAGINATE:
        return update(store,
          { count: { $set: Math.floor(action.result / 10)} },
        );
      case LOAD_CHATS:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_CHATS_SUCCESS:
        return update(store, {
          isLoading: { $set: false },
           chatList: { $set: action.result.result },
          //  userlist: { $set: action.result.userlist },
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
      case CHATUSER_OPEN:
        return update(store, {
          modalopen: { $set: true },
         });
      case CHATUSER_CLOSE:
        return update(store, {
          modalopen: { $set: false },
        });
      default:
        return store;
    }
}
