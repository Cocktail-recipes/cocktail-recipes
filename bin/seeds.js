const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cocktail-recipes';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const recipes = [
    {
        name: "Gin Fizz",
        spirits: "Gin",
        otherIngredients: ["45 ml Gin", "30 ml Fresh Lemon Juice", "10 ml Simple Syrup", "Splash of Soda Water"],
        description: "The first printed recipe for a Gin Fizz appeared in the 1876 edition of “The Bar-tenders Guide” by Jerry Thomas. It’s basically the frothy, bubbly, protein-packed cousin to the Tom Collins, which combines gin, lemon, sugar and soda.",
        difficulty: "easy",
        instructionSteps: [ "Shake all ingredients with ice except soda water", "Pour into thin tall Tumbler glass", "Top with a splash soda water", "Garnish with a lemon slice, optional lemon zest", "NOTE: Serve without ice" ]
    },
    {
        name: "Daiquiri",
        spirits: "Rum",
        otherIngredients: ["60 ml White Cuban Ron", "20 ml Fresh Lime Juice", "2 Bar Spoons Superfine Sugar"],
        description: "The Daiquiri was supposedly invented in 1898 in the eponymous mining town of Daiquiri on the southeastern tip of Cuba by an American mining engineer named Jennings Cox. It was introduced in the United States a decade later, when a U.S. Navy medical officer brought the recipe from Cuba to Washington, D.C.",
        difficulty: "medium",
        instructionSteps: [ "In a cocktail shaker add all ingredients", "Stir well to dissolve the sugar", "Add ice and shake", "Strain into chilled cocktail glass" ]
    },
    {
        name: "Black Russian",
        spirits: "Vodka",
        otherIngredients: ["50 ml Vodka", "20 ml Coffee Liqueur"],
        description: "The Black Russian is a simple, two-part cocktail combining vodka and Kahlúa, a coffee liqueur that’s made with rum, sugar and arabica coffee. The drink was created in the late 1940s by bartender Gustave Tops at the Hotel Metropole in Brussels.",
        difficulty: "easy",
        instructionSteps: ["Pour the ingredients into the old fashioned glass filled with ice cubes", "Stir gently", "NOTE: WHITE RUSSIAN – Float fresh cream on the top and stir in slowly"]
    },
    {
        name: "Bloody Mary",
        spirits: "Vodka",
        otherIngredients: ["45 ml Vodka", "90 ml Tomato Juice", "15 ml Fresh Lemon", "2 dashes Worcestershire Sauce", "Tabasco", "Celery Salt", "Pepper (Up to taste)", "Celery", "Lemon Wedge (Optional)"],
        description: "The Bloody Mary is one of the world’s best known cocktails, prized for its ability to jumpstart even the groggiest of mornings. Its origins aren’t exactly clear, but the likely backstory points to the mid-1930s and Fernand “Pete” Petiot, a bartender at King Cole Bar at the St. Regis hotel in New York City.",
        difficulty: "hard",
        instructionSteps: ["Stir gently all the ingredients in a mixing glass with ice", "Pour into rocks glass", "Garnish with celery, optional with a lemon wedge", "Note: If requested served with ice, pour into highball glass"]
    },
    {
        name: "Caipirinha",
        spirits: "other",
        otherIngredients: ["60 ml Cachaça", "1 Lime cut into small wedges", "4 Teaspoons White Cane Sugar"],
        description: "Chances are high you encountered Brazil’s national drink, the Caipirinha, if you’ve traveled to the South American country. Refreshing and easy to make, the cocktail contains fresh lime juice, sugar and cachaça—a spirit as central to Brazilian identity as samba, soccer and carnival. Cachaça is also the country’s national spirit, inextricably tying this drink to its home.",
        difficulty: "easy",
        instructionSteps: ["Place lime and sugar into a double old fashioned glass", "Muddle gently", "Fill the glass with cracked ice", "Add Cachaça", "Stir gently to involve ingredients", "Note: CAIPIROSKA – Instead of Cachaça use Vodka"]
    },
    {
        name: "Long Island Ice Tea",
        spirits: ["Vodka", "Tequila", "Rum", "Gin"],
        otherIngredients: ["15 ml Vodka", "15 ml Tequila", "15 ml Whit rum", "15 ml Gin", "15 ml Cointreau", "30 ml Lemon Juice", "20 ml Simple syrup", "Top with Cola"],
        description: "The Long Island Iced Tea was popularized in the 1970s and remains a beloved drink. It’s possible the cocktail was born out of Prohibition, when thirsty scofflaws wanted to disguise their booze. It’s also possible the drink sprung up in the ’70s at a bar in Long Island, or maybe at a TGI Friday’s. This much is known: You still can’t throw a lemon wedge inside the chain restaurant without knocking one over.",
        difficulty: "medium",
        instructionSteps: ["Add all ingredients into a highball glass filled with ice", "Stir gently", "Garnish with Lemon Slice (Optional"]
    },
];

const recipesPromise = Recipe.create(recipes);

Promise.all([recipesPromise])
  .then( (result) => {
    const recipesCreated = result[0];
    console.log(`Number of recipes created... ${recipesCreated.length} `);

    // Once created, close the DB connection
    mongoose.connection.close();

  })
  .catch( e => console.log("error seeding data in DB....", e));
  