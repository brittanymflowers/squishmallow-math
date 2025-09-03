// Squishmallow Collector - Math Engine
// Story 2.1: Problem Generator for multiplication tables

class MathEngine {
  constructor() {
    this.currentProblem = null;
    this.difficulty = "easy"; // easy (1-5), medium (1-8), hard (1-12)
    this.problemTypes = ["multiplication"]; // Story 5.2: Support multiple operations
    this.operations = ["multiplication"]; // Story 5.2: Available operations

    // Story 5.3: Number range settings
    this.numberRanges = {
      multiplication: 12, // Highest number for multiplication/division
      addition: "tens", // Number size for addition/subtraction
    };

    console.log("🧮 Math Engine initialized!");
  }

  /**
   * Generates a multiplication problem based on current difficulty
   * @returns {Object} Problem object with question, answer, and metadata
   */
  generateMultiplicationProblem() {
    // Times table logic: one factor is the table number (0-12), other is the highest table
    const maxTable = this.numberRanges.multiplication;
    const tableNumber = this.getRandomNumber(0, 12); // Multiply by 0 through 12
    const factor = this.getRandomNumber(1, maxTable); // Up to the highest times table
    
    // Randomly decide which factor comes first for variety
    const factor1 = Math.random() < 0.5 ? tableNumber : factor;
    const factor2 = factor1 === tableNumber ? factor : tableNumber;
    const answer = factor1 * factor2;

    const problem = {
      id: this.generateProblemId(),
      type: "multiplication",
      question: `${factor1} × ${factor2}`,
      displayText: `${factor1} × ${factor2} = ?`,
      answer: answer,
      factors: [factor1, factor2],
      difficulty: this.difficulty,
      customRange: maxNumber,
      timestamp: new Date().toISOString(),
    };

    this.currentProblem = problem;
    console.log(
      `🎲 Generated problem: ${problem.displayText} (Answer: ${problem.answer})`
    );

    return problem;
  }

  /**
   * Generates an addition problem based on current difficulty (Story 5.2)
   * @returns {Object} Problem object with question, answer, and metadata
   */
  generateAdditionProblem() {
    // Use custom range setting for addition
    const rangeSettings = {
      ones: { min: 1, max: 9 },
      tens: { min: 1, max: 99 },
      hundreds: { min: 1, max: 999 },
    };

    const range =
      rangeSettings[this.numberRanges.addition] || rangeSettings["tens"];
    const addend1 = this.getRandomNumber(range.min, range.max);
    const addend2 = this.getRandomNumber(range.min, range.max);
    const answer = addend1 + addend2;

    const problem = {
      id: this.generateProblemId(),
      type: "addition",
      question: `${addend1} + ${addend2}`,
      displayText: `${addend1} + ${addend2} = ?`,
      answer: answer,
      factors: [addend1, addend2],
      difficulty: this.difficulty,
      customRange: this.numberRanges.addition,
      timestamp: new Date().toISOString(),
    };

    this.currentProblem = problem;
    console.log(
      `🎲 Generated addition: ${problem.displayText} (Answer: ${problem.answer})`
    );
    return problem;
  }

  /**
   * Generates a subtraction problem based on current difficulty (Story 5.2)
   * @returns {Object} Problem object with question, answer, and metadata
   */
  generateSubtractionProblem() {
    // Use custom range setting for subtraction
    const rangeSettings = {
      ones: { min: 1, max: 9 },
      tens: { min: 1, max: 99 },
      hundreds: { min: 1, max: 999 },
    };

    const range =
      rangeSettings[this.numberRanges.addition] || rangeSettings["tens"];
    let minuend = this.getRandomNumber(range.min, range.max);
    let subtrahend = this.getRandomNumber(
      range.min,
      Math.min(minuend, range.max)
    );

    // Ensure positive result
    if (subtrahend > minuend) {
      [minuend, subtrahend] = [subtrahend, minuend];
    }

    const answer = minuend - subtrahend;

    const problem = {
      id: this.generateProblemId(),
      type: "subtraction",
      question: `${minuend} − ${subtrahend}`,
      displayText: `${minuend} − ${subtrahend} = ?`,
      answer: answer,
      factors: [minuend, subtrahend],
      difficulty: this.difficulty,
      customRange: this.numberRanges.addition,
      timestamp: new Date().toISOString(),
    };

    this.currentProblem = problem;
    console.log(
      `🎲 Generated subtraction: ${problem.displayText} (Answer: ${problem.answer})`
    );
    return problem;
  }

  /**
   * Generates a division problem based on current difficulty (Story 5.2)
   * @returns {Object} Problem object with question, answer, and metadata
   */
  generateDivisionProblem() {
    // Use custom range for division (same as multiplication)
    const maxNumber = this.numberRanges.multiplication;
    const divisor = this.getRandomNumber(1, maxNumber);
    const quotient = this.getRandomNumber(1, maxNumber);
    const dividend = divisor * quotient; // Ensure clean division

    const problem = {
      id: this.generateProblemId(),
      type: "division",
      question: `${dividend} ÷ ${divisor}`,
      displayText: `${dividend} ÷ ${divisor} = ?`,
      answer: quotient,
      factors: [dividend, divisor],
      difficulty: this.difficulty,
      customRange: maxNumber,
      timestamp: new Date().toISOString(),
    };

    this.currentProblem = problem;
    console.log(
      `🎲 Generated division: ${problem.displayText} (Answer: ${problem.answer})`
    );
    return problem;
  }

  /**
   * Generates a random number within specified range (inclusive)
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a unique problem ID
   * @returns {string} Unique problem identifier
   */
  generateProblemId() {
    return `problem_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  }

  /**
   * Validates a user's answer against the current problem
   * @param {number} userAnswer - The answer provided by the user
   * @returns {Object} Validation result with feedback
   */
  validateAnswer(userAnswer) {
    if (!this.currentProblem) {
      return {
        isCorrect: false,
        feedback: "No problem available to check!",
        type: "error",
      };
    }

    const isCorrect = userAnswer === this.currentProblem.answer;

    const result = {
      isCorrect: isCorrect,
      feedback: isCorrect ? "Excellent! 🎉" : "Try again! You've got this! 💪",
      type: isCorrect ? "success" : "retry",
      correctAnswer: this.currentProblem.answer,
      problemId: this.currentProblem.id,
    };

    console.log(
      `✅ Answer validation: ${userAnswer} ${isCorrect ? "==" : "!="} ${
        this.currentProblem.answer
      }`
    );

    return result;
  }

  /**
   * Sets the difficulty level for problem generation
   * @param {string} level - 'easy', 'medium', or 'hard'
   */
  setDifficulty(level) {
    const validLevels = ["easy", "medium", "hard"];
    if (validLevels.includes(level)) {
      this.difficulty = level;
      console.log(`🎯 Difficulty set to: ${level}`);
    } else {
      console.warn(
        `⚠️ Invalid difficulty level: ${level}. Using 'easy' instead.`
      );
      this.difficulty = "easy";
    }
  }

  /**
   * Gets the current problem
   * @returns {Object|null} Current problem or null if none exists
   */
  getCurrentProblem() {
    return this.currentProblem;
  }

  /**
   * Generates a new problem from available operations (Story 5.2)
   * @returns {Object} New problem object
   */
  generateNewProblem() {
    // Randomly select from available operations
    const randomIndex = Math.floor(Math.random() * this.operations.length);
    const selectedOperation = this.operations[randomIndex];

    switch (selectedOperation) {
      case "addition":
        return this.generateAdditionProblem();
      case "subtraction":
        return this.generateSubtractionProblem();
      case "multiplication":
        return this.generateMultiplicationProblem();
      case "division":
        return this.generateDivisionProblem();
      default:
        console.warn(
          `Unknown operation: ${selectedOperation}, defaulting to multiplication`
        );
        return this.generateMultiplicationProblem();
    }
  }

  /**
   * Sets the difficulty level for problem generation
   * @param {string} difficulty - Difficulty level: 'easy', 'medium', or 'hard'
   */
  setDifficulty(difficulty) {
    const validDifficulties = ["easy", "medium", "hard"];
    if (validDifficulties.includes(difficulty)) {
      this.difficulty = difficulty;
      console.log(`🎯 Math Engine difficulty set to: ${difficulty}`);
    } else {
      console.warn(
        `⚠️ Invalid difficulty "${difficulty}". Using "${this.difficulty}"`
      );
    }
  }

  /**
   * Sets the available operations for problem generation (Story 5.2)
   * @param {Array} operations - Array of operation strings: 'addition', 'subtraction', 'multiplication', 'division'
   */
  setOperations(operations) {
    const validOperations = [
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ];
    const filteredOps = operations.filter((op) => validOperations.includes(op));

    if (filteredOps.length > 0) {
      this.operations = filteredOps;
      this.problemTypes = filteredOps; // Update legacy problemTypes
      console.log(
        `🧮 Math Engine operations set to: ${filteredOps.join(", ")}`
      );
    } else {
      console.warn(
        `⚠️ No valid operations provided. Using: ${this.operations.join(", ")}`
      );
    }
  }

  /**
   * Sets custom number ranges for problem generation (Story 5.3)
   * @param {Object} ranges - Object with multiplication and addition range settings
   */
  setNumberRanges(ranges) {
    if (ranges) {
      if (
        ranges.multiplication &&
        ranges.multiplication >= 5 &&
        ranges.multiplication <= 20
      ) {
        this.numberRanges.multiplication = ranges.multiplication;
      }

      if (
        ranges.addition &&
        ["ones", "tens", "hundreds"].includes(ranges.addition)
      ) {
        this.numberRanges.addition = ranges.addition;
      }

      console.log(
        `🔢 Math Engine ranges set to: mult=${this.numberRanges.multiplication}, add=${this.numberRanges.addition}`
      );
    }
  }

  /**
   * Gets problem statistics for the current difficulty
   * @returns {Object} Statistics about problem ranges
   */
  getProblemStats() {
    const ranges = {
      easy: { min: 1, max: 5, description: "Learning basic facts (1-5)" },
      medium: { min: 1, max: 8, description: "Building confidence (1-8)" },
      hard: { min: 1, max: 12, description: "Mastering all tables (1-12)" },
    };

    return {
      currentDifficulty: this.difficulty,
      range: ranges[this.difficulty],
      problemTypes: this.problemTypes,
    };
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = MathEngine;
}
