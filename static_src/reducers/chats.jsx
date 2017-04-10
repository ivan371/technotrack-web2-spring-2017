import { LOAD_CHATS, LOAD_CHATS_SUCCESS, LOAD_CHATS_ERROR, CHAT_OPEN } from './../actions/chats';
import update from 'react-addons-update';
import { chatNormalize } from './../normilizers/chats';

const inititalStore = {
    chatList: [],
    chats: {},
    isLoading: false,
    chat: {},
    chatopen: false,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case LOAD_CHATS:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_CHATS_SUCCESS:
        const result = chatNormalize(action.apiResponse);
        console.log(result);
        return update(store, {
          isLoading: { $set: false },
           chatList: { $set: result.result },
           chats: {
             $merge: result.entities.chat,
           },
        },
        );
        return store;
      case LOAD_CHATS_ERROR:
        return update(store, { isLoading: { $set: false } });
      case CHAT_OPEN:
        return update(store, {
          chat: { $set: store.chats[action.id]},
          chatopen: { $set: true },
         });
      // case POST_CLOSE:
      //   return update(store, {
      //     modalopen: { $set: false },
      //   });
      default:
        return store;
    }
}
