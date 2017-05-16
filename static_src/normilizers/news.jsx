import { normalize, schema, denormilize } from 'normalizr';
import { simplepostNormalize, commentNormalize } from './post';
import { simplechatNormalize, messageNormalize, simplemessageNormalize } from './chats';
import update from 'react-addons-update';
export function newsNormalize (news) {
  const author = new schema.Entity('author');
  const comment = new schema.Entity('comments', {
    author: author,
  });
  const post = new schema.Entity('news', {
    author: author,
    comment_set: [comment],
  });
  const neww = new schema.Entity('news', {
    author: author,
  });
  const result = normalize(news, [neww]);
  let Store = {
    result: [],
    entities: {
      news: {},
      posts: {},
      comments: {},
      message: {},
      author: {},
      chat: {},
    }
  };
  let temp;
  Store = update(Store, {
      entities: {
        news: {
          $merge: result.entities.news,
        },
        author: {
          $merge: result.entities.author
        }
      },
      result: {
        $set: result.result,
      }
    },
  );
  for (let i in news) {
    console.log(news[i]);
    Store.entities.news[Store.result[i]].target = Store.entities.news[Store.result[i]].target.id;
    switch (news[i].objtype) {
      case 'post':
        temp = simplepostNormalize(news[i].target);
        Store = update(Store, {
            entities: {
              posts: {
                $merge: temp.entities.posts,
              },
            },
        });
        if (temp.entities.hasOwnProperty('comments')) {
          Store = update(Store, {
            entities: {
              comments: {
                $merge: temp.entities.comments,
              },
            },
          });
        }
        break;
      case 'comment':
        temp = commentNormalize(news[i].target);
        console.log(temp);
        Store = update(Store, {
            entities: {
              comments: {
                $merge: temp.entities.comment,
              },
            },
          },
        );
        break;
      case 'chat':
        temp = simplechatNormalize(news[i].target);
        console.log(temp);
        Store = update(Store, {
            entities: {
              chat: {
                $merge: temp.entities.chat,
              },
            },
          },
        );
        break;
      case 'message':
        temp = simplemessageNormalize(news[i].target);
        console.log(temp);
        Store = update(Store, {
            entities: {
              message: {
                $merge: temp.entities.message,
              },
            },
          },
        );
        break;
      case 'like':

        break;
      default:

    }
  }
  console.log('a:', Store);
  console.log(result);
  return Store;
}
