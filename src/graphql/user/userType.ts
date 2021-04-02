import { Document } from 'mongoose';

export interface SignUpProps {
  id: string;
  password: string;
  nickName: string;
}
export interface SignInProps {
  id: string;
  password: string;
}

export interface User extends Document {
  uid: string;
  nickName: string;
  password: string;
  status: string;
  bookmarkedParties: BookmarkedParties[];
  friendList: FriendList[];
  notificationHistory: NotificationHistory[];
  joinedTime: string;
}

interface BookmarkedParties {
  partyId: string;
  partyName: string;
}
interface FriendList {
  _id: string;
  uid: string;
  nickName: string;
  partyName: string;
}
interface NotificationHistory {
  _id?: string;
  type: string;
  from: string;
  to: string;
  content?: string;
  time: Date;
  checked: boolean;
}

export interface JWT {
  _id: string;
  uid: string;
  nickName: string;
  iat: number;
  exp: number;
}
export enum notificationType {
  FRIEND_REQUEST = 'friendRequest',
}
