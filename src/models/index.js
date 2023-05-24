// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Match, Activity, ChatRoom, Message, User, UserMatch, UserChatRoom } = initSchema(schema);

export {
  Match,
  Activity,
  ChatRoom,
  Message,
  User,
  UserMatch,
  UserChatRoom
};