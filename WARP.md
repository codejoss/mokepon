# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Mokepon is a Pokémon-inspired battle game built with HTML5, CSS, and JavaScript. This is a frontend-only version where players select a character (Mokepon), navigate a map to find opponents, and engage in rock-paper-scissors style battles with elemental attacks (fire, water, grass). The game includes multiplayer networking code but requires a separate backend server to function fully.

## Architecture

### Frontend-Only Architecture
- **Frontend**: Vanilla HTML/CSS/JavaScript with Canvas for map rendering
- **Assets**: PNG images for characters and map backgrounds
- **Networking**: Includes multiplayer networking code (currently non-functional without backend)

### Key Components

#### Frontend Files
- `index.html`: Main game interface with three sections (pet selection, map navigation, battle)
- `mokepon.js`: Complete game logic client (~600+ lines)
- `style.css`: CSS styling with custom CSS variables and responsive design
- `assets/img/`: Game assets including character sprites and map backgrounds

### Data Flow
1. **Player Join**: Client connects via `/unirse` endpoint, receives unique player ID
2. **Pet Selection**: Player chooses Mokepon, sent via POST to `/mokepon/:jugadorId`
3. **Map Phase**: Real-time position updates via `/mokepon/:jugadorId/posicion`
4. **Battle Phase**: Attack sequences coordinated via `/mokepon/:jugadorId/ataques`

## Development Commands

### Serve the Game Locally
Since this is a frontend-only project, you can serve it with any static file server:

#### Using Python (built-in)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Access game at `http://localhost:8000`

#### Using Node.js serve (install globally first)
```bash
npm install -g serve
serve .
```

#### Using Live Server (VS Code Extension)
Install the Live Server extension and right-click `index.html` → "Open with Live Server"

#### Direct File Opening
**Note**: Opening `index.html` directly in browser (file://) may cause CORS issues with image loading. Use a local server instead.

## Code Architecture Details

### Game State Management
- **Mokepon Classes**: Client-side class system for game entities
- **Battle System**: Turn-based with 5-attack sequences, rock-paper-scissors mechanics
- **Local Storage**: Game state managed entirely in browser memory

### Client-Side Canvas System
- Map rendering with background images and sprite positioning
- Collision detection for player encounters
- Real-time position synchronization with server
- Keyboard and touch controls for movement

### Network Architecture (Currently Non-Functional)
- Contains multiplayer networking code for future backend integration
- RESTful API calls to endpoints like `/unirse`, `/mokepon/:jugadorId`
- Automatic server URL detection (localhost vs production)
- **Note**: Multiplayer features require a separate backend server

### Battle Mechanics
- **Attack Types**: Fire beats Grass, Water beats Fire, Grass beats Water
- **Character Selection**: Choose from Hipodoge (Water), Capipepo (Grass), or Ratigueya (Fire)
- **Map Navigation**: Use arrow keys or on-screen buttons to move around the map
- **Battle Trigger**: Currently handled through collision detection (non-functional without backend)
- **Attack Selection**: Players choose attacks from character-specific movesets

## File Structure Notes

### Assets Directory
The game includes PNG images in `assets/img/` directory:
- `mokemap.png` (background map for canvas rendering)
- `capipepo.png`, `hipodoge.png`, `ratigueya.png` (Mokepon character sprites)
- `ash.png`, `Gary_Oak.png` (trainer sprites)

### Key Files
- `index.html` - Main game interface
- `mokepon.js` - Complete game logic and canvas rendering
- `style.css` - Game styling with CSS custom properties
- `README.md` - Project description in Spanish

## Development Considerations

### Current Limitations
- **Single-player only**: Multiplayer features are coded but non-functional without backend
- **Static file serving**: No build process or package management required
- **Browser compatibility**: Uses modern JavaScript (ES6+) and Canvas 2D API

### Multiplayer Implementation (Future)
- Contains networking code for server integration
- Automatic server URL detection already implemented
- Ready for backend connection once server is available

### Browser Compatibility
- Uses modern JavaScript features (arrow functions, fetch API, classes)
- Canvas 2D context for map rendering
- Touch event support for mobile controls

## Troubleshooting

### Common Issues

#### Images Not Loading
- Ensure you're serving the project via HTTP, not opening the HTML file directly
- Check that all images exist in `assets/img/` directory
- Verify image paths are correct (absolute paths starting with `/assets/`)

#### Game Not Starting
- Open browser developer console (F12) to check for JavaScript errors
- Verify all DOM elements are properly loaded before JavaScript execution

#### Canvas Not Rendering
- Check browser support for HTML5 Canvas
- Ensure proper canvas dimensions are calculated based on viewport
