const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Database setup
const dbPool = mysql.createPool({
  host: 'localhost',  
  user: 'root',  
  password: '', 
  database: 'fileManager', // Your database name
 
 
  
});



const app = express();
app.use(cors());
app.use(express.json());
// Middleware to make dbPool accessible in the request object
app.use((req, res, next) => {
  req.db = dbPool;
  next();
});
// Routes
const folderRoutes = require('./routes/folderRoutes');
const fileRoutes = require('./routes/fileRoutes');
const itemRoutes = require('./routes/fileRoutes');
app.use('/api/folders', folderRoutes);
app.use('/api/files', fileRoutes);
 

// Port setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

