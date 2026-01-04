/**
 * Medical Content Routes
 */

const express = require('express');
const router = express.Router();
const MedicalContentController = require('../controllers/medicalContentController');

const controller = new MedicalContentController();

// Generate patient summary
router.post('/summary', controller.generatePatientSummary.bind(controller));

// Generate patient education
router.post('/education', controller.generatePatientEducation.bind(controller));

// Generate drug explanation
router.post('/drug-info', controller.generateDrugExplanation.bind(controller));

module.exports = router;
