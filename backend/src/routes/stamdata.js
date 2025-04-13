import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'student' }
    });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students', details: error.message });
  }
});

// Get all personnel
router.get('/personnel', async (req, res) => {
  try {
    const personnel = await prisma.user.findMany({
      where: { NOT: { role: 'student' } }
    });
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch personnel' });
  }
});

export default router;
