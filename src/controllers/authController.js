const User = require("../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Функція реєстрації користувача
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Перевірка чи користувач вже існує
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Функція входу користувача
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received login request:", { email, password });

    // Перевірка чи користувач існує
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Генерація JWT токена
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "3h",
    });

    console.log("Login successful, generated token:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Функція виходу користувача
exports.logout = (req, res) => {
  res.status(200).json({ message: "User logged out" });
};
