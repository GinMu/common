export const secondsSinceEpoch = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const isDef = (v): boolean => {
  return v !== undefined && v !== null;
};

export const isPositiveStr = (v): boolean => {
  return typeof v === "string" && v.length > 0;
};

export const isPositiveInteger = (v): boolean => {
  return Number.isInteger(v) && v > 0;
};

export const isJSON = (v): boolean => {
  if (typeof v !== "string") return false;
  try {
    const result = JSON.parse(v);
    const type = Object.prototype.toString.call(result);
    return type === "[object Object]" || type === "[object Array]";
  } catch (_) {
    return false;
  }
};

export const string2json = (v: string) => {
  return JSON.parse(v);
};
