*** Settings ***
Documentation     A test suite with a weather test.
Resource          resource.robot
Test Teardown     Close Browser

*** Test Cases ***
Valid Weather
    Browser is opened to home page

*** Keywords ***
Browser is opened to home page
    Open browser to home page