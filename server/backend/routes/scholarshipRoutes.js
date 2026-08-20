const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authmiddleware');

const {
  createScholarship,
  getScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
} = require('../controller/scholarshipController');

router.use(authenticateToken);

router.post('/', createScholarship);
router.get('/', getScholarships);
router.get('/:id', getScholarshipById);
router.put('/:id', updateScholarship);
router.delete('/:id', deleteScholarship);

module.exports = router;