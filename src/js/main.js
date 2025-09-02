// Squishmallow Collector - Main JavaScript
// Story 1.2: Basic app initialization

class SquishCollectorApp {
  constructor() {
    this.currentScreen = "loading-screen";
    
    // Initialize Math Engine for Story 2.1
    this.mathEngine = new MathEngine();
    
    this.init();
  }

  init() {
    console.log("🎮 Squishmallow Collector initializing...");

    // Setup mascot images with fallbacks
    this.setupMascotImages();

    // Setup dashboard button listeners
    this.setupDashboardButtons();

    // Setup game screen controls (Story 2.2)
    this.setupGameScreenControls();

    // Show loading screen first
    this.showScreen("loading-screen");

    // Simulate loading time and then show basic dashboard
    setTimeout(() => {
      this.showDashboard();
    }, 2000);

    // Add keyboard navigation support
    this.setupKeyboardNavigation();

    console.log("✅ App initialization complete!");
  }

  showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => {
      screen.classList.remove("active");
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add("active");
      this.currentScreen = screenId;
      console.log(`📺 Switched to screen: ${screenId}`);
    } else {
      console.error(`❌ Screen not found: ${screenId}`);
    }
  }

  showDashboard() {
    console.log("🏠 Loading dashboard...");
    this.showScreen("dashboard-screen");
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (event) => {
      // Basic keyboard support for accessibility
      switch (event.key) {
        case "Escape":
          // Return to dashboard (when other screens are implemented)
          if (this.currentScreen !== "dashboard-screen") {
            this.showDashboard();
          }
          break;
        case "F12":
          // Toggle developer tools (if in dev mode)
          if (process.argv && process.argv.includes("--dev")) {
            const { remote } = require("electron");
            remote.getCurrentWindow().webContents.toggleDevTools();
          }
          break;
      }
    });
  }

  // Utility method for future screen transitions
  transitionToScreen(screenId, delay = 0) {
    setTimeout(() => {
      this.showScreen(screenId);
    }, delay);
  }

  // Setup mascot images with unicorn emoji fallback
  setupMascotImages() {
    const mascotImages = document.querySelectorAll(".mascot-image");

    mascotImages.forEach((img) => {
      // Set unicorn emoji as fallback content
      img.textContent = "🦄";
      img.style.color = "white";

      // Handle successful image load
      img.onload = () => {
        img.textContent = "";
        img.style.background = "none";
      };

      // Handle image load error
      img.onerror = () => {
        console.log("🦄 Using unicorn emoji fallback for mascot image");
        img.style.background = "linear-gradient(135deg, #9B59B6, #E91E63)";
        img.textContent = "🦄";
        img.style.color = "white";
      };
    });
  }

  // Setup dashboard button event listeners
  setupDashboardButtons() {
    console.log("🎮 Setting up dashboard buttons...");

    // Start New Game button
    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
      startGameBtn.addEventListener('click', () => this.handleStartGame());
      startGameBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleStartGame();
        }
      });
    }

    // View Collection button  
    const viewCollectionBtn = document.getElementById('view-collection-btn');
    if (viewCollectionBtn) {
      viewCollectionBtn.addEventListener('click', () => this.handleViewCollection());
      viewCollectionBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleViewCollection();
        }
      });
    }

    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.handleSettings());
      settingsBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleSettings();
        }
      });
    }

    console.log("✅ Dashboard buttons setup complete!");
  }

  // Dashboard button handlers
  handleStartGame() {
    console.log("🎮 Start New Game clicked!");
    
    // Story 2.1 & 2.2: Generate problem and show game screen
    const problem = this.mathEngine.generateNewProblem();
    this.displayProblem(problem);
    this.showScreen("game-screen");
  }

  handleViewCollection() {
    console.log("📚 View Collection clicked!");  
    // TODO: Implement in Phase 4 - Collection system
    this.showFeedback("Opening collection... (Coming in Phase 4!)", "info");
  }

  handleSettings() {
    console.log("⚙️ Settings clicked!");
    // TODO: Implement in Phase 5 - Settings system  
    this.showFeedback("Opening settings... (Coming in Phase 5!)", "info");
  }

  // User feedback system for button interactions
  showFeedback(message, type = "info") {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'info' ? 'var(--accent-blue)' : 'var(--accent-green)'};
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-family: var(--font-primary);
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
    `;

    document.body.appendChild(feedback);

    // Animate in
    setTimeout(() => {
      feedback.style.opacity = '1';
      feedback.style.transform = 'translateX(-50%) translateY(10px)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      feedback.style.opacity = '0';
      feedback.style.transform = 'translateX(-50%) translateY(-10px)';
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 300);
    }, 3000);
  }

  // Math system methods for Story 2.1
  testMathEngine() {
    console.log("🧪 Testing Math Engine...");
    
    // Test different difficulty levels
    const difficulties = ['easy', 'medium', 'hard'];
    difficulties.forEach(level => {
      this.mathEngine.setDifficulty(level);
      const problem = this.mathEngine.generateNewProblem();
      console.log(`${level.toUpperCase()}: ${problem.displayText} = ${problem.answer}`);
    });
    
    // Test answer validation
    const testProblem = this.mathEngine.generateNewProblem();
    const correctResult = this.mathEngine.validateAnswer(testProblem.answer);
    const incorrectResult = this.mathEngine.validateAnswer(999);
    
    console.log("Correct answer test:", correctResult);
    console.log("Incorrect answer test:", incorrectResult);
  }

  // Game screen methods for Story 2.2
  displayProblem(problem) {
    const problemElement = document.getElementById('current-problem');
    if (problemElement) {
      problemElement.textContent = problem.displayText;
      console.log(`📝 Displaying problem: ${problem.displayText}`);
    }
    
    // Clear any previous answer
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
      answerInput.value = '';
    }
  }

  setupGameScreenControls() {
    // Back to dashboard button
    const backBtn = document.getElementById('back-to-dashboard-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.showScreen('dashboard-screen');
        console.log("🏠 Returned to dashboard");
      });
      
      backBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.showScreen('dashboard-screen');
        }
      });
    }

    // Submit answer button (placeholder for Story 2.4)
    const submitBtn = document.getElementById('submit-answer-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.showFeedback("Answer submission coming in Story 2.4!", "info");
      });
    }

    // Skip problem button
    const skipBtn = document.getElementById('skip-problem-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        const newProblem = this.mathEngine.generateNewProblem();
        this.displayProblem(newProblem);
        this.showFeedback("New problem generated!", "info");
      });
    }

    console.log("✅ Game screen controls setup complete!");
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Starting Squishmallow Collector...");
  window.squishApp = new SquishCollectorApp();
});

// Handle app focus/blur for better user experience
window.addEventListener("focus", () => {
  console.log("👁️  App gained focus");
});

window.addEventListener("blur", () => {
  console.log("😴 App lost focus");
});

// Error handling
window.addEventListener("error", (event) => {
  console.error("❌ Application error:", event.error);

  // Show user-friendly error message for children
  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #FFB6C1;
        padding: 20px;
        border-radius: 15px;
        border: 3px solid #FFD700;
        text-align: center;
        font-family: 'Quicksand', sans-serif;
        font-size: 16px;
        z-index: 9999;
    `;
  errorDiv.innerHTML = `
        <p>😕 Oops! Something went wrong.</p>
        <p>Please ask an adult to restart the game.</p>
        <button onclick="location.reload()" style="
            margin-top: 10px;
            padding: 10px 20px;
            background: #FFD700;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            cursor: pointer;
        ">Try Again</button>
    `;

  document.body.appendChild(errorDiv);
});
