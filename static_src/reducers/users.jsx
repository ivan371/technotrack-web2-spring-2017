import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './../actions/users';
import update from 'react-addons-update';
import { userNormalize } from './../normilizers/users';

const inititalStore = {
    userList: [],
    users: {},
    isLoading: false,
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
      case LOAD_USERS_ERROR:
        return update(store, { isLoading: { $set: false } });
      default:
        return store;
    }
}
