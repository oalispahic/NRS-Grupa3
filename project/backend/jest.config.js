module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/services/**/*.js',
    'src/middleware/**/*.js',
  ],
};
