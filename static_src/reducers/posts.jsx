import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  POST_OPEN,
  POST_CLOSE,
  POST_CREATE,
  POST_CHANGE,
  POST_PAGINATE,
} from './../actions/posts';
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
    count: 0,
};


export default function router (store = inititalStore, action) {
    if (action.hasOwnProperty('result')) {
      if (action.result.hasOwnProperty('entities')){
        if (action.result.entities.hasOwnProperty('posts')){
          store = update(store, {
            posts: {
              $merge: action.result.entities.posts,
            },
          });
        }
      }
    }
    switch (action.type) {
      case POST_PAGINATE:
        return update(store,
          { count: { $set: Math.floor(action.result / 10)} },
        );
      case LOAD_POSTS:
        return update(store,
          { isLoading: { $set: action.bool } },
        );
      case LOAD_POSTS_SUCCESS:
        return update(store, {
          isLoading: { $set: false },
          postList: { $set: action.result.result },
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
        });
      case LOAD_LIKE_ERROR:
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
