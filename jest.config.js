module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Для TypeScript файлів
    '^.+\\.jsx?$': 'babel-jest', // Для JavaScript файлів
  },
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)',
  ],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^queryString$': 'query-string',
  }
};
