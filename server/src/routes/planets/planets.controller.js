const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
  try {
    const planets = await getAllPlanets();
    return res.status(200).json(planets);
  } catch (error) {
    // Log the error for server-side visibility
    console.error(`Could not get planets: ${error}`);
    // Return a generic error message to the client
    return res.status(500).json({ error: 'Failed to retrieve planets.' });
  }
}

module.exports = {
  httpGetAllPlanets,
};
