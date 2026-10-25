const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Purane SDK ki jagah standard GoogleGenerativeAI ka use
const genAI = new GoogleGenerativeAI("AQ.Ab8RN6K0a_gEAz_qC9HT4rWoMeVCmRWNcgMTSM3UOWcnK06p0Q");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message || "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

