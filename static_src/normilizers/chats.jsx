import { normalize, schema } from 'normalizr';

export function chatNormalize (chats) {
   const author = new schema.Entity('user');
   const message = new schema.Entity('message', [author]);
   const chat = new schema.Entity('chat', {
     'chatuser_set': [author],
     'message_set': [message]
   });
   const result = normalize(chats, [chat]);
   return result;
}

export function messageNormalize (messages) {
  const message = new schema.Entity('message');
  return normalize(messages, message);
}
