import { IToken } from "./types";
import { isValidCurrency } from "@swtc/common";
import { wallet } from "./wallet";

export class Token {
  static isNative(token: IToken): boolean {
    return (
      (token?.currency?.toUpperCase() === "SWT" || token?.currency?.toUpperCase() === "SWTC") && token?.issuer === ""
    );
  }

  static isNonNative(token: IToken): boolean {
    return isValidCurrency(token?.currency) && wallet.isValidAddress(token?.issuer);
  }

  static compare(token1: IToken, token2: IToken): boolean {
    return (
      (Token.isNative(token1) && Token.isNative(token2)) ||
      (Token.isNonNative(token1) &&
        Token.isNonNative(token2) &&
        token1.currency.toUpperCase() === token2.currency.toUpperCase() &&
        token1.issuer === token2.issuer)
    );
  }
}
