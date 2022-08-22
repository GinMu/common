import { IMemo } from "./types";
import { isDef } from "./util";
import { convertHexToString } from "@swtc/common";

export class Transaction {
  static isSend(type: string): boolean {
    return type === "Send";
  }

  static isReceive(type: string): boolean {
    return type === "Receive";
  }

  static isSuccess(v: string): boolean {
    return v === "tesSUCCESS";
  }

  static isSequence(seq): boolean {
    return Number.isInteger(seq) && seq >= 0;
  }

  static convertTime(v: number): number {
    return v + 946684800;
  }

  static convertMemo(memos: IMemo[]): string {
    const memo = memos?.[0]?.Memo?.MemoData;
    if (isDef(memo)) {
      return convertHexToString(memo);
    }
    return "";
  }
}
