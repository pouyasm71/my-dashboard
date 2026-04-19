const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAll(req, res) {
  try {
    // Replace with your actual Prisma model query, e.g.:
    // const items = await prisma.user.findMany();
    res.json({ message: 'Controller is working.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAll };
