import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Card } from '../types';

interface CardHandProps {
  cards: Card[];
  highlights: Set<string>;
}

/**
 * Generic hand of cards below the board. Cards flip in when drawn
 * and flip away when discarded; the 3D rotation comes from CSS
 * perspective on the container.
 */
export default function CardHand({ cards, highlights }: CardHandProps) {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 200, damping: 22 };

  return (
    <div className="card-hand" role="group" aria-label="Cards in play">
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={highlights.has(card.id) ? 'card card-highlight' : 'card'}
            style={{ borderTopColor: card.color }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotateY: 100, y: 30 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotateY: -100, y: -40 }}
            transition={transition}
          >
            <span className="card-kind" style={{ background: card.color }}>
              {card.kind}
            </span>
            <span className="card-name">{card.name}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      {cards.length === 0 && <p className="card-empty">No cards in play yet</p>}
    </div>
  );
}
