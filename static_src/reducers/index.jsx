import { combineReducers } from 'redux';
import router from './router';
import posts from './posts';
import users from './users';
import chats from './chats';
import friend from './friend';
import news from './news';
import comment from './comment';
import likes from './likes';
import groups from './groups';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    router,
    posts,
    users,
    chats,
    friend,
    news,
    comment,
    likes,
    groups,
    routing: routerReducer
});
