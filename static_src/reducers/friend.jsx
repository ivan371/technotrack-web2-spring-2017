import {
  LOAD_FRIEND,
  LOAD_FRIEND_SUCCESS,
  LOAD_FRIEND_ERROR,
} from './../actions/friend';
import update from 'react-addons-update';
import { userNormalize } from './../normilizers/users';

const inititalStore = {
    friendList: [],
    friends: {},
    isLoading: false,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case LOAD_FRIEND:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_FRIEND_SUCCESS:
        const result = chatNormalize(action.apiResponse);
        console.log(result);
        // return update(store, {
        //   isLoading: { $set: false },
        //    chatList: { $set: result.result },
        //    chats: {
        //      $merge: result.entities.chat,
        //    },
        //    messages: { $merge: result.entities.message}
        // },
        // );
        return store;
      case LOAD_FRIEND_ERROR:
        return update(store, { isLoading: { $set: false } });
      default:
        return store;
    }
}
