import { PrismaClient } from '@prisma/client';

// Use a singleton pattern to initialize Prisma Client
let prisma;

if (process.env.NODE_ENV === 'production') {
  // In production, create a new PrismaClient instance for each request
  prisma = new PrismaClient();
} else {
  // In development, reuse the Prisma instance to prevent multiple connections
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function handler(req, res) {
  // Log the request method and body for debugging
  console.log('Request Method:', req.method);
  console.log('Request Body:', req.body);

  // Set CORS headers (you should replace '*' with your frontend domain for production)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change this to your frontend domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight CORS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET requests to fetch leads
  if (req.method === 'GET') {
    try {
      // Ensure Prisma connection is only established once per serverless instance
      if (prisma && prisma.$connect) {
        await prisma.$connect();
        console.log('Prisma connected successfully!');
      }

      // Fetch leads from the database (including related comments)
      const leads = await prisma.lead.findMany({
        include: { comments: true },
      });

      // Respond with the fetched leads
      res.status(200).json(leads);
    } catch (error) {
      // Log the error for debugging
      console.error('Error fetching leads:', error);

      // Respond with a detailed error message
      res.status(500).json({
        error: 'Failed to fetch leads',
        details: error.message,
      });
    }
  } else {
    // Handle unsupported methods (anything other than GET)
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
