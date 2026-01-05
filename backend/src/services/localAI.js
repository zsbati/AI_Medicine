/**
 * Lightweight Local AI Service for Medical Symptom Analysis
 * This provides a rule-based approach for development without requiring external APIs
 */

class LocalAIService {
    constructor() {
        // Symptom keyword mappings to potential conditions
        this.symptomPatterns = {
            headache: {
                keywords: ['headache', 'head pain', 'migraine', 'head ache', 'throbbing head'],
                conditions: ['Tension headache', 'Migraine', 'Sinus headache', 'Dehydration'],
                severity: 'mild to moderate',
                recommendations: ['Rest in quiet room', 'Stay hydrated', 'Over-the-counter pain relievers', 'Apply cold compress']
            },
            fever: {
                keywords: ['fever', 'high temperature', 'hot', 'chills', 'sweating', 'temperature'],
                conditions: ['Viral infection', 'Bacterial infection', 'Flu', 'COVID-19'],
                severity: 'moderate',
                recommendations: ['Rest and hydration', 'Monitor temperature', 'Fever reducers', 'Seek medical attention if high fever persists']
            },
            cough: {
                keywords: ['cough', 'coughing', 'chesty cough', 'dry cough', 'persistent cough'],
                conditions: ['Common cold', 'Bronchitis', 'Allergies', 'Asthma', 'COVID-19'],
                severity: 'mild to moderate',
                recommendations: ['Stay hydrated', 'Honey and lemon', 'Humidifier', 'Avoid irritants']
            },
            nausea: {
                keywords: ['nausea', 'queasy', 'sick to stomach', 'vomiting', 'throw up', 'upset stomach'],
                conditions: ['Gastroenteritis', 'Food poisoning', 'Motion sickness', 'Migraine', 'Pregnancy'],
                severity: 'mild to moderate',
                recommendations: ['Clear liquids', 'BRAT diet', 'Ginger', 'Rest', 'Avoid strong odors']
            },
            fatigue: {
                keywords: ['tired', 'fatigue', 'exhausted', 'no energy', 'weak', 'sleepy'],
                conditions: ['Anemia', 'Thyroid issues', 'Depression', 'Sleep deprivation', 'Chronic fatigue syndrome'],
                severity: 'mild to severe',
                recommendations: ['Improve sleep hygiene', 'Balanced diet', 'Regular exercise', 'Stress management', 'Medical evaluation if persistent']
            },
            chest_pain: {
                keywords: ['chest pain', 'chest tightness', 'chest pressure', 'heart pain'],
                conditions: ['Heart attack', 'Angina', 'Costochondritis', 'GERD', 'Anxiety'],
                severity: 'severe',
                recommendations: ['Seek immediate medical attention', 'Call emergency services', 'Do not drive yourself', 'Chew aspirin if available (unless allergic)']
            },
            stomach_pain: {
                keywords: ['stomach pain', 'abdominal pain', 'belly pain', 'stomach ache'],
                conditions: ['Gastritis', 'Appendicitis', 'IBS', 'Food poisoning', 'Ulcers'],
                severity: 'mild to severe',
                recommendations: ['Avoid solid food temporarily', 'Stay hydrated', 'Apply heat', 'Seek medical attention if severe or persistent']
            },
            back_pain: {
                keywords: ['back pain', 'lower back pain', 'upper back pain', 'spine pain', 'backache'],
                conditions: ['Muscle strain', 'Herniated disc', 'Sciatica', 'Kidney stones', 'Arthritis'],
                severity: 'mild to severe',
                recommendations: ['Apply heat or cold', 'Gentle stretching', 'Proper posture', 'Avoid heavy lifting', 'Seek medical attention if severe or persistent']
            },
            radiating_pain: {
                keywords: ['radiating pain', 'pain down leg', 'pain down arm', 'shooting pain', 'numbness', 'tingling'],
                conditions: ['Sciatica', 'Herniated disc', 'Pinched nerve', 'Neuralgia', 'Radiculopathy'],
                severity: 'moderate to severe',
                recommendations: ['Immediate medical evaluation', 'Avoid activities that worsen pain', 'Apply gentle heat', 'Physical therapy consultation']
            }
        };

        // Body system mappings
        this.bodySystems = {
            neurological: ['headache', 'dizziness', 'confusion', 'numbness', 'tingling'],
            respiratory: ['cough', 'shortness of breath', 'chest pain', 'wheezing'],
            gastrointestinal: ['nausea', 'vomiting', 'stomach pain', 'diarrhea', 'constipation'],
            cardiovascular: ['chest pain', 'palpitations', 'shortness of breath', 'swelling'],
            musculoskeletal: ['muscle pain', 'joint pain', 'back pain', 'stiffness', 'radiating pain', 'backache']
        };
    }

    /**
     * Analyze symptoms using rule-based approach
     * @param {string} symptoms - User's symptom description
     * @returns {Object} Analysis result with conditions, severity, and recommendations
     */
    analyzeSymptoms(symptoms) {
        // Generate prompt for Windsurf AI
        const prompt = `As a medical AI assistant, analyze these symptoms and provide preliminary insights:
        
Symptoms: "${symptoms}"

Please provide:
1. Possible conditions that might cause these symptoms
2. Recommended next steps
3. When to seek immediate medical attention
4. General wellness advice

Format your response clearly and include a strong disclaimer about consulting healthcare professionals.`;

        return {
            analysis: null, // Will be filled by Windsurf AI
            prompt: prompt,
            instructions: "Use Windsurf AI (Ctrl+Shift+I) with the above prompt",
            local: true,
            timestamp: new Date().toISOString(),
            disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional.',
            windsurf_ai: true
        };
    }

    /**
     * Identify affected body systems based on symptoms
     */
    _identifyBodySystems(symptoms) {
        const systems = [];
        Object.entries(this.bodySystems).forEach(([system, symptoms]) => {
            if (symptoms.some(symptom => symptoms.includes(symptom))) {
                systems.push(system);
            }
        });
        return systems;
    }

    /**
     * Generate human-readable analysis
     */
    _generateAnalysis(patterns, conditions, recommendations, systems, severity, originalSymptoms) {
        let analysis = `Based on your symptoms: "${originalSymptoms}"\n\n`;

        if (patterns.length === 0) {
            analysis += `I couldn't identify specific symptom patterns in your description. ` +
                       `Please provide more details about your symptoms, such as location, ` +
                       `duration, and severity.\n\n` +
                       `General recommendations:\n` +
                       `- Rest and stay hydrated\n` +
                       `- Monitor your symptoms\n` +
                       `- Seek medical attention if symptoms worsen or persist`;
        } else {
            analysis += `**Identified Symptom Patterns:**\n`;
            patterns.forEach(pattern => {
                analysis += `- ${pattern.symptom.replace('_', ' ')} (confidence: ${Math.round(pattern.confidence * 100)}%)\n`;
            });

            analysis += `\n**Possible Conditions:**\n`;
            conditions.slice(0, 5).forEach(condition => {
                analysis += `- ${condition}\n`;
            });

            if (systems.length > 0) {
                analysis += `\n**Potentially Affected Body Systems:**\n`;
                systems.forEach(system => {
                    analysis += `- ${system.replace('_', ' ')}\n`;
                });
            }

            analysis += `\n**Severity Assessment:** ${severity}\n\n`;
            analysis += `**Recommendations:**\n`;
            recommendations.slice(0, 6).forEach(rec => {
                analysis += `- ${rec}\n`;
            });
        }

        // Add urgency warning for severe symptoms
        if (severity === 'severe') {
            analysis += `\n\n⚠️ **URGENT**: Based on the severity of your symptoms, ` +
                       `please seek immediate medical attention or call emergency services.`;
        }

        return analysis;
    }

    /**
     * Compare severity levels
     */
    _compareSeverity(severity1, severity2) {
        const severityOrder = { 'mild': 1, 'mild to moderate': 2, 'moderate': 3, 'moderate to severe': 4, 'severe': 5 };
        return severityOrder[severity1] - severityOrder[severity2];
    }

    /**
     * Calculate overall confidence in the analysis
     */
    _calculateConfidence(patterns) {
        if (patterns.length === 0) return 0.1;
        
        const avgConfidence = patterns.reduce((sum, pattern) => sum + pattern.confidence, 0) / patterns.length;
        const patternCount = patterns.length;
        
        // Higher confidence with more matched patterns and higher average confidence
        return Math.min(0.95, avgConfidence * (1 + patternCount * 0.1));
    }

    /**
     * Get health status summary
     */
    getHealthStatus(symptoms) {
        const result = this.analyzeSymptoms(symptoms);
        
        return {
            status: result.local ? 'Local AI Analysis' : 'External AI Analysis',
            confidence: Math.round(result.confidence * 100),
            severity: this._extractSeverity(result.analysis),
            needsAttention: result.analysis.includes('URGENT') || result.analysis.includes('seek immediate'),
            timestamp: result.timestamp
        };
    }

    /**
     * Extract severity from analysis
     */
    _extractSeverity(analysis) {
        if (analysis.includes('severe')) return 'severe';
        if (analysis.includes('moderate')) return 'moderate';
        return 'mild';
    }
}

module.exports = LocalAIService;
