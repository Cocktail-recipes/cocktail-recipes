const Recipe = require('../models/Recipe.model');

const isLoggedIn = require('../middleware/isLoggedIn');

const router = require('express').Router();

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
router.post('/recipes/create', isLoggedIn, (req, res, next) => {
    const recipeDetails = {
        name: req.body.name,
        spirits: req.body.spirits,
        otherIngredients: req.body.otherIngredients,
        description: req.body.description,
        difficulty: req.body.difficulty,
        instructionSteps: req.body.instructionSteps,
    }
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
        res.render('recipes/recipe-edit', recipeDetails);
    })
    .catch(err => {
        console.log('error getting recipe details from DB', err);
        next(err);
    });
});

//UPDATE: process form
router.post('/recipes/:recipeId/edit', isLoggedIn, (req, res, next) => {
    const recipeId = req.params.recipeId;

    const newDetails = {
        name: req.body.name,
        spirits: req.body.spirits,
        otherIngredients: req.body.otherIngredients,
        description: req.body.description,
        difficulty: req.body.difficulty,
        instructionSteps: req.body.instructionSteps,
    }
    Recipe.findByIdAndUpdate(recipeId, newDetails)
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