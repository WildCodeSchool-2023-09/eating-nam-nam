/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const UserManager = require("./models/UserManager");
const RecipeManager = require("./models/RecipeManager");
const IngredientManager = require("./models/IngredientManager");
const MaterialManager = require("./models/MaterialManager");
const CommentManager = require("./models/CommentManager");
const InstructionManager = require("./models/InstructionManager");
const FavManager = require("./models/FavManager");
const TagManager = require("./models/TagManager");
const RecipeIngredientManager = require("./models/RecipeIngredientManager");

const managers = [
  UserManager,
  RecipeManager,
  IngredientManager,
  MaterialManager,
  CommentManager,
  InstructionManager,
  FavManager,
  TagManager,
  RecipeIngredientManager,
  // Add other managers here
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
