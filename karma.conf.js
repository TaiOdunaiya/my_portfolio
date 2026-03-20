// Karma configuration — https://karma-runner.github.io/
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "portfolio-utils.js",
      "spec/**/*.spec.js",
    ],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity,
  });
};
