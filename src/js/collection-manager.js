// Squishmallow Collection Manager - Phase 4
// Handles collection data, persistence, and reward system

class CollectionManager {
  constructor() {
    this.squishmallows = [];
    this.userCollection = new Set(); // Track collected IDs
    this.collectionData = null;
    this.init();
  }

  async init() {
    console.log("📚 Initializing Collection Manager...");

    try {
      // Load Squishmallow data
      await this.loadSquishmalllowData();

      // Load user's existing collection from localStorage
      this.loadUserCollection();

      console.log("✅ Collection Manager initialized!");
    } catch (error) {
      console.error("❌ Failed to initialize Collection Manager:", error);
      this.setupFallbackData();
    }
  }

  async loadSquishmalllowData() {
    try {
      const response = await fetch("data/squishmallows.json");
      if (!response.ok) throw new Error("Failed to load squishmallow data");

      this.collectionData = await response.json();
      this.squishmallows = this.collectionData.squishmallows;

      console.log(`📊 Loaded ${this.squishmallows.length} Squishmallows`);
    } catch (error) {
      console.error("❌ Error loading Squishmallow data:", error);
      throw error;
    }
  }

  setupFallbackData() {
    // Fallback data in case JSON file fails to load
    this.squishmallows = [
      {
        id: "aurora_unicorn",
        name: "Aurora",
        species: "Unicorn",
        squad: "Magical Squad",
        color: "Purple",
        rarity: "common",
        image_url: "assets/aurora_the_unicorn.png",
        description:
          "Aurora loves to practice math problems under the rainbow!",
      },
      {
        id: "dante_devil",
        name: "Dante",
        species: "Devil",
        squad: "Spooky Squad",
        color: "Red",
        rarity: "common",
        image_url: "assets/dante_the_devil.png",
        description: "Dante makes math practice devilishly fun!",
      },
    ];

    console.log("🔄 Using fallback Squishmallow data");
  }

  loadUserCollection() {
    // Story 4.4: Load from localStorage
    try {
      const saved = localStorage.getItem("squishmallow-collection");
      if (saved) {
        const collectionArray = JSON.parse(saved);
        this.userCollection = new Set(collectionArray);
        console.log(`💾 Loaded collection: ${this.userCollection.size} items`);
      }
    } catch (error) {
      console.error("❌ Error loading user collection:", error);
      this.userCollection = new Set();
    }
  }

  saveUserCollection() {
    // Story 4.4: Save to localStorage
    try {
      const collectionArray = Array.from(this.userCollection);
      localStorage.setItem(
        "squishmallow-collection",
        JSON.stringify(collectionArray)
      );
      console.log(`💾 Saved collection: ${this.userCollection.size} items`);
    } catch (error) {
      console.error("❌ Error saving user collection:", error);
    }
  }

  // Story 4.3: Reward system
  awardRandomSquishmallow() {
    // Get uncollected Squishmallows
    const uncollected = this.squishmallows.filter(
      (sq) => !this.userCollection.has(sq.id)
    );

    if (uncollected.length === 0) {
      console.log("🎉 Collection complete! All Squishmallows collected!");
      return null; // Collection is complete
    }

    // Weighted random selection based on rarity
    const rarityWeights = {
      common: 60,
      uncommon: 25,
      rare: 12,
      epic: 3,
    };

    let totalWeight = 0;
    const weightedList = [];

    uncollected.forEach((sq) => {
      const weight = rarityWeights[sq.rarity] || 30;
      totalWeight += weight;
      for (let i = 0; i < weight; i++) {
        weightedList.push(sq);
      }
    });

    // Select random Squishmallow
    const randomIndex = Math.floor(Math.random() * weightedList.length);
    const selectedSquishmallow = weightedList[randomIndex];

    // Add to collection
    this.userCollection.add(selectedSquishmallow.id);
    this.saveUserCollection();

    console.log(
      `🎁 Awarded: ${selectedSquishmallow.name} (${selectedSquishmallow.rarity})`
    );
    return selectedSquishmallow;
  }

  getSquishmallowById(id) {
    return this.squishmallows.find((sq) => sq.id === id);
  }

  isCollected(id) {
    return this.userCollection.has(id);
  }

  getCollectionStats() {
    const collected = this.userCollection.size;
    const total = this.squishmallows.length;
    const percentage = total > 0 ? Math.round((collected / total) * 100) : 0;

    return {
      collected,
      total,
      percentage,
    };
  }

  getAllSquishmallows() {
    return this.squishmallows;
  }

  getCollectedSquishmallows() {
    return this.squishmallows.filter((sq) => this.userCollection.has(sq.id));
  }

  getUnlockedSquishmallows() {
    return this.squishmallows.filter((sq) => !this.userCollection.has(sq.id));
  }
}
