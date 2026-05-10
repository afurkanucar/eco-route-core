const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check (Sistem Sağlık Kontrolü) - Profesyonel detay
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'active', 
        message: 'Eco-Route Engine is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`[Server] Eco-Route Core listening on port ${PORT}`);
});

