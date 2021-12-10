'use strict'

const serverlessConfig = require('@serverless/eslint-config/prettier.config')

/** @type {import('prettier').Config} */
module.exports = {
  ...serverlessConfig,
  printWidth: 80,
  semi: false,
}
