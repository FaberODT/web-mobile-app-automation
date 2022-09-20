const {config} = require('./web.conf');

// appium capabilities
config.capabilities = [
    {
        platformName: 'Android',
        autoWebView:  true,
        browserName: 'chrome',
        appPackage: 'org.wikipedia.alpha',
        appActivity: 'org.wikipedia.main.MainActivity',
        automationName: 'uiautomator2',
        // maxInstances: 1,
        // app: process.cwd() + '/app/WikipediaSample.apk',
        deviceName: 'any',
        platformVersion: '10.0',
        autoGrantPermissions: true,
        noReset: false,
        chromedriverExecutable: process.cwd() + '/chromedrivers/chromedriver.exe'
    }
];

config.specs = [
    './test/specs/**/switchApp.e2e.js'
];

exports.config = config;