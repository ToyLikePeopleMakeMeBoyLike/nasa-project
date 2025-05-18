const express = require('express');

const {
    httpgetAllLaunches,
    httpAddNewLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();


//planets/
launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);


module.export =launchesRouter;