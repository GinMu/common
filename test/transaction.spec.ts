import { test, describe, expect } from "@jest/globals";
import { Transaction } from "../src";

describe("test transaction.ts", () => {
  describe("test isSend API", () => {
    test("return true if transaction is send", () => {
      expect(Transaction.isSend("Send")).toBe(true);
    });

    test("return false if transaction is not send", () => {
      expect(Transaction.isSend("send")).toBe(false);
    });
  });

  describe("test isReceive API", () => {
    test("return true if transaction is receive", () => {
      expect(Transaction.isReceive("Receive")).toBe(true);
    });

    test("return false if transaction is not receive", () => {
      expect(Transaction.isReceive("receive")).toBe(false);
    });
  });

  describe("test isSuccess API", () => {
    test("return true if transaction is success", () => {
      expect(Transaction.isSuccess("tesSUCCESS")).toBe(true);
    });

    test("return false if transaction is not success", () => {
      expect(Transaction.isSuccess("tessuccess")).toBe(false);
    });
  });

  describe("test isSequence API", () => {
    test("return true if sequence is valid", () => {
      expect(Transaction.isSequence(0)).toBe(true);
      expect(Transaction.isSequence(1)).toBe(true);
    });

    test("return false if sequence is not valid", () => {
      expect(Transaction.isSequence(-1)).toBe(false);
      expect(Transaction.isSequence(0.1)).toBe(false);
    });
  });

  describe("test convertTime API", () => {
    test("time need add 946684800", () => {
      expect(Transaction.convertTime(1)).toEqual(946684801);
    });
  });

  describe("test convertMemo API", () => {
    test("convert memo to string", () => {
      expect(
        Transaction.convertMemo([
          {
            Memo: {
              MemoData:
                "7B2274797065223A226D756C74692D7369676E222C2274656D706C617465223A22E8BDACE8B4A6222C22636861696E4964223A2230783830303030313362222C22746F706963223A7B226E616D65223A22E6B58BE8AF95E5A49AE7ADBEE8BDACE8B4A6222C226465736372697074696F6E223A22E6B58BE8AF95E8BDACE8B4A6222C22646561646C696E65223A313636313636343235302C226F7065726174696F6E223A7B22636861696E4964223A2230783830303030313362222C226D656D6F223A22222C2266726F6D223A226A48386B71576842763275343138386743766F6636454B334567514B526F4B6D4779222C22746F223A226A34726D455A6961546458426B677A5850647375314A524266356F6E6E6771665569222C22736571223A39362C22746F6B656E223A7B2263757272656E6379223A22535754222C2276616C7565223A223130222C22697373756572223A22227D7D7D7D",
              MemoType: "737472696E67"
            }
          }
        ])
      ).toEqual(
        '{"type":"multi-sign","template":"转账","chainId":"0x8000013b","topic":{"name":"测试多签转账","description":"测试转账","deadline":1661664250,"operation":{"chainId":"0x8000013b","memo":"","from":"jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy","to":"j4rmEZiaTdXBkgzXPdsu1JRBf5onngqfUi","seq":96,"token":{"currency":"SWT","value":"10","issuer":""}}}}'
      );

      expect(Transaction.convertMemo([])).toEqual("");
    });
  });
});
