// index.js

//https://apilayer.com/marketplace/number_verification-api


const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/verify', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const apiKey = 'c4dZdK0PYPlKRgGRpmWAJFAotaZcwiEJ'; 

  try {
    const response = await axios.get(
      `https://api.apilayer.com/number_verification/validate?number=${phoneNumber}`,
      {
        headers: {
          apikey: apiKey,
        },
      }
    );

    const validationResult = response.data;

    if (validationResult.valid) {
      res.send('Phone number verified successfully');
    } else {
      res.send('Phone number verification failed');
    }
  }
   catch (error) {
    console.error('Error verifying phone number:', error);
    res.send('An error occurred during verification');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
