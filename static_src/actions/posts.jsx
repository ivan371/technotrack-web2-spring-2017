export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR';
export const POST_OPEN = 'POST_OPEN';
export const POST_CLOSE = 'POST_CLOSE';
export const POST_CREATE = 'POST_CREATE';


export function loadPosts() {
    return {
        type: LOAD_POSTS,
    };
}

export function loadPostsSuccess(apiResponse) {
    return {
        type: LOAD_POSTS_SUCCESS,
        apiResponse,
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
  return {
    type: POST_CREATE,
    title,
    content,
  }
}
