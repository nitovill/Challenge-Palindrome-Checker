"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let history = [];
const isPalindrome = (str) => {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cleanStr === cleanStr.split("").reverse().join("");
};
router.use("/palindrome", (req, res) => {
    const { input } = req.body;
    if (!input || typeof input !== "string") {
        return res.status(400).json({ error: "Invalid input" });
    }
    const result = isPalindrome(input);
    history.push({ input, isPalindrome: result });
    res.json({ input, isPalindrome: result });
});
router.use("/history", (req, res) => {
    res.json(history);
});
router.use((req, res) => {
    res.status(404).json({
        error: true,
        message: "Endpoint not found",
    });
});
exports.default = router;
