const prisma = require('../db');

exports.getScholarships = async (req, res) => {
  try {
    const scholarships = await prisma.scholarship.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createScholarship = async (req, res) => {
  const { title, amount, provider, url, deadline, status, documents } = req.body;
  try {
    const newScholarship = await prisma.scholarship.create({
      data: {
        title,
        amount: Number(amount),
        provider,
        url,
        deadline,
        status: status || 'Pending',
        documents,
        userId: req.user.id,
      },
    });
    res.status(201).json(newScholarship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteScholarship = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.scholarship.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};