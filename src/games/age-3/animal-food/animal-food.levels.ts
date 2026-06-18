import type { AnimalFoodLevel } from "./animal-food.types";

export const ANIMAL_FOOD_LEVELS: AnimalFoodLevel[] = [
  {
    id: "level-1-rabbit",
    animal: { id: "rabbit", name: "Rabbit", assetKey: "animal-rabbit", type: "animal" },
    correctFoodId: "carrot",
    foodOptions: [
      { id: "carrot", name: "Carrot", assetKey: "food-carrot", type: "food" },
      { id: "fish", name: "Fish", assetKey: "food-fish", type: "food" },
      { id: "banana", name: "Banana", assetKey: "food-banana", type: "food" },
    ],
    instructionText: "What does the rabbit eat?",
    successText: "Great! Rabbit likes carrot.",
  },
  {
    id: "level-2-monkey",
    animal: { id: "monkey", name: "Monkey", assetKey: "animal-monkey", type: "animal" },
    correctFoodId: "banana",
    foodOptions: [
      { id: "banana", name: "Banana", assetKey: "food-banana", type: "food" },
      { id: "grass", name: "Grass", assetKey: "food-grass", type: "food" },
      { id: "carrot", name: "Carrot", assetKey: "food-carrot", type: "food" },
    ],
    instructionText: "What does the monkey eat?",
    successText: "Nice! Monkey likes banana.",
  },
  {
    id: "level-3-cat",
    animal: { id: "cat", name: "Cat", assetKey: "animal-cat", type: "animal" },
    correctFoodId: "fish",
    foodOptions: [
      { id: "fish", name: "Fish", assetKey: "food-fish", type: "food" },
      { id: "corn", name: "Corn", assetKey: "food-corn", type: "food" },
      { id: "bamboo", name: "Bamboo", assetKey: "food-bamboo", type: "food" },
    ],
    instructionText: "What does the cat eat?",
    successText: "Good job! Cat likes fish.",
  },
  {
    id: "level-4-dog",
    animal: { id: "dog", name: "Dog", assetKey: "animal-dog", type: "animal" },
    correctFoodId: "bone",
    foodOptions: [
      { id: "bone", name: "Bone", assetKey: "food-bone", type: "food" },
      { id: "leaves", name: "Leaves", assetKey: "food-leaves", type: "food" },
      { id: "banana", name: "Banana", assetKey: "food-banana", type: "food" },
    ],
    instructionText: "What does the dog eat?",
    successText: "Yay! Dog likes bone.",
  },
  {
    id: "level-5-cow",
    animal: { id: "cow", name: "Cow", assetKey: "animal-cow", type: "animal" },
    correctFoodId: "grass",
    foodOptions: [
      { id: "grass", name: "Grass", assetKey: "food-grass", type: "food" },
      { id: "fish", name: "Fish", assetKey: "food-fish", type: "food" },
      { id: "bone", name: "Bone", assetKey: "food-bone", type: "food" },
    ],
    instructionText: "What does the cow eat?",
    successText: "Great! Cow likes grass.",
  },
  {
    id: "level-6-chicken",
    animal: { id: "chicken", name: "Chicken", assetKey: "animal-chicken", type: "animal" },
    correctFoodId: "corn",
    foodOptions: [
      { id: "corn", name: "Corn", assetKey: "food-corn", type: "food" },
      { id: "carrot", name: "Carrot", assetKey: "food-carrot", type: "food" },
      { id: "bamboo", name: "Bamboo", assetKey: "food-bamboo", type: "food" },
    ],
    instructionText: "What does the chicken eat?",
    successText: "Nice! Chicken likes corn.",
  },
  {
    id: "level-7-panda",
    animal: { id: "panda", name: "Panda", assetKey: "animal-panda", type: "animal" },
    correctFoodId: "bamboo",
    foodOptions: [
      { id: "bamboo", name: "Bamboo", assetKey: "food-bamboo", type: "food" },
      { id: "grass", name: "Grass", assetKey: "food-grass", type: "food" },
      { id: "corn", name: "Corn", assetKey: "food-corn", type: "food" },
    ],
    instructionText: "What does the panda eat?",
    successText: "Good job! Panda likes bamboo.",
  },
  {
    id: "level-8-elephant",
    animal: { id: "elephant", name: "Elephant", assetKey: "animal-elephant", type: "animal" },
    correctFoodId: "leaves",
    foodOptions: [
      { id: "leaves", name: "Leaves", assetKey: "food-leaves", type: "food" },
      { id: "fish", name: "Fish", assetKey: "food-fish", type: "food" },
      { id: "bone", name: "Bone", assetKey: "food-bone", type: "food" },
    ],
    instructionText: "What does the elephant eat?",
    successText: "Awesome! Elephant likes leaves.",
  },
];
