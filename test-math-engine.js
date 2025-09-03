// Story 2.1 Testing Script - Math Engine Validation
// Test the math problem generator functionality

// Import the MathEngine (using Node.js for testing)
const MathEngine = require("./src/js/math-engine.js");

console.log("🧪 Testing Math Engine for Story 2.1...\n");

// Create a new instance
const mathEngine = new MathEngine();

// Test 1: Basic problem generation
console.log("=== Test 1: Basic Problem Generation ===");
for (let i = 0; i < 5; i++) {
  const problem = mathEngine.generateNewProblem();
  console.log(
    `Problem ${i + 1}: ${problem.displayText} (Answer: ${problem.answer})`
  );
}

// Test 2: Different difficulty levels
console.log("\n=== Test 2: Difficulty Levels ===");
const difficulties = ["easy", "medium", "hard"];
difficulties.forEach((level) => {
  console.log(
    `\n${level.toUpperCase()} (1-${
      level === "easy" ? 5 : level === "medium" ? 8 : 12
    }):`
  );
  mathEngine.setDifficulty(level);

  for (let i = 0; i < 3; i++) {
    const problem = mathEngine.generateNewProblem();
    console.log(`  ${problem.displayText} = ${problem.answer}`);
  }
});

// Test 3: Answer validation
console.log("\n=== Test 3: Answer Validation ===");
const testProblem = mathEngine.generateNewProblem();
console.log(`Test Problem: ${testProblem.displayText}`);

const correctResult = mathEngine.validateAnswer(testProblem.answer);
console.log(`Correct Answer (${testProblem.answer}):`, correctResult);

const incorrectResult = mathEngine.validateAnswer(999);
console.log(`Incorrect Answer (999):`, incorrectResult);

// Test 4: Problem randomness
console.log("\n=== Test 4: Problem Randomness ===");
const problems = [];
for (let i = 0; i < 10; i++) {
  problems.push(mathEngine.generateNewProblem().displayText);
}
console.log("Generated problems:", problems);
console.log(
  "Unique problems:",
  new Set(problems).size,
  "out of",
  problems.length
);

console.log("\n✅ Math Engine testing complete!");
