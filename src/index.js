const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const contactRoutes = require('./routes/contactRoutes');
app.use(cors());

// API routes
app.use('/', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
