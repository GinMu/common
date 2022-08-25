import { expect, test, describe, afterEach } from "@jest/globals";
import { wallet, user, hash, token, node, blob } from "./data/common";
import { Transaction } from "@jccdex/jingtum-lib";
import { transfer } from "../src";
import sinon from "sinon";
const tp = require("tp-js-sdk");

const sandbox = sinon.createSandbox();
describe("test transfer helper", () => {
  afterEach(() => {
    sandbox.restore();
  });

  test("if secret is undefined", async () => {
    const stub = sandbox.stub(Transaction, "fetchSequence");
    stub.resolves(1);
    const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
    stub1.resolves(hash);
    const stub2 = sandbox.stub(tp, "signJingtumTransaction");
    stub2.resolves({
      result: true,
      data: blob
    });

    const h = await transfer({
      node,
      from: wallet.address,
      to: user,
      value: token.value,
      issuer: token.issuer,
      currency: token.currency,
      memo: ""
    });
    expect(
      stub2.calledOnceWithExactly({
        Account: wallet.address,
        Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "0.01" },
        Destination: user,
        Fee: 0.01,
        Flags: 0,
        Memos: [
          {
            Memo: {
              MemoData: "",
              MemoType: "string"
            }
          }
        ],
        TransactionType: "Payment",
        Sequence: 1
      })
    ).toEqual(true);
    expect(stub.calledOnceWithExactly(node, wallet.address)).toEqual(true);
    expect(
      stub1.calledOnceWithExactly({
        url: node,
        blob: blob
      })
    ).toEqual(true);
    expect(h).toEqual(hash);
  });

  test("if secret is defined", async () => {
    const stub = sandbox.stub(Transaction, "fetchSequence");
    stub.resolves(1);
    const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
    stub1.resolves(hash);

    const h = await transfer({
      node,
      from: wallet.address,
      secret: wallet.secret,
      to: user,
      value: token.value,
      issuer: token.issuer,
      currency: token.currency,
      memo: ""
    });
    expect(stub.calledOnceWithExactly(node, wallet.address)).toEqual(true);

    expect(
      stub1.calledOnceWithExactly({
        url: node,
        blob
      })
    ).toEqual(true);
    expect(h).toEqual(hash);
  });
});
