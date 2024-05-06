// Require Mongoose and your Order model
const mongoose = require('mongoose');
const Order = require('./models/order_model'); // Assuming your order model file is in the same directory

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/multimaster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Sample data to insert
    const orders = [
        { 
          uid:"01",  
          name: "John Doe",
          email: "john@example.com",
          address: "123 Main St",
          phone: "555-1234",
          products: [
            { title: "Product 1", quantity: 2 },
            { title: "Product 2", quantity: 1 }
          ],
          totalPrice: 50,
          additionalDetails: "Special delivery instructions",
          orderState: "pending"
        },
        { 
          uid:"02",  
          name: "Jane Smith",
          email: "jane@example.com",
          address: "456 Elm St",
          phone: "555-5678",
          products: [
            { title: "Product 3", quantity: 3 },
            { title: "Product 1", quantity: 1 }
          ],
          totalPrice: 80,
          additionalDetails: "Leave at doorstep",
          orderState: "approved"
        },
        { 
          uid:"03",  
          name: "Bob Johnson",
          email: "bob@example.com",
          address: "789 Oak St",
          phone: "555-9101",
          products: [
            { title: "Product 2", quantity: 1 },
            { title: "Product 3", quantity: 2 }
          ],
          totalPrice: 70,
          additionalDetails: "",
          orderState: "rejected"
        },
        // Additional orders
        { 
          uid:"04",
          name: "Alice Brown",
          email: "alice@example.com",
          address: "321 Pine St",
          phone: "555-2468",
          products: [
            { title: "Product 1", quantity: 1 },
            { title: "Product 2", quantity: 2 },
            { title: "Product 3", quantity: 1 }
          ],
          totalPrice: 95,
          additionalDetails: "Call before delivery",
          orderState: "pending"
        },
        { 
          uid:"05",  
          name: "Michael Green",
          email: "michael@example.com",
          address: "654 Cedar St",
          phone: "555-1357",
          products: [
            { title: "Product 1", quantity: 3 },
            { title: "Product 3", quantity: 2 }
          ],
          totalPrice: 110,
          additionalDetails: "Do not deliver on weekends",
          orderState: "approved"
        },
        { 
          uid:"06",  
          name: "Emily White",
          email: "emily@example.com",
          address: "987 Maple St",
          phone: "555-7890",
          products: [
            { title: "Product 2", quantity: 2 }
          ],
          totalPrice: 40,
          additionalDetails: "",
          orderState: "pending"
        }
      ];
      

    // Insert data into the database
    Order.insertMany(orders)
      .then(() => {
        console.log('Data inserted successfully');
      })
      .catch(err => {
        console.error('Error inserting data:', err);
      })
      .finally(() => {
        // Disconnect from the database after inserting data
        mongoose.disconnect();
      });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
