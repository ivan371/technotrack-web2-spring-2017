import { normalize, schema, denormilize } from 'normalizr';

export function postNormalize (posts) {
  const author = new schema.Entity('author');
  const comment = new schema.Entity('comments', {
    author: author,
  });
  const post = new schema.Entity('posts', {
    author: author,
    comment_set: [comment],
  });
  const result = normalize(posts, [post]);
  console.log(result);
  return result;
}

export function simplepostNormalize (posts) {
  const author = new schema.Entity('author');
  const comment = new schema.Entity('comments', {
    author: author,
  });
  const post = new schema.Entity('posts', {
    author: author,
    comment_set: [comment],
  });
  const result = normalize(posts, post);
  console.log(result);
  return result;
}

export function commentNormilize(comment) {
  const author = new schema.Entity('author');
  const comments = new schema.Entity('comments', {
    author: author,
  });
  return result = normalize(comment, comments);
}


export function postDeNotmilize (title, content) {
  const result = { "title": title, "content": content }
  console.log(result);
  return result;
}
