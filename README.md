<!-- Build a web app that allows users to make guesses on whether the market price of Bitcoin (BTC/USD) will be higher or lower after one minute.
Rules:
- The player can at all times see their current score and the latest available BTC price in USD
- The player can choose to enter a guess of either “up” or “down“
- After a guess is entered the player cannot make new guesses until the existing guess is resolved
- The guess is resolved when the price changes and at least 60 seconds have passed since the guess was made
- If the guess is correct (up = price went higher, down = price went lower), the user gets 1 point added to their score. If
the guess is incorrect, the user loses 1 point.
- Players can only make one guess at a time
- New players start with a score of 0
Solution requirements:
- The guesses should be resolved fairly using BTC price data from any available 3rd party API
- The score of each player should be persisted in a backend data store (AWS services preferred)
- Players should be able to close their browser and return back to see their score and continue to make more guesses

Testing is encouraged.

Describe the app's functionality as well as how to run and deploy the application to the best of your ability in a README file.
Please provide the project in a public git repository. -->

## Requirements ##
- node v16.13.0
- docker (technically not entirely needed; postgres can be ran locally, with the `.env` creds updated as such)

## Run Everything ##
1. via `/backend`, run `docker-compose up` to get postgres up & running through docker
2. create a `backend/.env` and `MinuteBets/.env`. see `.env.example` for reference, or `cp .env.example .env` to create a local env file for both. If running postgres via Docker and the default ports, both should be accurate for local testing!
3. configure db migrations by navigating to `/backend` and running `yarn` followed by`yarn typeorm`.
4. from root dir: `yarn start` to run both applications! 
*note:* you may need to refresh the web-page once Nest is fully deployed, could take ~10 seconds

## Tests ##
1. via `/backend`, run `yarn typeorm:test` to prepare the testdb migrations for testing
2. from root dir: `yarn test` to run all tests (or individually in each if desired)

# MinuteBets #
- Through the web-app, one is able to select a desired "bet" for BTC's future price, judging from it's current price on whether or not it will be higher/lower in the next minute. 
- To select a bet, use the Select Dropdown. (UP: betting the price will be higher; DOWN: price being lower) 
- Then click "Place" to submit the bet
- One is able to see their current score, number of past guesses, BTC's current price, and time until their current guess expires. When the guess does expire, the final results will be shown
- User authentication/sessions are managed with basic uuids stored via cookies. Some of the technologies leveraged for the entire stack are listed below:

<img width="490" alt="image" src="https://user-images.githubusercontent.com/89276242/184519357-58d94be8-22bc-4969-88f5-3caeb49ad5a8.png">

### NestJS ###
- Nest really brings finesse into building backends with typescript. The decorators are also very simple & keep things explicit, and it pairs nicely with Typeorm

### TypeORM ###
- Database model translations & fits very nicely with NestJS. Very simple to use query interface as well, and (personally) enjoy it's querybuilder over Sequelizer

### i18n ###
- Ease of global localization/translations

### sass ###
- Simplifies styling, and personally is my favorite for styling readibility inline with React

### yarn ###
- Faster then npm & has `yarn workspaces`

## Additional Thoughts/Todos ##
- consider sockets as they would likely improve any latency issues / the real-time experience for users (require paid APIs)
- - realtime price updates while the wager is active, especially for longer bets (e.g hourly)
- improve UI test coverage (with invocations)

