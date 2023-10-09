const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const contactRoutes = require('./routes/contactRoutes');

// API routes
app.use('/api/contacts', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
