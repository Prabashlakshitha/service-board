const express = require("express");
const { body, param } = require("express-validator");
const JobRequest = require("../models/JobRequest");
const { handleValidationErrors } = require("../middleware/errorHandler");

const router = express.Router();

const createJobValidation = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().trim(),
  body("description")
    .notEmpty().withMessage("Description is required")
    .isString().trim(),
  body("category")
    .optional()
    .isIn(["Plumbing", "Electrical", "Painting", "Joinery", "Other"])
    .withMessage("Invalid category"),
  body("contactEmail")
    .optional()
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),
  handleValidationErrors,
];

const updateStatusValidation = [
  param("id").isMongoId().withMessage("Invalid job ID"),
  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(["Open", "In Progress", "Closed"])
    .withMessage('Status must be "Open", "In Progress", or "Closed"'),
  handleValidationErrors,
];

// GET /api/jobs
router.get("/", async (req, res, next) => {
    try {
        const { category, status, search } = req.query;
        const filter = {};

        if (category && category !== "All") filter.category = category;
        if (status && status !== "All") filter.status = status;

        if (search && search.trim()) {
            const searchRegex = { $regex: search.trim(), $options: "i" };
            filter.$or = [
                { title: searchRegex },
                { description: searchRegex },
                { location: searchRegex },
                { category: searchRegex },
            ];
        }

        const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    next(err);
  }
});

// GET /api/jobs/:id
router.get("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      const err = new Error(`No job found with id: ${req.params.id}`);
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
});

// POST /api/jobs
router.post("/", createJobValidation, async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;
    const job = await JobRequest.create({
      title, description, category, location, contactName, contactEmail,
    });
    res.status(201).json({ success: true, message: "Job created successfully", data: job });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/jobs/:id
router.patch("/:id", updateStatusValidation, async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      const err = new Error(`No job found with id: ${req.params.id}`);
      err.statusCode = 404;
      return next(err);
    }
    job.status = req.body.status;
    await job.save();
    res.status(200).json({ success: true, message: "Status updated", data: job });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      const err = new Error(`No job found with id: ${req.params.id}`);
      err.statusCode = 404;
      return next(err);
    }
    await job.deleteOne();
    res.status(200).json({ success: true, message: "Job deleted successfully", data: {} });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
