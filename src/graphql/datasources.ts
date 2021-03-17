import PartyAPI from './party/party.datasource';
import UserAPI from './user/user.datasource';

export function dataSources() {
  return {
    partyAPI: new PartyAPI(),
    userAPI: new UserAPI(),
  };
}
