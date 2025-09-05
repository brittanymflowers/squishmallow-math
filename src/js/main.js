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

    // Setup my creations screen buttons (Story 7.5)
    this.setupMyCreationsScreen();

    // Show loading screen first
    this.showScreen("loading-screen");

    // Simulate loading time and then show basic dashboard
    setTimeout(() => {
      this.showDashboard();
    }, 2000);

    // Add keyboard navigation support
    this.setupKeyboardNavigation();

    // Setup mobile navigation menu
    this.setupMobileMenu();
    
    // Setup mobile game controls
    this.setupMobileGameControls();

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

      // Show/hide mobile menu button based on current screen
      this.updateMobileMenuVisibility(screenId);

      // Reinitialize icons after screen change
      setTimeout(() => this.updateIcons(), 50);
    } else {
      console.error(`❌ Screen not found: ${screenId}`);
    }
  }

  updateMobileMenuVisibility(screenId) {
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    if (mobileMenuToggle) {
      // Hide mobile menu on dashboard and loading screen, show on all other screens
      if (screenId === "dashboard-screen" || screenId === "loading-screen") {
        mobileMenuToggle.style.display = "none";
      } else {
        // Only show if we're on mobile (let CSS media query handle the rest)
        mobileMenuToggle.style.display = "";
      }
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

  // Mobile Menu Setup
  setupMobileMenu() {
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const menuOverlay = document.getElementById("mobile-menu-overlay");
    const menuClose = document.getElementById("mobile-menu-close");
    const menuItems = document.querySelectorAll(".mobile-menu-item");

    if (!menuToggle || !menuOverlay || !menuClose) {
      console.warn("🔍 Mobile menu elements not found");
      return;
    }

    // Toggle menu open
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.openMobileMenu();
      e.target.blur();
    });

    // Close menu when clicking close button
    menuClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeMobileMenu();
      e.target.blur();
    });

    // Close menu when clicking overlay background
    menuOverlay.addEventListener("click", (e) => {
      if (e.target === menuOverlay) {
        this.closeMobileMenu();
      }
    });

    // Handle navigation menu items
    menuItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetScreen = item.getAttribute("data-screen");
        if (targetScreen) {
          this.closeMobileMenu();
          
          // Navigate to the selected screen
          if (targetScreen === "dashboard-screen") {
            this.showDashboard();
          } else if (targetScreen === "game-screen") {
            // Start a new game instead of just showing the screen
            console.log("📱 Mobile menu: Starting new game");
            this.handleStartGame();
          } else if (targetScreen === "template-selection-screen") {
            this.showScreen("template-selection-screen");
            this.initializeTemplateSelection();
          } else {
            this.showScreen(targetScreen);
          }
        }
        
        e.target.blur();
      });
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuOverlay.classList.contains("active")) {
        this.closeMobileMenu();
      }
    });

    // Initialize icons for mobile menu
    setTimeout(() => this.updateIcons(), 50);
    
    console.log("📱 Mobile menu setup complete!");
  }

  openMobileMenu() {
    const menuOverlay = document.getElementById("mobile-menu-overlay");
    if (menuOverlay) {
      menuOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    }
  }

  closeMobileMenu() {
    const menuOverlay = document.getElementById("mobile-menu-overlay");
    if (menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    }
  }

  // Mobile Game Controls Setup
  setupMobileGameControls() {
    const mobileSubmitBtn = document.getElementById("mobile-submit-btn");
    const mobileAnswerField = document.getElementById("mobile-answer-field");
    
    if (mobileSubmitBtn) {
      mobileSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.submitMobileAnswer();
        e.target.blur();
      });
    }
    
    if (mobileAnswerField) {
      // Allow Enter key to submit
      mobileAnswerField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.submitMobileAnswer();
        }
      });
      
      // Update submit button state as user types
      mobileAnswerField.addEventListener("input", (e) => {
        console.log("📱 Mobile input changed:", e.target.value);
        
        // Sync with desktop input field
        const desktopAnswerInput = document.getElementById("answer-input");
        if (desktopAnswerInput) {
          desktopAnswerInput.value = e.target.value;
          this.updateSubmitButton();
          console.log("📱 Synced to desktop field:", e.target.value);
        }
        
        this.updateMobileSubmitButton();
        // Force re-render of the input value
        e.target.setAttribute('value', e.target.value);
      });
      
      // Ensure numeric keyboard on mobile - try multiple approaches
      const focusInput = () => {
        console.log("📱 Attempting to focus mobile input");
        mobileAnswerField.focus();
        mobileAnswerField.click();
      };
      
      mobileAnswerField.addEventListener("touchstart", (e) => {
        e.preventDefault();
        focusInput();
      });
      
      mobileAnswerField.addEventListener("click", (e) => {
        console.log("📱 Mobile input clicked");
        focusInput();
      });
      
      mobileAnswerField.addEventListener("focus", () => {
        console.log("📱 Mobile input focused - numeric keyboard should appear");
      });
      
      mobileAnswerField.addEventListener("blur", () => {
        console.log("📱 Mobile input lost focus");
      });
    }
    
    console.log("📱 Mobile game controls setup complete!");
  }
  
  submitMobileAnswer() {
    const mobileAnswerField = document.getElementById("mobile-answer-field");
    const desktopAnswerInput = document.getElementById("answer-input");
    
    if (mobileAnswerField && desktopAnswerInput) {
      // Sync mobile answer to desktop input for processing
      desktopAnswerInput.value = mobileAnswerField.value;
      console.log("📱 Mobile answer submitted:", mobileAnswerField.value);
      
      // Use existing submit logic
      this.submitAnswer();
      
      // Clear mobile field after submission
      mobileAnswerField.value = "";
      this.updateMobileSubmitButton();
    }
  }
  
  updateMobileSubmitButton() {
    const mobileSubmitBtn = document.getElementById("mobile-submit-btn");
    const mobileAnswerField = document.getElementById("mobile-answer-field");
    
    if (mobileSubmitBtn && mobileAnswerField) {
      const hasAnswer = mobileAnswerField.value.trim().length > 0;
      mobileSubmitBtn.disabled = !hasAnswer;
      console.log(`📱 Submit button update - hasAnswer: ${hasAnswer}, value: "${mobileAnswerField.value}"`);
      
      // Update button visual state
      if (hasAnswer) {
        mobileSubmitBtn.classList.add('enabled');
        mobileSubmitBtn.classList.remove('disabled');
      } else {
        mobileSubmitBtn.classList.add('disabled');
        mobileSubmitBtn.classList.remove('enabled');
      }
    }
  }
  
  // Update timer visibility for mobile
  updateMobileTimerVisibility() {
    const mobileTimer = document.querySelector(".mobile-timer");
    if (mobileTimer) {
      if (this.settings.timerSeconds && this.settings.timerSeconds > 0) {
        mobileTimer.classList.add("timer-enabled");
        console.log("📱 Mobile timer enabled with", this.settings.timerSeconds, "seconds");
      } else {
        mobileTimer.classList.remove("timer-enabled");
        console.log("📱 Mobile timer disabled");
      }
    }
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
      createStudioBtn.addEventListener("click", () =>
        this.handleCreateStudio()
      );
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
      dashboardMascot.addEventListener("click", () =>
        this.openMascotSelectionModal()
      );
      dashboardMascot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openMascotSelectionModal();
        }
      });
    }

    // Story 7.5: My Creations button
    const myCreationsBtn = document.getElementById("my-creations-btn");
    if (myCreationsBtn) {
      myCreationsBtn.addEventListener("click", () => this.handleMyCreations());
      myCreationsBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleMyCreations();
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
    
    // Update mobile timer visibility
    this.updateMobileTimerVisibility();

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
    this.showScreen("template-selection-screen");
    this.initializeTemplateSelection();
  }

  // Story 7.5: My Creations handler
  handleMyCreations() {
    console.log("🖼️ My Creations clicked!");
    this.showMyCreationsScreen();
  }

  initializeTemplateSelection() {
    console.log("🖼️ Initializing Template Selection...");

    // Load templates for selection
    this.loadTemplateSelection();

    // Setup template selection handlers
    this.setupTemplateSelectionHandlers();
  }

  initializeCreatorStudio(selectedTemplate) {
    console.log("🎨 Initializing Creator Studio...");

    // Store selected template
    this.selectedTemplate = selectedTemplate;

    // Initialize canvas
    this.setupCanvas();

    // Load the selected template onto canvas
    this.loadSelectedTemplate(selectedTemplate);

    // Create color palette
    this.createColorPalette();

    // Setup tool event handlers
    this.setupCreatorTools();
  }

  setupCanvas() {
    const canvas = document.getElementById("creator-canvas");
    if (!canvas) return;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.selectedColor = "#FF6B9D"; // Default pink

    // Initialize cursor with default color
    this.updateCursorColor(this.selectedColor);

    // Initialize undo/redo system
    this.canvasHistory = [];
    this.historyStep = -1;
    this.maxHistorySteps = 20; // Limit history to prevent memory issues

    // Initialize recent colors system
    this.recentColors = this.loadRecentColors();
    this.maxRecentColors = 8; // Keep track of last 8 colors

    // Set canvas background to white for better coloring
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Save initial state
    this.saveCanvasState();

    console.log(
      "🖼️ Canvas initialized with white background and history system"
    );
  }

  loadTemplateSelection() {
    const templateGrid = document.getElementById("template-selection-grid");
    if (!templateGrid) return;

    // Available templates
    const templates = [
      {
        id: "fox",
        name: "Fox",
        file: "fox-template.png",
        description: "A cute fox with big ears perfect for coloring!",
      },
      {
        id: "alien",
        name: "Alien",
        file: "alien-template.png",
        description: "A friendly alien visitor ready for cosmic colors!",
      },
      {
        id: "cat",
        name: "Cat",
        file: "cat-template.png",
        description: "An adorable kitty waiting for your creative touch!",
      },
      {
        id: "caticorn",
        name: "Caticorn",
        file: "caticorn-template.png",
        description: "A magical cat-unicorn hybrid ready for rainbow colors!",
      },
      {
        id: "mushroom",
        name: "Mushroom",
        file: "mushroom-template.png",
        description: "A whimsical mushroom perfect for forest colors!",
      },
    ];

    templateGrid.innerHTML = "";

    templates.forEach((template) => {
      const templateDiv = document.createElement("div");
      templateDiv.className = "template-selection-option";
      templateDiv.dataset.templateId = template.id;
      templateDiv.innerHTML = `
        <img src="assets/templates/${template.file}" alt="${template.name}" class="template-preview">
        <div class="template-info">
          <h3>${template.name}</h3>
          <p>${template.description}</p>
        </div>
      `;

      templateGrid.appendChild(templateDiv);
    });

    // Update icons after adding content
    setTimeout(() => lucide.createIcons(), 50);

    console.log("📄 Template selection loaded");
  }

  setupTemplateSelectionHandlers() {
    // Back button
    const backBtn = document.getElementById("template-back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () =>
        this.showScreen("dashboard-screen")
      );
    }

    // Template selection buttons
    const templateGrid = document.getElementById("template-selection-grid");
    if (templateGrid) {
      templateGrid.addEventListener("click", (e) => {
        const templateOption = e.target.closest(".template-selection-option");
        if (templateOption) {
          const templateId = templateOption.dataset.templateId;
          const templates = [
            {
              id: "fox",
              name: "Fox",
              file: "fox-template.png",
              description: "A cute fox with big ears perfect for coloring!",
            },
            {
              id: "alien",
              name: "Alien",
              file: "alien-template.png",
              description: "A friendly alien visitor ready for cosmic colors!",
            },
            {
              id: "cat",
              name: "Cat",
              file: "cat-template.png",
              description: "An adorable kitty waiting for your creative touch!",
            },
            {
              id: "caticorn",
              name: "Caticorn",
              file: "caticorn-template.png",
              description:
                "A magical cat-unicorn hybrid ready for rainbow colors!",
            },
            {
              id: "mushroom",
              name: "Mushroom",
              file: "mushroom-template.png",
              description: "A whimsical mushroom perfect for forest colors!",
            },
          ];

          const selectedTemplate = templates.find((t) => t.id === templateId);
          if (selectedTemplate) {
            this.startCreatorStudio(selectedTemplate);
          }
        }
      });
    }

    console.log("📄 Template selection handlers setup");
  }

  startCreatorStudio(selectedTemplate) {
    console.log(
      `🎨 Starting Creator Studio with template: ${selectedTemplate.name}`
    );
    this.showScreen("create-studio-screen");
    this.initializeCreatorStudio(selectedTemplate);
  }

  loadSelectedTemplate(template) {
    // Load template image onto canvas
    const img = new Image();
    img.onload = () => {
      // Clear canvas but keep it transparent (no white background)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Calculate dimensions to maintain aspect ratio
      const imgAspectRatio = img.width / img.height;
      const canvasAspectRatio = this.canvas.width / this.canvas.height;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgAspectRatio > canvasAspectRatio) {
        // Image is wider relative to canvas - fit by width
        drawWidth = this.canvas.width * 0.9; // Leave 5% margin on each side
        drawHeight = drawWidth / imgAspectRatio;
      } else {
        // Image is taller relative to canvas - fit by height
        drawHeight = this.canvas.height * 0.9; // Leave 5% margin on top/bottom
        drawWidth = drawHeight * imgAspectRatio;
      }

      // Center the image
      drawX = (this.canvas.width - drawWidth) / 2;
      drawY = (this.canvas.height - drawHeight) / 2;

      // Draw template image with proper aspect ratio and centering
      this.ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      this.templateImage = img;

      // Store drawing dimensions for reference
      this.templateDrawBounds = {
        x: drawX,
        y: drawY,
        width: drawWidth,
        height: drawHeight,
      };

      // Store original template image data for protection checking
      this.originalTemplateData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      // Save state after template load
      this.saveCanvasState();

      console.log(
        `🖼️ Template loaded: ${drawWidth}x${drawHeight} at (${drawX}, ${drawY})`
      );
      console.log("🛡️ Original template data stored for outline protection");
    };

    img.onerror = () => {
      console.warn("⚠️ Failed to load selected template image");
    };

    img.src = `assets/templates/${template.file}`;
  }

  createColorPalette() {
    const colorPicker = document.getElementById("color-picker");
    if (!colorPicker) return;

    // Child-friendly color palette
    const colors = [
      "#FF6B9D",
      "#FFB3BA",
      "#FFDFBA",
      "#FFFFBA",
      "#BAFFC9",
      "#BAE1FF",
      "#C9C9FF",
      "#FFB3FF",
      "#FF9999",
      "#FFD700",
      "#98FB98",
      "#87CEEB",
      "#DDA0DD",
      "#F0E68C",
      "#FFA07A",
      "#20B2AA",
      "#FF69B4",
      "#32CD32",
      "#FF4500",
      "#4169E1",
      "#DC143C",
      "#00CED1",
      "#FF1493",
      "#00FF00",
      "#8A2BE2",
      "#FF8C00",
      "#000000",
      "#FFFFFF",
      "#808080",
      "#654321",
    ];

    colorPicker.innerHTML = "";

    colors.forEach((color) => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color-option";
      colorDiv.style.backgroundColor = color;
      colorDiv.dataset.color = color;

      if (color === this.selectedColor) {
        colorDiv.classList.add("selected");
      }

      colorDiv.addEventListener("click", () =>
        this.selectColor(color, colorDiv)
      );
      colorPicker.appendChild(colorDiv);
    });

    // Add custom color picker option
    const customColorDiv = document.createElement("div");
    customColorDiv.className = "color-option custom-color-picker";
    customColorDiv.innerHTML = `
      <i data-lucide="plus" style="width: 16px; height: 16px; color: #666;"></i>
      <input type="color" class="color-input" style="position: absolute; opacity: 0; pointer-events: none;" />
    `;
    customColorDiv.title = "Choose custom color";

    customColorDiv.addEventListener("click", () =>
      this.openCustomColorPicker(customColorDiv)
    );
    colorPicker.appendChild(customColorDiv);

    // Update icons after adding content
    setTimeout(() => lucide.createIcons(), 50);

    // Create recent colors section
    this.createRecentColorsSection();

    console.log("🎨 Color palette created");
  }

  createRecentColorsSection() {
    const recentColorsContainer = document.getElementById("recent-colors");
    if (!recentColorsContainer) return;

    recentColorsContainer.innerHTML = "";

    // Create 8 recent color slots
    for (let i = 0; i < this.maxRecentColors; i++) {
      const recentColorDiv = document.createElement("div");
      recentColorDiv.className = "recent-color-option";

      if (i < this.recentColors.length) {
        const color = this.recentColors[i];
        recentColorDiv.style.backgroundColor = color;
        recentColorDiv.dataset.color = color;
        recentColorDiv.title = `Recent color: ${color}`;

        recentColorDiv.addEventListener("click", () =>
          this.selectColor(color, recentColorDiv)
        );
      } else {
        recentColorDiv.classList.add("empty");
        recentColorDiv.title = "No recent color";
      }

      recentColorsContainer.appendChild(recentColorDiv);
    }

    console.log("🕒 Recent colors section created");
  }

  addToRecentColors(color) {
    // Remove color if it already exists
    const existingIndex = this.recentColors.indexOf(color);
    if (existingIndex !== -1) {
      this.recentColors.splice(existingIndex, 1);
    }

    // Add color to the beginning
    this.recentColors.unshift(color);

    // Keep only the most recent colors
    if (this.recentColors.length > this.maxRecentColors) {
      this.recentColors = this.recentColors.slice(0, this.maxRecentColors);
    }

    // Save to localStorage
    this.saveRecentColors();

    // Update the UI
    this.createRecentColorsSection();

    console.log(`🕒 Added ${color} to recent colors`);
  }

  loadRecentColors() {
    try {
      const saved = localStorage.getItem("squishmallow-recent-colors");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("❌ Error loading recent colors:", error);
      return [];
    }
  }

  saveRecentColors() {
    try {
      localStorage.setItem(
        "squishmallow-recent-colors",
        JSON.stringify(this.recentColors)
      );
    } catch (error) {
      console.error("❌ Error saving recent colors:", error);
    }
  }

  selectColor(color, colorElement) {
    this.selectedColor = color;

    // Remove selected class from all colors
    document
      .querySelectorAll(".color-option, .recent-color-option")
      .forEach((el) => el.classList.remove("selected"));

    // Add selected class to clicked color
    colorElement.classList.add("selected");

    // Add to recent colors history
    this.addToRecentColors(color);

    // Update cursor color to match selected color
    this.updateCursorColor(color);

    console.log(`🎨 Selected color: ${color}`);
  }

  updateCursorColor(color) {
    const canvas = document.getElementById("creator-canvas");
    if (!canvas) return;

    // Remove any existing dynamic cursor styles
    const existingStyle = document.getElementById("dynamic-cursor-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new cursor with selected color
    const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="${color}" stroke="white" stroke-width="1"/></svg>`;
    const encodedSvg = encodeURIComponent(cursorSvg);

    // Create dynamic style for the cursor
    const style = document.createElement("style");
    style.id = "dynamic-cursor-style";
    style.textContent = `
      #creator-canvas.paintbrush-cursor {
        cursor: url('data:image/svg+xml;utf8,${encodedSvg}') 6 6, auto;
      }
    `;

    document.head.appendChild(style);
  }

  openCustomColorPicker(customColorDiv) {
    const colorInput = customColorDiv.querySelector(".color-input");

    // Set up the color input event handler
    colorInput.onchange = (e) => {
      const selectedColor = e.target.value;

      // Update the custom color picker appearance to show selected color
      customColorDiv.style.backgroundColor = selectedColor;
      customColorDiv.innerHTML = `<input type="color" class="color-input" value="${selectedColor}" style="position: absolute; opacity: 0; pointer-events: none;" />`;

      // Set this as the selected color (this will automatically add to recent colors)
      this.selectColor(selectedColor, customColorDiv);

      console.log(`🎨 Custom color selected: ${selectedColor}`);
    };

    // Trigger the color picker
    colorInput.click();
  }

  setupCreatorTools() {
    // Back button
    const backBtn = document.getElementById("creator-back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () =>
        this.showScreen("dashboard-screen")
      );
    }

    // Switch Template button
    const switchTemplateBtn = document.getElementById("switch-template-btn");
    if (switchTemplateBtn) {
      switchTemplateBtn.addEventListener("click", (e) => {
        this.switchTemplate();
        e.target.blur(); // Remove focus to clear yellow highlight
      });
    }

    // Undo button
    const undoBtn = document.getElementById("undo-btn");
    if (undoBtn) {
      undoBtn.addEventListener("click", (e) => {
        this.undo();
        e.target.blur(); // Remove focus to clear yellow highlight
      });
    }

    // Redo button
    const redoBtn = document.getElementById("redo-btn");
    if (redoBtn) {
      redoBtn.addEventListener("click", (e) => {
        this.redo();
        e.target.blur(); // Remove focus to clear yellow highlight
      });
    }

    // Canvas Clear button (eraser button)
    const canvasClearBtn = document.getElementById("canvas-clear-btn");
    if (canvasClearBtn) {
      canvasClearBtn.addEventListener("click", (e) => {
        // Clear canvas completely and redraw template
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Redraw template if one is loaded
        if (this.templateImage && this.templateDrawBounds) {
          this.ctx.drawImage(
            this.templateImage,
            this.templateDrawBounds.x,
            this.templateDrawBounds.y,
            this.templateDrawBounds.width,
            this.templateDrawBounds.height
          );
          console.log(
            "🗑️ Canvas cleared and template restored with proper aspect ratio"
          );
        } else {
          console.log("🗑️ Canvas cleared");
        }

        // Save state after clearing
        this.saveCanvasState();

        // Remove focus to clear yellow highlight
        e.target.blur();
      });
    }

    // Save Draft button
    const saveDraftBtn = document.getElementById("save-draft-btn");
    if (saveDraftBtn) {
      saveDraftBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Debounce check to prevent double-clicks
        if (!this.isValidClick()) {
          return;
        }

        this.saveDraft();
      });
    }

    // Finish Creation button
    const finishBtn = document.getElementById("finish-creation-btn");
    if (finishBtn) {
      finishBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Debounce check to prevent double-clicks
        if (!this.isValidClick()) {
          return;
        }

        this.finishCreation();
      });
    }

    // Canvas click for coloring
    if (this.canvas) {
      this.canvas.addEventListener("click", (e) => this.handleCanvasClick(e));

      // Canvas mousemove for smart cursor
      this.canvas.addEventListener("mousemove", (e) =>
        this.handleCanvasMouseMove(e)
      );

      // Canvas mouseleave to reset cursor
      this.canvas.addEventListener("mouseleave", () => {
        this.canvas.classList.remove("paintbrush-cursor");
      });
    }

    console.log("🔧 Creator tools setup complete");
  }

  // Name validation for creations
  validateCreationName(name, templateName, currentCreationId = null) {
    if (!name || name.trim() === "") {
      return {
        valid: false,
        message: "Please give your creation a name first! 🎨",
      };
    }

    const trimmedName = name.trim();

    // Length validation
    if (trimmedName.length < 2) {
      return {
        valid: false,
        message: "Name must be at least 2 characters long! 📝",
      };
    }

    if (trimmedName.length > 15) {
      return {
        valid: false,
        message: "Name must be 15 characters or less! ✂️",
      };
    }

    // Character validation - only letters and numbers, no spaces or special characters
    const validNameRegex = /^[a-zA-Z0-9]+$/;
    if (!validNameRegex.test(trimmedName)) {
      return {
        valid: false,
        message:
          "Name can only contain letters and numbers (no spaces or special characters)! 🔤",
      };
    }

    // Check for duplicate names - compare the generated filename
    const proposedFilename = this.generateCreationFilename(
      trimmedName,
      templateName
    );
    const existingCreations = this.loadSavedCreations();

    const duplicateExists = existingCreations.some((creation) => {
      // Skip checking against the current creation if we're editing
      if (currentCreationId && creation.id === currentCreationId) {
        return false;
      }
      return creation.filename === proposedFilename;
    });

    if (duplicateExists) {
      return {
        valid: false,
        message: `Name "${trimmedName}" already exists for this template! Try a different name. 🔄`,
      };
    }

    return { valid: true, name: trimmedName };
  }

  // Generate standardized filename for creation
  generateCreationFilename(creationName, templateName) {
    // Convert name to lowercase (already validated to be letters/numbers only)
    const safeName = creationName.toLowerCase();

    // Create standardized filename: name-the-species.png
    const templateSpecies = templateName.toLowerCase();
    return `${safeName}-the-${templateSpecies}.png`;
  }

  // Save functionality
  saveDraft() {
    const nameInput = document.getElementById("creation-name");
    const creationName = nameInput ? nameInput.value.trim() : "";

    // Validate the creation name
    const validation = this.validateCreationName(
      creationName,
      this.selectedTemplate.name
    );
    if (!validation.valid) {
      this.showFeedback(validation.message, "error");
      if (nameInput) nameInput.focus();
      return;
    }

    // Generate standardized filename
    const filename = this.generateCreationFilename(
      validation.name,
      this.selectedTemplate.name
    );

    // Save canvas as image data
    const imageData = this.canvas.toDataURL("image/png");
    const creation = {
      id: Date.now().toString(),
      name: validation.name,
      filename: filename,
      templateName: this.selectedTemplate.name,
      imageData: imageData,
      timestamp: new Date().toISOString(),
      isDraft: true,
    };

    this.saveCreationToStorage(creation);
    this.showFeedback(`Draft of "${creationName}" saved!`, "success");

    console.log(`💾 Draft saved: ${creationName}`);

    // Navigate to My Creations page after saving
    setTimeout(() => {
      this.showMyCreationsScreen();
    }, 1500); // Wait for feedback message to be seen
  }

  finishCreation() {
    const nameInput = document.getElementById("creation-name");
    const creationName = nameInput ? nameInput.value.trim() : "";

    // Validate the creation name
    const validation = this.validateCreationName(
      creationName,
      this.selectedTemplate.name
    );
    if (!validation.valid) {
      this.showFeedback(validation.message, "error");
      if (nameInput) nameInput.focus();
      return;
    }

    // Generate standardized filename
    const filename = this.generateCreationFilename(
      validation.name,
      this.selectedTemplate.name
    );

    // Save canvas as completed creation
    const imageData = this.canvas.toDataURL("image/png");
    const creation = {
      id: Date.now().toString(),
      name: validation.name,
      filename: filename,
      templateName: this.selectedTemplate.name,
      imageData: imageData,
      timestamp: new Date().toISOString(),
      isDraft: false,
    };

    this.saveCreationToStorage(creation);
    this.showFeedback(`Creation "${creationName}" completed! 🎉`, "success");

    // TODO: Add to collection manager as a reward option

    console.log(`🎉 Creation finished: ${creationName}`);
  }

  saveCreationToStorage(creation) {
    try {
      let savedCreations = JSON.parse(
        localStorage.getItem("squishmallow-creations") || "[]"
      );
      savedCreations.push(creation);
      localStorage.setItem(
        "squishmallow-creations",
        JSON.stringify(savedCreations)
      );
    } catch (error) {
      console.error("❌ Error saving creation:", error);
      this.showFeedback("Error saving creation. Please try again.", "error");
    }
  }

  handleCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    // Proper flood fill with selected color
    this.floodFill(x, y, this.selectedColor);
  }

  handleCanvasMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    // Check if this area is colorable
    const isColorable = this.isAreaColorable(x, y);

    if (isColorable) {
      this.canvas.classList.add("paintbrush-cursor");
    } else {
      this.canvas.classList.remove("paintbrush-cursor");
    }
  }

  isAreaColorable(x, y) {
    // Check if coordinates are within canvas bounds
    if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) {
      return false;
    }

    // Check if this is original template black (outlines that can't be colored)
    const isOriginalBlack = this.isPixelOriginallyBlack(x, y);
    if (isOriginalBlack) {
      return false;
    }

    // Check if this is outside the template boundaries
    const isOutsideTemplate = this.isPixelOutsideTemplate(x, y);
    if (isOutsideTemplate) {
      return false;
    }

    // If it's not black outline and not outside template, it's colorable
    return true;
  }

  floodFill(startX, startY, fillColor) {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const data = imageData.data;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Get the color at the starting point
    const startIndex = (startY * width + startX) * 4;
    const startR = data[startIndex];
    const startG = data[startIndex + 1];
    const startB = data[startIndex + 2];
    const startA = data[startIndex + 3];

    // Check if this is original template black (protect original outlines/details)
    const isOriginalBlack = this.isPixelOriginallyBlack(startX, startY);

    if (isOriginalBlack) {
      return;
    }

    // Check if we're trying to color outside the template boundaries (transparent background)
    const isOutsideTemplate = this.isPixelOutsideTemplate(startX, startY);

    if (isOutsideTemplate) {
      return;
    }

    // Convert fill color to RGB
    const hex = fillColor.replace("#", "");
    const fillR = parseInt(hex.substr(0, 2), 16);
    const fillG = parseInt(hex.substr(2, 2), 16);
    const fillB = parseInt(hex.substr(4, 2), 16);

    // Don't fill if already the same color (with tolerance)
    if (this.colorDistance(startR, startG, startB, fillR, fillG, fillB) < 10) {
      return;
    }

    // Color tolerance for anti-aliased edges (higher = more aggressive filling)
    const tolerance = 200;

    // Track visited pixels to prevent infinite loops
    const visited = new Set();

    // Stack-based flood fill to avoid recursion limits
    const stack = [[startX, startY]];

    while (stack.length > 0) {
      const [x, y] = stack.pop();

      if (x < 0 || x >= width || y < 0 || y >= height) continue;

      const pixelKey = `${x},${y}`;
      if (visited.has(pixelKey)) continue;
      visited.add(pixelKey);

      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      // Check if pixel is similar enough to start color (tolerance-based)
      const distance = this.colorDistance(r, g, b, startR, startG, startB);

      // Simple rule: Never fill any pixel that was originally black
      const isOriginallyBlack = this.isPixelOriginallyBlack(x, y);

      // Also never fill pixels outside the template boundaries
      const isOutsideTemplate = this.isPixelOutsideTemplate(x, y);

      if (
        distance <= tolerance &&
        a > 0 &&
        !isOriginallyBlack &&
        !isOutsideTemplate
      ) {
        // Fill this pixel
        data[index] = fillR;
        data[index + 1] = fillG;
        data[index + 2] = fillB;
        data[index + 3] = 255; // Full opacity

        // Add neighboring pixels to stack
        stack.push([x + 1, y]);
        stack.push([x - 1, y]);
        stack.push([x, y + 1]);
        stack.push([x, y - 1]);
      }
    }

    // Apply the modified image data back to canvas
    this.ctx.putImageData(imageData, 0, 0);

    // Save state after coloring action
    this.saveCanvasState();

    console.log(
      `🎨 Flood filled with color ${fillColor} at (${startX}, ${startY}) with tolerance`
    );
  }

  // Helper function to calculate color distance for tolerance-based filling
  colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(
      Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
    );
  }

  // Check if a pixel was originally black (used during flood fill to prevent crossing outlines)
  isPixelOriginallyBlack(x, y) {
    if (!this.originalTemplateData) return false;

    const index = (y * this.canvas.width + x) * 4;
    const originalR = this.originalTemplateData.data[index];
    const originalG = this.originalTemplateData.data[index + 1];
    const originalB = this.originalTemplateData.data[index + 2];

    // Check if original pixel was black (with small tolerance for anti-aliasing)
    return this.colorDistance(originalR, originalG, originalB, 0, 0, 0) < 50;
  }

  // Check if a pixel is outside the template boundaries (transparent background)
  isPixelOutsideTemplate(x, y) {
    if (!this.originalTemplateData) return false;

    const index = (y * this.canvas.width + x) * 4;
    const originalA = this.originalTemplateData.data[index + 3];

    // If the original pixel was transparent (alpha < 128), it's outside the template
    return originalA < 128;
  }

  // Undo/Redo functionality
  saveCanvasState() {
    // Remove any future states if we're in the middle of history
    if (this.historyStep < this.canvasHistory.length - 1) {
      this.canvasHistory = this.canvasHistory.slice(0, this.historyStep + 1);
    }

    // Save current canvas state as image data
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.canvasHistory.push(imageData);
    this.historyStep++;

    // Limit history size
    if (this.canvasHistory.length > this.maxHistorySteps) {
      this.canvasHistory.shift();
      this.historyStep--;
    }

    // Update undo/redo button states
    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      const imageData = this.canvasHistory[this.historyStep];
      this.ctx.putImageData(imageData, 0, 0);
      this.updateUndoRedoButtons();
      console.log("⏪ Undo action performed");
    }
  }

  redo() {
    if (this.historyStep < this.canvasHistory.length - 1) {
      this.historyStep++;
      const imageData = this.canvasHistory[this.historyStep];
      this.ctx.putImageData(imageData, 0, 0);
      this.updateUndoRedoButtons();
      console.log("⏩ Redo action performed");
    }
  }

  updateUndoRedoButtons() {
    const undoBtn = document.getElementById("undo-btn");
    const redoBtn = document.getElementById("redo-btn");

    if (undoBtn) {
      undoBtn.disabled = this.historyStep <= 0;
      undoBtn.style.opacity = this.historyStep <= 0 ? "0.5" : "1";
    }

    if (redoBtn) {
      redoBtn.disabled = this.historyStep >= this.canvasHistory.length - 1;
      redoBtn.style.opacity =
        this.historyStep >= this.canvasHistory.length - 1 ? "0.5" : "1";
    }
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
      
      // Update mobile progress display
      const mobileProgressText = document.getElementById("mobile-progress-text");
      if (mobileProgressText) {
        mobileProgressText.textContent = `${this.gameState.correctAnswers}/${this.gameState.targetScore}`;
      }
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

    console.log(`🔄 Updating lives display - Current lives: ${this.gameState.lives}, Max lives: ${this.gameState.maxLives}`);
    
    for (let i = 1; i <= this.gameState.maxLives; i++) {
      const lifeIcon = document.getElementById(`life-${i}`);
      const mobileLifeIcon = document.getElementById(`mobile-life-${i}`);
      
      console.log(`❤️ Processing life ${i} - lifeIcon: ${!!lifeIcon}, mobileLifeIcon: ${!!mobileLifeIcon}`);
      
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
      
      // Sync mobile lives display
      if (mobileLifeIcon) {
        if (i <= this.gameState.lives) {
          mobileLifeIcon.classList.remove("lost");
          mobileLifeIcon.classList.add("filled");
          console.log(`💖 Mobile life ${i} restored (lives: ${this.gameState.lives}), classes: ${mobileLifeIcon.className}`);
        } else {
          mobileLifeIcon.classList.add("lost");
          mobileLifeIcon.classList.remove("filled");
          console.log(`💔 Mobile life ${i} lost (lives: ${this.gameState.lives}), classes: ${mobileLifeIcon.className}`);
        }
      } else {
        console.log(`⚠️ Mobile life icon ${i} not found in DOM`);
      }
    }
  }

  loseLife() {
    // If lives are disabled, don't lose lives or end the game
    if (!this.settings.livesEnabled) {
      console.log("💔 Lives disabled, not losing life");
      return;
    }
    
    console.log("💔 Losing life, current lives:", this.gameState.lives);

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
    // Stop any existing timer before resetting
    this.stopTimer();
    
    this.gameState.correctAnswers = 0;
    this.gameState.problemCount = 0;
    this.gameState.totalAttempts = 0;
    this.gameState.lives = this.gameState.maxLives;
    this.gameState.startTime = null;
    this.gameState.timeRemaining = 0;
    
    console.log("🔄 Game state reset, lives:", this.gameState.lives, "maxLives:", this.gameState.maxLives);
    
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
    const mobileProblemElement = document.getElementById("mobile-current-problem");
    
    if (problemElement) {
      problemElement.textContent = problem.displayText;
      console.log(`📝 Displaying problem: ${problem.displayText}`);
    }
    
    // Sync mobile problem display
    if (mobileProblemElement) {
      mobileProblemElement.textContent = problem.displayText;
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
      this.showFeedback(
        "Error resetting collection. Please try again.",
        "error"
      );
    }
  }

  addNumberToInput(number) {
    const answerInput = document.getElementById("answer-input");
    if (answerInput) {
      const currentValue = answerInput.value;

      // Limit input length (reasonable for multiplication answers)
      if (currentValue.length < 6) {
        answerInput.value = currentValue + number;
        
        // Update mobile answer display
        const mobileAnswerText = document.getElementById("mobile-answer-text");
        if (mobileAnswerText) {
          mobileAnswerText.textContent = answerInput.value;
        }
        
        // Sync with mobile input field
        const mobileAnswerField = document.getElementById("mobile-answer-field");
        if (mobileAnswerField) {
          mobileAnswerField.value = answerInput.value;
          this.updateMobileSubmitButton();
          console.log(`📱 Synced mobile input field: ${answerInput.value}`);
        }

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
    const mobileAnswerText = document.getElementById("mobile-answer-text");
    
    if (answerInput) {
      answerInput.value = "";
      this.updateSubmitButton();
      console.log("🗑️ Input cleared");
    }
    
    // Clear mobile answer display
    if (mobileAnswerText) {
      mobileAnswerText.textContent = "";
    }
  }

  backspaceInput() {
    const answerInput = document.getElementById("answer-input");
    const mobileAnswerText = document.getElementById("mobile-answer-text");
    
    if (answerInput && answerInput.value.length > 0) {
      answerInput.value = answerInput.value.slice(0, -1);
      
      // Update mobile answer display
      if (mobileAnswerText) {
        mobileAnswerText.textContent = answerInput.value;
      }
      
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
      restartBtn.addEventListener("click", () =>
        this.confirmRestartCollection()
      );
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

    console.log(`🔊 Audio ${currentMuteState ? "unmuted" : "muted"}`);
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
    console.log(`⏰ Initializing timer - timerSeconds: ${timerSeconds}`);

    if (timerSeconds && timerSeconds > 0) {
      this.gameState.timeRemaining = timerSeconds;
      this.gameState.timerInterval = null;
      console.log(`⏰ Timer set to ${timerSeconds} seconds, timeRemaining: ${this.gameState.timeRemaining}`);
      this.showTimer();
      this.updateTimerDisplay();
      this.startTimer();
    } else {
      console.log(`⏰ Timer disabled or invalid`);
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
      
      // Update mobile timer display
      const mobileTimerMinutes = document.querySelector("#mobile-timer-display .timer-minutes");
      const mobileTimerSeconds = document.querySelector("#mobile-timer-display .timer-seconds");
      
      if (mobileTimerMinutes && mobileTimerSeconds) {
        mobileTimerMinutes.textContent = minutes.toString();
        mobileTimerSeconds.textContent = seconds.toString().padStart(2, "0");
        console.log(`📱 Mobile timer updated: ${minutes}:${seconds.toString().padStart(2, "0")} (timeRemaining: ${this.gameState.timeRemaining})`);
      } else {
        console.log(`⚠️ Mobile timer elements not found in DOM`);
      }
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
      console.error(
        "❌ Could not populate mascot selection - missing elements"
      );
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
    collectedIds.forEach((squishId) => {
      const squishmallow = allSquishmallows.find((s) => s.id === squishId);
      if (!squishmallow) {
        console.warn(
          `⚠️ Collected Squishmallow not found in data: ${squishId}`
        );
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
      optionDiv.addEventListener("click", (e) =>
        this.selectMascot(squishId, e.currentTarget)
      );

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
    options.forEach((option) => {
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
    const squishmallow = this.collectionManager
      .getAllSquishmallows()
      .find((s) => s.id === squishId);
    if (squishmallow) {
      this.showFeedback(
        `${squishmallow.name} is now your dashboard companion!`,
        "success"
      );
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
      selectedMascot = this.collectionManager
        .getAllSquishmallows()
        .find((s) => s.id === this.settings.selectedMascot);
    }

    if (selectedMascot) {
      // Update to selected mascot - use same approach as collection page
      console.log(
        `🎭 Dashboard mascot updated to: ${selectedMascot.name}, image: ${selectedMascot.image_url}`
      );
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
      closeBtn.addEventListener("click", () =>
        this.closeMascotSelectionModal()
      );
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

  // Switch template functionality for Creator Studio
  switchTemplate() {
    // Warn user about losing current work
    const confirmed = confirm(
      "Switching templates will clear your current work. Are you sure you want to continue?"
    );

    if (confirmed) {
      console.log("🔄 Switching template - returning to template selection");
      this.showScreen("template-selection-screen");
      this.initializeTemplateSelection();
    } else {
      console.log("🔄 Template switch cancelled by user");
    }
  }

  // Story 7.5: My Creations Screen Methods
  setupMyCreationsScreen() {
    // My Creations screen - return to dashboard button
    const creationsDashboardBtn = document.getElementById(
      "creations-dashboard-btn"
    );
    if (creationsDashboardBtn) {
      creationsDashboardBtn.addEventListener("click", () => {
        this.showDashboard();
      });
    }

    // Create Another button
    const createAnotherBtn = document.getElementById("create-another-btn");
    if (createAnotherBtn) {
      createAnotherBtn.addEventListener("click", () => {
        this.showScreen("template-selection-screen");
        this.initializeTemplateSelection();
      });
    }

    // Handle delete draft button clicks
    document.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-draft-btn");
      if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const creationId = deleteBtn.dataset.creationId;
        this.deleteDraft(creationId);
      }
    });

    console.log("✅ My Creations screen setup complete!");
  }

  showMyCreationsScreen() {
    this.populateCreationsGrid();
    this.updateCreationsStats();
    this.showScreen("my-creations-screen");
  }

  populateCreationsGrid() {
    const creationsGrid = document.getElementById("creations-grid");
    if (!creationsGrid) {
      console.error("❌ Creations grid element not found");
      return;
    }

    // Load saved creations from localStorage
    const savedCreations = this.loadSavedCreations();

    console.log(
      `🖼️ Populating creations grid with ${savedCreations.length} creations`
    );

    creationsGrid.innerHTML = "";

    if (savedCreations.length === 0) {
      creationsGrid.innerHTML = `
        <div class="empty-creations">
          <i data-lucide="image-off"></i>
          <p>No creations yet!</p>
          <p>Visit the Create Studio to make your first masterpiece.</p>
        </div>
      `;
      // Update icons for empty state
      this.updateIcons();
      return;
    }

    // Sort creations by timestamp (newest first)
    savedCreations.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    savedCreations.forEach((creation) => {
      const card = document.createElement("div");
      card.className = `creation-card ${
        creation.isDraft ? "draft" : "finished"
      }`;

      const formattedDate = new Date(creation.timestamp).toLocaleDateString();

      card.innerHTML = `
        <img src="${creation.imageData}" alt="${
        creation.name
      }" class="creation-preview" />
        <h4 class="creation-name">${creation.name}</h4>
        <span class="creation-status">${
          creation.isDraft ? "Draft" : "Finished"
        }</span>
        <p class="creation-date">${formattedDate}</p>
        ${
          creation.isDraft
            ? `
          <button class="delete-draft-btn" data-creation-id="${creation.id}" title="Delete Draft">
            <i data-lucide="trash-2"></i>
          </button>
        `
            : ""
        }
      `;

      // Add click handler to view/edit creation
      card.addEventListener("click", (e) => {
        // Don't trigger card click if delete button was clicked
        if (e.target.closest(".delete-draft-btn")) {
          return;
        }

        if (creation.isDraft) {
          // TODO: Load draft back into creator studio for editing
          this.showFeedback("Draft editing will be available soon!", "info");
        } else {
          // TODO: Show full-size view of finished creation
          this.showFeedback(
            "Full-size viewing will be available soon!",
            "info"
          );
        }
      });

      creationsGrid.appendChild(card);
    });

    console.log(`✅ Added ${savedCreations.length} creation cards to grid`);
  }

  updateCreationsStats() {
    const savedCreations = this.loadSavedCreations();

    const totalCount = savedCreations.length;
    const draftsCount = savedCreations.filter((c) => c.isDraft).length;
    const finishedCount = savedCreations.filter((c) => !c.isDraft).length;

    const creationsCountElement = document.getElementById("creations-count");
    const draftsCountElement = document.getElementById("drafts-count");
    const finishedCountElement = document.getElementById("finished-count");

    if (creationsCountElement) creationsCountElement.textContent = totalCount;
    if (draftsCountElement) draftsCountElement.textContent = draftsCount;
    if (finishedCountElement) finishedCountElement.textContent = finishedCount;
  }

  loadSavedCreations() {
    try {
      const saved = localStorage.getItem("squishmallow-creations");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("❌ Error loading saved creations:", error);
      return [];
    }
  }

  deleteDraft(creationId) {
    // Show confirmation dialog
    const confirmed = confirm(
      "Are you sure you want to delete this draft? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      let savedCreations = this.loadSavedCreations();

      // Find the creation to get its name for feedback
      const creationToDelete = savedCreations.find((c) => c.id === creationId);

      // Remove the creation with the matching ID
      savedCreations = savedCreations.filter(
        (creation) => creation.id !== creationId
      );

      // Save back to localStorage
      localStorage.setItem(
        "squishmallow-creations",
        JSON.stringify(savedCreations)
      );

      // Update the display
      this.populateCreationsGrid();
      this.updateCreationsStats();

      // Show success message
      const creationName = creationToDelete ? creationToDelete.name : "Draft";
      this.showFeedback(
        `"${creationName}" deleted successfully! 🗑️`,
        "success"
      );

      console.log(`🗑️ Deleted draft: ${creationName} (ID: ${creationId})`);
    } catch (error) {
      console.error("❌ Error deleting draft:", error);
      this.showFeedback("Error deleting draft. Please try again.", "error");
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
