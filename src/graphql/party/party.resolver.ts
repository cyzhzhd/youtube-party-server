import { CreatePartyProps, GetAllPartiesProps, GetPartyProps } from './partyType';

const query = {
  parties: async (_, { cursor, limit }: GetAllPartiesProps, { dataSources }) => {
    try {
      console.log(cursor, limit);
      const result = await dataSources.partyAPI.getAllParties({ cursor, limit });
      return result;
    } catch (error) {
      console.error('error on Query parties', error);
    }
  },
  party: async (_, { partyId }: GetPartyProps, { dataSources }) => {
    try {
      if (partyId) {
        const party = await dataSources.partyAPI.getPartyById({ partyId });
        return party;
      }
    } catch (error) {
      console.error('error on Query party', error);
    }
  },
};

const mutation = {
  createParty: async (_, { uid, partyName }: CreatePartyProps, { dataSources }) => {
    try {
      let success = false;
      let party;
      if (uid && partyName) {
        party = await dataSources.partyAPI.createParty({ uid, partyName });
        if (party) success = true;
      }

      return {
        success,
        message: party ? 'successfully create party' : 'error on creating party',
        party,
      };
    } catch (error) {
      console.error('error in Mutation createParty', error);
    }
  },
};

export default {
  Query: query,
  Mutation: mutation,
};
