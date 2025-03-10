import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { name, contactInfo, link, instaLink, category, status } = req.body;
    try {
      const updatedLead = await prisma.lead.update({
        where: { id: Number(id) },
        data: {
          name,
          contactInfo,
          link,
          instaLink,
          category,
          status,
        },
      });
      res.status(200).json(updatedLead);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update lead' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}