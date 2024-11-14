import express from 'express';
import { middlewares } from './middlewares.js'; // Adjust the path if necessary
import publicRoutes from './publicRoutes.js'; // Adjust the path as necessary
import privateRoutes from './privateRoutes.js'; // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000; 

// Debug GET endpoint
app.get('/debug', (req, res) => {
  const debug = `Debug endpoint before any middelwares`;
    console.log(debug);
    res.status(200).json({ message: debug });
});
// Use all middlewares except errorHandler,Assuming it's the first 
middlewares.slice(1).forEach(middleware => app.use(middleware));

app.use('/', publicRoutes);
app.use('/', privateRoutes);

// Add error handling middleware at the end
app.use(middlewares[0]); // Assuming the first middleware is the error handler

app.get('/dashboard', (req, res) => {
  // Accessing the user information
  if (req.user) {
    res.json({ message: 'Welcome to your dashboard', user: req.user, email: req.user.email.email });
  } else {
    res.sendStatus(403); // Forbidden
  }
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error2' });
})

// Debug POST endpoint
app.all('/debug', (req, res) => {
  const debugMsg = `Debug endpoint after all middelwares,`;
  const debugVal = JSON.stringify(req.body);
  console.log(debugMsg, debugVal);
  res.status(200).json({ message: `${debugMsg} ${debugVal}` }); //needs touch up
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
