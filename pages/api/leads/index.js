import { PrismaClient } from '@prisma/client';

// Use a singleton pattern to initialize Prisma Client
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  // Log the request method and body for debugging
  console.log('Request Method:', req.method);
  console.log('Request Body:', req.body);

  // Set CORS headers to allow requests from all origins (you can restrict this to a specific domain)
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace '*' with your frontend domain (e.g., 'https://your-frontend.com')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle GET requests to fetch leads
  if (req.method === 'GET') {
    try {
      // Log a message when the Prisma Client successfully connects
      await prisma.$connect();
      console.log('Prisma connected successfully!');

      // Fetch the leads from the database
      const leads = await prisma.lead.findMany({
        include: { comments: true },
      });

      // Respond with the fetched leads
      res.status(200).json(leads);
    } catch (error) {
      // Log detailed error information for debugging
      console.error('Error fetching leads:', error);

      // Respond with a detailed error message
      res.status(500).json({ error: 'Failed to fetch leads', details: error.message });
    }
  } else {
    // Handle unsupported methods (anything other than GET)
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
