const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const authRoutes = require('./Routes/auth')
const passengerRoutes = require('./Routes/p-details')
// const mailRoutes = require('./Routes/mailRoutes')

const app = express();
const PORT = 5000;
const mongoConnection = process.env.MongoConnection

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Train Booking API');
});

app.use('/api/auth', authRoutes)
app.use('/api/create',passengerRoutes)
// app.use('/api/gmail' , mailRoutes)

// Start server and connect to mongo
mongoose.connect(mongoConnection).then(()=>{
  console.log("App is connected to Mongo DB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error)=>{
console.log(error);
})


