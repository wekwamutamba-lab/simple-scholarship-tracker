const prisma = require('../db');

exports.getScholarships = async (req, res) => {
  try {
    const scholarships = await prisma.scholarship.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(scholarships);
  } catch (error) {
    console.error('Get scholarships error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch scholarships' });
  }
};

exports.createScholarship = async (req, res) => {
  const { title, amount, provider, url, deadline, status, documents, eligibility, notes } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Scholarship title is required' });
  }

  try {
    const numericAmount = isNaN(Number(amount)) ? 0 : Number(amount);
    const newScholarship = await prisma.scholarship.create({
      data: {
        title: title.trim(),
        amount: numericAmount,
        provider: provider ? provider.trim() : null,
        url: url ? url.trim() : null,
        deadline: deadline ? deadline.trim() : null,
        status: status || 'Not started',
        documents: documents || eligibility || notes || null,
        userId: req.user.id,
      },
    });
    res.status(201).json(newScholarship);
  } catch (error) {
    console.error('Create scholarship error:', error);
    res.status(500).json({ message: error.message || 'Failed to create scholarship' });
  }
};

exports.deleteScholarship = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.scholarship.deleteMany({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: 'Scholarship not found or unauthorized' });
    }

    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Delete scholarship error:', error);
    res.status(500).json({ message: error.message || 'Failed to delete scholarship' });
  }
};