const Recipe = require('../models/Recipe.model');
const fileUploader = require('../config/cloudinary.config');

const isLoggedIn = require('../middleware/isLoggedIn');

const router = require('express').Router();

const alcohol = ['Gin', 'Vodka', 'Rum', 'Tequila', 'Other'];
const difficulties = ['easy', 'medium', 'hard'];

//READ: list all recipes
router.get('/recipes', (req, res, next) => {
    Recipe.find()
    .then(recipes => {
        res.render('recipes/recipes-list', { recipes });
    })
    .catch(err => {
        console.log('error getting recipes from the DB', err);
        next(err);
    });
});

//CREATE: display form
router.get('/recipes/create', isLoggedIn, (req, res, next) => {
    res.render('recipes/recipe-create');
});

//CREATE: process form
router.post('/recipes/create', isLoggedIn, fileUploader.single('cocktail-image'), (req, res, next) => {
    let recipeDetails = {
        name: req.body.name,
        spirits: req.body.spirits,
        otherIngredients: req.body.otherIngredients,
        description: req.body.description,
        difficulty: req.body.difficulty,
        instructionSteps: req.body.instructionSteps,
        imageUrl: req.file?.path
    }
    recipeDetails.otherIngredients = recipeDetails.otherIngredients.split(', ');
    recipeDetails.instructionSteps = recipeDetails.instructionSteps.split('\n');
    if (!recipeDetails.name || !recipeDetails.otherIngredients || !recipeDetails.instructionSteps) {
        res.render('recipes/recipe-create', { errorMessage: 'Please fill out all mandatory fields. You must provide at least a cocktail name, the ingredients, and the instructions.'});
        return;
    }
    Recipe.create(recipeDetails)
    .then(() => {
        res.redirect('/recipes');
    })
    .catch(err => {
        res.redirect('/recipe-create');
    });
});

//READ: Recipe details
router.get('/recipes/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;

    Recipe.findById(id)
    .then(recipeDetails => {
        res.render('recipes/recipe-details', recipeDetails);
    })
    .catch(err => {
        console.log('error getting recipe details from DB', err);
        next(err);
    });
});

//UPDATE: display form
router.get('/recipes/:recipeId/edit', isLoggedIn, (req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .then((recipeDetails) => {
//        let remainingAlcohol = alcohol.filter(a => 
//            !)
        let remainingDifficulties = difficulties.filter(d => 
            d !== recipeDetails.difficulty)
        let ingredients = recipeDetails.otherIngredients.join(', ');
        let instructions = recipeDetails.instructionSteps.join('\n');
        res.render('recipes/recipe-edit', { recipeDetails, ingredients, instructions, remainingDifficulties: remainingDifficulties });
    })
    .catch(err => {
        console.log('error getting recipe details from DB', err);
        next(err);
    });
});

//UPDATE: process form
router.post('/recipes/:recipeId/edit', isLoggedIn, fileUploader.single('cocktail-image'), (req, res, next) => {
    const { recipeId } = req.params;
    let { name, spirits, otherIngredients, description, difficulty, instructionSteps, existingImage } = req.body;
    otherIngredients = otherIngredients.split(', ');
    instructionSteps = instructionSteps.split('\n');

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
  
    Recipe.findByIdAndUpdate(recipeId, {name, spirits, otherIngredients, description, difficulty, instructionSteps, imageUrl}, {new: true})
    .then(() => {
        res.redirect(`/recipes/${recipeId}`);
    })
    .catch(err => {
        res.redirect('/recipes/recipe-edit');
    });
});

//DELETE FROM RECIPES LIST PAGE
router.get('/recipes/:recipeId/delete', isLoggedIn, (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.recipeId)
    .then(() => {
        res.redirect('/recipes');
    })
    .catch(err => {
        console.log('error deleting book', err);
        next();
    });
});


//DELETE FROM EDIT PAGE
router.post('/recipes/:recipeId/delete', isLoggedIn, (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.recipeId)
    .then(() => {
        res.redirect('/recipes');
    })
    .catch(err => {
        console.log('error deleting book', err);
        next();
    });
});

module.exports = router;