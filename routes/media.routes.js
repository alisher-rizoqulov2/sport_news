const { Addmedia, getAllMedia, getMediaById, Updatemedia, deleteMediaById } = require("../controllers/media.controller");


const router = require("express").Router();

router.post("/", Addmedia);
router.get("/", getAllMedia);
router.get("/:id", getMediaById);
router.put("/:id", Updatemedia);
router.delete("/:id", deleteMediaById);

module.exports = router;
