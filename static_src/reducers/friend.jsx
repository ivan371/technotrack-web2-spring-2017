import {
  LOAD_FRIEND,
  LOAD_FRIEND_SUCCESS,
  LOAD_FRIEND_ERROR,
  FRIEND_PAGINATE,
} from './../actions/friend';
import update from 'react-addons-update';

const inititalStore = {
    friendList: [],
    friends: {},
    isLoading: false,
};


export default function router (store = inititalStore, action) {
    if (action.hasOwnProperty('result')) {
      if (action.result.hasOwnProperty('entities')){
        if (action.result.entities.hasOwnProperty('friend')){
          store = update(store, {
            friends: {
              $merge: action.result.entities.friend,
            },
          });
        }
      }
    }
    switch (action.type) {
      case FRIEND_PAGINATE:
        return update(store,
          { count: { $set: Math.floor(action.result / 10)} },
        );
      case LOAD_FRIEND:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_FRIEND_SUCCESS:
         return update(store, {
           isLoading: { $set: false },
           friendList: { $set: action.result.result },
          }
         );
      case LOAD_FRIEND_ERROR:
        return update(store, { isLoading: { $set: false } });
      default:
        return store;
    }
}
