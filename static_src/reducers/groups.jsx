import {
  LOAD_GROUPS,
    LOAD_GROUPS_SUCCESS,
    LOAD_GROUPS_ERROR,
    GROUPS_PAGINATE
} from './../actions/groups';
import {
  LOAD_NEWS_SUCCESS
} from './../actions/news';
import update from 'react-addons-update';
import { chatNormalize, messageNormalize } from './../normilizers/chats';

const inititalStore = {
    groupList: [],
    groups: {},
    isLoading: false,
    // chat: null,
    // messageList: [],
    // messages: {},
    // chatopen: false,
    // count: null,
    // modalopen: false,
};


export default function router (store = inititalStore, action) {
    let id = 0;
    let result = {};
    if (action.hasOwnProperty('result')) {
      if (action.result.hasOwnProperty('entities')){
        if (action.result.entities.hasOwnProperty('group')){
          store = update(store, {
            groups: {
              $merge: action.result.entities.group,
            },
          });
        }
        // if (action.result.entities.hasOwnProperty('message')){
        //   store = update(store, {
        //     messages: {
        //       $merge: action.result.entities.message,
        //     },
        //   });
        // }
      }
    }
    switch (action.type) {
    //   case MESSAGE_LOAD_SUCCESS:
    //     return update(store, {
    //        messageList: { $set: action.result.result },
    //       },
    //     );
      // case CHATUSER_ADD:
      //   return updata(store,
      //     { chats: { }}
      //   );
      case GROUPS_PAGINATE:
        return update(store,
          { count: { $set: Math.floor(action.result / 10)} },
        );
      case LOAD_GROUPS:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_GROUPS_SUCCESS:
        return update(store, {
          isLoading: { $set: false },
           groupList: { $set: action.result.result },
          //  userlist: { $set: action.result.userlist },
        },
        );
        return store;
      // case CHAT_CREATE:
      //   return update(store, {
      //     chatList: { $push: [parseInt(action.result.result)] },
      //   });
      // case MESSAGE_CREATE:
      //   console.log(action.result);
      //   return update(store, {
      //     messageList: { $push: [parseInt(action.result.result)] },
      //   })
      // case LOAD_GROUPS_ERROR:
      //   return update(store, { isLoading: { $set: false } });
      // case CHAT_OPEN:
      //   return update(store, {
      //     // messageList: { $merge: store.chats[action.id].message_set },
      //     chatopen: { $set: true },
      //     chat: { $set: action.id},
      //    });
      // case CHAT_CLOSE:
      //   return update(store, {
      //     chatopen: { $set: false },
      //     // messageList: { $set: []},
      //   });
      // case CHATUSER_OPEN:
      //   return update(store, {
      //     modalopen: { $set: true },
      //    });
      // case CHATUSER_CLOSE:
      //   return update(store, {
      //     modalopen: { $set: false },
      //   });
      default:
        return store;
    }
}
