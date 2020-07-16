module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/test"],
  moduleNameMapper: {
    "^.+\\.(css|less)$": "<rootDir>/__mocks__/CSSStub.js",
  },
};
