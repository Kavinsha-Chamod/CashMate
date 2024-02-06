const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kavinshachamod:bAk*0831@mrz2001.xkvcpgv.mongodb.net/CashMate')

const connectionResult = mongoose.connection;

connectionResult.on('error', (error) => { // Pass 'error' to the callback function
  console.log('Connection Error:', error); // Log the error message
});

connectionResult.on('connected', () => {
  console.log('Mongo DB connected Successfully!');
});

module.exports = connectionResult;
