import { normalize, schema, denormilize } from 'normalizr';

export function postNormalize (posts) {
  const author = new schema.Entity('author');
  const comment = new schema.Entity('comments', {
    author: author,
  });
  const like = new schema.Entity('likes', {
    author: author,
  });
  const post = new schema.Entity('posts', {
    author: author,
    comment_set: [comment],
    likes: [like],
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


export function commentNormalize(comment) {
  const author = new schema.Entity('author');
  const com = new schema.Entity('comment', {author:author});
  return normalize(comment, com);
}


export function postDeNotmilize (title, content) {
  const result = { "title": title, "content": content }
  console.log(result);
  return result;
}

export function deletenormilize(result) {
  return result;
}
