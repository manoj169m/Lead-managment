// pages/api/leads/[status].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { status } = req.query; // Get status from the query params

  try {
    const leads = await prisma.lead.findMany({
      where: {
        status: status, // Filter by the provided status
      },
      include: {
        comments: true, // Include comments if needed
      },
    });

    res.status(200).json(leads); // Return the leads as JSON
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leads' });
  }
}
