import type { Card, GameDefinition, Piece } from './types';

export interface BoardState {
  pieces: Piece[];
  /** Cards currently shown in the hand area. */
  cards: Card[];
  /** Space, piece, and card ids highlighted by the current step. */
  highlights: Set<string>;
}

/**
 * Compute the board after applying every step up to and including
 * `stepIndex` (-1 means the starting position). Because state is always
 * derived from the start, stepping backward is just recomputing with a
 * smaller index — no inverse actions needed.
 */
export function boardStateAtStep(game: GameDefinition, stepIndex: number): BoardState {
  let pieces = game.pieces.slice();
  let cards: Card[] = [];
  const highlights = new Set<string>();

  for (let i = 0; i <= stepIndex && i < game.tutorial.length; i++) {
    const isCurrent = i === stepIndex;
    for (const action of game.tutorial[i].boardActions) {
      switch (action.type) {
        case 'move':
          pieces = pieces.map((p) =>
            p.id === action.pieceId ? { ...p, spaceId: action.toSpaceId } : p
          );
          break;
        case 'remove':
          pieces = pieces.filter((p) => p.id !== action.pieceId);
          break;
        case 'add':
          pieces = [...pieces, action.piece];
          break;
        case 'showCard':
          cards = [...cards, action.card];
          break;
        case 'discardCard':
          cards = cards.filter((c) => c.id !== action.cardId);
          break;
        case 'highlight':
          // Highlights only apply while their step is the current one.
          if (isCurrent) action.targets.forEach((t) => highlights.add(t));
          break;
      }
    }
  }

  return { pieces, cards, highlights };
}
