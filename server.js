const express = require('express')
const app = express()
const port = 5000

app.set('view engine', 'hbs');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})