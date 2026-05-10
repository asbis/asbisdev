import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "tests/e2e/fixtures",
  screenshotsFolder: "tests/e2e/screenshots",
  videosFolder: "tests/e2e/videos",
  viewportHeight: 812,
  viewportWidth: 375,
  e2e: {
    experimentalWebKitSupport: true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require('./tests/e2e/plugins/index.js')(on, config)
    // },
    baseUrl: "http://localhost:8080",
    experimentalStudio: true,
    specPattern: "tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "tests/e2e/support/index.js",
  },

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
});
