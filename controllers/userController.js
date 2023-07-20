const User = require('../model/User');
const Exercise = require('../model/Exercise');
const formatDate = require('../utils/formatDate');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  }catch(err) {
    console.error(err);
  }
}

const handleUser = async (req, res) => {
  try {
    const { username } = req.body;
    const foundUser = await User.findOne({ username }).exec();
    if(foundUser) {
      res.json({ username, _id: foundUser._id });
    }else {
      const newUser = await User.create({ username });
      
      res.json({ username: newUser.username, _id: newUser._id });
    }
  }catch(err) {
    console.error(err);
  }
}

const handleExercise = async (req, res, next) => {
  try {
    let { description, duration, date } = req.body;
    const { _id } = req.params;
    if(date){date = formatDate(date)}
    if(date === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    duration = Number(duration);
    const foundUser = await User.findById(_id);
    if (foundUser) {
      const newExercise = await Exercise.create({
        user_id: foundUser._id,
        username: foundUser.username,
        description,
        duration,
        date: date ? new Date(date) : new Date()
      })
      
      res.json({ username: foundUser.username, description, duration, date: new Date(newExercise.date).toDateString() , _id: foundUser._id });
      
    } else {
      res.json({ error: "No user with such id." })
    }
    
  } catch (err) {
    res.json({error : `${err.stack}`});
  }
}

const getUserLog = async (req, res, next) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  
  const foundUser = await User.findById(_id);
  
  if(!foundUser) {
    return res.status(404).json({ error: "No user with such id" });
  }

  let dateObject = {};

  if(from) {
    dateObject["$gte"] = new Date(from);
  }

  if(to) {
    dateObject["$lte"] = new Date(to);
  }
  
  let filter = {
    user_id: _id
  }

  if(from || to) {
    filter.date = dateObject
  }

  const exercises = await Exercise.find(filter).limit(Number(limit) ?? 500);

  const log = exercises.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
  }))
  
  res.json({
    username: foundUser.username,
    count: exercises.length,
    _id: foundUser._id,
    log
  })
}

module.exports = { handleUser, getAllUsers, handleExercise, getUserLog }
