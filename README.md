# Cocktail recipes

## Introduction 

This is a database for cocktail recipes.

When the user has not signed up, she can just watch all recipes in the database.

After signing up, she can also add recipes and delete them.

## Setup

If you'd like to watch how the cocktail recipe database works, go to [Cocktail recipes at heroku](https://cocktail-recipes-db.herokuapp.com/)

## Run on your computer

If you want to run this application on your computer, you also need to have an account with [cloudinary](https://cloudinary.com/) to be able to use images in the recipes.

Environment variables are stored in the file ".env":

```
PORT=3000
SESSION_SECRET = "keyboard cat" // can be any string
CLOUDINARY_NAME=                // You get the cloudinary variables
CLOUDINARY_KEY=                 //   on the Dashboard of the
CLOUDINARY_SECRET=              //   cloudinary web site.
```

To install dependencies, you need to run `npm install` in the folder of this project.

To run the application, you need to run `npm run dev` for development or `npm run start` to just let it run.

## Team Members

This was an exercise by [Julia Spriggs](https://github.com/julia-spriggs) and [Wilfried Wurch](https://github.com/wilfried68/).