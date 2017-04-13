import { normilize, schema } from 'normalizr';
import { compose, combineReducers, createStore } from 'redux';

export const postNormolize = store => next => action => {
  // const user = new schema.Entity('users');
  // const post = new schema.Entity('posts', {
  //    author: user,
  // });
  // console.log(normilize(action.apiResponse.posts, [post]));
  const result = next(action);
  return result;
}

export const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState(result));
  return result;
}
