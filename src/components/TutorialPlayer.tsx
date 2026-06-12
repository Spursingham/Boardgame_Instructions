import { useState } from 'react';
import type { GameDefinition } from '../types';
import { boardStateAtStep } from '../boardState';
import Board from './Board';
import CardHand from './CardHand';

interface TutorialPlayerProps {
  game: GameDefinition;
}

/**
 * Generic step-through tutorial: works for any GameDefinition.
 * stepIndex -1 shows the starting position before the first step.
 */
export default function TutorialPlayer({ game }: TutorialPlayerProps) {
  const [stepIndex, setStepIndex] = useState(-1);
  const state = boardStateAtStep(game, stepIndex);
  const step = stepIndex >= 0 ? game.tutorial[stepIndex] : null;
  const total = game.tutorial.length;

  return (
    <div className="tutorial">
      <div className="board-stage">
        <div className="board-tilt">
          <Board layout={game.board} state={state} label={`${game.name} game board`} />
        </div>
      </div>

      <CardHand cards={state.cards} highlights={state.highlights} />

      <div className="tutorial-panel">
        <p className="step-counter" aria-hidden="true">
          {step ? `Step ${stepIndex + 1} of ${total}` : 'Starting position'}
        </p>
        <div className="step-dots" aria-hidden="true">
          {game.tutorial.map((_, i) => (
            <span
              key={i}
              className={i === stepIndex ? 'dot active' : i < stepIndex ? 'dot done' : 'dot'}
            />
          ))}
        </div>
        <div aria-live="polite" className="step-body">
          <h3>{step ? step.title : 'The board is set up'}</h3>
          <p>
            {step
              ? step.text
              : 'This is how the game looks at the start. Press Next to begin the tutorial.'}
          </p>
        </div>
        <div className="tutorial-controls">
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.max(i - 1, -1))}
            disabled={stepIndex <= -1}
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.min(i + 1, total - 1))}
            disabled={stepIndex >= total - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
