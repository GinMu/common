const invariant = (condition: boolean, message: string) => {
  if (condition) {
    return;
  }
  throw new Error(message);
};

export { invariant };
