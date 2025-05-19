require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api');

app.get('/api/spotify/search', async (req, res) => {
    // forwards to Spotify's search endpoint using access token
  });
  
app.use(cors());
app.use(express.json()); 
app.use('/api', apiRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
