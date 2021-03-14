export interface GetAllPartiesProps {
  cursor?: string;
  limit: number;
}
export interface GetPartyProps {
  partyId: string;
}
export interface CreatePartyProps {
  uid: string;
  partyName: string;
}
