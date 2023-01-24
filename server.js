require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4001;
const workoutRoutes = require('./Routes/workoutRoutes');
const userRoutes = require('./Routes/userRoutes');


// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connected with MongoDB
mongoose.connect(process.env.MONGO_UI)
.then(() => console.log(`Connected to MongoDB`))
.catch((error) => console.log(error));

// App is Listening
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});