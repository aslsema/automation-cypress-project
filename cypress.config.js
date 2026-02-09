const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
    },

    video: true,
    screenshotOnRunFailure: true,

    trashAssetsBeforeRuns: false,
  },
});
