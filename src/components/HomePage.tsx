import type { GameDefinition } from '../types';
import { boardStateAtStep } from '../boardState';
import Board from './Board';

export default function HomePage({ games }: { games: GameDefinition[] }) {
  return (
    <main className="page">
      <section className="hero">
        <p className="hero-kicker">Interactive animated tutorials</p>
        <h1>
          Learn any board game <span className="glow-text">in minutes</span>
        </h1>
        <p className="lead">
          No rulebook slog. Watch the pieces move, step by step, until the whole
          family is ready to play.
        </p>
        <a className="cta" href={`#/game/${games[0].id}`}>
          Start learning {games[0].name} →
        </a>
      </section>

      <h2 className="section-title">Game library</h2>
      <ul className="game-list">
        {games.map((game) => (
          <li key={game.id} className="game-card">
            <a href={`#/game/${game.id}`}>
              <div className="game-card-preview" aria-hidden="true">
                <Board
                  layout={game.board}
                  state={boardStateAtStep(game, -1)}
                  label={`${game.name} board preview`}
                />
              </div>
              <div className="game-card-body">
                <h3>{game.name}</h3>
                <p>{game.tagline}</p>
                <p className="game-meta">
                  {game.overview.players} · {game.overview.age} · {game.overview.duration}
                </p>
                <span className="card-cta">Learn to play →</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
