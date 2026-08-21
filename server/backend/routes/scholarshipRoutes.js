const express = require('express');
const router = express.Router();
const scholarshipController = require('../controller/scholarshipController');
const authenticateToken = require('../middleware/authMiddleware'); // Check this export/import


router.get('/', authenticateToken, scholarshipController.getScholarships);
router.post('/', authenticateToken, scholarshipController.createScholarship);
router.delete('/:id', authenticateToken, scholarshipController.deleteScholarship);

module.exports = router;