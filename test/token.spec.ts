import { test, describe, expect } from "@jest/globals";
import { Token } from "../src";

describe("test token.ts", () => {
  describe("test isNative API", () => {
    test("return true if token is native", () => {
      const tokens = [
        {
          currency: "swt",
          issuer: ""
        },
        {
          currency: "swtc",
          issuer: ""
        }
      ];

      for (const token of tokens) {
        expect(Token.isNative(token)).toBe(true);
      }
    });

    test("return false if token is not native", () => {
      const tokens = [
        {
          currency: "jjcc",
          issuer: ""
        },
        {
          currency: "jcc",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        },
        {
          currency: "swt",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        }
      ];

      for (const token of tokens) {
        expect(Token.isNative(token)).toBe(false);
      }
    });
  });

  describe("test isNonNative API", () => {
    test("return true if token is nonnative", () => {
      const tokens = [
        {
          currency: "jjcc",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        }
      ];

      for (const token of tokens) {
        expect(Token.isNonNative(token)).toBe(true);
      }
    });

    test("return false if token is not nonnative", () => {
      const tokens = [
        {
          currency: "jjcc",
          issuer: ""
        },
        {
          currency: "",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        }
      ];

      for (const token of tokens) {
        expect(Token.isNonNative(token)).toBe(false);
      }
    });
  });

  describe("test compare API", () => {
    test("return true if token is equal", () => {
      expect(
        Token.compare(
          {
            currency: "swt",
            issuer: ""
          },
          {
            currency: "swtc",
            issuer: ""
          }
        )
      ).toBe(true);

      expect(
        Token.compare(
          {
            currency: "jjcc",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          },
          {
            currency: "JJCC",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          }
        )
      ).toBe(true);
    });

    test("return false if token is not equal", () => {
      expect(
        Token.compare(
          {
            currency: "swt",
            issuer: ""
          },
          {
            currency: "swtc",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          }
        )
      ).toBe(false);

      expect(
        Token.compare(
          {
            currency: "jusdt",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          },
          {
            currency: "JJCC",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          }
        )
      ).toBe(false);
    });
  });
});
