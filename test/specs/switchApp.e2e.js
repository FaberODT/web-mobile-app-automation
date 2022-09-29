const SwitchAppScreen = require('../pageobjects/switchApp.screen');

describe('Cross testing demo', () => {
    beforeAll('runs before all the specs mentioned here', () => {
        console.log("I am into before all blcok");
    });

    afterEach('runs after all the specs mentioned here', () => {
        console.log("I am into after all block");
    });
    
    it('Automate Mobile and Web app together', () => {
        console.log("I am into spec");
        // following method call will click on Search icon button
        SwitchAppScreen.clickOnSearchIconBtn();

        // following method call will enter keyword into search text box
        SwitchAppScreen.enterSearchValue();

        //open chrome
        SwitchAppScreen.openGoogleChrome();
        browser.pause(8000);

        // SwitchAppScreen.openMobileApp();
        browser.pause(8000);
    });
});