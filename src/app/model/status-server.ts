
export interface StatusServer {
  instanceId: string;
  keyName: string;
  state: State;
  publicDnsName: string;
}

interface State {
    code: number;
    name: string;
}

