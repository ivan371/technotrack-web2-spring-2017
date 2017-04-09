import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import initReducers from './reducers/index';
import { postNormolize, logger } from './middleware/posts';

function initStore() {
    const innitialStore = {};
    return createStore(
        initReducers,
        innitialStore,
        compose(
            applyMiddleware(logger),
            window.devToolsExtension()
        ),
    );

}

export default initStore;
