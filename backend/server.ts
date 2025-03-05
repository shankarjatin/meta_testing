import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

interface TemplateResponse {
  data: any;
}

// Endpoint to fetch message templates
app.get('/get-templates', async (req: Request, res: Response) => {
  try {
    const response = await axios.get<TemplateResponse>(
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.WABA_ID}/message_templates`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send('Error fetching templates');
  }
});

// Endpoint to get WABA ID
app.get('/get-waba-id', async (req: Request, res: Response) => {
  try {
    const response = await axios.get<TemplateResponse>(
      `https://graph.facebook.com/v14.0/${process.env.WABA_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send('Error fetching WABA ID');
  }
});

// Endpoint to post a template
app.post('/send-template', async (req: Request, res: Response) => {
  const { body } = req.body; // Receive the template details (including name, language, and components)

  try {
    const requestBody = {
      body: JSON.stringify(body),
    };

    // Send request to Meta API to post the template
    const response = await axios.post<TemplateResponse>(
      `https://graph.facebook.com/v22.0/${process.env.WABA_ID}/message_templates`, // API version v22.0
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Send the response from Meta API back to the client
    res.json(response.data);
  } catch (error: any) {
    // Log the error for debugging and send an error response
    console.error('Error:', error.response?.data || error.message); // Detailed error log
    res.status(500).send('Error sending template');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
