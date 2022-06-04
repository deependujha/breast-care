require('./conn/mongo')
const express = require('express');
const hbs = require('hbs');
const async = require('hbs/lib/async');

const app = express()
const port = 5000

app.set('view engine', 'hbs');

app.use(express.static('public'))
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res) => {
  res.render('index');
})

app.get('/yourstory', (req, res) => {
  res.render('yourstory');
})

app.post('/yourstory', async (req, res) => {
  try {
    console.log(req.body);
    res.send("OK");
  } catch (error) {

  }

})

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})