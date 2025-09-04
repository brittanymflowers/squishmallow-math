// Squishmallow Collector - Main JavaScript
// Story 1.2: Basic app initialization

class SquishCollectorApp {
  constructor() {
    this.currentScreen = "loading-screen";

    // Initialize Math Engine for Story 2.1
    this.mathEngine = new MathEngine();

    // Initialize Collection Manager for Story 4.1
    this.collectionManager = new CollectionManager();

    // Initialize Sound Manager for Story 6.2
    this.soundManager = new SoundManager();

    // Story 2.5: Game state tracking
    this.gameState = {
      problemCount: 0,
      correctAnswers: 0,
      totalAttempts: 0,
      startTime: null,
      isGameActive: false,
      // Story 3.1: Progress tracking
      targetScore: 10, // Need 10 correct answers to earn a Squishmallow
      // Story 3.2: Lives system
      lives: 3,
      maxLives: 3,
      // Story 5.4: Timer system
      timeRemaining: null,
      timerInterval: null,
      isTimerActive: false,
    };

    // Story 5.1: Settings system
    this.settings = {
      gameLength: 10,
      livesEnabled: true,
      operations: ["multiplication"], // Story 5.2: Default to multiplication only
      timerSeconds: null, // Story 5.4: Timer setting (null = no timer)
      multRange: 12, // Highest times table for multiplication/division
      addRange: "tens", // Number size for addition/subtraction
      // Story 7.4: Dashboard mascot selection
      selectedMascot: null, // ID of selected dashboard mascot
    };

    this.loadSettings();

    // Prevent double-click issues
    this.lastClickTime = 0;
    this.clickDebounceMs = 200; // 200ms debounce

    this.init();
  }

  init() {
    console.log("🎮 Squishmallow Collector initializing...");

    // Handle font loading to prevent FOUC
    this.handleFontLoading();

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

    // Setup settings screen (Story 5.1)
    this.setupSettingsScreen();

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

      // Scroll to top when showing dashboard
      if (screenId === "dashboard-screen") {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        console.log("📜 Dashboard scroll attempted");
      }

      // Reinitialize icons after screen change
      setTimeout(() => this.updateIcons(), 50);
    } else {
      console.error(`❌ Screen not found: ${screenId}`);
    }
  }

  showDashboard() {
    console.log("🏠 Loading dashboard...");
    this.showScreen("dashboard-screen");
    // Story 7.4: Update dashboard mascot when showing dashboard
    this.updateDashboardMascot();
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
          // Developer tools handled by browser
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

  // Handle font loading to prevent FOUC
  handleFontLoading() {
    // Check if Font Loading API is available
    if ("fonts" in document) {
      // Wait for all fonts to load
      document.fonts.ready.then(() => {
        document.documentElement.classList.add("fonts-loaded");
        console.log("✅ Fonts loaded successfully");
      });

      // Fallback: Add class after timeout even if fonts haven't loaded
      setTimeout(() => {
        document.documentElement.classList.add("fonts-loaded");
        console.log("⏰ Font loading timeout - showing content anyway");
      }, 3000);
    } else {
      // Fallback for older browsers - just add the class immediately
      document.documentElement.classList.add("fonts-loaded");
      console.log(
        "📝 Font Loading API not supported - showing content immediately"
      );
    }
  }

  // Setup mascot images with unicorn emoji fallback
  setupMascotImages() {
    const mascotImages = document.querySelectorAll(".mascot-image");

    mascotImages.forEach((img) => {
      // Set a generic fallback content using a simple icon
      img.innerHTML =
        '<i data-lucide="heart" style="color: white; font-size: 60px;"></i>';

      // Handle successful image load
      img.onload = () => {
        img.innerHTML = "";
        img.style.background = "none";
      };

      // Handle image load error
      img.onerror = () => {
        console.log("💜 Using heart icon fallback for mascot image");
        img.style.background = "linear-gradient(135deg, #9B59B6, #E91E63)";
        img.innerHTML =
          '<i data-lucide="heart" style="color: white; font-size: 60px;"></i>';
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

    // Create Studio button
    const createStudioBtn = document.getElementById("create-studio-btn");
    if (createStudioBtn) {
      createStudioBtn.addEventListener("click", () => this.handleCreateStudio());
      createStudioBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleCreateStudio();
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

    // Story 7.4: Dashboard mascot click handler
    const dashboardMascot = document.getElementById("dashboard-mascot");
    if (dashboardMascot) {
      dashboardMascot.addEventListener("click", () => this.openMascotSelectionModal());
      dashboardMascot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openMascotSelectionModal();
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

    // Story 6.2: Start background music for gameplay
    this.soundManager.startBackgroundMusic();

    // Story 5.4: Initialize timer if enabled
    this.initializeTimer();

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
    this.showScreen("settings-screen");
    this.populateSettingsForm();
  }

  // Story 7.5: Create Studio handler
  handleCreateStudio() {
    console.log("🎨 Create Studio clicked!");
    this.showScreen("create-studio-screen");
    this.initializeCreatorStudio();
  }

  initializeCreatorStudio() {
    console.log("🎨 Initializing Creator Studio...");
    // TODO: Initialize canvas, templates, colors, patterns, effects
    // This will be implemented in the next steps
  }

  // Story 3.1: Progress tracking methods
  updateProgressBar() {
    const squishmallowFill = document.getElementById("squishmallow-fill");
    const progressText = document.getElementById("progress-text");
    const progressEncouragement = document.getElementById(
      "progress-encouragement"
    );

    if (squishmallowFill && progressText) {
      const percentage =
        (this.gameState.correctAnswers / this.gameState.targetScore) * 100;

      // Update progress bar width
      squishmallowFill.style.width = `${Math.min(percentage, 100)}%`;

      // Add animation class for smooth filling
      squishmallowFill.classList.add("animate");

      progressText.textContent = `${this.gameState.correctAnswers} out of ${this.gameState.targetScore} complete!`;
    }

    // Update encouragement text - only show "Great job!" after correct answers
    if (progressEncouragement) {
      if (this.gameState.correctAnswers > 0) {
        progressEncouragement.textContent = "Great job!";
      } else {
        progressEncouragement.textContent = "You can do it!";
      }
    }
  }

  // Reinitialize Lucide icons after DOM updates
  updateIcons() {
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Story 3.2: Lives system methods
  updateLivesDisplay() {
    const livesContainer = document.getElementById("lives-container");

    // Hide lives display if lives are disabled
    if (!this.settings.livesEnabled) {
      if (livesContainer) {
        livesContainer.style.display = "none";
      }
      return;
    }

    // Show lives display if lives are enabled
    if (livesContainer) {
      livesContainer.style.display = "flex";
    }

    for (let i = 1; i <= this.gameState.maxLives; i++) {
      const lifeIcon = document.getElementById(`life-${i}`);
      if (lifeIcon) {
        if (i <= this.gameState.lives) {
          // Life is active - show filled heart
          lifeIcon.classList.remove("lost");
          lifeIcon.classList.add("filled");
        } else {
          // Life is lost - show empty heart
          lifeIcon.classList.add("lost");
          lifeIcon.classList.remove("filled");
        }
      }
    }
  }

  loseLife() {
    // If lives are disabled, don't lose lives or end the game
    if (!this.settings.livesEnabled) {
      return;
    }

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

    // Story 5.4: Stop timer when game ends
    this.stopTimer();
    this.hideTimer();

    // Story 6.2: Stop background music when game ends
    this.soundManager.stopBackgroundMusic();

    if (result === "success") {
      // Story 4.3: Award a new Squishmallow
      const awardedSquishmallow =
        this.collectionManager.awardRandomSquishmallow();

      // Story 6.2: Play celebration sound for earning Squishmallow
      this.soundManager.playSound("celebration");

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
        this.gameState.totalAttempts > 0
          ? Math.round(
              (this.gameState.correctAnswers / this.gameState.totalAttempts) *
                100
            )
          : 100;
      console.log(
        `🏆 Final Accuracy: ${this.gameState.correctAnswers}/${this.gameState.totalAttempts} = ${accuracy}%`
      );
      accuracyElement.textContent = `${accuracy}%`;
    }

    // Story 4.3: Update success screen with earned Squishmallow
    if (awardedSquishmallow) {
      const squishImage = document.getElementById("earned-squishmallow-image");
      const squishName = document.getElementById("earned-squishmallow-name");
      const squishSquad = document.getElementById("earned-squad");
      const squishDescription = document.getElementById("earned-description");

      console.log("🎁 Updating success screen with:", awardedSquishmallow);

      if (squishImage) {
        // Hide image initially to prevent showing old/fallback content
        squishImage.style.opacity = "0";
        squishImage.innerHTML = "";
        squishImage.style.background = "transparent";
        
        squishImage.src = awardedSquishmallow.image_url;
        squishImage.alt = awardedSquishmallow.name;
        console.log("🖼️ Updated image src to:", awardedSquishmallow.image_url);

        // Add error handling for broken images
        squishImage.onerror = () => {
          console.warn("⚠️ Failed to load image, using fallback");
          squishImage.style.background =
            "linear-gradient(135deg, #9B59B6, #E91E63)";
          squishImage.innerHTML =
            '<i data-lucide="heart" style="color: white; font-size: 60px;"></i>';
          squishImage.style.opacity = "1";
          this.updateIcons();
        };

        // Clear any fallback content when image loads successfully and show it
        squishImage.onload = () => {
          squishImage.innerHTML = "";
          squishImage.style.background = "rgba(255, 255, 255, 0.5)";
          squishImage.style.opacity = "1";
        };
      }

      if (squishName) {
        squishName.textContent = `${awardedSquishmallow.name} the ${awardedSquishmallow.species}`;
        console.log(
          "📛 Updated name to:",
          `${awardedSquishmallow.name} the ${awardedSquishmallow.species}`
        );
      }

      if (squishSquad) {
        squishSquad.textContent = awardedSquishmallow.squad;
        console.log("👥 Updated squad to:", awardedSquishmallow.squad);
      }

      if (squishDescription) {
        squishDescription.textContent =
          awardedSquishmallow.description ||
          "A wonderful new friend to add to your collection!";
        console.log(
          "📝 Updated description to:",
          awardedSquishmallow.description
        );
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
    this.gameState.totalAttempts = 0;
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
      top: 20%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${colors[type] || colors.info};
      color: white;
      padding: 20px 30px;
      border-radius: 20px;
      font-family: var(--font-title);
      font-size: 24px;
      font-weight: 400;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 3px solid white;
      z-index: 1000;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-align: center;
      min-width: 200px;
    `;

    document.body.appendChild(feedback);

    // Animate in with bounce effect
    setTimeout(() => {
      feedback.style.opacity = "1";
      feedback.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);

    // Remove after 2 seconds (shorter for game flow)
    setTimeout(() => {
      feedback.style.opacity = "0";
      feedback.style.transform = "translate(-50%, -50%) scale(0.8)";
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 400);
    }, 2000);
  }

  // Math system methods for Story 2.1
  testMathEngine() {
    console.log("🧪 Testing Math Engine...");

    // Test different number ranges
    const ranges = [
      { multiplication: 5, addition: "ones" },
      { multiplication: 8, addition: "tens" },
      { multiplication: 12, addition: "hundreds" },
    ];
    ranges.forEach((range) => {
      this.mathEngine.setNumberRanges(range);
      const problem = this.mathEngine.generateNewProblem();
      console.log(
        `Range ${range.multiplication}: ${problem.displayText} = ${problem.answer}`
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

    // Clear any previous visual state from problem display
    const problemDisplay = document.querySelector(".problem-display");
    if (problemDisplay) {
      problemDisplay.classList.remove("correct", "incorrect");
    }

    // Story 2.5: Update problem counter
    this.gameState.problemCount++;
    const problemNumberElement = document.getElementById("problem-number");
    if (problemNumberElement) {
      problemNumberElement.textContent = this.gameState.problemCount;
    }

    // Clear any previous answer and re-enable input
    const answerInput = document.getElementById("answer-input");
    if (answerInput) {
      answerInput.value = "";
      answerInput.disabled = false;
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

    // Mute button
    const muteBtn = document.getElementById("game-mute-btn");
    if (muteBtn) {
      this.updateMuteButtonDisplay();
      
      muteBtn.addEventListener("click", () => {
        this.toggleMute();
      });

      muteBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleMute();
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

    // Success screen - view collection button
    const successCollectionBtn = document.getElementById(
      "success-collection-btn"
    );
    if (successCollectionBtn) {
      successCollectionBtn.addEventListener("click", () => {
        this.showCollectionScreen();
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
  async showCollectionScreen() {
    // Wait for collection manager to be ready
    if (
      !this.collectionManager.squishmallows ||
      this.collectionManager.squishmallows.length === 0
    ) {
      console.log("⏳ Waiting for collection data to load...");

      // Wait up to 5 seconds for data to load
      let attempts = 0;
      while (
        (!this.collectionManager.squishmallows ||
          this.collectionManager.squishmallows.length === 0) &&
        attempts < 50
      ) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      if (attempts >= 50) {
        console.error("❌ Collection data failed to load");
        // Show error or fallback
        this.showCollectionError();
        return;
      }
    }

    this.populateCollectionGrid();
    this.updateCollectionStats();
    this.showScreen("collection-screen");
  }

  showCollectionError() {
    const collectionGrid = document.getElementById("collection-grid");
    if (collectionGrid) {
      collectionGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <h3 style="color: var(--accent-coral); margin-bottom: 10px;">Oops! Collection data is loading...</h3>
          <p>Please try again in a moment!</p>
          <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: var(--accent-yellow); border: none; border-radius: 10px; cursor: pointer;">
            Refresh Game
          </button>
        </div>
      `;
    }
    this.showScreen("collection-screen");
  }

  populateCollectionGrid() {
    const collectionGrid = document.getElementById("collection-grid");
    if (!collectionGrid) {
      console.error("❌ Collection grid element not found");
      return;
    }

    if (!this.collectionManager.squishmallows) {
      console.log("⏳ Collection data not ready yet");
      return;
    }

    console.log(
      `📊 Populating collection with ${this.collectionManager.squishmallows.length} squishmallows`
    );

    collectionGrid.innerHTML = "";

    this.collectionManager.squishmallows.forEach((squishmallow, index) => {
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
          <div class="locked-icon"><i data-lucide="lock"></i></div>
          <h4 class="squishmallow-name">???</h4>
          <p class="squishmallow-squad">Keep playing to unlock!</p>
        `;
      }

      collectionGrid.appendChild(card);
    });

    // Update icons after adding content
    this.updateIcons();

    console.log(
      `✅ Added ${collectionGrid.children.length} cards to collection grid`
    );
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

  confirmRestartCollection() {
    const confirmed = confirm(
      "This will delete all progress on your squishmallow collection - are you sure?"
    );
    
    if (confirmed) {
      this.restartCollection();
    }
  }

  restartCollection() {
    try {
      // Clear the collection from localStorage
      localStorage.removeItem("squishmallow-collection");
      
      // Reset the collection manager's user collection
      this.collectionManager.userCollection = new Set();
      
      console.log("🔄 Collection has been reset");
      
      // Update the collection screen if it's currently displayed
      const collectionScreen = document.getElementById("collection-screen");
      if (collectionScreen && collectionScreen.classList.contains("active")) {
        this.populateCollectionGrid();
      }
      
      // Show a feedback message
      this.showFeedback("Collection has been reset successfully!", "info");
      
    } catch (error) {
      console.error("❌ Error resetting collection:", error);
      this.showFeedback("Error resetting collection. Please try again.", "error");
    }
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
          "That's enough numbers! Try submitting your answer",
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
      
      // Track total attempts for accuracy calculation
      this.gameState.totalAttempts++;

      const problemDisplay = document.querySelector(".problem-display");

      // Disable input immediately after submission
      if (answerInput) {
        answerInput.disabled = true;
      }

      if (validation.isCorrect) {
        // Story 6.2: Play success sound
        this.soundManager.playSound("correct");
        
        // Add green success background
        if (problemDisplay) {
          problemDisplay.classList.add("correct");
        }

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
            // Remove success state before showing new problem
            if (problemDisplay) {
              problemDisplay.classList.remove("correct");
            }
            const newProblem = this.mathEngine.generateNewProblem();
            this.displayProblem(newProblem);
            this.clearInput();
          }, 1500);
        }
      } else {
        // Story 6.2: Play incorrect sound
        this.soundManager.playSound("incorrect");
        
        // Add red error background and shake animation
        if (problemDisplay) {
          problemDisplay.classList.add("incorrect");
          // Remove the animation class after it completes so it can be triggered again
          setTimeout(() => {
            problemDisplay.classList.remove("incorrect");
          }, 600);
        }

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
        `📊 Game Stats: ${this.gameState.correctAnswers}/${this.gameState.totalAttempts} correct (${this.gameState.problemCount} problems shown)`
      );
    }
  }

  // Story 5.1: Settings System Methods

  loadSettings() {
    const savedSettings = localStorage.getItem("squishCollectorSettings");
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }

    // Update game state based on settings
    this.gameState.targetScore = this.settings.gameLength;
    if (this.mathEngine) {
      this.mathEngine.setOperations(this.settings.operations);
      this.mathEngine.setNumberRanges({
        multiplication: this.settings.multRange,
        addition: this.settings.addRange,
      });
    }
  }

  saveSettings() {
    localStorage.setItem(
      "squishCollectorSettings",
      JSON.stringify(this.settings)
    );
    // Update game state
    this.gameState.targetScore = this.settings.gameLength;
    if (this.mathEngine) {
      this.mathEngine.setOperations(this.settings.operations);
      this.mathEngine.setNumberRanges({
        multiplication: this.settings.multRange,
        addition: this.settings.addRange,
      });
    }
  }

  setupSettingsScreen() {
    // Save settings button
    const saveBtn = document.getElementById("settings-save-btn");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => this.saveSettingsAndReturn());
    }

    // Cancel settings button
    const cancelBtn = document.getElementById("settings-cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () =>
        this.showScreen("dashboard-screen")
      );
    }

    // Restart collection button
    const restartBtn = document.getElementById("restart-collection-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => this.confirmRestartCollection());
    }

    // Story 6.2: Audio settings controls
    this.setupAudioControls();
  }

  // Story 6.2: Setup audio controls
  setupAudioControls() {
    // Audio enabled checkbox
    const audioEnabled = document.getElementById("audio-enabled");
    if (audioEnabled) {
      audioEnabled.checked = !this.soundManager.isMutedState();
      audioEnabled.addEventListener("change", (e) => {
        this.soundManager.setMuted(!e.target.checked);
      });
    }

    // Sound volume slider
    const soundVolume = document.getElementById("sound-volume");
    const soundVolumeDisplay = document.getElementById("sound-volume-display");
    if (soundVolume && soundVolumeDisplay) {
      soundVolume.value = Math.round(this.soundManager.getSoundVolume() * 100);
      soundVolumeDisplay.textContent = `${soundVolume.value}%`;
      
      soundVolume.addEventListener("input", (e) => {
        const volume = e.target.value / 100;
        this.soundManager.setSoundVolume(volume);
        soundVolumeDisplay.textContent = `${e.target.value}%`;
        
        // Play test sound
        this.soundManager.playSound("button");
      });
    }

    // Background music enabled checkbox
    const musicEnabled = document.getElementById("background-music-enabled");
    if (musicEnabled) {
      musicEnabled.checked = this.soundManager.isBackgroundMusicEnabledState();
      musicEnabled.addEventListener("change", (e) => {
        this.soundManager.setBackgroundMusicEnabled(e.target.checked);
      });
    }

    // Music volume slider
    const musicVolume = document.getElementById("music-volume");
    const musicVolumeDisplay = document.getElementById("music-volume-display");
    if (musicVolume && musicVolumeDisplay) {
      musicVolume.value = Math.round(this.soundManager.getMusicVolume() * 100);
      musicVolumeDisplay.textContent = `${musicVolume.value}%`;
      
      musicVolume.addEventListener("input", (e) => {
        const volume = e.target.value / 100;
        this.soundManager.setMusicVolume(volume);
        musicVolumeDisplay.textContent = `${e.target.value}%`;
      });
    }
  }

  // Story 6.2: Mute button functionality
  toggleMute() {
    const currentMuteState = this.soundManager.isMutedState();
    this.soundManager.setMuted(!currentMuteState);
    this.updateMuteButtonDisplay();
    
    // Play a quick test sound to confirm unmuting (only if unmuting)
    if (currentMuteState) {
      setTimeout(() => {
        this.soundManager.playSound("button");
      }, 100);
    }
    
    console.log(`🔊 Audio ${currentMuteState ? 'unmuted' : 'muted'}`);
  }

  updateMuteButtonDisplay() {
    const muteBtn = document.getElementById("game-mute-btn");
    const iconOn = document.getElementById("mute-icon-on");
    const iconOff = document.getElementById("mute-icon-off");
    
    if (muteBtn && iconOn && iconOff) {
      const isMuted = this.soundManager.isMutedState();
      
      if (isMuted) {
        muteBtn.classList.add("muted");
        iconOn.style.display = "none";
        iconOff.style.display = "inline";
        muteBtn.title = "Turn sound on";
      } else {
        muteBtn.classList.remove("muted");
        iconOn.style.display = "inline";
        iconOff.style.display = "none";
        muteBtn.title = "Turn sound off";
      }
    }
  }

  // Story 5.4: Timer functionality methods
  initializeTimer() {
    const timerSeconds = this.settings.timerSeconds;

    if (timerSeconds && timerSeconds > 0) {
      this.gameState.timeRemaining = timerSeconds;
      this.gameState.timerInterval = null;
      this.showTimer();
      this.updateTimerDisplay();
      this.startTimer();
    } else {
      this.hideTimer();
    }
  }

  startTimer() {
    if (this.gameState.timeRemaining > 0 && !this.gameState.timerInterval) {
      this.gameState.timerInterval = setInterval(() => {
        this.updateTimer();
      }, 1000);
    }
  }

  updateTimer() {
    if (this.gameState.timeRemaining > 0) {
      this.gameState.timeRemaining--;
      this.updateTimerDisplay();

      // Check if time is running low (30 seconds or less)
      const timerContainer = document.getElementById("timer-container");
      if (this.gameState.timeRemaining <= 30) {
        timerContainer.classList.add("timer-warning");
      } else {
        timerContainer.classList.remove("timer-warning");
      }

      if (this.gameState.timeRemaining === 0) {
        this.handleTimeUp();
      }
    }
  }

  updateTimerDisplay() {
    const timerContainer = document.getElementById("timer-container");
    const timerMinutes = document.querySelector(".timer-minutes");
    const timerSeconds = document.querySelector(".timer-seconds");
    
    if (timerMinutes && timerSeconds) {
      const minutes = Math.floor(this.gameState.timeRemaining / 60);
      const seconds = this.gameState.timeRemaining % 60;
      
      timerMinutes.textContent = minutes.toString();
      timerSeconds.textContent = seconds.toString().padStart(2, "0");
    }

    // Warning state
    if (timerContainer) {
      if (this.gameState.timeRemaining <= 30) {
        timerContainer.classList.add("timer-warning");
      } else {
        timerContainer.classList.remove("timer-warning");
      }
    }
  }

  showTimer() {
    const timerWrapper = document.getElementById("timer-wrapper");
    if (timerWrapper) {
      timerWrapper.style.display = "flex";
    }
  }

  hideTimer() {
    const timerWrapper = document.getElementById("timer-wrapper");
    if (timerWrapper) {
      timerWrapper.style.display = "none";
    }
  }

  stopTimer() {
    if (this.gameState.timerInterval) {
      clearInterval(this.gameState.timerInterval);
      this.gameState.timerInterval = null;
    }
  }

  handleTimeUp() {
    console.log("⏰ Time's up!");
    this.stopTimer();
    this.endGame("failure");
  }

  populateSettingsForm() {
    // Set multiplication range
    const multRange = document.getElementById("mult-range");
    if (multRange) {
      multRange.value = this.settings.multRange || 12;
    }

    // Set addition range
    const addRange = document.getElementById("add-range");
    if (addRange) {
      addRange.value = this.settings.addRange || "tens";
    }

    // Set game length dropdown
    const gameLengthSelect = document.getElementById("game-length-select");
    if (gameLengthSelect) {
      gameLengthSelect.value = this.settings.gameLength.toString();
    }

    // Set lives checkbox
    const livesCheckbox = document.getElementById("lives-enabled");
    if (livesCheckbox) {
      livesCheckbox.checked = this.settings.livesEnabled;
    }

    // Set operation checkboxes (Story 5.2)
    const operations = [
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ];
    operations.forEach((op) => {
      const checkbox = document.getElementById(`operation-${op}`);
      if (checkbox) {
        checkbox.checked = this.settings.operations.includes(op);
      }
    });

    // Set timer dropdown (Story 5.4)
    const timerSelect = document.getElementById("timer-select");
    if (timerSelect) {
      const timerValue = this.settings.timerSeconds || 0;
      timerSelect.value = timerValue.toString();
    }
  }

  saveSettingsAndReturn() {
    // Get multiplication range setting
    const multRange = document.getElementById("mult-range");
    if (multRange) {
      this.settings.multRange = parseInt(multRange.value) || 12;
    }

    // Get addition range setting
    const addRange = document.getElementById("add-range");
    if (addRange) {
      this.settings.addRange = addRange.value || "tens";
    }

    // Get game length setting
    const gameLengthSelect = document.getElementById("game-length-select");
    if (gameLengthSelect) {
      this.settings.gameLength = parseInt(gameLengthSelect.value);
    }

    // Get lives setting
    const livesCheckbox = document.getElementById("lives-enabled");
    if (livesCheckbox) {
      this.settings.livesEnabled = livesCheckbox.checked;
    }

    // Get operation settings (Story 5.2)
    const operations = [];
    ["addition", "subtraction", "multiplication", "division"].forEach((op) => {
      const checkbox = document.getElementById(`operation-${op}`);
      if (checkbox && checkbox.checked) {
        operations.push(op);
      }
    });

    // Ensure at least one operation is selected
    if (operations.length === 0) {
      this.showFeedback(
        "Please select at least one math operation! 🧮",
        "error"
      );
      return;
    }

    this.settings.operations = operations;

    // Get timer setting (Story 5.4)
    const timerSelect = document.getElementById("timer-select");
    if (timerSelect) {
      this.settings.timerSeconds = parseInt(timerSelect.value) || 0;
    }

    this.saveSettings();
    this.showFeedback("Settings saved!", "success");
    setTimeout(() => {
      this.showScreen("dashboard-screen");
    }, 1000);
  }

  // Story 7.4: Mascot Selection Methods
  openMascotSelectionModal() {
    console.log("🎭 Opening mascot selection modal...");
    
    // Populate the modal with collected Squishmallows
    this.populateMascotSelection();
    
    // Show the modal
    const modal = document.getElementById("mascot-selection-modal");
    if (modal) {
      modal.style.display = "flex";
      // Add show class for animation after a brief delay
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);
      
      // Setup modal close handlers
      this.setupMascotModalCloseHandlers();
    }
  }

  populateMascotSelection() {
    const grid = document.getElementById("mascot-selection-grid");
    if (!grid || !this.collectionManager) {
      console.error("❌ Could not populate mascot selection - missing elements");
      return;
    }

    // Get collected Squishmallows
    const allSquishmallows = this.collectionManager.getAllSquishmallows();
    const collectedIds = Array.from(this.collectionManager.userCollection);
    
    // Clear existing content
    grid.innerHTML = "";

    if (collectedIds.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <p style="color: var(--text-muted); font-style: italic;">
            No Squishmallows collected yet! Play the math game to earn your first companion.
          </p>
        </div>
      `;
      return;
    }

    // Create mascot options for collected Squishmallows
    collectedIds.forEach(squishId => {
      const squishmallow = allSquishmallows.find(s => s.id === squishId);
      if (!squishmallow) {
        console.warn(`⚠️ Collected Squishmallow not found in data: ${squishId}`);
        return;
      }

      const optionDiv = document.createElement("div");
      optionDiv.className = "mascot-option";
      if (this.settings.selectedMascot === squishId) {
        optionDiv.classList.add("selected");
      }

      // Use same image approach as collection page
      console.log(`🖼️ ${squishmallow.name}: ${squishmallow.image_url}`);

      optionDiv.innerHTML = `
        <img 
          src="${squishmallow.image_url}" 
          alt="${squishmallow.name}"
          class="mascot-option-image"
          onerror="this.style.background='linear-gradient(135deg, #9B59B6, #E91E63)'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='💖';"
        />
        <h3 class="mascot-option-name">${squishmallow.name}</h3>
      `;

      // Add click handler
      optionDiv.addEventListener("click", (e) => this.selectMascot(squishId, e.currentTarget));
      
      grid.appendChild(optionDiv);
    });

    // Update icons for any fallback content
    setTimeout(() => lucide.createIcons(), 100);
  }

  selectMascot(squishId, clickedElement) {
    console.log(`🎭 Selected mascot: ${squishId}`);
    
    // Update settings
    this.settings.selectedMascot = squishId;
    this.saveSettings();
    
    // Update visual selection in modal
    const options = document.querySelectorAll(".mascot-option");
    options.forEach(option => {
      option.classList.remove("selected");
    });
    
    // Add selected class to clicked option
    if (clickedElement) {
      clickedElement.classList.add("selected");
    }
    
    // Update dashboard mascot
    this.updateDashboardMascot();
    
    // Play selection sound
    this.soundManager.playSound("button");
    
    // Show feedback
    const squishmallow = this.collectionManager.getAllSquishmallows().find(s => s.id === squishId);
    if (squishmallow) {
      this.showFeedback(`${squishmallow.name} is now your dashboard companion!`, "success");
    }
    
    // Close modal after brief delay
    setTimeout(() => {
      this.closeMascotSelectionModal();
    }, 800);
  }

  updateDashboardMascot() {
    const dashboardMascot = document.getElementById("dashboard-mascot");
    if (!dashboardMascot || !this.collectionManager) return;

    // Get selected mascot or fall back to default
    let selectedMascot = null;
    if (this.settings.selectedMascot) {
      selectedMascot = this.collectionManager.getAllSquishmallows()
        .find(s => s.id === this.settings.selectedMascot);
    }

    if (selectedMascot) {
      // Update to selected mascot - use same approach as collection page
      console.log(`🎭 Dashboard mascot updated to: ${selectedMascot.name}, image: ${selectedMascot.image_url}`);
      dashboardMascot.src = selectedMascot.image_url;
      dashboardMascot.alt = `Your dashboard companion: ${selectedMascot.name}`;
      
      // Update browser favicon to match selected mascot
      this.updateFavicon(selectedMascot.image_url);
    } else {
      // Fall back to default Luna
      console.log("🎭 Using default Luna mascot");
      dashboardMascot.src = "assets/squishmallows/luna_the_cat.png";
      dashboardMascot.alt = "Click to change your dashboard companion";
      
      // Update favicon to default Luna
      this.updateFavicon("assets/squishmallows/luna_the_cat.png");
    }
  }

  updateFavicon(imageUrl) {
    const favicon = document.getElementById("favicon");
    if (favicon && imageUrl) {
      favicon.href = imageUrl;
      console.log(`🎨 Browser favicon updated to: ${imageUrl}`);
    }
  }

  setupMascotModalCloseHandlers() {
    // Close button
    const closeBtn = document.getElementById("mascot-modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeMascotSelectionModal());
    }

    // ESC key
    const escHandler = (e) => {
      if (e.key === "Escape") {
        this.closeMascotSelectionModal();
        document.removeEventListener("keydown", escHandler);
      }
    };
    document.addEventListener("keydown", escHandler);

    // Click outside modal
    const modal = document.getElementById("mascot-selection-modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeMascotSelectionModal();
        }
      });
    }
  }

  closeMascotSelectionModal() {
    console.log("🎭 Closing mascot selection modal...");
    
    const modal = document.getElementById("mascot-selection-modal");
    if (modal) {
      // Remove show class for animation
      modal.classList.remove("show");
      
      // Hide modal after animation completes
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
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
