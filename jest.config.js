module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['<rootDir>>/__tests__/**/*.spec.(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
