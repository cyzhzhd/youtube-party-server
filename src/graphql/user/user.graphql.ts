import { gql } from 'apollo-server';

const User = gql`
  type Query {
    user: UserDetail
    searchedUser(nickName: String): [SearchedUserDetail!]
  }
  type Mutation {
    signUpUser(id: String!, password: String!, nickName: String!): UserUpdateResponse
    sendFriendRequest(uid: String): UpdateResponse
  }

  type UpdateResponse {
    success: Boolean
    message: String
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
    notificationHistory: [NotificationHistory]
    joinedTime: String
  }

  type SearchedUserDetail {
    id: String
    name: String
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

  type NotificationHistory {
    _id: String
    type: String
    from: String
    to: String
    content: String
    time: String
    checked: Boolean
  }
`;
export default User;
