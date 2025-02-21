require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const validateInput = (req, res, next) => {
  if (req.method === 'POST') {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. Expected array in 'data' field"
      });
    }
  }
  next();
};

app.get('/', (req, res) => {
  res.send("Welcome to Backend of BFHL");
})

app.get('/bfhl', (req, res) => {
  try {
    return res.status(200).json({
      operation_code: 1
    });
  } catch (error) {
    console.error('GET Error:', error);
    return res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

app.post('/bfhl', validateInput, (req, res) => {
  try {
    const { data } = req.body;
    
    const numbers = [];
    const alphabets = [];
    
    data.forEach(item => {
      if (/^\d+$/.test(item)) {
        numbers.push(item);
      } else if (/^[A-Za-z]$/.test(item)) {
        alphabets.push(item);
      }
    });

    const highest_alphabet = alphabets.length > 0 
      ? [alphabets.reduce((max, curr) => 
          max.toLowerCase() > curr.toLowerCase() ? max : curr)]
      : [];

    const response = {
      is_success: true,
      user_id: process.env.USER_ID,
      email: process.env.EMAIL,
      roll_number: process.env.ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('POST Error:', error);
    return res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    is_success: false,
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
