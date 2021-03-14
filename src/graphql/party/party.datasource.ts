import { RESTDataSource } from 'apollo-datasource-rest';
import { Party } from '../../models/partyModel';
import { CreatePartyProps, GetAllPartiesProps, GetPartyProps } from './partyType';

class PartyAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getAllParties({ cursor, limit }: GetAllPartiesProps) {
    try {
      const option = {};
      if (cursor) {
        option['_id'] = { $gt: cursor };
      }
      const parties = await Party.find(option).limit(limit + 1);

      let hasMore = false;
      let nextCursor: string;
      if (parties.length > limit) {
        parties.splice(limit, 1);
        hasMore = true;
        nextCursor = parties[limit - 1]._id;
      }

      return {
        cursor: nextCursor,
        hasMore,
        parties,
      };
    } catch (error) {
      console.error('getAllParties error', error);
    }
  }

  async getPartyById({ partyId }: GetPartyProps) {
    try {
      const party = await Party.findById(partyId);
      console.log(party);
      return party;
    } catch (error) {
      console.error('getPartyById error', error);
    }
  }

  async createParty({ uid, partyName }: CreatePartyProps) {
    try {
      console.log('datasoruces createParty parameter', uid, partyName);
      const party = await new Party({
        uid,
        partyName,
        startTime: new Date(),
      });

      const createdParty = await party.save();
      return createdParty;
    } catch (error) {
      console.log('creating party error', error);
    }
  }
}

export default PartyAPI;
