/**
 * Everything a game needs is described by a GameDefinition.
 * The board renderer and tutorial player consume this data generically;
 * no component contains game-specific logic.
 */

/** A named location on the board (a city, square, point, etc.). */
export interface BoardSpace {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Fill colour of the space marker. */
  color?: string;
  /** Radius of the space marker in viewBox units. */
  radius?: number;
}

/** A line drawn between two spaces (a route, edge, track segment). */
export interface BoardConnection {
  from: string;
  to: string;
}

export interface BoardLayout {
  /** SVG viewBox dimensions; all coordinates are in these units. */
  width: number;
  height: number;
  background?: string;
  spaces: BoardSpace[];
  connections: BoardConnection[];
}

/** A movable piece sitting on a space. */
export interface Piece {
  id: string;
  /** Which space the piece starts on. */
  spaceId: string;
  shape: 'pawn' | 'cube' | 'building' | 'disc';
  color: string;
  /** Accessible name, e.g. "Blue player pawn". */
  label: string;
}

/** Declarative things a tutorial step can do to the board. */
export type BoardAction =
  | { type: 'move'; pieceId: string; toSpaceId: string }
  | { type: 'remove'; pieceId: string }
  | { type: 'add'; piece: Piece }
  /** Draw attention to spaces and/or pieces for the duration of the step. */
  | { type: 'highlight'; targets: string[] };

export interface TutorialStep {
  title: string;
  text: string;
  boardActions: BoardAction[];
}

export interface GameDefinition {
  id: string;
  name: string;
  tagline: string;
  overview: {
    players: string;
    age: string;
    duration: string;
    goal: string;
  };
  setup: string[];
  howToPlay: string[];
  board: BoardLayout;
  /** Starting position. */
  pieces: Piece[];
  tutorial: TutorialStep[];
}
