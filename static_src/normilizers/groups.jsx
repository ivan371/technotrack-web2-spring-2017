import { normalize, schema } from 'normalizr';

export function groupNormalize (groups) {
   const author = new schema.Entity('author');
   const group = new schema.Entity('group', {
     'groupuser_set': [{'author': author}],
     'author': author,
   });
   const result = normalize(groups, [group]);
   return result;
}

export function simplegroupNormalize (groups) {
   const author = new schema.Entity('author');
   const group = new schema.Entity('group', {
     'groupuser_set': [author],
   });
   const result = normalize(groups, group);
   return result;
}
//
// export function messageNormalize (messages) {
//   const author = new schema.Entity('author');
//   const message = new schema.Entity('message', {'author': author});
//   return normalize(messages, [message]);
// }
//
// export function simplemessageNormalize (messages) {
//   const author = new schema.Entity('author');
//   const message = new schema.Entity('message', {'author': author});
//   return normalize(messages, message);
// }
//
// export function chatuseradd (result) {
//   return result;
// }
