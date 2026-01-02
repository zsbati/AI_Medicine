const express = require('express');
const { body, validationResult } = require('express-validator');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Symptom analysis endpoint
router.post('/analyze-symptoms', [
  body('symptoms').trim().isLength({ min: 10, max: 1000 }).withMessage('Symptoms must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { symptoms } = req.body;

    const prompt = `As a medical AI assistant, analyze the following symptoms and provide preliminary insights. Be thorough but emphasize that this is not a diagnosis.

Symptoms: "${symptoms}"

Please provide:
1. Possible conditions that might cause these symptoms
2. Recommended next steps
3. When to seek immediate medical attention
4. General wellness advice

Format your response clearly and include a strong disclaimer about consulting healthcare professionals.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical AI assistant. Always include disclaimers and emphasize that users should consult real healthcare professionals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const analysis = completion.choices[0].message.content;

    res.json({
      analysis,
      timestamp: new Date().toISOString(),
      disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional.'
    });

  } catch (error) {
    console.error('Symptom analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze symptoms',
      message: 'Our AI service is temporarily unavailable. Please try again later.'
    });
  }
});

module.exports = router;