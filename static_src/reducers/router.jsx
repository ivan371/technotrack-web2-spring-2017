import { SELECT_PAGE } from './../actions/routing';

export default function router (store = { currentPage: 'self_room'}, action) {
    switch (action.type) {
        case SELECT_PAGE:
            return { currentPage: action.page };
            break;
        default:
            return store;
    }
}