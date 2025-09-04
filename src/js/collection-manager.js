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
        id: "luna_cat",
        name: "Luna",
        species: "Cat",
        squad: "Feline Squad",
        color: "Gray",
        rarity: "common",
        image_url: "assets/squishmallows/luna_the_cat.png",
        description: "Luna loves helping students learn math!",
      },
      {
        id: "dante_devil",
        name: "Dante",
        species: "Devil",
        squad: "Spooky Squad",
        color: "Red",
        rarity: "common",
        image_url: "assets/squishmallows/dante_the_devil.png",
        description: "Dante makes math practice devilishly fun!",
      },
      {
        id: "archie_axolotl",
        name: "Archie",
        species: "Axolotl",
        squad: "Aquatic Squad",
        color: "Pink",
        rarity: "uncommon",
        image_url: "assets/squishmallows/archie_the_axolotl.png",
        description: "Archie loves swimming through math problems!",
      },
      {
        id: "cali_cat",
        name: "Cali",
        species: "Cat",
        squad: "Feline Squad",
        color: "Orange",
        rarity: "common",
        image_url: "assets/squishmallows/cali_the_cat.png",
        description: "Cali purrs with joy when solving equations!",
      },
      {
        id: "danny_dinosaur",
        name: "Danny",
        species: "Dinosaur",
        squad: "Prehistoric Squad",
        color: "Green",
        rarity: "rare",
        image_url: "assets/squishmallows/danny_the_dinosaur.png",
        description: "Danny roars with excitement for multiplication!",
      },
      {
        id: "franklin_bear",
        name: "Franklin",
        species: "Bear",
        squad: "Forest Squad",
        color: "Brown",
        rarity: "common",
        image_url: "assets/squishmallows/franklin_the_bear.png",
        description: "Franklin loves counting with his forest friends!",
      },
      {
        id: "harry_hedgehog",
        name: "Harry",
        species: "Hedgehog",
        squad: "Garden Squad",
        color: "Brown",
        rarity: "uncommon",
        image_url: "assets/squishmallows/harry_the_hedgehog.png",
        description: "Harry spikes up with math enthusiasm!",
      },
      {
        id: "lily_lamb",
        name: "Lily",
        species: "Lamb",
        squad: "Farm Squad",
        color: "White",
        rarity: "common",
        image_url: "assets/squishmallows/lily_the_lamb.png",
        description: "Lily woolly loves learning numbers!",
      },
      {
        id: "nebula_cat",
        name: "Nebula",
        species: "Cat",
        squad: "Space Squad",
        color: "Galaxy",
        rarity: "epic",
        image_url: "assets/squishmallows/nebula_the_cat.png",
        description: "Nebula brings cosmic wisdom to math time!",
      },
      {
        id: "octavia_octopus",
        name: "Octavia",
        species: "Octopus",
        squad: "Ocean Squad",
        color: "Purple",
        rarity: "rare",
        image_url: "assets/squishmallows/octavia_the_octopus.png",
        description: "Octavia uses all eight arms for counting!",
      },
      {
        id: "todrick_turtle",
        name: "Todrick",
        species: "Turtle",
        squad: "Pond Squad",
        color: "Green",
        rarity: "uncommon",
        image_url: "assets/squishmallows/todrick_the_turtle.png",
        description: "Todrick takes his time to solve problems perfectly!",
      },
      {
        id: "wilson_whale",
        name: "Wilson",
        species: "Whale",
        squad: "Ocean Squad",
        color: "Blue",
        rarity: "rare",
        image_url: "assets/squishmallows/wilson_the_whale.png",
        description: "Wilson makes a big splash in mathematics!",
      },
      {
        id: "chonka_panda",
        name: "Chonka",
        species: "Panda",
        squad: "Bamboo Squad",
        color: "Black and White",
        rarity: "uncommon",
        image_url: "assets/squishmallows/chonka_the_panda.png",
        description: "Chonka loves munching on math problems!",
      },
      {
        id: "midnight_axolotl",
        name: "Midnight",
        species: "Axolotl",
        squad: "Aquatic Squad",
        color: "Dark Blue",
        rarity: "rare",
        image_url: "assets/squishmallows/midnight_the_axolotl.png",
        description: "Midnight glows with mathematical knowledge!",
      },
      {
        id: "tabitha_cat",
        name: "Tabitha",
        species: "Cat",
        squad: "Feline Squad",
        color: "Tabby",
        rarity: "common",
        image_url: "assets/squishmallows/tabitha_the_cat.png",
        description: "Tabitha purrs when solving equations!",
      },
      {
        id: "purdy_dog",
        name: "Purdy",
        species: "Dog",
        squad: "Canine Squad",
        color: "Purple",
        rarity: "uncommon",
        image_url: "assets/squishmallows/purdy_the_dog.png",
        description: "Purdy barks with joy at math time!",
      },
      {
        id: "wicket_dog",
        name: "Wicket",
        species: "Dog",
        squad: "Canine Squad",
        color: "Brown",
        rarity: "common",
        image_url: "assets/squishmallows/wicket_the_dog.png",
        description: "Wicket loves fetching math answers!",
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
