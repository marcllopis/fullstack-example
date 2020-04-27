const express = require ('express');
const connection = require('./conf')
const app = express()
const bodyParser = require('body-parser')
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// check DB connection working
connection.connect(function (err) {
  if (err) {
      console.error('error connecting: ' + err.stack);
      return;
  }
  console.log('connected as id ' + connection.threadId);
});


app.get('/', (req, res) => {
  res.send('it worksss!')
})


app.get('/posts', (req, res) => {
  connection.query('SELECT * FROM posts', (err, results) => {
    if(err) {
      res.status(500).send('error fetching posts')
    } else {
      res.json(results)
    }
  })
})


app.post('/posts', (req, res) => {
  console.log(req.body)
  const formData = {
    user: req.body.user,
    post: req.body.post
  }
  connection.query('INSERT INTO posts SET ?', formData, (err) => {
    if(err){
      res.status(500).send('Error saving your post')
    } else {
      res.sendStatus(200)
    }
  })
});



app.listen(port, (err) => {
  if(err) {
    throw new Error('Something did not work');
  }
  console.log(`Server is listening on port ${port}`);
});

