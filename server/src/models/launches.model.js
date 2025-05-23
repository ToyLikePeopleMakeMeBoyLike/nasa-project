//const { getAllLaunches } = require("../routes/launches/launches.controller");

const launches = new Map();


let latestFlightNumber = 100;




const launch = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    
    target: ' Kepler - 442 b',
    customer: ['xtm', 'nasa'],
    upcoming: true,
    success: true,

};

launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            
            success: true,
            upcoming: true,
            customers: ['ztm','nasa'],
            flightNumber: latestFlightNumber,

    }));
}

function abortLaunchById(launchId){

    const aborted =launch.get(launchId);
    aborted.upcoming = false ;
    aborted.success =false;
    return aborted;


}


module.exports = { 
    getAllLaunches,
    addNewLaunch,
    existLaunchWithId,
    abortLaunchById,
};