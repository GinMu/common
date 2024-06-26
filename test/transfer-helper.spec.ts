import { expect, test, describe, afterEach } from "@jest/globals";
import { wallet, user, hash, token, node, blob } from "./data/common";
import { Transaction } from "@jccdex/jingtum-lib";
import { transfer } from "../src";
import sinon from "sinon";

const sandbox = sinon.createSandbox();
describe("test transfer helper", () => {
  const stub = sandbox.stub(Transaction.prototype, "fetchSequence");
  const stub1 = sandbox.stub(Transaction.prototype, "submitTransaction");
  // const stub2 = sandbox.stub(tp, "signJingtumTransaction");

  afterEach(() => {
    sandbox.reset();
  });

  test("if secret is defined", async () => {
    stub.resolves(1);
    stub1.resolves({
      result: {
        engine_result: "tesSUCCESS",
        tx_json: {
          hash
        }
      }
    });

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
    expect(stub.calledOnceWithExactly(wallet.address)).toEqual(true);

    expect(stub1.calledOnceWithExactly(blob)).toEqual(true);
    expect(h).toEqual(hash);
  });
});
