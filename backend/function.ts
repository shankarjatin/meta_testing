type Request = express.Request;
type Response = express.Response;

// Create an async function to fetch message templates
async function fetchTemplates(): Promise<any> {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.WABA_ID}/message_templates`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching templates');
  }
}