const express = require('express');
const cors = require('cors');


const planetsRouter =require('./routes/Planets/planets.router');

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(planetsRouter);



module.exports = app;