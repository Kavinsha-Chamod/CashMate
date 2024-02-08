const express = require('express')
const app = express();
require('dotenv').config();
app.use(express.json());
const dbConfig = require('./config/dbConfig')
const userRoute = require('./routes/usersRoute')
const transactionsRoute = require('./routes/transactionsRoute')

app.use('/api/users', userRoute);
app.use('api/transactions', transactionsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
  console.log(`Server started on Port ${PORT}`);
})