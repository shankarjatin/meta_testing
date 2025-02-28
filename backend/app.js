const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Endpoint to fetch message templates
app.get('/get-templates', async (req, res) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.WABA_ID}/message_templates`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching templates');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
