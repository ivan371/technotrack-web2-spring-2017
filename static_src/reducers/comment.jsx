import update from 'react-addons-update';

const inititalStore = {
    comments: {},
    isLoading: false,
};


export default function router (store = inititalStore, action) {
    if (action.hasOwnProperty('result')) {
      if (action.result.hasOwnProperty('entities')){
        if (action.result.entities.hasOwnProperty('comments')){
          store = update(store, {
            comments: {
              $merge: action.result.entities.comments,
            },
          });
        }
        if (action.result.entities.hasOwnProperty('comment')){
          store = update(store, {
            comments: {
              $merge: action.result.entities.comment,
            },
          });
        }
      }
    }
    return store;
}
