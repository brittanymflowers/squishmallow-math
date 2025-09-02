# Phase 2: Core Game Logic (Multiplication Only)

## Overview

Build the core math problem generation and answer validation functionality, starting with multiplication tables only.

## User Stories

### Story 2.1: Build Problem Generator

**As a** student  
**I want** the game to generate multiplication problems  
**So that** I can practice my math skills

**Acceptance Criteria:**

- [x] Function generates multiplication problems (1-12 tables)
- [x] Problems are in format "X × Y = ?"
- [x] Function returns both the problem string and correct answer
- [x] Problems use random numbers within the specified range

**Definition of Done:**

- Problem generator works consistently ✅
- Problems are appropriately challenging for the target age group ✅

---

### Story 2.2: Create Basic Game Screen Layout

**As a** student  
**I want** to see math problems displayed clearly  
**So that** I can read and understand what to solve

**Acceptance Criteria:**

- [x] Game screen displays one problem at a time in large, readable font
- [x] Problem appears in a prominent, centered location
- [x] Clean, uncluttered layout with proper spacing
- [x] Child-friendly colors and visual design
- [x] Clear visual hierarchy focusing attention on the problem

**Definition of Done:**

- Game screen layout is intuitive and visually appealing ✅
- Problem display is optimized for 8-year-old readability ✅

---

### Story 2.3: Add Interactive Number Pad

**As a** student  
**I want** to input answers using an on-screen number pad  
**So that** I can easily enter numbers without using a keyboard

**Acceptance Criteria:**

- [ ] On-screen number pad with large, touch-friendly buttons (digits 0-9)
- [ ] Enter/Submit button clearly labeled and prominent
- [ ] Clear/Backspace button to fix mistakes
- [ ] Input field shows the number being typed in large text
- [ ] Number pad buttons provide visual feedback when pressed

**Definition of Done:**

- Number pad is fully functional and child-friendly
- Input system works reliably for target age group

---

### Story 2.4: Implement Answer Validation

**As a** student  
**I want** immediate feedback when I answer a problem  
**So that** I know if I got it right or wrong

**Acceptance Criteria:**

- [ ] System checks if submitted answer matches correct answer
- [ ] Shows "Correct!" message for right answers
- [ ] Shows "Try Again!" message for wrong answers
- [ ] Loads new problem after correct answer
- [ ] Keeps same problem after incorrect answer until solved

**Definition of Done:**

- Answer validation works accurately
- Feedback is clear and immediate

---

### Story 2.5: Test Basic Math Gameplay

**As a** developer  
**I want** to verify the core game mechanics work  
**So that** users can successfully practice math problems

**Acceptance Criteria:**

- [ ] Can complete a series of multiplication problems
- [ ] Correct answers advance to next problem
- [ ] Wrong answers require retry of same problem
- [ ] No crashes or errors during gameplay
- [ ] Problems are sufficiently random

**Definition of Done:**

- Core gameplay loop is solid and bug-free
- Ready to add progress tracking and game flow

---

## Phase Status: ⏳ Not Started

**Previous Phase:** [Phase 1: Foundation & Basic Setup](./phase-1-foundation.md)  
**Next Phase:** [Phase 3: Game Flow & Progress](./phase-3-game-flow.md)
