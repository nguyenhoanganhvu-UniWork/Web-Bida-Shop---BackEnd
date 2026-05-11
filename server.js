const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
// Use the port Render provides, or 3000 locally
const PORT = process.env.PORT || 3000;

app.use(cors());
// Serve static files (like index.html) from the current directory
app.use(express.static(__dirname));

// API Endpoint to get user data from your JSON file
app.get('/api/users', (req, res) => {
    const filePath = path.join(__dirname, 'luanvantotnghiep.users.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseErr) {
            res.status(500).json({ error: "Error parsing JSON data" });
        }
    });
});

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});