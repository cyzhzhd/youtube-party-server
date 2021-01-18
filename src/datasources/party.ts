import { RESTDataSource } from 'apollo-datasource-rest'
import { Party } from '../models/partyModel';
// import { Party } from '../../dist/src/models/partyModel';

class PartyAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getAllParties() {
    try {
      const parties = await Party.find({});
      return parties;
    } catch (error) {
      console.error("getAllParties error", error);
    }
  }

  async getPartyById(partyId: String) {
    try {
      const party = await Party.findById(partyId);
      return party;
    } catch (error) {
      console.error("getPartyById error", error);
    }
  }

  async createParty(name: String, description: String, hostId: String) {
    try {
      console.log('datasoruces createParty parameter',name, description, hostId);
      const party = await new Party({
        name,
        description,
        hostId,
        startTime: new Date(),
      });
  
      party.save();
      // party.save().then(savedParty => {return savedParty}).catch(err => console.error("error in createParty",err));
      return party;
    } catch (error) {
      console.log('creating party error', error);
    }
  }
}

export default PartyAPI;