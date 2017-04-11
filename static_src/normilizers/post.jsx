import { normalize, schema, denormilize } from 'normalizr';

export function postNormalize (posts) {
  const author = new schema.Entity('author');
  const comment = new schema.Entity('comment_set', {
    author: author,
  });
  const post = new schema.Entity('posts', {
    author: author,
    comments: [comment],
  });
  const result = normalize(posts, [post]);
  console.log(result);
  return result;
}

export function postDeNotmilize (title, content) {
  // const titl = new schema.Entity('title');
  // const conten = new schema.Entity('content');
  // const entities = { titl: title, conten: content };
  // const result = denormilize(entities);
  const result = { title, content }
  console.log(result);
  return result;
}
