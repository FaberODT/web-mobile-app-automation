const {config} = require('./web.conf');

// appium capabilities
config.capabilities = [
    {
        platformName: 'Android',
        autoWebView:  true,
        // browserName: 'chrome',
        appPackage: 'org.wikipedia.alpha',
        appActivity: 'org.wikipedia.main.MainActivity',
        maxInstances: 1,
        automationName: 'uiautomator2',
        deviceName: 'any',
        platformVersion: '10.0',
        autoGrantPermissions: true,
        noReset: false,
        // chromedriverExecutable: process.cwd() + '/chromedrivers/chromedriver.exe'
    }
];

config.specs = [
    './test/specs/**/switchApp.e2e.js'
];

// config.suites = {
//     nonAPI: [
//         './test/specs/**/generalNurseDetails.e2e.js',
//         './test/specs/**/gradeAndEmployer.e2e.js',
//         './test/specs/**/nmcCheck.e2e.js',
//         './test/specs/**/personalDetails.e2e.js',
//         './test/specs/**/reference.e2e.js'
//     ],
//     withAPI: [
//         './test/specs/**/dbsDetails.e2e.js',
//         './test/specs/**/rightToWorkChecks.e2e.js',
//         './test/specs/**/taxAndNextOfKin.e2e.js',
//         './test/specs/**/training.e2e.js'
//     ]
// };

exports.config = config;