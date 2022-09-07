const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://miro.com/',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 20000,
});
