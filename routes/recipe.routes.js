const Recipe = require('../models/Recipe.model');

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

//READ: Recipe details
router.get('/recipes/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;

    Recipe.findById(id)
    .then(recipeDetails => {
        res.render('/recipes/recipe-details', recipeDetails);
    })
    .catch(err => {
        console.log('error getting recipe details from DB', err);
        next(err);
    })
});

//CREATE: display form
router.get('/recipes/create', (req, res, next) => {
    res.render('/recipes/recipe-create');
});

//CREATE: process form
router.post('/recipes/create', (req, res, next) => {
    const recipeDetails = {
        name: req.body.name,
        spirits: req.body.spirits,
        otherIngredients: req.body.otherIngredients,
        description: req.body.description,
        difficulty: req.body.difficulty,
        instructionSteps: req.body.instructionSteps,
    }
    Recipe.create(recipeDetails)
    .then(() => {
        res.redirect('/recipes');
    })
    .catch(err => {
        res.redirect('/recipes/recipe-create');
    });
});

//UPDATE: display form
router.get('/recipes/:recipeId/edit', (req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .then((recipeDetails) => {
        res.render('/recipes/recipe-edit', recipeDetails);
    })
    .catch(err => {
        console.log('error getting recipe details from DB', err);
        next(err);
    });
});

//UPDATE: process form
router.post('/recipes/:recipeId/edit', (req, res, next) => {
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



module.exports = router;