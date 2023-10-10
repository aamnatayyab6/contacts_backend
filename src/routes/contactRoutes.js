const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// cloudinary for images:
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dg8969jxs",
  api_key: "529112513943426",
  api_secret: "NYqes7xcsDfvniKp7QL1H79I3lM",
});

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET details of a single contact by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the contact by ID
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    // If the contact doesn't exist, return a 404 response
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new contact -- Add flow
router.post("/addContact", async (req, res) => {
  const { name, number, email } = req.body;
  const imageFile = req.file;

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.path);
    const imageUrl = cloudinaryResponse.secure_url;

    const contact = await prisma.contact.create({
      data: {
        name,
        number,
        email,
        image: imageUrl,
      },
    });

    res.json(contact);
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" + error.message });
  }
});

// PUT/update a contact by ID -- Edit flow
router.put("/updateContact", async (req, res) => {
  const { id, name, number, email } = req.body;
  const imageFile = req.file;

  try {
    // Find the contact by ID
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    // If the contact doesn't exist, return a 404 response
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    let imageUrl = existingContact.image;

    if (imageFile) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageFile.path
      );
      imageUrl = cloudinaryResponse.secure_url;
    }

    // Update the contact in the database with the new image URL
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        name,
        number,
        email,
        image: imageUrl,
      },
    });

    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a contact by ID -- Remove flow
router.delete("/deleteContact", async (req, res) => {
  const { id } = req.body;

  try {
    // Find the contact by ID
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    // If the contact doesn't exist, return a 404 response
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Delete the contact from the database
    await prisma.contact.delete({
      where: { id },
    });

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
