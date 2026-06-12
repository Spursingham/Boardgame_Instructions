import type { GameDefinition } from '../types';

export default function HomePage({ games }: { games: GameDefinition[] }) {
  return (
    <main className="page">
      <h1>How to Play</h1>
      <p>Learn board games step by step, with the board animated in front of you.</p>
      <ul className="game-list">
        {games.map((game) => (
          <li key={game.id} className="game-card">
            <a href={`#/game/${game.id}`}>
              <h2>{game.name}</h2>
              <p>{game.tagline}</p>
              <p className="game-meta">
                {game.overview.players} · {game.overview.age} · {game.overview.duration}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
