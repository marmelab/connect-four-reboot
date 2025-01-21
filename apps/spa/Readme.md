# Connect Four

A Web page to play the game Connect Four.

## Install

```bash
npm i
```

## Run

You need to start the server before using a browser to display the web page. You have two solutions:

- using monorepo commands (as described in the [specifc Readme.md file of the monorepo](../../Readme.md))
- using spa app commands:

```bash
// path: connect-four-reboot/apps/spa
npm run dev
```

Then open your favorite browser and go to [the Connect Four Reboot board game page](http://localhost:3000/connect4Page?state=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C0%2C0%2C0%2C0%2C0%2C2%2C2%2C1%2C0%2C2%2C0%2C0%2C1%2C2%2C2%2C2%2C1%2C0%2C1%2C1%2C2%2C1%2C1%2C1%2C2%2C1).

# How to configure the board with a given playing state

Using the given url above, you can modify the displayed board, changing the values in the request:  
state=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C0%2C0%2C0%2C0%2C0%2C2%2C2%2C1%2C0%2C2%2C0%2C0%2C1%2C2%2C2%2C2%2C1%2C0%2C1%2C1%2C2%2C1%2C1%2C1%2C2%2C1  
will display this board:

0,0,0,0,0,0,0  
0,0,0,0,0,0,0  
0,1,0,0,0,0,0  
2,2,1,0,1,0,0  
1,2,2,2,1,0,1  
1,2,1,1,1,2,1  

With :

- 0 for empty square
- 1 for yellow token
- 2 for red token
