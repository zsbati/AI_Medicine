/**
 * Medical Content Generator Service
 * Uses built-in AI for generating medical content
 */

class MedicalContentGenerator {
    constructor() {
        this.contentTypes = {
            patientSummary: 'patient_summary',
            medicalReport: 'medical_report',
            treatmentPlan: 'treatment_plan',
            patientEducation: 'patient_education',
            drugExplanation: 'drug_explanation'
        };
    }

    /**
     * Generate patient summary from symptoms
     */
    async generatePatientSummary(symptoms, duration, severity) {
        const prompt = `Generate a concise medical summary for a patient with:
        Symptoms: ${symptoms}
        Duration: ${duration}
        Severity: ${severity}
        
        Format: Professional medical summary (2-3 sentences)`;
        
        // Use Windsurf AI here - user can trigger with Ctrl+Shift+I
        return {
            type: this.contentTypes.patientSummary,
            prompt: prompt,
            instructions: "Use Windsurf AI (Ctrl+Shift+I) with the above prompt",
            template: "Replace this with AI-generated content"
        };
    }

    /**
     * Generate patient education material
     */
    async generatePatientEducation(condition, language = 'simple') {
        const prompt = `Explain ${condition} in ${language} terms for a patient:
        - What is it?
        - Common symptoms
        - Basic treatment options
        - When to seek help
        
        Format: Clear, easy-to-understand paragraphs`;
        
        return {
            type: this.contentTypes.patientEducation,
            prompt: prompt,
            instructions: "Use Windsurf AI (Ctrl+Shift+I) with the above prompt",
            template: "Replace this with AI-generated content"
        };
    }

    /**
     * Generate drug explanation
     */
    async generateDrugExplanation(drugName, purpose) {
        const prompt = `Explain ${drugName} for patients:
        Purpose: ${purpose}
        
        Include:
        - How it works
        - Common side effects
        - Important precautions
        - How to take it
        
        Format: Patient-friendly explanation`;
        
        return {
            type: this.contentTypes.drugExplanation,
            prompt: prompt,
            instructions: "Use Windsurf AI (Ctrl+Shift+I) with the above prompt",
            template: "Replace this with AI-generated content"
        };
    }

    /**
     * Generate treatment plan summary
     */
    async generateTreatmentPlan(diagnosis, recommendations) {
        const prompt = `Create a treatment plan summary for:
        Diagnosis: ${diagnosis}
        Recommendations: ${recommendations}
        
        Include:
        - Short-term goals
        - Long-term management
        - Follow-up needed
        - Lifestyle changes
        
        Format: Structured treatment plan`;
        
        return {
            type: this.contentTypes.treatmentPlan,
            prompt: prompt,
            instructions: "Use Windsurf AI (Ctrl+Shift+I) with the above prompt",
            template: "Replace this with AI-generated content"
        };
    }
}

module.exports = MedicalContentGenerator;
