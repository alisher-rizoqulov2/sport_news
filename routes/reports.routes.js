const { Addreports, getAllreports, getreportsById, Updatereports, deletereportsById } = require("../controllers/reports.controller");


const router = require("express").Router();

router.post("/", Addreports);
router.get("/", getAllreports);
router.get("/:id", getreportsById);
router.put("/:id", Updatereports);
router.delete("/:id", deletereportsById);

module.exports = router;
