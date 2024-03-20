require('dotenv').config();

// Importing the necessary frameworks  
const express = require('express'); 
const review_route = require('./routes/reviews.js');
const mongoose = require('mongoose');
const port = process.env.port || 5050; 
const uri = process.env.uri;

// Creating an express app
const app = express();

// Middleware
app.use(express.json());
app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
});

// Routes
app.use('/api/reviews', review_route); // මෙතන 'api/reviews'දාල තියෙනව වගේ ඔයාලගෙ collection නම දාන්න.ඒ නමෙන්ම collection එක හදන්න.

// Connect to DB
mongoose.connect(uri)
    .then(() => {
        // Listening for requests
        app.listen(port, () => {
        console.log(`Connected to DB & Listening on port ${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
});