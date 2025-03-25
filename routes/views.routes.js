const { Addviews, getAllviews, getViewsById, Updateviews, deleteviewsById } = require("../controllers/views.controller");


const router = require("express").Router();

router.post("/", Addviews);
router.get("/", getAllviews);
router.get("/:id", getViewsById);
router.put("/:id", Updateviews);
router.delete("/:id", deleteviewsById);

module.exports = router;
