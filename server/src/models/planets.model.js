const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }
  // Other fields from the CSV can be added here if needed
  // e.g., koi_disposition: String, koi_insol: Number, koi_prad: Number,
});

// Mongoose will create a collection named 'planets' (pluralized, lowercased)
const Planet = mongoose.model('Planet', planetSchema);

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');
    
    fs.createReadStream(csvPath)
      .pipe(parse({
        comment: '#', // Treats lines starting with # as comments
        columns: true, // Returns each row as an object
      }))
      .on('data', async (data) => {
        // Filter for habitable planets based on criteria
        const isHabitable = data.koi_disposition === 'CONFIRMED'
          && parseFloat(data.koi_insol) > 0.36 && parseFloat(data.koi_insol) < 1.11
          && parseFloat(data.koi_prad) < 1.6;

        if (isHabitable) {
          try {
            // Upsert operation: update if exists, insert if not
            // This avoids duplicate planets based on keplerName
            await Planet.updateOne(
              { keplerName: data.kepler_name }, // Match document with this kepler_name
              { keplerName: data.kepler_name }, // Set kepler_name (can add other fields from 'data' here)
              { upsert: true }
            );
          } catch (err) {
            // Log error but don't necessarily stop the whole process
            console.error(`Could not save planet ${data.kepler_name}: ${err}`);
          }
        }
      })
      .on('error', (err) => {
        console.error('Error reading or parsing CSV file:', err);
        reject(err);
      })
      .on('end', async () => {
        try {
          // Log the count of planets actually in the database after processing
          const countInDb = await Planet.countDocuments();
          console.log(`${countInDb} habitable planets are now in the database.`);
          resolve();
        } catch (dbError) {
          console.error('Error counting planets in database:', dbError);
          reject(dbError);
        }
      });
  });
}

async function getAllPlanets() {
  try {
    // Retrieve all planets, excluding MongoDB default _id and __v fields
    const planets = await Planet.find({}, {
      '_id': 0, '__v': 0,
    });
    return planets;
  } catch (err) {
    console.error('Could not retrieve planets:', err);
    throw err; // Re-throw the error for the caller to handle
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
