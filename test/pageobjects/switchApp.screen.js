const expect = require("chai").expect;

// const activity = "";

/**
 * following class contains locators and methods for Mobile and Web pages
 */
class switchAppScreen {
    get searchBtn() { return $('//android.widget.ImageView[@content-desc="Search Wikipedia"][1]') }

    get searchTxtBox() { return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.support.v7.widget.LinearLayoutCompat/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.EditText') }

    get resultFeed() { return $$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout[2]/android.view.ViewGroup/android.support.v4.view.ViewPager/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView.android.widget.FrameLayout') }

    clickOnSearchIconBtn() {
        this.searchBtn.waitForExist({ timeout: 30000 });
        // this.searchBtn.waitForClickable({timeout: 30000});
        this.searchBtn.click();
    }

    enterSearchValue() {
        this.searchTxtBox.waitForExist({ timeout: 30000 });
        this.searchTxtBox.setValue("testing");
    }

    verifyResultFeed() {
        // this.resultFeed[0].waitForExist({timeout: 30000});
        expect(this.resultFeed.length).to.greaterThan(0);
    }

    openGoogleChrome() {
        driver.terminateApp('org.wikipedia.alpha');
        // driver.startActivity("com.android.chrome", "com.google.android.apps.chrome.Main");
        //browser.url("https://www.yahoo.com"); 
        // driver.get("https://www.yahoo.com");
        // driver.url("http://appium.io");
        driver.activateApp('com.android.chrome');
        console.log("Current activity in web is: " + driver.getCurrentActivity());
        ////browser.pause(5000);
        browser.url("https://www.yahoo.com");
        browser.pause(5000);

        driver.terminateApp('com.android.chrome');
        browser.pause(5000);
        try{
            console.log("I am in try");
            driver.activateApp('org.wikipedia.alpha');    
        }catch{
            console.log("I am in catch");
            driver.launchApp();
        }
        
        // driver.url("http://appium.io");
    }

    openMobileApp(){
        // driver.startActivity("org.wikipedia.alpha", "org.wikipedia.main.MainActivity");
        // driver.activateApp('org.wikipedia.alpha');
        driver.launchApp();
        console.log("Current activity in mobile is: " + driver.getCurrentActivity());
    }


}

module.exports = new switchAppScreen();