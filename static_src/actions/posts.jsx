export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR';
export const POST_OPEN = 'POST_OPEN';
export const POST_CLOSE = 'POST_CLOSE';
export const POST_CREATE = 'POST_CREATE';
import { postNormalize, postDeNotmilize } from './../normilizers/post';
import { post } from './../promises/post';


export function loadPosts() {
    return {
        type: LOAD_POSTS,
    };
}

export function loadPostsSuccess(apiResponse) {
    const result = postNormalize(apiResponse);
    return {
        type: LOAD_POSTS_SUCCESS,
        result,
    };
}

export function loadPostsError(posts) {
    return {
        type: LOAD_POSTS_ERROR,
        posts,
    };
}

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

export function postCreate(title, content) {
  post('/api/posts/', {title, content});
  const result = {
    post: {0: {id: 0, title, content, author: 0}},
    result: {0: 0},
  };
  console.log(result);
  return {
    type: POST_CREATE,
    result,
  }
}
