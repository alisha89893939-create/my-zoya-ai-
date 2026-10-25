const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// अपनी Gemini API key यहाँ डालें
const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6LIPPCDXHytS7b3tlYN1JfFYzwysqr2PWEU0e1Ptk4iIg" });

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const systemInstruction = "You are 'My Zoya AI', a helpful assistant created by Imtiaz Ali from Kolkata. Always state that Imtiaz Ali from Kolkata created you if asked about your creator.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: systemInstruction + "\n\nUser: " + message }] }]
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
