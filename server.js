const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));

// In-memory storage for applicants (in production, use a database)
let applicants = [];

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Routes
app.get('/api/applicants', (req, res) => {
  res.json(applicants);
});

app.post('/api/register', upload.single('resume'), (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      experience,
      motivation,
      availability,
      education,
      skills
    } = req.body;

    const newApplicant = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
      role,
      experience,
      motivation,
      availability,
      education,
      skills,
      resume: req.file ? `/images/${req.file.filename}` : null,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    };

    applicants.push(newApplicant);
    res.status(201).json({ success: true, applicant: newApplicant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/applicants/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const applicant = applicants.find(app => app.id === id);
  if (applicant) {
    applicant.status = status;
    res.json({ success: true, applicant });
  } else {
    res.status(404).json({ success: false, error: 'Applicant not found' });
  }
});

// Serve React app
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 