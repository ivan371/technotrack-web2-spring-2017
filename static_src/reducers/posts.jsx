import { LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR, POST_OPEN, POST_CLOSE } from './../actions/posts';
import update from 'react-addons-update';
import { postNormalize } from './../normilizers/post';

const inititalStore = {
    postList: [],
    posts: {},
    users: {},
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
        const result = postNormalize(action.apiResponse);
        console.log(result.result);
        console.log(result.entities.posts);
        return update(store, {
          isLoading: { $set: false },
          postList: { $set: result.result },
          posts: {
            $merge: result.entities.posts,
          },
          users: {
            $merge: result.entities.author,
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
      default:
        return store;
    }
}
