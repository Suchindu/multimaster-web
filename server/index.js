require('dotenv').config();
// Importing the necessary frameworks  
const express = require('express'); 
const path = require('path');
const upload_route = require('./routes/uploadRoutes.js');
const mongoose = require('mongoose');
const cors = require('cors');
const review_route = require('./routes/reviews.js');
const repair_route = require('./routes/repair.js');
const product_route = require('./routes/product.js');
const order_route = require('./routes/order_routes.js');
const user_route = require("./routes/UserRoutes");
const user_login_route = require("./routes/UserLoginRoute");
const user_profile_route = require("./routes/ProfileRoute");
const port = process.env.port || 5050;
const uri = process.env.uri;

// Creating an express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
});

app.use(cors());


// Routes
app.use('/api/reviews', review_route); 
app.use('/api/repair', repair_route); 
app.use('/api/products', product_route);
app.use(upload_route);
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use('/api/orders', order_route);
app.use("/user", user_route);
app.use("/login", user_login_route);
app.use("/profile", user_profile_route);
app.use("/send-email", order_route);

app.listen(3000, () => console.log('Server started on port 3000'));

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