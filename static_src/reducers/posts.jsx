import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  POST_OPEN,
  POST_CLOSE,
  POST_CREATE,
  POST_CHANGE} from './../actions/posts';
import {
  LOAD_NEWS_SUCCESS
} from './../actions/news';
import {
  LOAD_LIKE_SUCCESS,
  LOAD_LIKE_ERROR,
} from './../actions/like';
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
          { isLoading: { $set: action.bool } },
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
        return update(store,
          { isLoading: { $set: false },
          posts: {
            $set: {}
          },
          postList: {
            $set: []
          }
        });
      case LOAD_NEWS_SUCCESS:
        console.log("success");
        return update(store, {
          posts: {
            $merge: action.result.entities.posts,
          },
        });
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
          postList: { $unshift: [parseInt(action.result.result)] },
          posts: {
            $merge: action.result.entities.posts,
          },
        });
      case POST_CHANGE:
        console.log('onChange');
        return update(store, {
          posts: {
            $merge: action.result.entities.posts,
          }
        });
      case LOAD_LIKE_SUCCESS:
        console.log('onChange');
        return update(store, {
          posts: {
            $merge: action.result.entities.posts,
          }
        });
      case LOAD_LIKE_ERROR:
        // const like_count = posts[action.id].like_count - 1;
        const id = action.id;
        const post = store.posts[id];
        post.like_count--;
        return update(store, {
          posts: {
            $merge: post,
          }
        });
      default:
        return store;
    }
}
