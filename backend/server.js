const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
const { OpenAI } = require('openai');
require('dotenv').config();

// Import routes
// const healthRoutes = require('./src/routes/health');
// const symptomRoutes = require('./src/routes/symptoms');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting
app.set('trust proxy', true);

// Security middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// General middleware
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MedScan AI API is running' });
});

// Symptom analysis endpoint
app.post('/api/analyze-symptoms', [
  body('symptoms').trim().isLength({ min: 10, max: 1000 }).withMessage('Symptoms must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { symptoms } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `As a medical AI assistant, analyze the following symptoms and provide preliminary insights. Be thorough but emphasize that this is not a diagnosis.

Symptoms: "${symptoms}"

Please provide:
1. Possible conditions that might cause these symptoms
2. Recommended next steps
3. When to seek immediate medical attention
4. General wellness advice

Format your response clearly and include a strong disclaimer about consulting healthcare professionals.`;

    // Mock response for testing when API quota is exceeded
    const mockAnalysis = `Based on your symptoms of a headache for 3 days that's worse in the morning with nausea, here are some preliminary insights:

**Possible Conditions:**
- Tension headache (most common)
- Migraine with associated nausea
- Sinus congestion or pressure
- Dehydration-related headache

**Recommended Next Steps:**
1. Stay well-hydrated by drinking plenty of water
2. Try over-the-counter pain relievers (acetaminophen or ibuprofen) if appropriate for you
3. Ensure adequate rest and sleep
4. Monitor symptoms for any changes or worsening

**When to Seek Immediate Medical Attention:**
- Sudden severe headache ("worst headache of your life")
- Headache with fever, stiff neck, or confusion
- Headache after head injury
- Vision changes or difficulty speaking

**General Wellness Advice:**
- Maintain regular sleep schedule
- Manage stress through relaxation techniques
- Stay hydrated throughout the day
- Consider keeping a headache diary to track patterns

**Important Disclaimer:** This is not a medical diagnosis. Please consult a healthcare professional for proper medical advice, especially if symptoms persist or worsen.`;

    res.json({
      analysis: mockAnalysis,
      timestamp: new Date().toISOString(),
      disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional.',
      mock: true // Add flag to indicate this is mock data
    });

  } catch (error) {
    console.error('Symptom analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze symptoms',
      message: 'Our AI service is temporarily unavailable. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`MedScan AI server running on port ${PORT}`);
});