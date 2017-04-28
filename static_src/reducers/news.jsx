import {
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  LOAD_NEWS_ERROR,
  NEWS_PAGINATE,
} from './../actions/news';
import update from 'react-addons-update';

const inititalStore = {
    newsList: [],
    news: {},
    isLoading: false,
    count: null,
};


export default function router (store = inititalStore, action) {
    switch (action.type) {
      case NEWS_PAGINATE:
        return update(store,
          { count: { $set: Math.floor(action.result / 10)} },
        );
      case LOAD_NEWS:
        return update(store,
          { isLoading: { $set: true } },
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
