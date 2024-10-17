const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/staffDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


const multer = require('multer');
const Staff = require('./models/staff');
const path = require('path');

// File storage config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to add staff
app.post('/api/staff', upload.single('image'), async (req, res) => {
  const { name, position, bio, email, linkedin, twitter } = req.body;
  const staff = new Staff({
    name,
    position,
    bio,
    email,
    socialMedia: { linkedin, twitter },
    image: req.file ? req.file.filename : null
  });

  try {
    await staff.save();
    res.status(201).json({ message: 'Staff added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.use('/uploads', express.static('uploads'));


// Route to get all staff profiles
app.get('/api/staff', async (req, res) => {
    try {
      const staff = await Staff.find();  // Fetch all staff profiles from MongoDB
      res.json(staff);  // Return the staff data as JSON
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  