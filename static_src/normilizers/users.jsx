import { normalize, schema } from 'normalizr';

export function userNormalize (users) {
  console.log(users);
  const user = new schema.Entity('user');
  const result = normalize(users, [user]);
  console.log(result);
  return result;
}
