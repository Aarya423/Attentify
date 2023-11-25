const express=require('express');
const app=express();
const port= 3000;
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const check=require('../routes/checkin');

app.use('/' , express.static(path.join(__dirname,'client')));

mongoose.connect('mongodb://localhost:27017/attent');

const mongodb=mongoose.connection;
mongodb.on('error',console.error.bind(console,'connection error'));
mongodb.once('open',()=>{
    console.log('connection established');
});

app.use(bodyParser.json());
app.use('/',check);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});