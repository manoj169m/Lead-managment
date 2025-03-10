import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, contactInfo, link, instaLink, category, status } = req.body;
    try {
      const newLead = await prisma.lead.create({
        data: {
          name,
          contactInfo,
          link,
          instaLink,
          category,
          status,
        },
      });
      res.status(201).json(newLead);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create lead' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}