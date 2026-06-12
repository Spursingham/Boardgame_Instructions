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

  if (gameMatch && !game) {
    return (
      <main className="page">
        <h1>Game not found</h1>
        <p><a href="#/">Back to all games</a></p>
      </main>
    );
  }

  return game ? <GamePage game={game} /> : <HomePage games={games} />;
}
