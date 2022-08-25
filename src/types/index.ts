export interface IToken {
  currency: string;
  issuer: string;
}

export interface IAmount extends IToken {
  value: string;
}

export interface IMemo {
  Memo: {
    MemoType: string;
    MemoData: string;
  };
}

export interface ITransfer {
  node: string;
  secret?: string;
  from: string;
  to: string;
  value: string;
  currency: string;
  issuer: string;
  memo: string;
}
