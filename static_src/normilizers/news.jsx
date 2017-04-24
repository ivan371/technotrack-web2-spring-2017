import { normalize, schema, denormilize } from 'normalizr';

export function newsNormalize (news) {
  const author = new schema.Entity('author');
  const neww = new schema.Entity('news', {
    author: author,
  });
  const result = normalize(news, neww);
  console.log(result);
  return result;
}
