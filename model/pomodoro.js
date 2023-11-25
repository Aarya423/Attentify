const mongoose=require('mongoose');
// schema for the database, it is used for pomodoro timer
const Schema=mongoose.Schema({
    "Time":String,
    "CheckedIn":Boolean,
    "Feeling":String,
});
const pomo=mongoose.model('Pomodoro',Schema);
module.exports=(pomo);
[{time: "", checkin:true, feeling: "happy"}]

let newDate = new Date();
newDate.getDate();