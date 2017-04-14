import { LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR, POST_OPEN, POST_CLOSE, POST_CREATE } from './../actions/posts';
import update from 'react-addons-update';

const inititalStore = {
    postList: [],
    posts: {},
    isLoading: false,
    modalpost: {},
    modalopen: false,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case LOAD_POSTS:
        return update(store,
          { isLoading: { $set: true } },
        );
      case LOAD_POSTS_SUCCESS:
        return update(store, {
          isLoading: { $set: false },
          postList: { $set: action.result.result },
          posts: {
            $merge: action.result.entities.posts,
          },
        },
        );
      case LOAD_POSTS_ERROR:
        return update(store, { isLoading: { $set: false } });
      case POST_OPEN:
        return update(store, {
          modalpost: { $set: store.posts[action.id]},
          modalopen: { $set: true },
         });
      case POST_CLOSE:
        return update(store, {
          modalopen: { $set: false },
        });
      case POST_CREATE:
        return update(store, {
          postList: { $merge: action.result.result },
          posts: {
            $merge: action.result.post,
          },
        },
        );
      default:
        return store;
    }
}
