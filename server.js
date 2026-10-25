const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Aapki nayi API key yahan set kar di gayi hai
const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6LTQoZDjI_LydG4YHsHeSrhAK_2EzTKzDcPo-hecfnWfA" });

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


