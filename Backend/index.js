const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/logindata", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String
}));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const check = await User.findOne({ username });
  if (check) return res.status(400).json({ message: "User already exists" });

  const hashPass = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashPass });

  res.json({ message: "User registered successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const check = await User.findOne({ username });
  if (!check) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, check.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: check._id }, "secretKey");
  res.json({ message: "Login successful", token });
});

app.listen(5000, () => {
  console.log("✅ Server is running on port 5000");
});
