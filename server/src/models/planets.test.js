const mongoose = require('mongoose');
const { loadPlanetsData, getAllPlanets } = require('./planets.model');

// MONGO_URL is defined in server.js but not exported.
// For this test, we are re-defining it here as per instructions.
const MONGO_URL = 'mongodb+srv://nodedev123:nodedev123cluster0.zcceopn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

describe('Planets Model', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Test suite for loading and retrieving planets
  describe('loadPlanetsData and getAllPlanets', () => {
    it('should load planets data and retrieve them successfully', async () => {
      // loadPlanetsData is designed to be idempotent with upsert, 
      // so calling it multiple times (even across test runs if DB isn't cleaned)
      // should be fine for its logic.
      await loadPlanetsData(); 
      
      const planets = await getAllPlanets();

      // 1. Check if planets is an array
      expect(Array.isArray(planets)).toBe(true);

      // 2. Check if the array is not empty
      // This assumes that kepler_data.csv contains at least one habitable planet
      // based on the filtering criteria in planets.model.js
      expect(planets.length).toBeGreaterThan(0);

      // 3. Check if the first planet object has the keplerName property
      // This also assumes planets.length > 0 from the previous assertion.
      if (planets.length > 0) {
        expect(planets[0]).toHaveProperty('keplerName');
        // Optionally, check the type of keplerName
        expect(typeof planets[0].keplerName).toBe('string');
      }
    });

    it('should not include _id or __v fields in returned planets', async () => {
      // Ensure data is loaded
      await loadPlanetsData();
      const planets = await getAllPlanets();

      expect(Array.isArray(planets)).toBe(true);
      expect(planets.length).toBeGreaterThan(0);

      if (planets.length > 0) {
        planets.forEach(planet => {
          expect(planet).not.toHaveProperty('_id');
          expect(planet).not.toHaveProperty('__v');
        });
      }
    });
  });
});
