import { test, describe, expect } from "@jest/globals";
import { isDef, isJSON, isPositiveInteger, isPositiveStr, secondsSinceEpoch, string2json } from "../src";

describe("test util.ts", () => {
  describe("test isDef API", () => {
    test("return true if data is defined", () => {
      const datas = ["1", 1, {}, [], new Function()];

      for (const data of datas) {
        expect(isDef(data)).toBe(true);
      }
    });

    test("return false if data is null or undefined", () => {
      const datas = [null, undefined];

      for (const data of datas) {
        expect(isDef(data)).toBe(false);
      }
    });
  });

  describe("test isPositiveStr API", () => {
    test("return true if data is string and length is more than 0", () => {
      const datas = ["1"];

      for (const data of datas) {
        expect(isPositiveStr(data)).toBe(true);
      }
    });

    test("return false if data is not positive string", () => {
      const datas = [null, undefined, {}, [], "", 0];

      for (const data of datas) {
        expect(isPositiveStr(data)).toBe(false);
      }
    });
  });

  describe("test isPositiveInteger API", () => {
    test("return true if data is integer and more than 0", () => {
      const datas = [1];

      for (const data of datas) {
        expect(isPositiveInteger(data)).toBe(true);
      }
    });

    test("return false if data is not positive integer", () => {
      const datas = [null, undefined, {}, [], "", 0];

      for (const data of datas) {
        expect(isPositiveInteger(data)).toBe(false);
      }
    });
  });

  describe("test isJSON API", () => {
    test("return true if data is json string", () => {
      const datas = ['{"a":1}', '[{"a":1}]'];

      for (const data of datas) {
        expect(isJSON(data)).toBe(true);
      }
    });

    test("return false if data is not positive integer", () => {
      const datas = [null, undefined, {}, [], "", 0, '{"a}', "0", "true", "null"];

      for (const data of datas) {
        expect(isJSON(data)).toBe(false);
      }
    });
  });

  describe("test string2json API", () => {
    test("return json if data is json string", () => {
      expect(string2json('{"a":1}')).toEqual({ a: 1 });
      expect(string2json('[{"a":1}]')).toEqual([{ a: 1 }]);
    });
  });

  describe("test secondsSinceEpoch API", () => {
    test("return positive integer", () => {
      expect(isPositiveInteger(secondsSinceEpoch())).toBe(true);
    });
  });
});
