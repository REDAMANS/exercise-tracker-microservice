const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const connectDb = require('./config/connectDb');
require('dotenv').config()

const PORT = process.env.PORT || 3000;

connectDb();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/users', require('./api/users'));

mongoose.connection.once('open', () => {
  console.log("connected to mongoDB");
  const listener = app.listen(PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
})
