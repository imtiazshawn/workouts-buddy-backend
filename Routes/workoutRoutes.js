const express = require('express');
const router = express.Router();
const { postWorkout, 
        getWorkouts, 
        getWorkout,
        deleteWorkout,
        updateWorkout
    } = require('../Controllers/workoutsController');
const userAuth = require('../Middleware/authRequire');

// Middleware
router.use(userAuth);

// Get all workouts
router.get('/', getWorkouts);

// Get a single workouts
router.get('/:id', getWorkout);

// Post a workout
router.post('/', postWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);

module.exports = router;