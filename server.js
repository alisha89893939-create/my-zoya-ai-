const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6K0a_gEAz_qC9HT4rWoMeVCmRWNcgMTSM3UOWcnK06p0Q" });

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


