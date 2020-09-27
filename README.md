<img align="left" src="./frontend/src/public/img/02.svg" title="ParkingApp" alt="Weatherapp" width="100" height="100">

# Weatherapp

Web application providing simplified preview of current and upcoming weather in user's location.

## Prerequisites
* An [openweathermap](http://openweathermap.org/) API key.
* Node.js
* [Docker](https://docs.docker.com/get-docker/) & [docker compose](https://docs.docker.com/compose/)
* Python3.6^ for [Robot Framework](https://robotframework.org/)

## Installation
* Clone repository to desired directory
`git clone https://github.com/adamnapieralski/weatherapp.git`
* `cd weatherapp`
### With docker
* set  environmental variables to desired values (in `.env` and `e2e/.env`)
* Run in the root application directory
```
docker-compose up
```
which will set up needed backend and frontend docker containers and connect them to properly run full application.

### Without docker
* Install required node modules
```
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

## Running / Development
Application run with docker-compose is ready for development with hot reload functionality.

### Without docker
* In backend/ run `npm start` or `npm run dev` (for nodemon start with hot reload)
* In frontend/ run `npm start`

When both back and front servers are started, visit `[address]:[port]` defined in .env. However, geolocation functionality requires the application to be accessed by `localhost:[port]`, so preferably visit: http://localhost:8000

## Testing
Applications e2e and integration tests are contained in `e2e/` directory.

### [Cypress](https://www.cypress.io/) automated tests
#### With docker
* To automatically run cypress tests using docker, in e2e/ directory run:
```
docker-compose up --exit-code-from cypress
```
This will run all cypress tests headlessly and view short report in console.

(To log only cypress output, uncomment logging related lines in `e2e/docker-compose.yml`)

(TODO: add custom reporter to generate pretty reports (e.g. allure))

#### Without docker
* To install required testing packages run `npm install` in e2e/.

* Having app already running, you can run cypress headlessly in console with `npm run cy:run` or open testing GUI with `npm run cy:open`.



### [Robot-framework](https://robotframework.org/) tests
#### Installation
In e2e/ directory run:
```
pip install -r requirements.txt
```
It is advisable to use dedicated python virtual environment - e.g. [virtualenv](https://virtualenv.pypa.io/en/latest/) or [conda](https://docs.conda.io/en/latest/).

#### Run

Run tests with
```
robot robot-framework-tests
```
(Current Robot Framework tests are not runnable.)
(TODO: Docker container and compose handling running tests and stubbing backend server responses)

## Contributors
* mrako ([Marko Klemetti](http://mrako.com/))
* adamnapieralski ([Adam Napieralski](http://adamnapieralski.github.io))
