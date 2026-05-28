const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetchUser = require("../middleware/authLoggedInUser");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// Summarize a note
router.post("/summarize", fetchUser, async (req, res) => {
    try {
        const { text } = req.body;
        const result = await model.generateContent(
            `Summarize this note in 2-3 concise sentences:\n\n${text}`
        );
        const summary = result.response.text();
        res.json({ summary });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
}
});

// Auto-tag a note
router.post("/autotag", fetchUser, async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await model.generateContent(
            `Based on this note title and description, suggest one short tag (1-2 words max). Return only the tag, nothing else.\n\nTitle: ${title}\nDescription: ${description}`
        );
        const tag = result.response.text().trim();
        res.json({ tag });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate tag" });
    }
});

// Ask your notes
router.post("/ask", fetchUser, async (req, res) => {
    try {
        const { question, notes } = req.body;
        const notesText = notes.map(n => `Title: ${n.Title}\nDescription: ${n.Description}`).join("\n\n");
        const result = await model.generateContent(
            `Based on these notes, answer the question below.\n\nNotes:\n${notesText}\n\nQuestion: ${question}`
        );
        const answer = result.response.text();
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: "Failed to answer" });
    }
});
// Classify note using fine-tuned DistilBERT model
router.post("/classify", fetchUser, async (req, res) => {
    try {
        const { text } = req.body;
        const response = await fetch(`http://localhost:8000/classify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Classification failed" });
    }
});

module.exports = router;
