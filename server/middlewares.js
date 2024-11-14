// middlewares.js
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // Import cookie-parser
import bcrypt from "bcryptjs";

const JWT_SECRET = "FreeGA"; // Replace with a secure secret
const inTesting = true;

//const NODE_ENV = process.env.NODE_ENV || 'production';
const second = 1000;
const minute = second * 60;
const hour = minute * 60;

const NODE_ENV = true;
function setCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV,
    maxAge: 1 * hour, // 1 hour
    sameSite: "None", // Allows cross-origin requests
  });
  return;
}
function refreshCookie(req, res, next) {
  const token = req.cookies.token; // Get the token from cookies
  if (token) {
    // If the token exists, refresh it
    setCookie(res, token); // Refresh the cookie
  }
  next(); // Proceed to the next middleware or route handler
}
// Password Hashing Functions
async function hashPW(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function checkPW(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
function signJWT(id) {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
}
function verifyJWT(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

const TOKEN_EXPIRY = "1h"; // Token expiry time

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  let token = req.cookies.token; // Get token from cookies
  console.log("token: ", token);
  if (!token) {
    console.error("Forbidden,", "no token provided");
    return res.sendStatus(403); // Forbidden
  } else console.log("token provided: ", token);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(err, user);
    if (err) {
      console.error("Forbidden,", "token provided is invalid");
      return res.sendStatus(403); // Forbidden
    }
    // Check if the token is about to expire (e.g., within 5 minutes)
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const exp = user.exp; // Expiration time from token

    if (exp - now < 300) {
      // If less than 5 minutes till expiration
      // Refresh the token
      const newToken = signJWT(user.id);
      setCookie(res, newToken);
    }
    req.user = user; // Save user info in request
    next();
  });
};

const allowedOrigins = [
  "http://localhost:5173",
  "null", // for testing from local html files
  "https://telesync.us",
  // Add more origins as necessary
];
// CORS Middleware
const corsMiddleware = (req, res, next) => {
  console.log(req);
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    console.log("origin", origin, "connected");
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    console.error(origin, "is not CORS enabled");
  }
  const method = req.method;
  res.setHeader("Access-Control-Allow-Methods", method);
  const allowedHeaders = "Content-Type, Authorization";
  res.setHeader("Access-Control-Allow-Headers", allowedHeaders); // Set as string
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
};

const jsonMiddleware = express.json();
const CookieParser = cookieParser();
// Logger Middleware
function logger(req, res, next) {
  if (inTesting) {
    return next();
  }
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}

// Request Time Middleware
function requestTime(req, res, next) {
  if (inTesting) {
    return next();
  }
  req.requestTime = Date.now();
  next();
}

// Error Handling Middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  console.error(err.stack); // Log the error stack
  res.status(500).json({ message: "Internal Server Error" }); // Send error response
  next();
}

// Order of middlewares:
const middlewares = [
  errorHandler,
  logger,
  requestTime,
  jsonMiddleware,
  corsMiddleware,
  CookieParser,
  refreshCookie,
];

export {
  middlewares,
  hashPW,
  checkPW,
  signJWT,
  verifyJWT,
  bcrypt,
  authenticateJWT,
  setCookie,
}; // Export utility functions
