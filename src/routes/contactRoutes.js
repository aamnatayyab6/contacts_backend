const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
router.post("/", async (req, res) => {
  const { name, number, email, image } = req.body;

  try {
    const contact = await prisma.contact.create({
      data: {
        name,
        number,
        email,
        image,
      },
    });

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT/update a contact by ID -- Edit flow
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, number, email, image } = req.body;

  try {
    // Find the contact by ID
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    // If the contact doesn't exist, return a 404 response
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Update the contact in the database
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        name,
        number,
        email,
        image,
      },
    });

    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a contact by ID -- Remove flow
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

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
