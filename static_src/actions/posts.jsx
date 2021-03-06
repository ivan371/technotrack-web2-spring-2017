export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR';
export const POST_OPEN = 'POST_OPEN';
export const POST_CLOSE = 'POST_CLOSE';
export const POST_CREATE = 'POST_CREATE';
export const POST_CHANGE = 'POST_CHANGE';
export const POST_PAGINATE = 'POST_PAGINATE';
export const COMMENT_CREATE = 'COMMENT_CREATE';
export const POST_DELETE = 'POST_DELETE';
export const COMMENT_DELETE = 'COMMENT_DELETE';
import {
  postNormalize,
  postDeNotmilize,
  simplepostNormalize,
  commentNormalize,
  deletenormilize,
} from './../normilizers/post';
import { post } from './../promises/post';
import { put } from './../promises/put';
import cookie from 'react-cookie';
import { FetchData, FetchDelete } from './load';

export function postOpen(id) {
  return {
    type: POST_OPEN,
    id,
  }
}

export function postClose() {
  return {
    type: POST_CLOSE,
  }
}

export function creatPostResult(result) {
  const apiResponse = simplepostNormalize(result);
  return {
    type: POST_CREATE,
    result: apiResponse,
  }
}

export function createPostFetchData(url, title, content) {
  const types = [LOAD_POSTS, POST_CREATE, LOAD_POSTS_ERROR, POST_PAGINATE];
  return FetchData(url, types, simplepostNormalize, 'post', JSON.stringify({title, content}));
}

export function createCommentFetchData(url, text) {
  const types = [LOAD_POSTS, COMMENT_CREATE, LOAD_POSTS_ERROR, POST_PAGINATE];
  return FetchData(url, types, commentNormalize, 'post', JSON.stringify({text}));
}

export function updatePostResult(result) {
  console.log(result);
  const apiResponse = simplepostNormalize(result);
  console.log('response:', apiResponse);
  return {
    type: POST_CHANGE,
    result: apiResponse,
  }
}

export function updatePostFetchData(url, id, title, content) {
    const types = [LOAD_POSTS, POST_CHANGE, LOAD_POSTS_ERROR, POST_PAGINATE];
    return FetchData('/api/posts/' + id + '/', types, simplepostNormalize, 'put', JSON.stringify({title, content}));
}

export function postFetchData(url) {
    const types = [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR, POST_PAGINATE];
    return FetchData(url, types, postNormalize, 'get');
}
export function simplepostFetchData(url) {
  const types = [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR, POST_PAGINATE];
  return FetchData(url, types, simplepostNormalize, 'get');
}

export function deletePost(url, id) {
  const types = [POST_DELETE, LOAD_POSTS_ERROR];
  return FetchDelete(url, types, id);
}
