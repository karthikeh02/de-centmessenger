export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export interface PeerInfo {
  peerId: string;
  multiaddrs: string[];
  isOnline: boolean;
  lastSeen: number;
}
