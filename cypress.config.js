const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('before:browser:launch', (browser = {}, args) => {
        console.log('browser', browser);

        if (browser.family === 'chrome') {
          console.log('adding dark mode browser flags');
          args.push('--force-dark-mode=false');

          return args;
        }
      });
    },
    baseUrl: 'http://localhost:3000',
  },
});
