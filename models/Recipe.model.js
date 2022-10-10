const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    spirits: {
        type: [ String ],
        enum: ['Gin', 'Vodka', 'Rum', 'Tequila', 'Other']
    },
    otherIngredients: {
        type: [ String ],
        required: [true, 'At least one Ingredient is required.']
    },
    description: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
    },
    instructionSteps: {
        type: [ String ],
        required: [true, 'Instructions are required.'],
    }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;