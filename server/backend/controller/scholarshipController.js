const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getScholarships,
  createScholarship,
  deleteScholarship,
} = require('../controller/scholarshipController');

router.use(authMiddleware);
router.get('/', getScholarships);
router.post('/', createScholarship);
router.delete('/:id', deleteScholarship);

module.exports = router;