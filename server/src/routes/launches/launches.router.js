const express = require('express');

const {
    httpgetAllLaunches,
    httpAddNewLaunch,
    existLaunchWithId,
} = require('./launches.controller');

const launchesRouter = express.Router();


//planets/
launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);



module.export =launchesRouter;