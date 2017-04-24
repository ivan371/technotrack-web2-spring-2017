import {
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  LOAD_NEWS_ERROR,
} from './../actions/news';
import update from 'react-addons-update';

const inititalStore = {
    newsList: [],
    news: {},
    isLoading: false,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case LOAD_NEWS:
        return update(store,
          { isLoading: { $set: action.bool } },
        );
      case LOAD_NEWS_SUCCESS:
        return update(store, {
          isLoading: { $set: false },
          newsList: { $set: action.result.result },
          news: {
            $merge: action.result.entities.news,
          },
        },
        );
      case LOAD_NEWS_ERROR:
        return update(store,
          { isLoading: { $set: false },
          news: {
            $set: {}
          },
          newsList: {
            $set: []
          }
        });
      default:
        return store;
    }
}
