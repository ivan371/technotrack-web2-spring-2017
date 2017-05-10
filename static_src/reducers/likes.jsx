import {
  LOAD_POSTS_SUCCESS,
} from './../actions/posts';
import update from 'react-addons-update';

const inititalStore = {
    posts: {},
    comments: {},
};


export default function router (store = inititalStore, action) {
    // switch (action.type) {
      // case LOAD_POSTS_SUCCESS:
      //   return update(store,
      //     { posts: { $merge:action.result.entities.likes} },
      //   );
      // default:
        return store;
    // }
}
