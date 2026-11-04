import { Router } from "express";

import {
createShortUrl,deleteShortUrl,getUrlStats,redirectToOriginalUrl
} from "../controllers/url.controllers.js";

const router = Router();

// Create a shortened URL.
router.post("/", createShortUrl);

// Redirect a short code to its original URL.
router.get("/:shortCode", redirectToOriginalUrl);

// Read analytics for a shortened URL.
router.get("/:shortCode/stats", getUrlStats);

// Delete a shortened URL.
router.delete("/:shortCode", deleteShortUrl);

export default router;
