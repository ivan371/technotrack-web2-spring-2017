import {
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  MODAL_USER,
  MODAL_CLOSE,
  PROFILE_CHANGE
 } from './../actions/users';
import { LOAD_POSTS_SUCCESS } from './../actions/posts';
import { LOAD_CHATS_SUCCESS } from './../actions/chats';
import { LOAD_NEWS_SUCCESS } from './../actions/news';
import update from 'react-addons-update';
import { userNormalize } from './../normilizers/users';

const inititalStore = {
    userList: [],
    users: {},
    isLoading: false,
    ismeLoading: true,
    modalopen: false,
    myid: null,
};


export default function router (store = inititalStore, action) {
    let result = null;
    if (action.hasOwnProperty('result')) {
      if (action.result.hasOwnProperty('entities')){
        if (action.result.entities.hasOwnProperty('author')){
          store = update(store, {
            users: {
              $merge: action.result.entities.author,
            },
          });
        }
      }
    }
    switch (action.type) {
      case LOAD_USERS:
        return update(store,
          { isLoading: { $set: action.bool } },
        );
      case LOAD_USERS_SUCCESS:
         return update(store, {
           isLoading: { $set: false },
           userList: { $set: action.result.result },
           users: {
             $merge: action.result.entities.user,
           },
         }
         );
     case MODAL_USER:
       return update(store, {
         modalopen: { $set: true },
        });
      case MODAL_CLOSE:
        return update(store, {
          modalopen: { $set: false },
         });
      case LOAD_USERS_ERROR:
        return update(store, { isLoading: { $set: false } });
      case LOAD_USER:
        return update(store,
          { ismeLoading: { $set: true } },
        );
      case LOAD_USER_SUCCESS:
        return update(store, {
            userList: { $set: action.result.result },
            users: {
              $merge: action.result.entities.user,
            },
            ismeLoading: { $set: false },
            myid: { $set: action.result.result[0]},
          },
        );
      case PROFILE_CHANGE:
        let res = {};
        res[store.myid] = action.apiResponse;
        console.log(res);
        return update(store, {
            users: {
              $merge: res
            },
          },
        );
      case LOAD_USER_ERROR:
        return update(store, { ismeLoading: { $set: false } });
      default:
        return store;
    }
}
