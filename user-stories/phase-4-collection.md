# Phase 4: Squishmallow Collection System

## Overview

Implement the Squishmallow collection feature with data persistence, reward system, and collection viewing.

## User Stories

### Story 4.1: Create Squishmallow Data Structure

**As a** developer  
**I want** to define the Squishmallow collection data  
**So that** students can earn and collect different Squishmallows

**Acceptance Criteria:**

- [x] JSON file contains sample Squishmallows with id, name, squad, and image_url
- [x] At least 10-15 different Squishmallows from various squads
- [x] Each Squishmallow has a unique identifier
- [x] Image file structure is organized and consistent

**Definition of Done:**

- Squishmallow data is well-organized and expandable ✅
- Sample images are included or placeholder paths are defined ✅

---

### Story 4.2: Build Collection Screen

**As a** student  
**I want** to view my collected Squishmallows  
**So that** I can see my progress and achievements

**Acceptance Criteria:**

- [x] Grid layout displays collected Squishmallows
- [x] Each item shows image, name, and squad
- [x] Empty slots show locked/uncollected state
- [x] Navigation back to dashboard works
- [x] Responsive layout that looks good

**Definition of Done:**

- Collection screen is visually appealing and informative ✅
- Clear distinction between collected and uncollected items ✅
- [ ] Responsive layout that looks good

**Definition of Done:**

- Collection screen is visually appealing and informative
- Clear distinction between collected and uncollected items

---

### Story 4.3: Implement Reward System

**As a** student  
**I want** to earn a new Squishmallow when I complete a game  
**So that** I have a tangible reward for my math practice

**Acceptance Criteria:**

- [x] Random Squishmallow is awarded upon game completion
- [x] Only uncollected Squishmallows can be earned
- [x] Success screen shows the specific Squishmallow earned
- [x] Duplicate prevention works correctly
- [x] Award ceremony feels rewarding

**Definition of Done:**

- Reward system creates excitement and motivation ✅
- No bugs with duplicate or invalid awards ✅

---

### Story 4.4: Add Data Persistence

**As a** student  
**I want** my collection to be saved between game sessions  
**So that** my progress is never lost

**Acceptance Criteria:**

- [x] User progress saved to local JSON file
- [x] Collection loads correctly when app starts
- [x] New collections are saved immediately after earning
- [x] File handles missing or corrupted data gracefully
- [x] No data loss during normal app usage

**Definition of Done:**

- Data persistence is reliable and robust ✅
- Collection survives app restarts and updates ✅

---

### Story 4.5: Add Parent Progress View

**As a** parent  
**I want** to see my child's collection progress  
**So that** I can celebrate their achievements and understand their learning

**Acceptance Criteria:**

- [ ] Parent can access collection view from settings or separate menu
- [ ] Shows number of Squishmallows earned vs. total available
- [ ] Displays recent gameplay statistics (games played, success rate)
- [ ] Shows which multiplication tables child has practiced
- [ ] Clean, informative layout appropriate for parent viewing

**Definition of Done:**

- Parent progress view provides meaningful insights
- Data display is accurate and easy to understand

**Status:** 🚫 **DEFERRED TO [PHASE 7](./phase-7-advanced-features.md)** - Focus on core collection features first

---

### Story 4.6: Test Collection Features

**As a** developer  
**I want** to verify the collection system works end-to-end  
**So that** students have a complete collection experience

**Acceptance Criteria:**

- [x] Can earn Squishmallows by completing games
- [x] Collection screen accurately displays earned items
- [x] Progress persists between app sessions
- [x] Collection fills up appropriately over multiple games
- [x] No crashes or data corruption

**Definition of Done:**

- Collection system is stable and engaging ✅
- Ready to add settings and customization features ✅

---

## Phase Status: ✅ COMPLETED (Stories 4.1-4.4, 4.6 Complete; 4.5 Deferred)

**Previous Phase:** [Phase 3: Game Flow & Progress](./phase-3-game-flow.md)  
**Next Phase:** [Phase 5: Settings & Customization](./phase-5-settings.md)
