import PartyAPI from './party/party.datasource';

export function dataSources() {
  return {
    partyAPI: new PartyAPI(),
  };
}
