require('./conn/mongo')
const express = require('express');
const hbs = require('hbs');
const async = require('hbs/lib/async');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path')
const app = express()
const port = 5000

const Stories = require('./models/stories');
const {
  default: mongoose
} = require('mongoose');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'public/tmp')
}))
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res) => {
  res.render('index');
})

app.get('/yourstory', (req, res) => {
  res.render('yourstory');
})

app.get('/stories', (req, res) => {
  res.render('stories');
})



app.get('/stories/list', async (req, res) => {
  try {
    const testimonials = await Stories.find().sort({
      createdon: -1
    });
    res.send(testimonials);
  } catch (error) {
    console.log(error);
  }
});

app.get('/story/id/:storyid', async (req, res) => {
  try {
    const testimonials = await Stories.findOne({
      _id: req.params.storyid
    })
    res.send(testimonials);
  } catch (error) {
    console.log(error);
  }
});

app.post('/yourstory', async (req, res) => {
  try {
    const story = await new Stories({
      creator: req.body.creator,
      occupation: req.body.occupation,
      age: req.body.age,
      story: req.body.story,
      createdon: Date.now()
    });
    var image = req.files.image;
    var filename = "";
    if (image.mimetype == 'image/jpeg') {
      filename = mongoose.Types.ObjectId() + '.jpeg';
    } else {
      filename = mongoose.Types.ObjectId() + '.png';
    }
    image.mv(path.join(__dirname, "public/stories/images", filename));
    story.imageAddress = filename;
    console.log(story);
    await story.save();
    // res.redirect('/stories')
  } catch (error) {
    console.log(error);
  }

})

app.get('/know-more', (req, res) => {
  res.render('know-more');
})

app.get('/faqs', (req, res) => {
  res.render('faqs');
})

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})