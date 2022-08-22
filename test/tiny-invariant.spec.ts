import { test, describe, expect } from "@jest/globals";
import { invariant, Token } from "../src";

describe("test tiny-invariant.ts", () => {
  describe("test invariant API", () => {
    test("throw error", () => {
      expect(() => {
        invariant(
          Token.isNative({
            currency: "jjcc",
            issuer: ""
          }),
          "This token is not native"
        );
      }).toThrow();
    });

    test("not throw error", () => {
      expect(() => {
        invariant(
          Token.isNative({
            currency: "swt",
            issuer: ""
          }),
          "This token is not native"
        );
      }).not.toThrow();
    });
  });
});
