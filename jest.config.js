module.exports = {
  preset: 'jest-expo',
  transform: {
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  "setupFiles": ["<rootDir>/setupTests.js"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "transformIgnorePatterns": ["node_modules/(?!(jest-)?react-native|react-clone-referenced-element)/"]
};