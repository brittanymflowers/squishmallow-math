# Squishmallow Collector - Project Agents

This directory contains specialized AI agents designed specifically for the Squishmallow Collector educational math game development.

## Core Development Agents

### [Game Developer Agent](./game-developer.md)
**Use when**: Implementing user stories and building game features  
**Specializes in**: 
- Electron app development for educational games
- Child-friendly UI and game mechanics
- Math problem generation and progress tracking
- Squishmallow collection system implementation

### [Phase Planner Agent](./phase-planner.md)  
**Use when**: Organizing development workflow and updating user stories  
**Specializes in**:
- Breaking down complex features into manageable stories
- Educational game development workflow planning
- Phase-based incremental development organization
- User story refinement and testing checkpoint creation

### [Game Tester Agent](./game-tester.md)
**Use when**: Testing game functionality and user experience  
**Specializes in**:
- Child perspective testing (8-year-old user experience)
- Parent controls and settings validation
- Educational effectiveness assessment
- Technical reliability and error handling verification

### [PR Reviewer Agent](./pr-reviewer.md)
**Use when**: Reviewing code changes for quality and safety
**Specializes in**:
- Code quality and architecture adherence
- Child safety and privacy compliance
- Educational game performance optimization
- Cross-platform compatibility validation

## Specialized Design Agents

### [Educational Content Agent](./educational-content.md)
**Use when**: Designing math content and learning progressions
**Specializes in**:
- Age-appropriate math content for 8-year-olds
- Learning science and child development principles
- Skill progression and difficulty curves
- Educational effectiveness validation

### [UI/UX Design Agent](./ui-ux-design.md)
**Use when**: Creating visual designs and interaction patterns
**Specializes in**:
- Child-friendly interface design and colors
- Accessibility and usability for young users
- Visual feedback systems and animations
- Touch-friendly layouts and navigation

### [Parent Experience Agent](./parent-experience.md)
**Use when**: Designing parent-facing features and controls
**Specializes in**:
- Intuitive settings and configuration interfaces
- Progress monitoring and reporting systems
- Parent onboarding and support workflows
- Educational communication and transparency

### [Data & Progress Agent](./data-progress.md)
**Use when**: Planning analytics, progress tracking, or rewards
**Specializes in**:
- Learning analytics and skill measurement
- Squishmallow collection and reward algorithms
- Child privacy and data safety compliance
- Motivation and engagement optimization

## How to Use These Agents

### Development Workflow
1. **Plan**: Use Phase Planner to organize or refine user stories
2. **Implement**: Use Game Developer to build specific features  
3. **Test**: Use Game Tester to validate functionality and user experience
4. **Iterate**: Return to Phase Planner to adjust based on testing results

### Agent Coordination
- **Phase Planner** creates the roadmap and breaks down work
- **Game Developer** implements exactly what's planned
- **Game Tester** validates that implementations work correctly
- All agents focus on the educational game goals and child user experience

### Project Context
All agents understand:
- **Target User**: 8-year-old learning multiplication tables
- **Technology**: Electron + HTML/CSS + JavaScript + Python
- **Game Theme**: Squishmallow collection rewards for math practice
- **Development Approach**: Phase-based incremental development

## Agent Selection Guide

| Task Type | Use This Agent |
|-----------|----------------|
| "Plan the next phase" | Phase Planner |
| "Implement Story 2.3" | Game Developer |  
| "Test Phase 1 functionality" | Game Tester |
| "Review PR #15 for code quality" | PR Reviewer |
| "Design math difficulty progression" | Educational Content |
| "Create child-friendly button design" | UI/UX Design |
| "Plan parent settings interface" | Parent Experience |
| "Design Squishmallow reward system" | Data & Progress |
| "Break down complex feature" | Phase Planner |
| "Build the math problem generator" | Game Developer |
| "Verify child experience" | Game Tester |
| "Check code safety for children" | PR Reviewer |
| "Validate educational effectiveness" | Educational Content |
| "Design colorful game screen" | UI/UX Design |
| "Create progress reports for parents" | Parent Experience |
| "Optimize collection algorithms" | Data & Progress |

## Specialized Features

### Educational Game Focus
- All agents prioritize making math learning fun and effective
- Child-friendly design principles are built into all agent guidance
- Educational progression and age-appropriate content is always considered
- Learning science and child development research inform all decisions

### Comprehensive Design Coverage
- **Educational Content**: Ensures math content is pedagogically sound
- **UI/UX Design**: Creates delightful, accessible interfaces for children
- **Parent Experience**: Makes the game valuable and controllable for parents
- **Data & Progress**: Optimizes learning analytics and motivation systems

### Incremental Development
- Agents work together to ensure each phase delivers working, testable functionality
- Quality gates between phases prevent moving forward with broken features
- Testing is integrated throughout, not just at the end

### Multi-Perspective Design
- **Child Perspective**: Educational Content, UI/UX Design, Game Developer focus on 8-year-old experience
- **Parent Perspective**: Parent Experience, Data & Progress address adult needs and concerns
- **Developer Perspective**: Game Developer, Phase Planner, Game Tester ensure technical quality

## Getting Started

### For Development Tasks:
1. **Plan**: Use Phase Planner to organize or refine user stories
2. **Design Content**: Use Educational Content to plan math progression and learning objectives
3. **Design Interface**: Use UI/UX Design to create child-friendly visual designs
4. **Design Parent Features**: Use Parent Experience to plan settings and monitoring
5. **Plan Analytics**: Use Data & Progress to design reward systems and tracking
6. **Implement**: Use Game Developer to build the designed features
7. **Review**: Use PR Reviewer to ensure code quality and child safety
8. **Test**: Use Game Tester to validate from all user perspectives

### Quick Reference:
- **Starting a new phase?** → Phase Planner
- **Need math content designed?** → Educational Content  
- **Need visual designs?** → UI/UX Design
- **Working on parent features?** → Parent Experience
- **Planning rewards/progress?** → Data & Progress
- **Ready to implement code?** → Game Developer
- **Code ready for review?** → PR Reviewer
- **Time to test functionality?** → Game Tester

Each agent has detailed documentation explaining their specific processes, guidelines, and interaction patterns. They're designed to work together seamlessly while maintaining focus on creating an excellent educational game experience that serves both children's learning needs and parents' oversight requirements.