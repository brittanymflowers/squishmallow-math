# Squishmallow Collector - Math Adventure

A child-friendly educational math game built with Electron.

## Current Status: Phase 1 - Story 1.2 Complete ✅

### Story 1.2: Initialize Electron Project - COMPLETED

The basic Electron project structure has been successfully implemented:

- ✅ **package.json** created with Electron dependencies
- ✅ **main.js** created with basic Electron window setup (1024x768, child-friendly)
- ✅ **Basic HTML file** created as entry point with loading screen
- ✅ **Project can be launched** with `npm start`

### Features Implemented:

- Child-friendly color scheme from Story 1.1 design
- Loading screen with Squishmallow branding
- Basic screen management system
- Accessibility features (keyboard navigation, high contrast support)
- Error handling with child-friendly messages
- Responsive design for different screen sizes

### Project Structure:

```
squishmallow-math/
├── main.js              # Electron main process
├── package.json         # Project dependencies and scripts
├── src/
│   ├── index.html       # Main HTML entry point
│   ├── css/
│   │   └── main.css     # Child-friendly styling
│   └── js/
│       └── main.js      # App initialization logic
├── agents/              # Development agent documentation
├── docs/                # Project documentation
├── user-stories/        # Phase-based development plan
└── scripts/             # Development workflow scripts
```

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the application:**

   ```bash
   npm start
   ```

3. **Development mode (with DevTools):**
   ```bash
   npm run dev
   ```

## Next Steps

- **Story 1.3**: Create Basic Dashboard with three main buttons
- **Story 1.4**: Test Application Launch
- **Story 1.5**: Test Phase 1 Integration

## Target User

- Primary: 8-year-old students learning multiplication
- Secondary: Parents managing difficulty settings

## Design Principles

- Large, touch-friendly buttons (240px × 120px minimum)
- Bright, engaging colors (Squishmallow-inspired pastels)
- Child-friendly fonts (Quicksand + Fredoka One)
- Clear visual hierarchy and immediate feedback
- Accessibility compliance for young learners

---

**Status**: App launches successfully with child-friendly loading screen and basic framework ready for dashboard implementation! 🎮✨
