export enum PlayerNum {
  p1 = 1,
  p2 = 2,
  empty = 0,
}

export interface CountNbTokens {
  p1Count: number;
  p2Count: number;
  emptyCount: number;
}

export type BoardState = Array<Array<PlayerNum>>;

export interface VictoryState {
  player: PlayerNum;
  fourLineCoordinates: Array<[Number, number]>;
  isDraw: boolean;
}
export interface GameState {
  boardState: BoardState;
  currentPlayer: PlayerNum;
  victoryState: VictoryState;
}

export interface Game {
  id: number;
  gameState: GameState;
  initBoardState: string | undefined;
  gameType: GameType;
  stateVersion: number;
}

export enum GameType {
  oneScreen = 1,
  twoScreen = 2,
}

export interface GameStateVersionResponse {
  stateVersion: number;
}
