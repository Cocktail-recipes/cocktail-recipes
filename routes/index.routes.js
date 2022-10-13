const router = require("express").Router();
const Recipe = require('../models/Recipe.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET keep alive */
router.get('/keep-alive', (req, res, next) => {
  Recipe.find()
    .then(() => {
      res.status(200).json({ message: 'It worked' });
    })
    .catch(() => {
      res.status(500).json({ message: "It didn't work" });
    });
});

module.exports = router;
