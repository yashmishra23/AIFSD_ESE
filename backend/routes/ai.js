const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

// POST /api/ai/recommend
router.post('/recommend', auth, async (req, res) => {
  try {
    const employees = req.body.employees; // Accept array of employees or single employee

    if (!employees || employees.length === 0) {
      return res.status(400).json({ msg: 'Please provide employee data' });
    }

    const prompt = `Analyze the following employee data and provide:
1. Promotion Recommendation
2. Employee Ranking (if multiple)
3. Training Suggestions (especially for missing skills or low performance)
4. AI Feedback Generation (High performers get promotion suggestion, low performers get improvement feedback, missing skills get skill enhancement).

Data: ${JSON.stringify(employees, null, 2)}

Provide the response in a structured Markdown format.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-pro',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ recommendation: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
});

module.exports = router;
