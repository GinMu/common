import { Transaction } from "@jccdex/jingtum-lib";
import { serializePayment } from "@jccdex/jingtum-lib/lib/tx";
import { ITransfer } from "../types";
import { isDef } from "../util";
import { wallet } from "../wallet";

const tp = require("tp-js-sdk");

const sign = async (tx: any) => {
  const res = await tp.signJingtumTransaction(tx);
  /* istanbul ignore next */
  if (!res.result) {
    throw new Error(res.msg);
  }
  return res.data;
};

/**
 * transfer helper
 *
 * 兼容tokenpocket
 *
 * @param {ITransfer} data
 * @returns {Promise<string>}
 */
export const transfer = async (data: ITransfer): Promise<string> => {
  const { node, from, to, currency, value, issuer, memo, secret } = data;
  const transaction = new Transaction({
    wallet,
    nodes: [node]
  });
  const tx = serializePayment(from, value, to, currency, memo, wallet.getFee(), wallet.getCurrency(), issuer);
  const sequence = await transaction.fetchSequence(from);
  tx.Sequence = sequence;
  let blob;
  if (isDef(secret)) {
    const res = wallet.sign(tx as any, data.secret);
    blob = res.blob;
  } else if (typeof window !== "undefined" && tp.isConnected()) {
    blob = await sign(tx);
  }

  const res = await transaction.submitTransaction(blob);
  if (!Transaction.isSuccess(res)) {
    throw new Error(JSON.stringify(res));
  }

  return res.result.tx_json.hash;
};
