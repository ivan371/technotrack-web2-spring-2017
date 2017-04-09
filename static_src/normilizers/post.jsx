import { normalize, schema } from 'normalizr';

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
