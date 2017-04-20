import {
  LOAD_CHATS,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_ERROR,
  CHAT_OPEN,
  CHAT_CLOSE,
  CHAT_CREATE,
  MESSAGE_CREATE} from './../actions/chats';
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
};


export default function router (store = inititalStore, action) {
    let id = 0;
    let result = {};
    switch (action.type) {
      case LOAD_CHATS:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_CHATS_SUCCESS:
        return update(store, {
          isLoading: { $set: false },
           chatList: { $set: action.result.result },
           chats: {
             $merge: action.result.entities.chat,
           },
           messages: { $merge: action.result.entities.message}
        },
        );
        return store;
      case CHAT_CREATE:
        id = parseInt(action.result.id);
        result = {};
        result[action.result.id] = action.result;
        return update(store, {
          chatList: { $push: [id]},
          chats: { $merge: result}
        })
      case MESSAGE_CREATE:
        console.log(action.result);
        return update(store, {
          messageList: { $push: [parseInt(action.result.result)] },
          messages: {
            $merge: action.result.entities.message,
          },
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
