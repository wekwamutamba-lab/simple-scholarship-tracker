const prisma = require('../db');

const createScholarship = async (req, res) => {
  try {
    const { title, provider, amount, source, platformName, platformUrl, requirements, notes, status, deadline } = req.body;

    const newScholarship = await prisma.scholarship.create({
      data: {
        title,
        provider,
        amount: amount ? parseFloat(amount) : null,
        source,
        platformName,
        platformUrl,
        requirements: requirements || [],
        notes,
        status: status || 'SAVED',
        deadline: new Date(deadline),
        userId: req.user.userId, // Links scholarship to the logged-in user
      },
    });

    res.status(201).json({ message: 'Scholarship added successfully!', scholarship: newScholarship });
  } catch (error) {
    res.status(500).json({ message: 'Error adding scholarship', error: error.message });
  }
};


const getScholarships = async (req, res) => {
  try {
    const scholarships = await prisma.scholarship.findMany({
      where: { userId: req.user.userId },
      orderBy: { deadline: 'asc' }, 
    });

    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scholarships', error: error.message });
  }
};


const getScholarshipById = async (req, res) => {
  try {
    const { id } = req.params;

    const scholarship = await prisma.scholarship.findFirst({
      where: { 
        id: parseInt(id), 
        userId: req.user.userId 
      },
    });

    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scholarship', error: error.message });
  }
};


const updateScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, provider, amount, source, platformName, platformUrl, requirements, notes, status, deadline } = req.body;


    const existing = await prisma.scholarship.findFirst({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Scholarship not found or unauthorized' });
    }

    const updatedScholarship = await prisma.scholarship.update({
      where: { id: parseInt(id) },
      data: {
        title,
        provider,
        amount: amount ? parseFloat(amount) : null,
        source,
        platformName,
        platformUrl,
        requirements,
        notes,
        status,
        deadline: deadline ? new Date(deadline) : undefined,
      },
    });

    res.json({ message: 'Scholarship updated successfully!', scholarship: updatedScholarship });
  } catch (error) {
    res.status(500).json({ message: 'Error updating scholarship', error: error.message });
  }
};


const deleteScholarship = async (req, res) => {
  try {
    const { id } = req.params;

    
    const existing = await prisma.scholarship.findFirst({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Scholarship not found or unauthorized' });
    }

    await prisma.scholarship.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Scholarship deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting scholarship', error: error.message });
  }
};

module.exports = {
  createScholarship,
  getScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
};