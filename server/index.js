const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();
const port = 5000; // Or any port you prefer

app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Database connection parameters
// const pool = new Pool({
//   user: 'saadyousaf',
//   host: 'localhost',
//   database: 'medicine_interactions',
//   password: 'saad',
//   port: 5432,
// });


const pool = new Pool({
    user: 'medcine', // Your Azure PostgreSQL username
    host: 'medicine.postgres.database.azure.com', // Your Azure PostgreSQL host
    database: 'medicine_interactions', // Your database name
    password: 'admin@1234', // Your Azure PostgreSQL password
    port: 5432,
    ssl: {
        ca: [
          fs.readFileSync('certs/Microsoft RSA Root Certificate Authority 2017.crt').toString(),
          fs.readFileSync('certs/DigiCertGlobalRootG2.crt.pem').toString(),
          fs.readFileSync('certs/DigiCertGlobalRootCA.crt').toString()
        ],
      },    
  });


// Endpoint to get interactions
app.get('/interactions', async (req, res) => {
  const { medicine1, medicine2 } = req.query;

  if (!medicine1) {
    return res.status(400).json({ error: 'medicine1 is required.' });
  }

  try {
    let query = `
      SELECT DISTINCT ON (LEAST(m1.name, m2.name), GREATEST(m1.name, m2.name)) i.*, m1.name as medicine1_name, m1.description as medicine1_description, m2.name as medicine2_name, m2.description as medicine2_description
      FROM interactions i
      JOIN medicines m1 ON i.medicine1_id = m1.id
      JOIN medicines m2 ON i.medicine2_id = m2.id
      WHERE m1.name ILIKE $1 OR m2.name ILIKE $1
    `;
    let params = [medicine1];

    if (medicine2) {
      query += ' AND (m1.name ILIKE $2 OR m2.name ILIKE $2)';
      params.push(medicine2);
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No interaction found for the given medicines.' });
    }
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get medicine details
app.get('/medicine', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Medicine name is required.' });
  }

  try {
    const query = `
      SELECT *
      FROM medicines
      WHERE name ILIKE $1
    `;
    const params = [name];

    const result = await pool.query(query, params);
    console.log(result)
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No medicine found with the given name.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

