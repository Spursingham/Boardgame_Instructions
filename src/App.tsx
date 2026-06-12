import { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import { games } from './games';

/** Tiny hash router: '#/' is home, '#/game/<id>' is a game page. */
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const gameMatch = hash.match(/^#\/game\/([\w-]+)/);
  const game = gameMatch ? games.find((g) => g.id === gameMatch[1]) : undefined;

  return (
    <div className="site">
      <header className="site-header">
        <a href="#/" className="site-logo">
          <span aria-hidden="true">⬡</span> How to Play
        </a>
        <nav aria-label="Main">
          <a href="#/">Games</a>
        </nav>
      </header>

      {gameMatch && !game ? (
        <main className="page">
          <h1>Game not found</h1>
          <p className="lead"><a className="back-link" href="#/">← Back to all games</a></p>
        </main>
      ) : game ? (
        <GamePage game={game} />
      ) : (
        <HomePage games={games} />
      )}

      <footer className="site-footer">
        <p>Built for family game nights · New games are just a data file away</p>
      </footer>
    </div>
  );
}
