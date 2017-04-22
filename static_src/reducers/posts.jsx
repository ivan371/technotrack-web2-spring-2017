import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  POST_OPEN,
  POST_CLOSE,
  POST_CREATE,
  POST_CHANGE} from './../actions/posts';
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
        // const id = parseInt(action.result.id);
        // let result = {};
        // result[action.result.id] = action.result;
        // return update(store, {
        //   postList: { $push: [id]},
        //   posts: { $merge: result}
        //   // postList: { $merge: action.result.result },
        //   // posts: {
        //   //   $merge: action.result.post,
        //   //   },
        //   // },
        // });
      // case POST_CHANGE:
      //   let post = store.posts[action.id];
      //   console.log(action);
      //   // return update(store, {posts: {id: {title: {$set: action.title}}}});
      //   return store;
      default:
        return store;
    }
}
