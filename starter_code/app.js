
const express = require('express');
const hbs     = require('hbs');
const path    = require('path'); // una libreria interna de node
const PunkAPIWrapper = require('punkapi-javascript-wrapper'); // módulo
const punkAPI = new PunkAPIWrapper();
const app     = express();

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  const beer_image = '/images/beer.png'
  res.render('index', {beer_image});
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {beers});
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      const [beer] = beers;
      res.render('random-beers', beer);
    })
    .catch(error => {
      console.log(error)
    })
});

app.listen(3000);