import { test, describe, expect } from "@jest/globals";
import { Amount } from "../src";

describe("test amount.ts", () => {
  describe("test isValid API", () => {
    test("return true if amount is valid", () => {
      const amounts = [
        {
          currency: "swt",
          value: "1",
          issuer: ""
        },
        {
          currency: "swtc",
          value: "1",
          issuer: ""
        },
        {
          currency: "jjcc",
          value: "1",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        }
      ];

      for (const amount of amounts) {
        expect(Amount.isValid(amount)).toBe(true);
      }
    });

    test("return false if amount is not valid", () => {
      const amounts = [
        {
          currency: "sw",
          value: "1",
          issuer: ""
        },
        {
          currency: "swtc",
          value: "0",
          issuer: ""
        },
        {
          currency: "jjcc",
          value: "-1",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        }
      ];

      for (const amount of amounts) {
        expect(Amount.isValid(amount)).toBe(false);
      }
    });
  });

  describe("test compare API", () => {
    test("return true if amount is equal", () => {
      expect(
        Amount.compare(
          {
            currency: "swt",
            value: "1",
            issuer: ""
          },
          {
            currency: "swtc",
            value: "1",
            issuer: ""
          }
        )
      ).toBe(true);

      expect(
        Amount.compare(
          {
            currency: "jjcc",
            value: "1",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          },
          {
            currency: "JJCC",
            value: "1",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          }
        )
      ).toBe(true);
    });

    test("return false if amount is not equal", () => {
      expect(
        Amount.compare(
          {
            currency: "swt",
            value: "1",
            issuer: ""
          },
          {
            currency: "swtc",
            value: "1",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          }
        )
      ).toBe(false);

      expect(
        Amount.compare(
          {
            currency: "jusdt",
            value: "1",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          },
          {
            currency: "JJCC",
            value: "1",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          }
        )
      ).toBe(false);

      expect(
        Amount.compare(
          {
            currency: "jjcc",
            value: "1",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          },
          {
            currency: "JJCC",
            value: "2",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          }
        )
      ).toBe(false);
    });
  });
});
