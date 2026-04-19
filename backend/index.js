require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRouter = require('./routes/auth');
const kycRouter = require('./routes/kyc');

app.use('/api/auth', authRouter);
app.use('/api/kyc_submissions', kycRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
