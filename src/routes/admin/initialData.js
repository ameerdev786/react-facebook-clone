const express = require("express");
const router = express.Router();
const {initialData} = require("../../controller/admin/initialData");


router.post("/initialData",initialData);
module.exports = router;