import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content, leadId } = req.body;
    try {
      const newComment = await prisma.comment.create({
        data: {
          content,
          leadId: Number(leadId),
        },
      });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create comment' });
    }
  } else if (req.method === 'GET') {
    const { leadId } = req.query;
    try {
      const comments = await prisma.comment.findMany({
        where: { leadId: Number(leadId) },
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
