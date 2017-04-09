import { LOAD_USERS_SUCCESS, LOAD_USERS_ERROR, LOAD_USERS } from './../actions/user';
import update from 'react-addons-update';

const inititalStore = {
    user: {},
    isLoading: false,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case LOAD_USERS:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_USERS_SUCCESS:
        return update(store, {
            user: { $set: action.apiResponse },
          },
        );
      case LOAD_USERS_ERROR:
        return update(store, { isLoading: { $set: false } });
      default:
        return store;
    }
}
