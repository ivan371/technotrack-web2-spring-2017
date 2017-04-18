import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import initReducers from './reducers/index';
import { postNormolize, logger } from './middleware/posts';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

function initStore() {
    const innitialStore = {};
    return createStore(
        initReducers,
        innitialStore,
        composeWithDevTools(applyMiddleware(logger, thunk)),
    );

}

export default initStore;
