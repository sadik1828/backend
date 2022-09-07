const express = require("express");
const userController = require("../Controllers/userControllers")
const incidentController = require("../Controllers/incidentControllers");

const router = express.Router();

router.route("/").get(incidentController.getAll).post(userController.protect,incidentController.create);
router.route("/:id").get(incidentController.get).post(userController.protect,incidentController.create);

router
  .route("/:id")
  .put(incidentController.editIncident)
  .delete(incidentController.deleteIncident);


module.exports = router;