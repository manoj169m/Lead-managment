// pages/api/testDbConnection.js
export default async function handler(req, res) {
    const { DATABASE_URL } = process.env;
    const { Client } = require('pg'); // Ensure 'pg' package is installed
  
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },  // Ensure SSL is used if required
    });
  
    try {
      await client.connect();
      const result = await client.query('SELECT NOW()');
      res.status(200).json({ message: 'Database connected successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to database', details: error.message });
    } finally {
      client.end();
    }
  }
  