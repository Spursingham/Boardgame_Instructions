import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { BoardLayout, Piece } from '../types';
import type { BoardState } from '../boardState';

interface BoardProps {
  layout: BoardLayout;
  state: BoardState;
  /** Accessible name for the whole board, e.g. "Pandemic game board". */
  label: string;
}

/** Visual footprint of each piece shape, drawn centred on (0, 0). */
function PieceShape({ piece }: { piece: Piece }) {
  switch (piece.shape) {
    case 'pawn':
      return (
        <g>
          <circle cx={0} cy={-10} r={6} fill={piece.color} stroke="#1f2430" strokeWidth={1.5} />
          <path d="M -7 8 Q 0 -8 7 8 Z" fill={piece.color} stroke="#1f2430" strokeWidth={1.5} />
        </g>
      );
    case 'cube':
      return <rect x={-6} y={-6} width={12} height={12} rx={2} fill={piece.color} stroke="#1f2430" strokeWidth={1.5} />;
    case 'building':
      return (
        <g>
          <rect x={-9} y={-3} width={18} height={11} rx={1} fill={piece.color} stroke="#1f2430" strokeWidth={1.5} />
          <path d="M -11 -3 L 0 -12 L 11 -3 Z" fill={piece.color} stroke="#1f2430" strokeWidth={1.5} />
        </g>
      );
    case 'disc':
      return <circle r={7} fill={piece.color} stroke="#1f2430" strokeWidth={1.5} />;
  }
}

/**
 * Pieces sharing a space are fanned out around it so they stay visible.
 * Slots are assigned by order within the pieces array, which is stable
 * across steps, so pieces don't shuffle when a neighbour moves away.
 */
function piecePosition(piece: Piece, slot: number, layout: BoardLayout) {
  const space = layout.spaces.find((s) => s.id === piece.spaceId);
  if (!space) return { x: 0, y: 0 };
  const offsets = [
    { x: 0, y: -22 },
    { x: 20, y: -10 },
    { x: -20, y: -10 },
    { x: 14, y: 16 },
    { x: -14, y: 16 },
    { x: 0, y: 28 },
  ];
  const o = offsets[slot % offsets.length];
  return { x: space.x + o.x, y: space.y + o.y };
}

export default function Board({ layout, state, label }: BoardProps) {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 120, damping: 16 };

  // Assign each piece a slot index among the pieces on its space.
  const slotCounts = new Map<string, number>();
  const slots = new Map<string, number>();
  for (const piece of state.pieces) {
    const n = slotCounts.get(piece.spaceId) ?? 0;
    slots.set(piece.id, n);
    slotCounts.set(piece.spaceId, n + 1);
  }

  const spaceById = new Map(layout.spaces.map((s) => [s.id, s]));

  return (
    <svg
      className="board"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={label}
      style={{ background: layout.background ?? '#dfe8f0' }}
    >
      <defs>
        <filter id="piece-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="5" stdDeviation="3" floodColor="#1f2430" floodOpacity="0.35" />
        </filter>
        <filter id="space-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#1f2430" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Decorative regions (continents, zones) behind everything */}
      {layout.regions?.map((region) => (
        <polygon
          key={region.id}
          points={region.points}
          fill={region.color}
          stroke="rgba(31, 36, 48, 0.18)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      ))}

      {/* Connections */}
      {layout.connections.map((c) => {
        const a = spaceById.get(c.from);
        const b = spaceById.get(c.to);
        if (!a || !b) return null;
        return (
          <line
            key={`${c.from}-${c.to}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="rgba(255, 255, 255, 0.75)" strokeWidth={3} strokeDasharray="1 6" strokeLinecap="round"
          />
        );
      })}

      {/* Spaces */}
      {layout.spaces.map((s) => {
        const highlighted = state.highlights.has(s.id);
        const r = s.radius ?? 12;
        return (
          <g key={s.id}>
            {highlighted && (
              <motion.circle
                cx={s.x} cy={s.y} r={r + 8}
                fill="none" stroke="#f4b400" strokeWidth={4}
                initial={false}
                animate={reducedMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
                transition={reducedMotion ? { duration: 0 } : { duration: 1.6, repeat: Infinity }}
              />
            )}
            <circle
              cx={s.x} cy={s.y} r={r}
              fill={s.color ?? '#5b7a99'} stroke="#1f2430" strokeWidth={2}
              filter="url(#space-shadow)"
            />
            <text
              x={s.x} y={s.y + r + 15}
              textAnchor="middle"
              className="space-label"
            >
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Pieces */}
      <AnimatePresence>
        {state.pieces.map((piece) => {
          const pos = piecePosition(piece, slots.get(piece.id) ?? 0, layout);
          const highlighted = state.highlights.has(piece.id);
          return (
            <motion.g
              key={piece.id}
              filter="url(#piece-shadow)"
              initial={
                reducedMotion
                  ? { opacity: 0, x: pos.x, y: pos.y }
                  : { opacity: 0, scale: 0.4, x: pos.x, y: pos.y - 45 }
              }
              animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: pos.y - 45 }}
              transition={transition}
              aria-label={piece.label}
            >
              {highlighted && (
                <motion.circle
                  r={16}
                  fill="none" stroke="#f4b400" strokeWidth={3}
                  initial={false}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 1.6, repeat: Infinity }}
                />
              )}
              <PieceShape piece={piece} />
            </motion.g>
          );
        })}
      </AnimatePresence>
    </svg>
  );
}
