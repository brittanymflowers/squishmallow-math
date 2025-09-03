# Phase 3: Game Flow & Progress

## Overview

Add progress tracking, the 3-strikes system, and success/failure screens to create a complete game experience.

## User Stories

### Story 3.1: Add Progress Tracking

**As a** student  
**I want** to see my progress toward earning a Squishmallow  
**So that** I stay motivated to keep solving problems

**Acceptance Criteria:**

- [x] Visual progress bar shows advancement with each correct answer
- [x] Progress bar fills incrementally (e.g., 10 correct answers = full bar)
- [x] Progress bar is colorful and engaging
- [x] Current progress is clearly visible during gameplay

**Definition of Done:**

- Progress bar accurately reflects completion percentage ✅
- Visual feedback is motivating and clear ✅

---

### Story 3.2: Implement 3-Strikes System

**As a** student  
**I want** a fair chance to make mistakes while learning  
**So that** the game is challenging but not frustrating

**Acceptance Criteria:**

- [x] Visual indicator shows remaining "lives" using child-friendly icons (hearts, stars, etc.)
- [x] Each wrong answer removes one life with gentle animation
- [x] Game continues until 3 wrong answers OR progress bar fills
- [x] Lives indicator updates immediately but not harshly
- [x] Wrong answer feedback is encouraging ("Try again!") not negative
- [x] No punitive sounds or discouraging animations

**Definition of Done:**

- Strike system works accurately while maintaining positive learning environment ✅
- Visual feedback is clear but supportive, not intimidating ✅

---

### Story 3.3: Create Success/Failure Screens

**As a** student  
**I want** clear feedback when my game session ends  
**So that** I understand what happened and what to do next

**Acceptance Criteria:**

- [x] Success screen shows "Congratulations!" when progress bar fills
- [x] Success screen displays which Squishmallow was earned (placeholder for now)
- [x] Failure screen shows "Try Again!" when 3 strikes reached
- [x] Both screens have "Return to Dashboard" button
- [x] Screens are visually appealing and age-appropriate

**Definition of Done:**

- End-game screens provide appropriate closure ✅
- Navigation back to dashboard works smoothly ✅

---

### Story 3.4: Test Complete Game Loop

**As a** developer  
**I want** to verify the entire game flow works end-to-end  
**So that** users have a complete, satisfying game experience

**Acceptance Criteria:**

- [x] Can start game from dashboard
- [x] Can complete full game by answering enough problems correctly
- [x] Can fail game by making 3 mistakes
- [x] Can return to dashboard from end screens
- [x] Can start new games repeatedly without issues

**Definition of Done:**

- Complete game loop is stable and engaging ✅
- Ready to add Squishmallow collection features ✅

---

## Phase Status: ✅ COMPLETED

**Previous Phase:** [Phase 2: Core Game Logic](./phase-2-core-game.md)  
**Next Phase:** [Phase 4: Squishmallow Collection System](./phase-4-collection.md)
