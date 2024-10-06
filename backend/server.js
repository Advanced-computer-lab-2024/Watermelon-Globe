require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const WorkoutRoutes = require('./routes/workouts')
const Admin = require('./routes/Admin')
const Seller = require('./routes/Seller')

//expres app
const app = express();

//middleware
app.use(express.json()); 

//routes 
app.use('/api/workouts', WorkoutRoutes)
app.use('/api/Admin', Admin)
app.use('/api/Seller', Seller)



// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT , ()=> {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


//listen for request


process.env

