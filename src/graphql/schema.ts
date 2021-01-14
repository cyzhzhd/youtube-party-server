import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    parties: PartyConnection!
    party(id: ID!): Party
  }

  type PartyConnection {
    cursor: String
    hasMore: Boolean
    parties: [Party]
  }

  type Party {
    _id: ID!
    name: String!
    description: String!
    hostId: String
    currentVideo: Video
    numUsers: Int
  }

  type Video {
    id: ID!
    vid: String
    title: String
  }

  type Mutation {
    createParty(name: String, description: String, hostId: ID ): PartyUpdateResponse!
  }
  
  type PartyUpdateResponse {
    success: Boolean!
    message: String
    party: Party
  }
`;
export default typeDefs;
