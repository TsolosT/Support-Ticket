const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
} else {
    app.get('/', (_, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' });
    });
}


app.use(errorHandler);


// Only listen when not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}


// Only listen when not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
//

// Only listen when not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
// Vercel serverless environment
module.exports = app;