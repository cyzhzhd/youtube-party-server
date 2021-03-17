import { gql } from 'apollo-server';

const Party = gql`
  type Query {
    parties(cursor: ID, limit: Int!): PartyConnection!
    party(partyId: ID!): Party
  }

  type PartyConnection {
    cursor: ID
    hasMore: Boolean
    parties: [Party]
  }

  type Party {
    _id: ID
    hostId: ID
    partyName: String
    currentVideo: Video
    videos: [Video]
    numUsers: Int
  }

  type Video {
    id: ID
    vid: String
    title: String
  }

  type Mutation {
    createParty(uid: ID, partyName: String!): PartyUpdateResponse!
  }

  type PartyUpdateResponse {
    success: Boolean!
    message: String
    party: Party
  }
`;
export default Party;
