// Squishmallow Collector - Main JavaScript
// Story 1.2: Basic app initialization

class SquishCollectorApp {
  constructor() {
    this.currentScreen = "loading-screen";

    // Initialize Math Engine for Story 2.1
    this.mathEngine = new MathEngine();

    // Initialize Collection Manager for Story 4.1
    this.collectionManager = new CollectionManager();

    // Story 2.5: Game state tracking
    this.gameState = {
      problemCount: 0,
      correctAnswers: 0,
      startTime: null,
      isGameActive: false,
      // Story 3.1: Progress tracking
      targetScore: 10, // Need 10 correct answers to earn a Squishmallow
      // Story 3.2: Lives system
      lives: 3,
      maxLives: 3,
    };

    // Prevent double-click issues
    this.lastClickTime = 0;
    this.clickDebounceMs = 200; // 200ms debounce

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

    // Setup number pad (Story 2.3)
    this.setupNumberPad();

    // Setup success/failure screen buttons (Story 3.3)
    this.setupEndGameScreens();

    // Setup collection screen buttons (Story 4.2)
    this.setupCollectionScreen();

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
    const startGameBtn = document.getElementById("start-game-btn");
    if (startGameBtn) {
      startGameBtn.addEventListener("click", () => this.handleStartGame());
      startGameBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleStartGame();
        }
      });
    }

    // View Collection button
    const viewCollectionBtn = document.getElementById("view-collection-btn");
    if (viewCollectionBtn) {
      viewCollectionBtn.addEventListener("click", () =>
        this.handleViewCollection()
      );
      viewCollectionBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleViewCollection();
        }
      });
    }

    // Settings button
    const settingsBtn = document.getElementById("settings-btn");
    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => this.handleSettings());
      settingsBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
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

    // Story 2.5 & 3.1 & 3.2: Initialize game state
    this.resetGameState();
    this.gameState.startTime = new Date();
    this.gameState.isGameActive = true;

    // Update progress displays
    this.updateProgressBar();
    this.updateLivesDisplay();

    // Story 2.1 & 2.2: Generate problem and show game screen
    const problem = this.mathEngine.generateNewProblem();
    this.displayProblem(problem);
    this.showScreen("game-screen");
  }

  handleViewCollection() {
    console.log("📚 View Collection clicked!");
    // Story 4.2: Show collection screen
    this.showCollectionScreen();
  }

  handleSettings() {
    console.log("⚙️ Settings clicked!");
    // TODO: Implement in Phase 5 - Settings system
    this.showFeedback("Opening settings... (Coming in Phase 5!)", "info");
  }

  // Story 3.1: Progress tracking methods
  updateProgressBar() {
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    if (progressFill && progressText) {
      const percentage =
        (this.gameState.correctAnswers / this.gameState.targetScore) * 100;
      progressFill.style.width = `${Math.min(percentage, 100)}%`;
      progressText.textContent = `${this.gameState.correctAnswers} / ${this.gameState.targetScore} correct`;
    }
  }

  // Story 3.2: Lives system methods
  updateLivesDisplay() {
    for (let i = 1; i <= this.gameState.maxLives; i++) {
      const lifeIcon = document.getElementById(`life-${i}`);
      if (lifeIcon) {
        if (i <= this.gameState.lives) {
          lifeIcon.textContent = "💚";
          lifeIcon.classList.remove("lost");
        } else {
          lifeIcon.textContent = "💔";
          lifeIcon.classList.add("lost");
        }
      }
    }
  }

  loseLife() {
    if (this.gameState.lives > 0) {
      this.gameState.lives--;
      this.updateLivesDisplay();

      if (this.gameState.lives === 0) {
        this.endGame("failure");
      }
    }
  }

  checkGameCompletion() {
    if (this.gameState.correctAnswers >= this.gameState.targetScore) {
      this.endGame("success");
    }
  }

  endGame(result) {
    this.gameState.isGameActive = false;

    if (result === "success") {
      // Story 4.3: Award a new Squishmallow
      const awardedSquishmallow =
        this.collectionManager.awardRandomSquishmallow();

      // Update success screen with the earned Squishmallow
      this.updateSuccessScreenStats(awardedSquishmallow);
      this.showScreen("success-screen");
    } else {
      // Story 3.3: Show failure screen with encouraging message
      this.updateFailureScreenStats();
      this.showScreen("failure-screen");
    }
  }

  // Story 3.3 & 4.3: Update success screen with final stats and earned Squishmallow
  updateSuccessScreenStats(awardedSquishmallow = null) {
    const correctCountElement = document.getElementById("final-correct-count");
    const accuracyElement = document.getElementById("final-accuracy");

    if (correctCountElement) {
      correctCountElement.textContent = this.gameState.correctAnswers;
    }

    if (accuracyElement) {
      const accuracy =
        this.gameState.problemCount > 0
          ? Math.round(
              (this.gameState.correctAnswers / this.gameState.problemCount) *
                100
            )
          : 100;
      accuracyElement.textContent = `${accuracy}%`;
    }

    // Story 4.3: Update success screen with earned Squishmallow
    if (awardedSquishmallow) {
      const squishImage = document.querySelector(
        "#success-screen .earned-squishmallow"
      );
      const squishName = document.querySelector(
        "#success-screen .squishmallow-name"
      );
      const squishSquad = document.querySelector(
        "#success-screen .squishmallow-squad"
      );

      if (squishImage) {
        squishImage.src = awardedSquishmallow.image_url;
        squishImage.alt = awardedSquishmallow.name;
      }

      if (squishName) {
        squishName.textContent = awardedSquishmallow.name;
      }

      if (squishSquad) {
        squishSquad.textContent = awardedSquishmallow.squad;
      }
    }
  }

  // Story 3.3: Update failure screen with encouraging stats
  updateFailureScreenStats() {
    const problemCountElement = document.getElementById(
      "failure-problem-count"
    );
    const correctCountElement = document.getElementById(
      "failure-correct-count"
    );

    if (problemCountElement) {
      problemCountElement.textContent = this.gameState.problemCount;
    }

    if (correctCountElement) {
      correctCountElement.textContent = this.gameState.correctAnswers;
    }
  }

  resetGameState() {
    this.gameState.correctAnswers = 0;
    this.gameState.problemCount = 0;
    this.gameState.lives = this.gameState.maxLives;
    this.gameState.startTime = null;
    this.updateProgressBar();
    this.updateLivesDisplay();
  }

  // User feedback system for button interactions
  showFeedback(message, type = "info") {
    // Create feedback element
    const feedback = document.createElement("div");
    feedback.className = `feedback-message ${type}`;
    feedback.textContent = message;

    // Story 2.4: Enhanced feedback colors for answer validation
    const colors = {
      info: "var(--accent-blue)",
      success: "var(--accent-green)",
      retry: "var(--accent-coral)",
      error: "var(--accent-coral)",
    };

    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${colors[type] || colors.info};
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-family: var(--font-primary);
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
    `;

    document.body.appendChild(feedback);

    // Animate in
    setTimeout(() => {
      feedback.style.opacity = "1";
      feedback.style.transform = "translateX(-50%) translateY(10px)";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      feedback.style.opacity = "0";
      feedback.style.transform = "translateX(-50%) translateY(-10px)";
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
    const difficulties = ["easy", "medium", "hard"];
    difficulties.forEach((level) => {
      this.mathEngine.setDifficulty(level);
      const problem = this.mathEngine.generateNewProblem();
      console.log(
        `${level.toUpperCase()}: ${problem.displayText} = ${problem.answer}`
      );
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
    const problemElement = document.getElementById("current-problem");
    if (problemElement) {
      problemElement.textContent = problem.displayText;
      console.log(`📝 Displaying problem: ${problem.displayText}`);
    }

    // Story 2.5: Update problem counter
    this.gameState.problemCount++;
    const problemNumberElement = document.getElementById("problem-number");
    if (problemNumberElement) {
      problemNumberElement.textContent = this.gameState.problemCount;
    }

    // Clear any previous answer
    const answerInput = document.getElementById("answer-input");
    if (answerInput) {
      answerInput.value = "";
    }

    // Reset submit button state
    this.updateSubmitButton();
  }

  setupGameScreenControls() {
    // Back to dashboard button
    const backBtn = document.getElementById("back-to-dashboard-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        this.showScreen("dashboard-screen");
        console.log("🏠 Returned to dashboard");
      });

      backBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.showScreen("dashboard-screen");
        }
      });
    }

    console.log("✅ Game screen controls setup complete!");
  }

  // Helper method to prevent double-clicks
  isValidClick() {
    const now = Date.now();
    if (now - this.lastClickTime < this.clickDebounceMs) {
      return false; // Too soon, ignore this click
    }
    this.lastClickTime = now;
    return true;
  }

  // Number Pad functionality for Story 2.3
  setupNumberPad() {
    // Setup number button listeners (0-9)
    const numberButtons = document.querySelectorAll(".number-btn");
    numberButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Debounce check to prevent double-clicks
        if (!this.isValidClick()) {
          return;
        }

        const number = btn.getAttribute("data-number");
        this.addNumberToInput(number);
      });

      // Keyboard accessibility
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();

          // Debounce check for keyboard too
          if (!this.isValidClick()) {
            return;
          }

          const number = btn.getAttribute("data-number");
          this.addNumberToInput(number);
        }
      });
    });

    // Clear button
    const clearBtn = document.getElementById("clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Debounce check to prevent double-clicks
        if (!this.isValidClick()) {
          return;
        }

        this.clearInput();
      });
      clearBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();

          // Debounce check for keyboard too
          if (!this.isValidClick()) {
            return;
          }

          this.clearInput();
        }
      });
    }

    // Enter button (integrated into number pad)
    const enterBtn = document.getElementById("enter-btn");
    if (enterBtn) {
      enterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Debounce check to prevent double-clicks
        if (!this.isValidClick()) {
          return;
        }

        this.submitAnswer();
      });
      enterBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();

          // Debounce check for keyboard too
          if (!this.isValidClick()) {
            return;
          }

          this.submitAnswer();
        }
      });
    }

    // Physical keyboard support
    document.addEventListener("keydown", (e) => {
      if (this.currentScreen === "game-screen") {
        if (e.key >= "0" && e.key <= "9") {
          e.preventDefault();
          this.addNumberToInput(e.key);
        } else if (e.key === "Backspace") {
          e.preventDefault();
          this.backspaceInput();
        } else if (e.key === "Delete" || e.key === "Escape") {
          e.preventDefault();
          this.clearInput();
        } else if (e.key === "Enter") {
          e.preventDefault();
          this.submitAnswer();
        }
      }
    });

    console.log("✅ Number pad setup complete!");
  }

  // Story 3.3: Setup success and failure screen button listeners
  setupEndGameScreens() {
    // Success screen - return to dashboard button
    const successDashboardBtn = document.getElementById(
      "success-dashboard-btn"
    );
    if (successDashboardBtn) {
      successDashboardBtn.addEventListener("click", () => {
        this.showDashboard();
        this.resetGameState();
      });
    }

    // Failure screen - try again button
    const tryAgainBtn = document.getElementById("try-again-btn");
    if (tryAgainBtn) {
      tryAgainBtn.addEventListener("click", () => {
        this.resetGameState();
        this.handleStartGame();
      });
    }

    // Failure screen - return to dashboard button
    const failureDashboardBtn = document.getElementById(
      "failure-dashboard-btn"
    );
    if (failureDashboardBtn) {
      failureDashboardBtn.addEventListener("click", () => {
        this.showDashboard();
        this.resetGameState();
      });
    }

    console.log("✅ End game screens setup complete!");
  }

  // Story 4.2: Setup collection screen
  setupCollectionScreen() {
    // Collection screen - return to dashboard button
    const collectionDashboardBtn = document.getElementById(
      "collection-dashboard-btn"
    );
    if (collectionDashboardBtn) {
      collectionDashboardBtn.addEventListener("click", () => {
        this.showDashboard();
      });
    }

    console.log("✅ Collection screen setup complete!");
  }

  // Story 4.2: Show and populate collection screen
  showCollectionScreen() {
    this.populateCollectionGrid();
    this.updateCollectionStats();
    this.showScreen("collection-screen");
  }

  populateCollectionGrid() {
    const collectionGrid = document.getElementById("collection-grid");
    if (!collectionGrid || !this.collectionManager.squishmallows) {
      console.log("⏳ Collection data not ready yet");
      return;
    }

    collectionGrid.innerHTML = "";

    this.collectionManager.squishmallows.forEach((squishmallow) => {
      const isCollected = this.collectionManager.isCollected(squishmallow.id);

      const card = document.createElement("div");
      card.className = `squishmallow-card ${
        isCollected ? "collected" : "locked"
      }`;

      if (isCollected) {
        card.innerHTML = `
          <img src="${squishmallow.image_url}" alt="${squishmallow.name}" class="squishmallow-image" />
          <h4 class="squishmallow-name">${squishmallow.name}</h4>
          <p class="squishmallow-squad">${squishmallow.squad}</p>
        `;
      } else {
        card.innerHTML = `
          <div class="locked-icon">🔒</div>
          <h4 class="squishmallow-name">???</h4>
          <p class="squishmallow-squad">Keep playing to unlock!</p>
        `;
      }

      collectionGrid.appendChild(card);
    });
  }

  updateCollectionStats() {
    const stats = this.collectionManager.getCollectionStats();

    const collectedElement = document.getElementById("collected-count");
    const totalElement = document.getElementById("total-count");
    const percentageElement = document.getElementById("completion-percentage");

    if (collectedElement) collectedElement.textContent = stats.collected;
    if (totalElement) totalElement.textContent = stats.total;
    if (percentageElement)
      percentageElement.textContent = `${stats.percentage}%`;
  }

  addNumberToInput(number) {
    const answerInput = document.getElementById("answer-input");
    if (answerInput) {
      const currentValue = answerInput.value;

      // Limit input length (reasonable for multiplication answers)
      if (currentValue.length < 6) {
        answerInput.value = currentValue + number;

        // Enable submit button if there's an answer
        this.updateSubmitButton();

        // Visual feedback with debouncing
        this.animateNumberButton(number);

        console.log(
          `📝 Added number: ${number}, current input: ${answerInput.value}`
        );
      } else {
        // Provide feedback when input limit reached
        this.showFeedback(
          "That's enough numbers! Try submitting your answer 😊",
          "info"
        );
      }
    }
  }

  clearInput() {
    const answerInput = document.getElementById("answer-input");
    if (answerInput) {
      answerInput.value = "";
      this.updateSubmitButton();
      this.showFeedback("Input cleared! 🗑️", "info");
      console.log("🗑️ Input cleared");
    }
  }

  backspaceInput() {
    const answerInput = document.getElementById("answer-input");
    if (answerInput && answerInput.value.length > 0) {
      answerInput.value = answerInput.value.slice(0, -1);
      this.updateSubmitButton();
      console.log(`⌫ Backspace, current input: ${answerInput.value}`);
    }
  }

  updateSubmitButton() {
    const enterBtn = document.getElementById("enter-btn");
    const answerInput = document.getElementById("answer-input");

    if (enterBtn && answerInput) {
      const hasAnswer = answerInput.value.length > 0;
      enterBtn.disabled = !hasAnswer;
      enterBtn.classList.toggle("disabled", !hasAnswer);

      // Visual feedback for enter button state
      if (hasAnswer) {
        enterBtn.style.opacity = "1";
      } else {
        enterBtn.style.opacity = "0.6";
      }
    }
  }

  animateNumberButton(number) {
    // Find the button that was pressed and add visual feedback
    const button = document.querySelector(`[data-number="${number}"]`);
    if (button) {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);
    }
  }

  submitAnswer() {
    const answerInput = document.getElementById("answer-input");
    if (answerInput && answerInput.value) {
      const userAnswer = parseInt(answerInput.value);

      // Story 2.4: Validate answer using MathEngine
      const validation = this.mathEngine.validateAnswer(userAnswer);

      if (validation.isCorrect) {
        // Story 3.1: Update progress tracking
        this.gameState.correctAnswers++;
        this.updateProgressBar();

        // Correct answer - show success and check for completion
        this.showFeedback(validation.feedback, "success");

        // Story 3.1: Check if game is complete
        if (this.gameState.correctAnswers >= this.gameState.targetScore) {
          setTimeout(() => {
            this.checkGameCompletion();
          }, 1500);
        } else {
          // Continue with new problem
          setTimeout(() => {
            const newProblem = this.mathEngine.generateNewProblem();
            this.displayProblem(newProblem);
            this.clearInput();
          }, 1500);
        }
      } else {
        // Story 3.2: Wrong answer - lose a life
        this.loseLife();

        // Incorrect answer - show retry message, keep same problem
        this.showFeedback(validation.feedback, "retry");
        this.clearInput(); // Clear for retry
      }

      console.log(
        `✅ Answer validation: ${userAnswer} -> ${validation.feedback}`
      );
      console.log(
        `📊 Game Stats: ${this.gameState.correctAnswers}/${this.gameState.problemCount} correct`
      );
    }
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
