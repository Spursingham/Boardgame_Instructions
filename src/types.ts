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

/** A decorative filled shape drawn behind the spaces (continent, zone, etc.). */
export interface BoardRegion {
  id: string;
  /** SVG polygon points string, e.g. "40,110 200,90 340,110". */
  points: string;
  color: string;
}

export interface BoardLayout {
  /** SVG viewBox dimensions; all coordinates are in these units. */
  width: number;
  height: number;
  background?: string;
  regions?: BoardRegion[];
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

/** A card a player can draw, hold, or discard during the tutorial. */
export interface Card {
  id: string;
  name: string;
  /** Shown as the card's small header, e.g. "City card" or "Infection card". */
  kind: string;
  /** Accent colour of the card face. */
  color: string;
}

/** Declarative things a tutorial step can do to the board. */
export type BoardAction =
  | { type: 'move'; pieceId: string; toSpaceId: string }
  | { type: 'remove'; pieceId: string }
  | { type: 'add'; piece: Piece }
  /** Deal a card into the visible hand (animated flip). */
  | { type: 'showCard'; card: Card }
  /** Remove a card from the visible hand (animated discard). */
  | { type: 'discardCard'; cardId: string }
  /** Draw attention to spaces, pieces, and/or cards for the duration of the step. */
  | { type: 'highlight'; targets: string[] };

export interface TutorialStep {
  title: string;
  text: string;
  boardActions: BoardAction[];
}

/** A titled group of rule points for the optional Full Rules section. */
export interface RuleSection {
  heading: string;
  items: string[];
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
  /** Optional complete rules reference, shown below How to Play. */
  rules?: RuleSection[];
  board: BoardLayout;
  /** Starting position. */
  pieces: Piece[];
  tutorial: TutorialStep[];
}
