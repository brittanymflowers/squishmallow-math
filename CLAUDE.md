# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Starting the application:**

```bash
npm start              # Start local HTTP server on port 8080
npm run dev           # Start local HTTP server (same as start)
```

**Testing:**

```bash
npm test              # Currently outputs placeholder message - framework to be added
```

**Dependencies:**

```bash
# No dependencies needed - runs in any modern web browser
```

## Project Architecture

This is an educational math game built as a **web application** targeting 8-year-old children learning multiplication tables. The app uses a **client-side only architecture** with no server dependencies.

### Core Structure

**Web Application:**

- `src/index.html` - Single-page application with multiple screens managed via CSS classes
- `src/css/main.css` - Child-friendly styling with Squishmallow theme
- `src/js/main.js` - Main application controller (SquishCollectorApp class)
- `src/js/math-engine.js` - Problem generation and answer validation
- `src/js/collection-manager.js` - Squishmallow collection and reward system

### Screen Management System

The app uses a **single-page architecture** with screen switching via CSS classes:

- Loading screen → Dashboard → Game/Collection/Settings screens
- All screens exist in DOM, only one has `active` class at a time
- Screen transitions handled by `showScreen(screenId)` method

### Key Classes and Their Responsibilities

**SquishCollectorApp (main.js):**

- Central application controller
- Manages screen transitions and game state
- Handles UI events and user input
- Coordinates between MathEngine and CollectionManager

**MathEngine (math-engine.js):**

- Generates math problems for 4 operations: addition, subtraction, multiplication, division
- Configurable difficulty levels and number ranges
- Answer validation with child-friendly feedback
- Problem tracking and statistics

**CollectionManager (collection-manager.js):**

- Loads Squishmallow data from JSON
- Manages user collection persistence via localStorage
- Handles reward system with rarity-based weighted selection
- Collection statistics and display logic

### Game Flow Architecture

1. **Game Session**: User starts game → generates problems → tracks progress → awards Squishmallow
2. **Progress Tracking**: Visual progress bar, lives system (optional), timer (optional)
3. **Settings System**: Configurable difficulty, operations, game length, timer
4. **Collection System**: Earned Squishmallows stored locally, displayed in grid

## Data Management

**Local Storage:**

- `squishmallow-collection` - Array of collected Squishmallow IDs
- `squishCollectorSettings` - Game configuration object

**JSON Data Files:**

- `data/squishmallows.json` - Master list of available Squishmallows (not yet implemented)
- Fallback data embedded in CollectionManager for offline functionality

## Development Patterns

**Event Handling:**

- All buttons support both click and keyboard (Enter/Space) events
- Debouncing implemented to prevent double-clicks (200ms threshold)
- Physical keyboard input supported in game screen

**State Management:**

- Game state tracked in `gameState` object (progress, lives, timer)
- Settings managed in `settings` object with localStorage persistence
- No external state management library used

**UI Updates:**

- Icon updates via `lucide.createIcons()` after DOM changes
- Feedback system with toast-style messages
- Progressive visual updates (progress bars, lives display)

## Child-Friendly Design Principles

- **Large touch targets** - Buttons minimum 240px × 120px
- **High contrast colors** - Accessible color scheme with Squishmallow pastels
- **Clear visual hierarchy** - Icons, text, and visual feedback
- **Encouraging messaging** - Positive reinforcement, no harsh failure states
- **Simplified navigation** - Clear back buttons, escape key support

## Configuration and Customization

**Difficulty Levels:**

- Easy: 1-5 tables, simpler number ranges
- Medium: 1-8 tables
- Hard: 1-12 tables

**Operations Support:**

- Configurable operation mix (addition, subtraction, multiplication, division)
- Custom number ranges per operation type
- Weighted random problem selection

**Game Features:**

- Optional lives system (3 strikes)
- Optional timer with visual warnings
- Configurable game length (5-20 problems)
- Progress tracking with visual Squishmallow filling

## Testing and Debugging

**Development Mode:**

- Launch with `npm run dev` to enable DevTools
- Console logging throughout for debugging (`🎮`, `📝`, `✅` prefixed messages)
- Error handling with child-friendly error messages

**Manual Testing Areas:**

- All screen transitions and navigation
- Number pad input and validation
- Settings persistence and application
- Collection system and rewards
- Timer functionality when enabled

## Reference Documents

@/docs/PRD.md
user stories are located in /user-stories
