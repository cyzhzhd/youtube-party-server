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

export interface UserType extends Document {
  uid: string;
  nickName: string;
  password: string;
  status: string;
  bookmarkedParties: [
    {
      partyId: string;
      partyName: string;
    }
  ];
  friendList: [
    {
      _id: string;
      uid: string;
      nickName: string;
      partyName: string;
    }
  ];
  joinedTime: string;
}
