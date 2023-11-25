const mongoose=require('mongoose');
// schema for the database, it is used for pomodoro timer
const Schema=mongoose.Schema({
    "Time":String,
    "CheckedIn":Boolean,
    "Feeling":String,
});
const pomo=mongoose.model('CheckIn',Schema);
module.exports=(pomo);
