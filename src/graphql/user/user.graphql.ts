import { gql } from 'apollo-server';

const User = gql`
  type Mutation {
    signInUser(id: String!, password: String!): UserUpdateResponse
    signUpUser(id: String!, password: String!, nickName: String!): UserUpdateResponse
  }

  type UserUpdateResponse {
    success: Boolean!
    message: String
    user: UserDetail
  }
  type UserDetail {
    _id: String
    uid: String
    nickName: String
    status: String
    bookmarkedParties: BookmarkedParties
    friendList: FriendList
    joinedTime: String
  }

  type BookmarkedParties {
    partyId: ID
    partyName: String
    numCurrentUser: Int
    numBookmarkedUser: Int
    thumbnail: String
  }
  type FriendList {
    _id: ID
    uid: String
    nickName: String
    status: String
    partyName: String
  }
`;
export default User;
