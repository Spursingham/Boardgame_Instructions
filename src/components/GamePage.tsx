import type { GameDefinition } from '../types';
import TutorialPlayer from './TutorialPlayer';

export default function GamePage({ game }: { game: GameDefinition }) {
  return (
    <main className="page">
      <a href="#/" className="back-link">← All games</a>
      <h1>{game.name}</h1>
      <p className="tagline">{game.tagline}</p>

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading">Overview</h2>
        <dl className="overview-grid">
          <div><dt>Players</dt><dd>{game.overview.players}</dd></div>
          <div><dt>Age</dt><dd>{game.overview.age}</dd></div>
          <div><dt>Duration</dt><dd>{game.overview.duration}</dd></div>
          <div><dt>Goal</dt><dd>{game.overview.goal}</dd></div>
        </dl>
      </section>

      <section aria-labelledby="setup-heading">
        <h2 id="setup-heading">Setup</h2>
        <ol>
          {game.setup.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </section>

      <section aria-labelledby="howto-heading">
        <h2 id="howto-heading">How to Play</h2>
        <ol>
          {game.howToPlay.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </section>

      {game.rules && (
        <section aria-labelledby="rules-heading">
          <h2 id="rules-heading">Full Rules</h2>
          {game.rules.map((section) => (
            <div key={section.heading} className="rule-section">
              <h3>{section.heading}</h3>
              <ul>
                {section.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      <section aria-labelledby="tutorial-heading">
        <h2 id="tutorial-heading">Interactive Tutorial</h2>
        <TutorialPlayer game={game} />
      </section>
    </main>
  );
}
