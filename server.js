const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const TWILIO_ACCOUNT_SID = 'ACa6f4703c7bcc6c3a0ec0cf8761bedab5';
const TWILIO_AUTH_TOKEN = 'c5ec95eb1a762aa6d5b5f6eec6557352';
const TWILIO_PHONE_NUMBER = '+19292961595'; // Twilio phone number for sending messages

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Define routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
app.post('/api/command', (req, res) => {
  const command = req.body.command;
  
  if (command.toLowerCase() === 'open whatsapp') {
    // Send message to WhatsApp using Twilio
    twilioClient.messages
      .create({
        body: 'Opening WhatsApp...',
        from: +19292961595,
        to: '' // e.g., '+1234567890'
      })
      .then(message => {
        console.log('Message sent:', message.sid);
        res.json({ message: 'Message sent to WhatsApp' });
      })
      .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message to WhatsApp' });
      });
  } else {
    res.json({ message: 'Command received', command });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
