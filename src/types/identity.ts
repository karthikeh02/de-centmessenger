export interface UserIdentity {
  username: string;
  publicKey: string;
  peerId: string;
  ethAddress: string;
  createdAt: number;
}

export interface MnemonicResult {
  mnemonic: string;
  seed: Uint8Array;
}

export interface DerivedKeys {
  identityKeyPair: {
    publicKey: Uint8Array;
    privateKey: Uint8Array;
  };
  ethAddress: string;
  ethPrivateKey: string;
  peerId: string;
}
