// Templates Manager
// Handles loading and managing coloring templates data

class TemplatesManager {
  constructor() {
    this.templates = [];
    this.isLoaded = false;
    this.loadTemplates();
  }

  async loadTemplates() {
    try {
      console.log("🖼️ Loading templates data...");
      
      const response = await fetch("data/templates.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.templates = await response.json();
      this.isLoaded = true;
      
      console.log(`✅ Loaded ${this.templates.length} templates successfully`);
      console.log("🖼️ Available templates:", this.templates.map(t => t.name).join(", "));
      
    } catch (error) {
      console.error("❌ Error loading templates:", error);
      console.log("🔄 Using fallback templates data");
      
      // Fallback data in case JSON file fails to load
      this.templates = [
        {
          id: "fox",
          name: "Fox",
          file: "fox-template.png",
          description: "This clever fox loves to explore the forest and make new friends!"
        },
        {
          id: "alien",
          name: "Alien",
          file: "alien-template.png",
          description: "Meet Zorp! They've traveled from distant galaxies to learn about Earth colors."
        },
        {
          id: "cat",
          name: "Cat",
          file: "cat-template.png",
          description: "This curious kitty spends sunny days napping and chasing butterflies."
        },
        {
          id: "caticorn",
          name: "Caticorn",
          file: "caticorn-template.png",
          description: "Half cat, half unicorn, all magical! Can you help them sparkle and shine?"
        },
        {
          id: "mushroom",
          name: "Mushroom",
          file: "mushroom-template.png",
          description: "This tiny house belongs to the woodland fairies - what colors live inside?"
        }
      ];
      this.isLoaded = true;
    }
  }

  getAllTemplates() {
    return this.templates;
  }

  getTemplateById(id) {
    return this.templates.find(template => template.id === id);
  }

  isDataLoaded() {
    return this.isLoaded;
  }

  getTemplatesCount() {
    return this.templates.length;
  }
}