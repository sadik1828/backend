
const userController = require("../Controllers/userControllers")
const express = require("express");
const offenseController = require("../Controllers/offenseControllers");

const router = express.Router();

router.route("/").get(offenseController.getAll).post(userController.protect,offenseController.create);
router.route("/:id").get(offenseController.get).post(userController.protect,offenseController.create);

router
  .route("/:id")
  .put(offenseController.editOffense)
  .delete(offenseController.deleteOffense);


module.exports = router;