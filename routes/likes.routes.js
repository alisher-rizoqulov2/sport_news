const { Addlikes, getAllLikes, getLikesById, UpdateLikes, deleteLikesById } = require("../controllers/likes.controller");


const router = require("express").Router();

router.post("/", Addlikes);
router.get("/", getAllLikes);
router.get("/:id", getLikesById);
router.put("/:id", UpdateLikes);
router.delete("/:id", deleteLikesById);

module.exports = router;
