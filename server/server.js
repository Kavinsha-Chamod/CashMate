const express = require('express')
const app = express();
const dbConfig = require('./config/dbConfig')
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
  console.log(`Server started on Port ${PORT}`);
})