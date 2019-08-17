module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/__mocks__/style-mock.ts',
    '\\.(jp(e*)g|png|svg)$': '<rootDir>/src/__mocks__/file-mock.ts'
  }
};
