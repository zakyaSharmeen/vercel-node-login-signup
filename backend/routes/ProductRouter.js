const express = require("express");

const router = express.Router();
const ensureAuthenticated = require("../middleware/Auth")



router.get("/",ensureAuthenticated, (req, res) =>{
    res.status(200).json([
        {
            name: "modbile",
            price:1000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
});

module.exports = router;
