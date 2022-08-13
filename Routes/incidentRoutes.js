const express = require("express");
const incidentController = require("../Controllers/incidentControllers");

const router = express.Router();

router.route("/").get(incidentController.getAll).post(incidentController.create);

router
  .route("/:id")
  .put(incidentController.editIncident)
  .delete(incidentController.deleteIncident);


module.exports = router;