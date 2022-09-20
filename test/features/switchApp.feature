Feature: Switching between Mobile and Web application

    # This test will basically try to automation Mobile and Web application at the same time

Scenario Outline: Automate Mobile and Web app together

Given Wiki app is launched
When I try to search a keyword
Then I get to see the related result
Then I open the web browser and switch to the Web app
When I load the url into the browser
When I login into the BStach demo application
Then I get to see the dashboard page
When I again switch back to wiki mobile app
Then I perform action on the wiki mobile app