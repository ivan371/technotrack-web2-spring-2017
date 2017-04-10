import { LOAD_USER_SUCCESS, LOAD_USER_ERROR, LOAD_USER } from './../actions/user';
import update from 'react-addons-update';

const inititalStore = {
    user: {},
    isLoading: false,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case LOAD_USER:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_USER_SUCCESS:
        return update(store, {
            user: { $set: action.apiResponse },
          },
        );
      case LOAD_USER_ERROR:
        return update(store, { isLoading: { $set: false } });
      default:
        return store;
    }
}
