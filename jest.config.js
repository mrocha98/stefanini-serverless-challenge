'use strict'

module.exports = {
  clearMocks: true,
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/**/dto.*',
    '!src/**/*.enum.*',
    '!src/database/**',
  ],
}
