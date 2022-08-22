import { IAmount } from "./types";
import BigNumber from "bignumber.js";
import { Token } from "./token";

export class Amount {
  static isValid(amount: IAmount): boolean {
    return new BigNumber(amount?.value).gt(0) && (Token.isNative(amount) || Token.isNonNative(amount));
  }

  static compare(amount1: IAmount, amount2: IAmount): boolean {
    return (
      Amount.isValid(amount1) &&
      Amount.isValid(amount2) &&
      Token.compare(amount1, amount2) &&
      new BigNumber(amount1?.value).eq(amount2?.value)
    );
  }
}
