import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// For JavaScript, we can just use global directly
const prisma = global.prisma || new PrismaClient();

// Only assign to global object in development to avoid memory leaks in production
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  // Log the request method
  console.log('Request Method:', req.method);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS requests (preflight requests from browsers)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET requests to fetch leads
  if (req.method === 'GET') {
    try {
      console.log('Attempting to fetch leads...');
      
      // Fetch the leads from the database - Prisma automatically connects
      const leads = await prisma.lead.findMany({
        include: { comments: true },
      });

      console.log(`Successfully fetched ${leads.length} leads`);
      
      // Respond with the fetched leads
      res.status(200).json(leads);
    } catch (error) {
      // Safely log errors
      console.error('Error fetching leads:', error instanceof Error ? error.message : 'Unknown error');
      console.error('Error details:', error);

      // Safely extract error message
      let errorMessage = 'Unknown error occurred';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error !== null && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      // Respond with a detailed error message
      res.status(500).json({ 
        error: 'Failed to fetch leads', 
        details: errorMessage 
      });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}