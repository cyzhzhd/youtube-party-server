const Query = {
  parties: async(_: any, __: any, { dataSources }: any) => {
    try {
      const parties = await dataSources.partyAPI.getAllParties();
      return {
        parties,
      }
    } catch (error) {
      console.error("error on Query parties", error);
    }
  },

  // *** promise쓰지 않는 이유는?
  party: (_: any, {id}: any, { dataSources }: any) => {
    return dataSources.partyAPI.getPartyById(id)
  },
  
  // party: async(_: any, { id }: any, { dataSources }: any) => {
  //   try {
  //     const party = await dataSources.partyAPI.getPartyById(id);
  //     console.log('party', party);
  //     return {
  //       party
  //     }
  //   } catch(error) {
  //     console.error("error on Query party", error);
  //   }
  // }
};

export default Query;
