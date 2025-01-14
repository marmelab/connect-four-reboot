## Connect Four

A CLI program to play the game Connect Four.

## Install

```bash
npm i
```

## Run

To run a game, you need to provide a json file to load an initial state of the game board.

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

## How to use it

1. Create the json file that represents the state of the board.

Based on this model:

[
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
]

It's a representation of the game grid: each 0 represents an empty space. To place a token, you have to replace the 0 character:

- 0 for empty space
- 1 for a player 1 token
- 2 for a player 2 token

For example, if player 1 placed a token in the third column :
[
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0],
]
... and if player 2 places a token in the same column :
[
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0],
]

... and so on.

2. Respect the 2 rules for building the game grid.

- you're not able to place a "flying token" like this :
  [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  ]
  => tokens must fall to the bottom of the column.

- You must respect the correct number of tokens for each player: they must have the same number of tokens +/-1 (depending on who have played first).

3. Save the file
   Save the game grid where you want, in the format shown above, in a text (json) file.
   Ex: `myGameGrid.json`

4. Run the game

Run the game first with this command in a term (please put the correct path for your file):
`npm run dev ./src/myGameGrid.json`

## Make a move

First run the game, then you will be able to play into a column by entering its number (1-7). This will update the game representation accordingly.
