const http = require('http');
const mongoose = require('mongoose');
//const express = require('express');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL= 'mongodb+srv://nodedev123:nodedev123cluster0.zcceopn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connection.once('open', () => {
  console.log('Mongo connection ready');
});
//error



const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  });
  await loadPlanetsData();
  
  // npm start in client
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();