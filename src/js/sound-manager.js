// Story 6.2: Sound Effects System
// Manages all audio for the Squishmallow Collector game

class SoundManager {
  constructor() {
    this.sounds = {};
    this.musicVolume = 0.3;
    this.soundVolume = 0.5;
    this.isMuted = false;
    this.backgroundMusic = null;
    this.isBackgroundMusicEnabled = true;
    
    // Load settings from localStorage
    this.loadAudioSettings();
    
    // Initialize audio files
    this.initializeSounds();
  }

  // Load audio settings from localStorage
  loadAudioSettings() {
    try {
      const savedSettings = localStorage.getItem("squishCollectorSettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.musicVolume = settings.musicVolume || 0.3;
        this.soundVolume = settings.soundVolume || 0.5;
        this.isMuted = settings.audioMuted || false;
        this.isBackgroundMusicEnabled = settings.backgroundMusicEnabled !== false;
      }
    } catch (error) {
      console.warn("⚠️ Could not load audio settings:", error);
    }
  }

  // Save audio settings to localStorage
  saveAudioSettings() {
    try {
      const savedSettings = localStorage.getItem("squishCollectorSettings");
      const settings = savedSettings ? JSON.parse(savedSettings) : {};
      
      settings.musicVolume = this.musicVolume;
      settings.soundVolume = this.soundVolume;
      settings.audioMuted = this.isMuted;
      settings.backgroundMusicEnabled = this.isBackgroundMusicEnabled;
      
      localStorage.setItem("squishCollectorSettings", JSON.stringify(settings));
    } catch (error) {
      console.warn("⚠️ Could not save audio settings:", error);
    }
  }

  // Initialize sound files
  initializeSounds() {
    // Define sound effects with fallback to generated tones if files don't exist
    const soundDefinitions = {
      correct: {
        file: "audio/correct.mp3",
        fallback: { frequency: 523, duration: 200, type: "success" } // C5 note
      },
      incorrect: {
        file: "audio/incorrect.mp3", 
        fallback: { frequency: 220, duration: 300, type: "error" } // A3 note
      },
      celebration: {
        file: "audio/celebration.mp3",
        fallback: { frequency: [523, 659, 784], duration: 500, type: "celebration" } // C-E-G chord
      },
      button: {
        file: "audio/button.mp3",
        fallback: { frequency: 400, duration: 100, type: "button" }
      }
    };

    // Load or create each sound
    Object.entries(soundDefinitions).forEach(([name, definition]) => {
      this.loadSound(name, definition);
    });

    // Initialize background music
    this.initializeBackgroundMusic();
  }

  // Load a sound file or create fallback
  loadSound(name, definition) {
    const audio = new Audio();
    audio.preload = "auto";
    
    // Try to load the file
    audio.src = definition.file;
    
    audio.addEventListener('canplaythrough', () => {
      console.log(`🔊 Loaded sound: ${name}`);
    });

    audio.addEventListener('error', () => {
      console.warn(`⚠️ Could not load ${name}, using generated sound`);
      // Create fallback using Web Audio API
      this.sounds[name] = this.createGeneratedSound(definition.fallback);
      return;
    });

    this.sounds[name] = audio;
  }

  // Create generated sound using Web Audio API
  createGeneratedSound(config) {
    return {
      isGenerated: true,
      play: () => {
        if (this.isMuted) return;
        
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Handle chord or single note
          const frequencies = Array.isArray(config.frequency) ? config.frequency : [config.frequency];
          
          frequencies.forEach((freq, index) => {
            const osc = index === 0 ? oscillator : audioContext.createOscillator();
            if (index > 0) {
              osc.connect(gainNode);
            }
            
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            osc.type = config.type === 'error' ? 'sawtooth' : 'sine';
            
            // Volume envelope
            const volume = this.soundVolume * 0.3;
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + config.duration / 1000);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + config.duration / 1000);
          });
        } catch (error) {
          console.warn("⚠️ Could not generate sound:", error);
        }
      }
    };
  }

  // Initialize background music
  initializeBackgroundMusic() {
    this.backgroundMusic = new Audio();
    this.backgroundMusic.src = "audio/background.mp3";
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = this.musicVolume;
    
    this.backgroundMusic.addEventListener('error', () => {
      console.log("🎵 Background music file not found - continuing without music");
      this.backgroundMusic = null;
    });
  }

  // Play a sound effect
  playSound(soundName) {
    if (this.isMuted || !this.sounds[soundName]) return;

    try {
      const sound = this.sounds[soundName];
      
      if (sound.isGenerated) {
        sound.play();
      } else {
        sound.currentTime = 0;
        sound.volume = this.soundVolume;
        const playPromise = sound.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn(`⚠️ Could not play ${soundName}:`, error);
          });
        }
      }
    } catch (error) {
      console.warn(`⚠️ Error playing ${soundName}:`, error);
    }
  }

  // Background music controls
  startBackgroundMusic() {
    if (!this.isBackgroundMusicEnabled || this.isMuted || !this.backgroundMusic) return;

    try {
      this.backgroundMusic.volume = this.musicVolume;
      const playPromise = this.backgroundMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("⚠️ Could not start background music:", error);
        });
      }
    } catch (error) {
      console.warn("⚠️ Background music error:", error);
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  // Volume controls
  setSoundVolume(volume) {
    this.soundVolume = Math.max(0, Math.min(1, volume));
    this.saveAudioSettings();
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.musicVolume;
    }
    this.saveAudioSettings();
  }

  // Mute controls
  setMuted(muted) {
    this.isMuted = muted;
    if (muted) {
      this.stopBackgroundMusic();
    } else if (this.isBackgroundMusicEnabled) {
      this.startBackgroundMusic();
    }
    this.saveAudioSettings();
  }

  // Background music toggle
  setBackgroundMusicEnabled(enabled) {
    this.isBackgroundMusicEnabled = enabled;
    if (enabled && !this.isMuted) {
      this.startBackgroundMusic();
    } else {
      this.stopBackgroundMusic();
    }
    this.saveAudioSettings();
  }

  // Getters for UI
  getSoundVolume() {
    return this.soundVolume;
  }

  getMusicVolume() {
    return this.musicVolume;
  }

  isMutedState() {
    return this.isMuted;
  }

  isBackgroundMusicEnabledState() {
    return this.isBackgroundMusicEnabled;
  }
}