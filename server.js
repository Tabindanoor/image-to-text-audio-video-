const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Enable CORS
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (Make sure MongoDB is running)

mongoose.connect('mongodb://localhost:27017/mern_auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a simple User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});


const feedbackSchema = new mongoose.Schema({
  message: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// API endpoint to save feedback
app.post('/feedback', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: ' Feedback is required.' });
    }

    const feedback = new Feedback({ message });
    await feedback.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// user data signup / signin
const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    // Create a new user
    const newUser = new User({ username, password });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error(err);
      } else {
          res.send('Logged out successfully');
      }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


