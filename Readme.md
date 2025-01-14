## Connect Four

A CLI program for playing the game Connect Four.

## Install

```bash
npm i
```

## Run

To run a game, you must provide a json file to load an initial state of the game board.

```bash
npm run dev ./src/testConfig.json
```

## Test

```bash
npm test
```

## Using docker

```bach
docker build -t ts-cli-app .
docker run ts-cli-app
```

## Make a move

First run the game, then you will be able to choose a column by entering its number (1-7). This will update the game representation accordingly.

# @TODO update description
