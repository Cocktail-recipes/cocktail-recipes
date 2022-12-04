# Cocktail recipes

## Introduction 

This is a database for cocktail recipes.

When the user has not signed up, they can only view the recipes in the database.

After signing up, they can also add new recipes and delete them.

## Setup

If you'd like to see how the cocktail recipe database works, go to [our website on adaptable](https://cocktail-recipes.adaptable.app)

## Run on your computer

If you want to run this application on your computer, you also need to have an account with [cloudinary](https://cloudinary.com/) to be able to use images in the recipes.

Environment variables are stored in the file ".env":

```
PORT=3000
SESSION_SECRET =                //   can be any string
CLOUDINARY_NAME=                //   You get the cloudinary variables
CLOUDINARY_KEY=                 //   on the Dashboard of the
CLOUDINARY_SECRET=              //   cloudinary web site.
```

To install dependencies, you need to run `npm install` in the folder of this project.

To run the application, you need to run `npm run dev` for development or `npm run start` to just let it run.

## Team Members

This was a project by [Julia Spriggs](https://github.com/julia-spriggs) and [Wilfried Wurch](https://github.com/wilfried68/).
