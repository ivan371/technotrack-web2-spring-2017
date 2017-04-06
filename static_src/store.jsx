import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import initReducers from './reducers/index';


function initStore() {
    const innitialStore = {};
    return createStore(
        initReducers,
        innitialStore,
        compose(
            applyMiddleware(),
            window.devToolsExtension()
        ),
    );

}

export default initStore;