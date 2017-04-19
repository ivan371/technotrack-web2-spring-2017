export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR';
export const POST_OPEN = 'POST_OPEN';
export const POST_CLOSE = 'POST_CLOSE';
export const POST_CREATE = 'POST_CREATE';
export const POST_CHANGE = 'POST_CHANGE';
import { postNormalize, postDeNotmilize, simplepostNormalize } from './../normilizers/post';
import { post } from './../promises/post';
import { put } from './../promises/put';
import cookie from 'react-cookie';

export function loadPosts(bool) {
    return {
        type: LOAD_POSTS,
        isLoading: bool
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

export function creatPostResult(result) {
  console.log(result);
  const apiResponse = simplepostNormalize(result);
  console.log('response:', apiResponse);
  return {
    type: POST_CREATE,
    result: apiResponse,
  }
}

export function createPostFetchData(url, title, content) {
    return (dispatch) => {
        const csrftoken = cookie.load('csrftoken');
        fetch('/api/posts/', {
          method: 'post',
          credentials: "same-origin",
          body: JSON.stringify({title, content}),
          headers: {
            "X-CSRFToken": csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((response) =>  dispatch(creatPostResult(response)))
        .catch(console.log);
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

// export function postChange(result) {
//   // put('/api/posts/' + id + '/', {title, content});
//   return {
//     type: POST_CHANGE,
//     result
//   }
// }
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
    return (dispatch) => {
        const csrftoken = cookie.load('csrftoken');
        fetch('/api/posts/' + id + '/', {
          method: 'put',
          credentials: "same-origin",
          body: JSON.stringify({title, content}),
          headers: {
            "X-CSRFToken": csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((response) =>  dispatch(updatePostResult(response)))
        .catch(console.log);
      }
}

export function postFetchData(url) {
    return (dispatch) => {
        dispatch(loadPosts(true));
        fetch(url, {
           credentials: "same-origin",
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loadPosts(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(loadPostsSuccess(data.results)))
            .catch(() => dispatch(loadPostsError(true)))
            .catch(console.log);
    };
}
