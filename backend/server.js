const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
const { OpenAI } = require('openai');
const LocalAIService = require('./src/services/localAI');
require('dotenv').config();

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

// Initialize Local AI Service
const localAI = new LocalAIService();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MedScan AI API is running' });
});

// Medical content generation routes
// app.use('/api/medical-content', medicalContentRoutes);

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

    // Use Local AI first (for development)
    if (process.env.USE_LOCAL_AI === 'true' || !process.env.OPENAI_API_KEY) {
      console.log('Using Local AI for symptom analysis');
      const localResult = localAI.analyzeSymptoms(symptoms);
      return res.json(localResult);
    }

    // Use OpenAI if available
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

    // Try OpenAI API
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful medical AI assistant. Provide preliminary analysis but always emphasize that you are not a substitute for professional medical advice."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      });

      const analysis = completion.choices[0].message.content;
      
      res.json({
        analysis,
        timestamp: new Date().toISOString(),
        disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional.',
        openai: true
      });
    } catch (openaiError) {
      console.log('OpenAI API failed, falling back to Local AI:', openaiError.message);
      
      // Fallback to Local AI if OpenAI fails
      const localResult = localAI.analyzeSymptoms(symptoms);
      res.json({
        ...localResult,
        fallback: 'openai_failed',
        openaiError: openaiError.message
      });
    }

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