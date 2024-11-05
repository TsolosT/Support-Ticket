const asyncHandler = require('express-async-handler');

// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    //Basic validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all fiedls.');
    }

    res.send('Register route');
});
// @desc   Sign in a new user
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login route');
});

module.exports = {
    registerUser,
    loginUser
};