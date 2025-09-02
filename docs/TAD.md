# Squishmallow Technical Approach Document (TAD)

## 1. Architectural Approach

The application will be a local, desktop-based application. This approach is ideal for a side project as it doesn't require a web server, complex deployments, or a persistent database.

* **Technology Stack:**
    * Backend/Logic: Python will be used for the core game logic, including problem generation, strike tracking, and file I/O for data persistence.
    * Frontend/UI: A basic HTML/CSS frontend will be used for the user interface, with JavaScript to handle user interactions and communicate with the Python backend.
* **Framework:** The app will be packaged using Electron to bundle the HTML, CSS, JavaScript, and Python into a single, executable desktop application. This provides a rich UI without the complexity of a native desktop framework.

## 2. Data Models and Storage

All data will be stored in local JSON files, ensuring simplicity and ease of use.

* **Squishmallow Data (squishmallow_data.json):** A pre-defined list of Squishmallows. This file will be part of the app's static assets.
    * Structure: An array of objects.
    * Example Object: 
    ```json
    {
      "id": "avery_the_duck",
      "name": "Avery the Duck",
      "squad": "Farm Squad",
      "image_url": "images/avery_the_duck.png"
    }
    ```

* **User Progress Data (user_data.json):** This file will track the user's progress and collected items. It will be created the first time the app is run and updated with each new Squishmallow.
    * Structure: An object containing a single array.
    * Example Object: 
    ```json
    {
      "collected_squishmallows": ["avery_the_duck", "babs_the_bluejay"]
    }
    ```

## 3. Core Functions and Components

The codebase will be broken down into several key functions and modules, with the initial code for many of these generated using the Gemini CLI.

* **generate_problem(settings):** This function will be the core logic for creating math problems. It will take the parent's settings (operation type, number range, etc.) as input and return a JSON object containing the problem and its correct answer.
    * Input: A settings object (e.g., `{ "operation": "*", "highest_number": 12, "negative_numbers": false }`).
    * Output: A JSON object (e.g., `{ "problem": "7 x 5", "answer": 35 }`).

* **game_manager():** A central module in JavaScript that manages the game session's state. It will handle the timer, the "3 strikes" counter, and communicate with the Python backend to get new problems and validate answers.

* **ui_renderer():** A JavaScript module that dynamically updates the HTML/CSS user interface. It will display the current problem, update the progress bar, and show strike indicators.

* **data_saver():** A Python function that handles all file I/O. It will load the squishmallow_data.json and user_data.json files and save updates to the user_data.json file.

## 4. Implementation Plan

The development will be broken down into a series of logical steps, perfect for a vibe coding session.

1. **Project Setup:** Initialize a new Electron project and set up the basic file structure (e.g., index.html, main.js, styles.css).
2. **Generate Core Logic:** Use the Gemini CLI to generate the Python function for problem generation (generate_problem).
3. **Generate UI Components:** Use the Gemini CLI to generate the HTML and CSS for the dashboard and game screens.
4. **Integrate Logic:** Write the JavaScript code to connect the UI elements to the Python problem generation function. Implement the game loop logic, including the progress bar and "3 strikes" rule.
5. **Implement Data Persistence:** Write the Python functions to read from and write to the JSON data files.
6. **Add Features:** Integrate the settings screen, the collection viewer, and the simple success/failure screens.
7. **Refine and Test:** Manually test the game with the different settings and ensure all features are working as expected.

This TAD provides a clear and actionable plan, translating the high-level goals of the PRD into a step-by-step development process.