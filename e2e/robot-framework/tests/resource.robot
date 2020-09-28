*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${HOMEPAGE_URL}   http://localhost:8000
# consider using http://frontend:8000 when in parallel docker-compose service 
${DELAY}          0
${BROWSER}        Firefox

*** Keywords ***
Open Browser To Home Page
    Open Browser    ${HOMEPAGE_URL}   ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${DELAY}
    Home Page Should Be Open

Home Page Should Be Open
    Title Should Be     ${HOMEPAGE_URL}