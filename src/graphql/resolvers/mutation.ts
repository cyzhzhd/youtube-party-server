const Mutation = {
  createParty: async(_: any, { name, description, hostId }: any, { dataSources }: any) => {
    try {
      console.log('createParty parameter',name, description, hostId);
      let success = false;
      let party;
      if (name && description && hostId) {
        party = await dataSources.partyAPI.createParty(name, description, hostId);
        if(party) success = true;
        console.log('createParty', party);
      }

      return {
        success,
        message: !!party ? 'successfully create party' : 'error on creating party',
        party
      }
    } catch(error) {
      console.error('error in Mutation createParty', error);
    }
  } 
};

export default Mutation;
