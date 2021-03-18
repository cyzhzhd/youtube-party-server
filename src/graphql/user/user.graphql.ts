import { gql } from 'apollo-server';

const User = gql`
  type Query {
    user: UserDetail
  }
  type Mutation {
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
    bookmarkedParties: [BookmarkedParty]
    friendList: [FriendList]
    joinedTime: String
  }

  type BookmarkedParty {
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
