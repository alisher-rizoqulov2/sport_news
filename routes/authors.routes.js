const { Addauthors, getAllauthors, getauthorsById, Updateauthors, deleteAuthorsById } = require("../controllers/author.controller");


const router = require("express").Router();

router.post("/", Addauthors);
router.get("/", getAllauthors);
router.get("/:id", getauthorsById);
router.put("/:id", Updateauthors);
router.delete("/:id", deleteAuthorsById);

module.exports = router;
