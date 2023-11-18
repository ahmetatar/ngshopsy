import defaultConfig from './jest.config';

export default {
  ...defaultConfig,
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  testMatch: ['<rootDir>/src/integration-tests/**/*(*.)@(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: []
};
