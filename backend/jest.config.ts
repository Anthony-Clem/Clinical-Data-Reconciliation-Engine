module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  testRegex: ".spec.ts$", // picks up your unit tests
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // resolves your "@/" imports
  },
};
