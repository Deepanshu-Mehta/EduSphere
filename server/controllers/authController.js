const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { initializeConnection } = require("../config/database");

// Load environment variables
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the database connection
    const connection = await initializeConnection();

    // Insert the new user into the 'users' table
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await connection.execute(sql, [username, email, hashedPassword]);

    // Fetch the inserted user with the last inserted ID
    const userId = result.insertId;
    const userSql = "SELECT id, username, email FROM users WHERE id = ?";
    const [user] = await connection.execute(userSql, [userId]);

    // Respond with the registered user data
    res.status(201).json({
      message: "User registered successfully",
      user: user[0],  // The first result since `userSql` is expected to return an array of user objects
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error registering user");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await initializeConnection();
    const sql = "SELECT * FROM users WHERE username = ?";
    const [results] = await connection.query(sql, [username]);

    if (results.length === 0) {
      return res.status(401).send("Invalid username or password");
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "24h" });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, refreshSecretKey);

    // Store the refresh token in the database
    const updateTokenSql = "UPDATE users SET refresh_token = ? WHERE id = ?";
    await connection.query(updateTokenSql, [refreshToken, user.id]);

    res.json({
      message: "Login successfully",
      token,
      refreshToken
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error logging in");
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required");
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshSecretKey);
    const connection = await initializeConnection();
    const sql = "SELECT * FROM users WHERE id = ? AND refresh_token = ?";
    const [results] = await connection.query(sql, [decoded.id, refreshToken]);

    if (results.length === 0) {
      return res.status(403).send("Invalid refresh token");
    }

    const user = results[0];
    const newToken = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "24h" });

    res.json({ token: newToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(403).send("Invalid refresh token");
  }
};

exports.protected = (req, res) => {
  const { username } = req.user;
  res.send(`Welcome ${username}! This is a protected route.`);
};

// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");
// const { initializeConnection } = require("../config/database");
// const { Types } = require('mysql2');
// const { application } = require('express');

// // Load environment variables
// require('dotenv').config();

// const secretKey = process.env.SECRET_KEY;
// const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const connection = await initializeConnection();
//     const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//     await connection.query(sql, [username, email, hashedPassword]);
//         // Send welcome email
//         try {
//           const emailResponse = await axios.post('http://localhost:3001/sendMail', {
//             userEmail: email,
//             userName: username
//           }, {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
    
//           console.log('Email service response:', emailResponse.data);
          
//           res.status(201).json({
//             status: 'success',
//             message: 'User registered successfully',
//             emailStatus: 'Email sent successfully'
//           });
//         } catch (emailError) {
//           console.error('Error sending welcome email:', emailError.response?.data || emailError.message);
          
//           res.status(201).json({
//             status: 'success',
//             message: 'User registered successfully',
//             emailStatus: 'Failed to send welcome email'
//           });
//         }
//       } catch (error) {
//         console.error("Error during registration:", error);
//         res.status(500).json({
//           status: 'error',
//           message: 'Error registering user'
//         });
//       }
//     };

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const connection = await initializeConnection();
//     const sql = "SELECT * FROM users WHERE username = ?";
//     const [results] = await connection.query(sql, [username]);

//     if (results.length === 0) {
//       return res.status(401).send("Invalid username or password");
//     }

//     const user = results[0];
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).send("Invalid username or password");
//     }

//     const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "24h" });
//     const refreshToken = jwt.sign({ id: user.id, username: user.username }, refreshSecretKey);

//     // Store the refresh token in the database
//     const updateTokenSql = "UPDATE users SET refresh_token = ? WHERE id = ?";
//     await connection.query(updateTokenSql, [refreshToken, user.id]);

//     res.json({ token, refreshToken });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).send("Error logging in");
//   }
// };

// exports.refreshToken = async (req, res) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) {
//     return res.status(401).send("Refresh token is required");
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, refreshSecretKey);
//     const connection = await initializeConnection();
//     const sql = "SELECT * FROM users WHERE id = ? AND refresh_token = ?";
//     const [results] = await connection.query(sql, [decoded.id, refreshToken]);

//     if (results.length === 0) {
//       return res.status(403).send("Invalid refresh token");
//     }

//     const user = results[0];
//     const newToken = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "24h" });

//     res.json({ token: newToken });
//   } catch (error) {
//     console.error("Error during token refresh:", error);
//     res.status(403).send("Invalid refresh token");
//   }
// };

// exports.protected = (req, res) => {
//   const { username } = req.user;
//   res.send(`Welcome ${username}! This is a protected route.`);
// };