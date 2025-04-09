module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off'
  },
  ignorePatterns: [
    'node_modules/*',
    '.next/*',
    'out/*'
  ]
} 