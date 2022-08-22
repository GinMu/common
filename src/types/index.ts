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
