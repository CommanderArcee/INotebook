const express = require("express");
const router = express.Router();

router.get('/api/notes/', (req,res) => {
    const obj = {
        name : "Notes"
    }
    res.json(obj);
});

module.exports = router;