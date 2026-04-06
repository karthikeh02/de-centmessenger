export interface Contact {
  id: string;
  username: string;
  publicKey: string;
  peerId: string;
  ethAddress?: string;
  status: ContactStatus;
  addedAt: number;
}

export type ContactStatus = 'pending' | 'accepted' | 'blocked';
