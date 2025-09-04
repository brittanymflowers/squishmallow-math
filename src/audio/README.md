# Audio Files for Squishmallow Collector

This directory contains audio files for the game's sound system.

## Required Files

The sound system will try to load these files, but will fall back to generated sounds if they're not available:

- `correct.mp3` - Success sound for correct answers
- `incorrect.mp3` - Error sound for wrong answers  
- `celebration.mp3` - Special sound when earning a Squishmallow
- `button.mp3` - Button click feedback sound
- `background.mp3` - Optional background music for gameplay

## Fallback System

If audio files are not found, the system automatically generates simple tones using the Web Audio API:

- **Correct Answer**: Pleasant C5 note (523 Hz)
- **Incorrect Answer**: Lower sawtooth wave (220 Hz) 
- **Celebration**: C-E-G chord progression
- **Button**: Short 400 Hz tone

## Audio Settings

All sounds respect the volume controls and mute settings in the game's Settings screen:

- Sound effects volume (0-100%)
- Background music volume (0-100%) 
- Master mute toggle
- Background music enable/disable

## Adding Custom Sounds

To add custom audio files:

1. Place MP3 files in this directory with the exact names listed above
2. Refresh the game - it will automatically detect and use the custom files
3. Keep file sizes reasonable for web delivery (under 1MB each recommended)

## Child-Friendly Audio Guidelines

When creating custom sounds:

- Keep volumes moderate and pleasant
- Avoid harsh or startling sounds
- Use encouraging, positive tones for success
- Make error sounds gentle, not punishing
- Background music should be calm and non-distracting