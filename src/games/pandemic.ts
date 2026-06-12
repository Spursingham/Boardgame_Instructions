import type { GameDefinition } from '../types';

const BLUE = '#3b9ae0';
const YELLOW = '#e8b73a';
const BLACK = '#9aa5b8';
const RED = '#e85a4f';
const LAND = '#1d3f4e';

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
  rules: [
    {
      heading: 'On your turn: take up to 4 actions',
      items: [
        'Drive / Ferry — move to a city connected to yours by a line.',
        'Direct Flight — discard a city card from your hand to fly straight to that city.',
        'Charter Flight — discard the card that matches the city you are in to fly anywhere on the board.',
        'Shuttle Flight — if you are at a research station, move to any other research station.',
        'Build a Research Station — discard the card matching your current city and place a station there (there are only 6 stations in the box).',
        'Treat Disease — remove 1 disease cube from your city. If that disease has already been cured, remove all of its cubes at once.',
        'Share Knowledge — give (or take) the city card matching the city you are in, to or from another player in the same city.',
        'Discover a Cure — at a research station, discard 5 city cards of the same colour to cure that disease. This is how you win!',
      ],
    },
    {
      heading: 'Then: draw 2 player cards',
      items: [
        'Take the top 2 cards of the player deck into your hand. If you ever hold more than 7 cards, discard or play down to 7.',
        'Event cards can be played at any time — even on another player\'s turn — and cost no actions. They do helpful things like move a player or skip an infection step.',
        'If you draw an Epidemic card, things get worse: move the infection rate marker up one space, put 3 cubes on the city shown on the bottom card of the infection deck, then shuffle the infection discard pile and put it back on top of the infection deck. (That means recently infected cities are about to be hit again!)',
        'If the player deck runs out of cards, the team loses immediately.',
      ],
    },
    {
      heading: 'Then: the diseases spread',
      items: [
        'Flip over infection cards equal to the current infection rate (it starts at 2 and rises with each epidemic).',
        'Add 1 disease cube of the matching colour to each city shown.',
        'Once a disease is cured AND every one of its cubes is off the board, it is eradicated — no new cubes of that colour are ever placed again.',
      ],
    },
    {
      heading: 'Outbreaks',
      items: [
        'A city can never hold a 4th cube of one colour. If it would, an outbreak happens instead: put 1 cube of that colour on every connected city.',
        'Outbreaks can chain! If a neighbouring city was already at 3 cubes, it outbreaks too. (Each city can only outbreak once per chain.)',
        'Every outbreak moves the outbreak marker one space. If the 8th outbreak ever happens, the team loses.',
      ],
    },
    {
      heading: 'Roles: everyone has a special power',
      items: [
        'Medic — removes ALL cubes of one colour when treating, and automatically clears cured diseases just by entering a city.',
        'Scientist — needs only 4 matching cards (not 5) to discover a cure.',
        'Researcher — can give any city card to a teammate in the same city, not just the matching one.',
        'Dispatcher — can move other players\' pawns on their turn, or move any pawn to a city containing another pawn.',
        'Operations Expert — builds research stations without discarding a card.',
        'Quarantine Specialist — prevents new cubes and outbreaks in her city and all connected cities.',
        'Contingency Planner — can retrieve a used Event card from the discard pile to play again later.',
      ],
    },
    {
      heading: 'Winning and losing',
      items: [
        'The team WINS the moment all 4 diseases are cured. You do not need to remove every cube — curing is enough!',
        'The team LOSES if the 8th outbreak happens, if you need to place a cube but the supply has run out, or if a player cannot draw 2 player cards because the deck is empty.',
        'Win or lose, you do it together — talk, plan, and help each other every turn.',
      ],
    },
  ],
  board: {
    width: 1100,
    height: 600,
    background: '#0a1a2c',
    regions: [
      { id: 'northamerica', points: '35,105 200,80 345,105 360,205 305,295 240,340 150,350 70,295 30,200', color: LAND },
      { id: 'southamerica', points: '205,350 305,340 365,405 365,510 290,555 225,530 190,435', color: LAND },
      { id: 'europe', points: '435,90 580,72 675,95 685,170 605,215 540,235 450,235 420,160', color: LAND },
      { id: 'africa', points: '435,250 565,242 625,300 605,425 520,480 455,425 425,330', color: LAND },
      { id: 'asia', points: '695,85 905,72 1005,125 1015,265 925,335 830,335 740,300 690,200', color: LAND },
      { id: 'oceania', points: '915,415 1035,415 1060,500 975,535 905,490', color: LAND },
    ],
    spaces: [
      // Blue region — North America & Western Europe
      { id: 'sanfrancisco', label: 'San Francisco', x: 75, y: 185, color: BLUE },
      { id: 'chicago', label: 'Chicago', x: 175, y: 160, color: BLUE },
      { id: 'montreal', label: 'Montréal', x: 265, y: 130, color: BLUE },
      { id: 'newyork', label: 'New York', x: 330, y: 180, color: BLUE },
      { id: 'washington', label: 'Washington', x: 290, y: 245, color: BLUE },
      { id: 'atlanta', label: 'Atlanta', x: 200, y: 250, color: BLUE },
      { id: 'london', label: 'London', x: 480, y: 125, color: BLUE },
      { id: 'madrid', label: 'Madrid', x: 465, y: 215, color: BLUE },
      { id: 'paris', label: 'Paris', x: 555, y: 170, color: BLUE },
      // Yellow region — Central & South America, West Africa
      { id: 'losangeles', label: 'Los Angeles', x: 80, y: 280, color: YELLOW },
      { id: 'mexicocity', label: 'Mexico City', x: 165, y: 330, color: YELLOW },
      { id: 'miami', label: 'Miami', x: 285, y: 320, color: YELLOW },
      { id: 'bogota', label: 'Bogotá', x: 250, y: 405, color: YELLOW },
      { id: 'lima', label: 'Lima', x: 225, y: 490, color: YELLOW },
      { id: 'saopaulo', label: 'São Paulo', x: 330, y: 480, color: YELLOW },
      { id: 'lagos', label: 'Lagos', x: 470, y: 350, color: YELLOW },
      // Black region — Eastern Europe, Middle East, India
      { id: 'moscow', label: 'Moscow', x: 645, y: 125, color: BLACK },
      { id: 'istanbul', label: 'Istanbul', x: 600, y: 195, color: BLACK },
      { id: 'cairo', label: 'Cairo', x: 565, y: 280, color: BLACK },
      { id: 'delhi', label: 'Delhi', x: 735, y: 240, color: BLACK },
      // Red region — East Asia & Oceania
      { id: 'shanghai', label: 'Shanghai', x: 855, y: 205, color: RED },
      { id: 'hongkong', label: 'Hong Kong', x: 845, y: 290, color: RED },
      { id: 'tokyo', label: 'Tokyo', x: 955, y: 175, color: RED },
      { id: 'sydney', label: 'Sydney', x: 980, y: 470, color: RED },
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
      { from: 'mexicocity', to: 'lima' },
      { from: 'mexicocity', to: 'bogota' },
      { from: 'bogota', to: 'lima' },
      { from: 'bogota', to: 'saopaulo' },
      { from: 'saopaulo', to: 'madrid' },
      { from: 'saopaulo', to: 'lagos' },
      { from: 'lagos', to: 'cairo' },
      { from: 'london', to: 'madrid' },
      { from: 'london', to: 'paris' },
      { from: 'madrid', to: 'paris' },
      { from: 'paris', to: 'istanbul' },
      { from: 'istanbul', to: 'moscow' },
      { from: 'istanbul', to: 'cairo' },
      { from: 'istanbul', to: 'delhi' },
      { from: 'delhi', to: 'hongkong' },
      { from: 'shanghai', to: 'hongkong' },
      { from: 'shanghai', to: 'tokyo' },
      { from: 'hongkong', to: 'sydney' },
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
      title: 'Draw player cards',
      text: 'After your 4 actions, you draw 2 player cards. Each shows a city and its colour. Cards are how you build things and discover cures — collect 5 city cards of the same colour to cure that disease!',
      boardActions: [
        { type: 'showCard', card: { id: 'card-chicago', name: 'Chicago', kind: 'City card', color: BLUE } },
        { type: 'showCard', card: { id: 'card-miami', name: 'Miami', kind: 'City card', color: YELLOW } },
        { type: 'highlight', targets: ['card-chicago', 'card-miami'] },
      ],
    },
    {
      title: 'Build a research station',
      text: 'If you are holding the card that matches the city you are in, you can spend an action to build a research station there. The orange player is in Chicago and just drew the Chicago card — they discard it to build a station. The team will need stations to discover cures.',
      boardActions: [
        { type: 'discardCard', cardId: 'card-chicago' },
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
      text: 'At the end of every turn, you flip infection cards and add new cubes to the cities shown. This one says London — so London gets a second blue cube, and the next card gives Madrid its first. The map never stays clean for long!',
      boardActions: [
        { type: 'showCard', card: { id: 'card-infect-london', name: 'London', kind: 'Infection card', color: '#3c4654' } },
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
      text: 'Collect 5 city cards of the same colour — like the Miami card you are holding — then travel to any research station and spend an action to cure that disease. Cure all four diseases and the whole team wins — good luck out there!',
      boardActions: [
        { type: 'discardCard', cardId: 'card-infect-london' },
        { type: 'highlight', targets: ['station-atlanta', 'station-chicago', 'card-miami'] },
      ],
    },
  ],
};

export default pandemic;
