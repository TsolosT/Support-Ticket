const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000; 
const {errorHandler} = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.status(200).json({message: 'Welcome to the Fire Support Ticket API'});
});
//Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is fired up on port ${PORT}`));