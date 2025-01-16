# Connect Four

A CLI program to play the game Connect Four.

## Install

```bash
npm i
```

## Run

To run a game, you need to provide a json file to load an initial state of the game board. (please read part 'How to use it')

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

# How to use it

## 1. Create the json file that represents the state of the board.

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

## 2. Respect the 2 rules for building the game grid.

### you're not able to place a "flying token".

Like this wrong exemple:

[  
   [0, 0, 0, 0, 0, 0, 0],  
   [0, 0, 1, 0, 0, 0, 0],  
   [0, 0, 0, 0, 0, 0, 0],  
   [0, 0, 0, 0, 0, 0, 0],  
   [0, 0, 2, 0, 0, 0, 0],  
   [0, 0, 1, 0, 0, 0, 0],  
 ]  
 => tokens must fall to the bottom of the column.

### You must respect the correct number of tokens for each player.

Each player must have the same number of tokens +/-1 (depending on who have played first).

## 3. Save the file

Save the game grid where you want, in the format shown above, in a text (json) file.
Ex: `myGameGrid.json`

# Play a token

Once the game started, the board displayed, representing the provided json file.

![image](https://github.com/user-attachments/assets/65182e94-1e5d-412d-942e-1e1cc8a9ceb9)

Your token character is indicated below `-- You are player 2: x --`.

![image](https://github.com/user-attachments/assets/25fe91eb-c74f-4234-b151-1d8180b2f15c)

To add a token you have to choose a column number according to the display `  1   2   3   4   5   6   7  `.

![image](https://github.com/user-attachments/assets/a524a759-e02a-44d6-b4cc-ee9584309832)

Put your choice `Please enter the column number you want to play your token o [1-7]: `

![image](https://github.com/user-attachments/assets/3a60862a-46ba-414d-abfd-8038e1bb1a12)

then press enter

![image](https://github.com/user-attachments/assets/52a567ac-5714-4054-8881-9a7b8d639ba8)
