import type { GameDefinition } from '../types';

const BLUE = '#3b82c4';
const YELLOW = '#d9a520';

/**
 * Pandemic, simplified for first-time players. The board is a teaching
 * subset of the real map: the blue (North America / Europe) and yellow
 * (Central / South America) regions.
 */
const pandemic: GameDefinition = {
  id: 'pandemic',
  name: 'Pandemic',
  tagline: 'Work together to stop four diseases from spreading across the world.',
  overview: {
    players: '2–4 players',
    age: 'Ages 8 and up',
    duration: 'About 45 minutes',
    goal: 'Pandemic is a team game: everyone wins or loses together. Find the cure for all four diseases before they spread out of control.',
  },
  setup: [
    'Unfold the board so everyone can reach it. It shows a world map of cities connected by lines.',
    'Place one research station on Atlanta. Every player puts their pawn there too — Atlanta is home base.',
    'Shuffle the infection cards. Draw nine of them, and place disease cubes on those nine cities (three cubes on the first three cities, two on the next three, one on the last three).',
    'Give each player a role card and a few player cards. Your role gives you a special power — for example, the Medic is extra good at treating diseases.',
    'Put the remaining player cards and infection cards face down where everyone can reach them. You are ready to play!',
  ],
  howToPlay: [
    'On your turn, you take up to 4 actions. The most common actions are: move to a connected city, treat a disease (remove a cube from your city), build a research station, or share a card with a teammate in the same city.',
    'After your actions, draw 2 player cards. Collect 5 city cards of the same colour to discover a cure for that disease.',
    'Then the diseases strike back: flip infection cards and add new disease cubes to the cities shown.',
    'If a city would ever get a 4th cube, it has an outbreak — cubes spill into every neighbouring city. Too many outbreaks and the team loses.',
    'Cure all four diseases and the whole team wins!',
  ],
  board: {
    width: 1000,
    height: 630,
    background: '#dce9f5',
    spaces: [
      { id: 'sanfrancisco', label: 'San Francisco', x: 110, y: 190, color: BLUE },
      { id: 'chicago', label: 'Chicago', x: 270, y: 150, color: BLUE },
      { id: 'montreal', label: 'Montréal', x: 415, y: 120, color: BLUE },
      { id: 'newyork', label: 'New York', x: 530, y: 170, color: BLUE },
      { id: 'washington', label: 'Washington', x: 480, y: 270, color: BLUE },
      { id: 'atlanta', label: 'Atlanta', x: 330, y: 260, color: BLUE },
      { id: 'london', label: 'London', x: 730, y: 110, color: BLUE },
      { id: 'madrid', label: 'Madrid', x: 750, y: 240, color: BLUE },
      { id: 'paris', label: 'Paris', x: 870, y: 170, color: BLUE },
      { id: 'losangeles', label: 'Los Angeles', x: 130, y: 340, color: YELLOW },
      { id: 'mexicocity', label: 'Mexico City', x: 250, y: 410, color: YELLOW },
      { id: 'miami', label: 'Miami', x: 440, y: 380, color: YELLOW },
      { id: 'bogota', label: 'Bogotá', x: 420, y: 500, color: YELLOW },
      { id: 'lima', label: 'Lima', x: 330, y: 575, color: YELLOW },
    ],
    connections: [
      { from: 'sanfrancisco', to: 'chicago' },
      { from: 'sanfrancisco', to: 'losangeles' },
      { from: 'chicago', to: 'montreal' },
      { from: 'chicago', to: 'atlanta' },
      { from: 'chicago', to: 'mexicocity' },
      { from: 'chicago', to: 'losangeles' },
      { from: 'montreal', to: 'newyork' },
      { from: 'montreal', to: 'washington' },
      { from: 'newyork', to: 'washington' },
      { from: 'newyork', to: 'london' },
      { from: 'newyork', to: 'madrid' },
      { from: 'washington', to: 'atlanta' },
      { from: 'washington', to: 'miami' },
      { from: 'atlanta', to: 'miami' },
      { from: 'miami', to: 'mexicocity' },
      { from: 'miami', to: 'bogota' },
      { from: 'losangeles', to: 'mexicocity' },
      { from: 'mexicocity', to: 'bogota' },
      { from: 'bogota', to: 'lima' },
      { from: 'london', to: 'madrid' },
      { from: 'london', to: 'paris' },
      { from: 'madrid', to: 'paris' },
    ],
  },
  pieces: [
    { id: 'station-atlanta', spaceId: 'atlanta', shape: 'building', color: '#f5f5f0', label: 'Research station in Atlanta' },
    { id: 'pawn-orange', spaceId: 'atlanta', shape: 'pawn', color: '#e05c3a', label: 'Orange player pawn' },
    { id: 'pawn-green', spaceId: 'atlanta', shape: 'pawn', color: '#2e9e6b', label: 'Green player pawn' },
    { id: 'cube-chicago-1', spaceId: 'chicago', shape: 'cube', color: BLUE, label: 'Blue disease cube in Chicago' },
    { id: 'cube-chicago-2', spaceId: 'chicago', shape: 'cube', color: BLUE, label: 'Blue disease cube in Chicago' },
    { id: 'cube-london-1', spaceId: 'london', shape: 'cube', color: BLUE, label: 'Blue disease cube in London' },
    { id: 'cube-miami-1', spaceId: 'miami', shape: 'cube', color: YELLOW, label: 'Yellow disease cube in Miami' },
    { id: 'cube-miami-2', spaceId: 'miami', shape: 'cube', color: YELLOW, label: 'Yellow disease cube in Miami' },
    { id: 'cube-bogota-1', spaceId: 'bogota', shape: 'cube', color: YELLOW, label: 'Yellow disease cube in Bogotá' },
  ],
  tutorial: [
    {
      title: 'Welcome to Pandemic',
      text: 'In Pandemic, you are a team of disease-fighting specialists. You win together by curing all the diseases — or lose together if they spread too far. Everything starts in Atlanta, home of the disease control centre.',
      boardActions: [{ type: 'highlight', targets: ['atlanta'] }],
    },
    {
      title: 'Cities and routes',
      text: 'The board is a map of cities joined by lines. Pawns travel along those lines, and diseases spread along them too. Each city has a colour — that is the colour of the disease that usually appears there.',
      boardActions: [{ type: 'highlight', targets: ['chicago', 'montreal', 'newyork', 'london'] }],
    },
    {
      title: 'Your home base',
      text: 'Every player starts in Atlanta, next to its research station (the little white building). Research stations are where cures are discovered later in the game.',
      boardActions: [{ type: 'highlight', targets: ['station-atlanta', 'pawn-orange', 'pawn-green'] }],
    },
    {
      title: 'Watch out for disease cubes',
      text: 'The small squares are disease cubes — they show where infections are. A city with cubes is in trouble: if it ever needs a fourth cube, the disease spills into every neighbouring city. That is called an outbreak, and you want to avoid those!',
      boardActions: [
        {
          type: 'highlight',
          targets: ['cube-chicago-1', 'cube-chicago-2', 'cube-london-1', 'cube-miami-1', 'cube-miami-2', 'cube-bogota-1'],
        },
      ],
    },
    {
      title: 'Take your turn: move',
      text: 'On your turn you take up to 4 actions. The simplest action is moving to a connected city. Watch the orange pawn drive from Atlanta to Chicago along the line between them.',
      boardActions: [
        { type: 'move', pieceId: 'pawn-orange', toSpaceId: 'chicago' },
        { type: 'highlight', targets: ['chicago'] },
      ],
    },
    {
      title: 'Treat a disease',
      text: 'When your pawn is in a city with disease cubes, you can spend an action to treat the disease: remove one cube. The orange player removes one of the blue cubes in Chicago.',
      boardActions: [{ type: 'remove', pieceId: 'cube-chicago-1' }],
    },
    {
      title: 'Treat it again',
      text: 'Treating costs one action per cube, so the orange player spends another action to remove the last cube. Chicago is now disease-free! (Tip: the Medic role removes all the cubes in a city with a single action.)',
      boardActions: [{ type: 'remove', pieceId: 'cube-chicago-2' }],
    },
    {
      title: 'Build a research station',
      text: 'If you are holding the card that matches the city you are in, you can spend an action to build a research station there. The orange player builds one in Chicago — the team will need stations to discover cures.',
      boardActions: [
        {
          type: 'add',
          piece: { id: 'station-chicago', spaceId: 'chicago', shape: 'building', color: '#f5f5f0', label: 'Research station in Chicago' },
        },
        { type: 'highlight', targets: ['station-chicago'] },
      ],
    },
    {
      title: 'Work as a team',
      text: 'While one player handles Chicago, the green player heads the other way: down to Miami to treat a yellow cube there. Splitting up to cover more of the map is how good teams win.',
      boardActions: [
        { type: 'move', pieceId: 'pawn-green', toSpaceId: 'miami' },
        { type: 'remove', pieceId: 'cube-miami-1' },
      ],
    },
    {
      title: 'Diseases fight back',
      text: 'At the end of every turn, you flip infection cards and add new cubes to the cities shown. Here, London gets a second blue cube and Madrid gets its first. The map never stays clean for long!',
      boardActions: [
        {
          type: 'add',
          piece: { id: 'cube-london-2', spaceId: 'london', shape: 'cube', color: BLUE, label: 'Blue disease cube in London' },
        },
        {
          type: 'add',
          piece: { id: 'cube-madrid-1', spaceId: 'madrid', shape: 'cube', color: BLUE, label: 'Blue disease cube in Madrid' },
        },
        { type: 'highlight', targets: ['london', 'madrid'] },
      ],
    },
    {
      title: 'How you win',
      text: 'Collect 5 city cards of the same colour, travel to any research station, and spend an action to cure that disease. Cure all four diseases and the whole team wins — good luck out there!',
      boardActions: [{ type: 'highlight', targets: ['station-atlanta', 'station-chicago'] }],
    },
  ],
};

export default pandemic;
