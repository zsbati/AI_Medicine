/**
 * Medical Content Controller
 * Handles medical content generation requests
 */

const MedicalContentGenerator = require('../services/medicalContentGenerator');

class MedicalContentController {
    constructor() {
        this.generator = new MedicalContentGenerator();
    }

    /**
     * Generate patient summary
     */
    async generatePatientSummary(req, res) {
        try {
            const { symptoms, duration, severity } = req.body;
            
            const result = await this.generator.generatePatientSummary(
                symptoms, 
                duration, 
                severity
            );
            
            res.json({
                success: true,
                data: result,
                message: 'Use Windsurf AI (Ctrl+Shift+I) with the provided prompt'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * Generate patient education
     */
    async generatePatientEducation(req, res) {
        try {
            const { condition, language } = req.body;
            
            const result = await this.generator.generatePatientEducation(
                condition, 
                language || 'simple'
            );
            
            res.json({
                success: true,
                data: result,
                message: 'Use Windsurf AI (Ctrl+Shift+I) with the provided prompt'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * Generate drug explanation
     */
    async generateDrugExplanation(req, res) {
        try {
            const { drugName, purpose } = req.body;
            
            const result = await this.generator.generateDrugExplanation(
                drugName, 
                purpose
            );
            
            res.json({
                success: true,
                data: result,
                message: 'Use Windsurf AI (Ctrl+Shift+I) with the provided prompt'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = MedicalContentController;
