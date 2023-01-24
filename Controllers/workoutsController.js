const Workout = require('../Models/workoutModel');
const mongoose = require('mongoose');


// Get all workouts 
const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1});
    res.status(200).json(workouts);
}

// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: "No Such Workout!"});
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        res.status(404).json({error: "No Such Workout!"});
    }

    res.status(200).json(workout);
}

// Post a workout
const postWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

     // Error Message
     const emptyFields = [];

     if(!title) {
         emptyFields.push('title')
     }
     if(!load) {
         emptyFields.push('load')
     }
     if(!reps) {
         emptyFields.push('reps')
     }
     if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
     }

    // Add to the Database
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Workout!"});
    };

    const workout = await Workout.findByIdAndDelete({_id: id});

    res.status(200).json(workout);
}

// Delete a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Workout!"});
    };

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    });

    res.status(200).json(workout);
}


module.exports = {
    getWorkouts,
    getWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout
}