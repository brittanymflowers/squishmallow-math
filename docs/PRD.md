# Project Requirements Document (PRD): Squishmallow Collector

## 1. Introduction

The Squishmallow Collector is a side-project application designed to help an 8-year-old learn and practice math concepts, starting with multiplication tables. The application will be themed around Squishmallows, leveraging the user's daughter's interest to make the learning process fun and engaging. The app will be built as a local application and will not require a server or internet connection to function after the initial setup.

## 2. Project Goals

* To create a fun and useful educational tool for practicing math skills.
* To leverage the Gemini CLI for code generation ("vibe coding") to build the core components of the application.
* To provide a clear, rewarding goal (collecting Squishmallows) that encourages continued practice.
* To be easily expandable to include more complex math concepts (e.g., division, negative numbers, higher-level arithmetic).

## 3. User Experience (UX) and User Interface (UI) Requirements

### 3.1 Dashboard 
The first screen the user sees will be a dashboard with three main options:
* Start New Game: Begins a new math session to earn a Squishmallow.
* View Collection: Navigates to a screen displaying all collected Squishmallows.
* Settings: Opens a parent-facing menu to adjust game difficulty.

### 3.2 Settings Screen 
This screen is designed for a parent to customize the game.
* Math Mode: Checkboxes to select one or more of the following operations:
    * Multiplication
    * Division
    * Addition
    * Subtraction
* Number Range:
    * For multiplication and/or division, a text input box to specify the highest number to be used in problems.
    * For addition and/or subtraction, a dropdown menu to specify the highest place value used (e.g., 10s, 100s, 1000s).
* Timer: A dropdown menu with options for specific time limits (e.g., 1 minute, 5 minutes, 10 minutes) and a "No Time Limit" option.

### 3.3 Game Screen
* Problem Display: A single math problem is shown on the screen at a time.
* Input Method: An on-screen, touch-friendly number pad with an "Enter" or "Submit" button. The game should also accept input from a physical keyboard.
* Progress Indicator: A visual element (e.g., a progress bar or pie chart) that fills with each correct answer. Once full, the user has earned a Squishmallow. The required number of correct answers to fill the bar is a configurable setting.
* Strikes Counter: A visual representation of the user's incorrect answers (e.g., three hearts or stars). The game ends after three incorrect answers.
* Game Aesthetics: The background and design should be colorful and fun, themed with a Squishmallow-like pattern. Music should play during the game.

### 3.4 Squishmallow Collection
* Display: A simple grid view showing all collected Squishmallows.
* Information: Each item in the collection will show the Squishmallow's image, name, and squad. The user will be able to see which squads they are working to complete.

### 3.5 Success & Failure Screens
* Success: A "Congratulations" screen is displayed upon earning a Squishmallow. It will show the name of the Squishmallow and a button to return to the dashboard.
* Failure: A "Try Again" screen is displayed when the user reaches three strikes, with a button to restart the game.

## 4. Functional Requirements

* Problem Generation: The app will use pre-generated code (from Gemini) to create math problems based on the selected settings for math mode, number range, and negative numbers.
* Game Logic:
    * Game Session: The user is presented with a series of problems.
    * Correct Answer: If the user gets the correct answer, their progress advances, and a new problem appears.
    * Incorrect Answer: If the user gets an incorrect answer, a strike is recorded, and the same problem remains on the screen until the user answers it correctly.
    * Game Over: The session ends when the user reaches the required number of correct answers or accumulates three strikes.
* Data Persistence: The app will save two sets of data using local JSON files:
    * Squishmallow Data: A pre-defined list of Squishmallows, each with a name, squad, and image file path. This data will be part of the app's code base.
    * User Progress: A file that stores a list of the names of all Squishmallows the user has collected. The app will read from and write to this file to display and update the collection.

## 5. Technical Requirements & Tooling

* Platform: A local desktop application (e.g., a web app using Electron, a Python/Tkinter app, etc.).
* Code Generation: The Gemini CLI will be used to generate initial code for core components, including:
    * The problem generation logic.
    * The basic HTML/CSS for the UI.
    * The initial JSON data structure for the Squishmallows.
* Language: Python or JavaScript, as these are well-suited for "vibe coding" with Gemini.
* Data Storage: Local JSON files for all application data.

## 6. Future Considerations (Out of Scope for MVP)

* More interactive screens for the collected Squishmallows.
* Ability to unlock different "themes" or "backgrounds" for the game.
* Inclusion of more complex math concepts, such as fractions and exponents.
* Word problems generated dynamically by Gemini.
* Adding animations and sound effects for more engaging feedback.