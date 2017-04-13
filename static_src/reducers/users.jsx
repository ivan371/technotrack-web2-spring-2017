import {
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR } from './../actions/users';
import { LOAD_POSTS_SUCCESS } from './../actions/posts';
import update from 'react-addons-update';
import { userNormalize } from './../normilizers/users';

const inititalStore = {
    userList: [],
    users: {},
    isLoading: false,
    ismeLoading: true,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case LOAD_USERS:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_USERS_SUCCESS:
        const result = userNormalize(action.apiResponse);
        console.log(result);
         return update(store, {
           isLoading: { $set: false },
           userList: { $set: result.result },
           users: {
             $merge: result.entities.user,
           },
         }
         );
      case LOAD_POSTS_SUCCESS:
        return update(store, {
          users: {
            $merge: action.result.entities.author,
          },
        });
      case LOAD_USERS_ERROR:
        return update(store, { isLoading: { $set: false } });
      case LOAD_USER:
        return update(store,
          { ismeLoading: { $set: true } },
        );
      case LOAD_USER_SUCCESS:
        console.log('here', action.apiResponse[0].id);
        return update(store, {
            users: { $merge: action.apiResponse },
            ismeLoading: { $set: false }
          },
        );
      case LOAD_USER_ERROR:
        return update(store, { ismeLoading: { $set: false } });
      default:
        return store;
    }
}
