import { normalize, schema } from 'normalizr';

export function friendNormalize (users) {
  const friend = new schema.Entity('friend');
  const result = normalize(users, [{'second': friend}]);
  for (let i in result.result) {
    result.result[i] = result.result[i].second;
  }
  console.log(result);
  return result;
}
