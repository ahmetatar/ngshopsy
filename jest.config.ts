/* eslint-disable */
export default {
  displayName: 'ngshopsy',
  preset: './jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '<rootDir>/node_modules/jest-offline'],
  coverageDirectory: './coverage/ngshopsy',
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  testPathIgnorePatterns: ['<rootDir>/src/integration-tests/'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)', 'main.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.[jt]s?(x)', '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    'jestGlobalMocks.ts',
    '.module.ts',
    '<rootDir>/src/app/main.ts',
    '.mock.ts',
    '.mocks.ts',
    '.config.ts',
    '.tokens.ts',
    '.fixture.ts',
    'utils.ts',
    'index.ts',
    '.options.ts',
    '.contracts.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
      },
    ],
    ['jest-slow-test-reporter', {numTests: 10, warnOnSlowerThan: 300, color: true}],
  ],
};
