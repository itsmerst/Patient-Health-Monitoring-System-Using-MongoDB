const express = require("express");
const route = express.Router();
const multer = require("multer");

const services = require("../services/render");
const controller = require("../controller/controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/", services.homeRoutes);
/**
 *  @description Admin Route
 *  @method GET /
 */
route.get("/admin", services.admin);
/**
 *  @description Doctor Route
 *  @method GET /
 */
route.get("/doctor", services.doctor);
/**
 *  @description Patient Route
 *  @method GET /
 */
route.get("/patient", services.patient);
/**
 *  @description Services Route
 *  @method GET /
 */
route.get("/pharmacist", services.pharmacist);

//API
route.post("/api/registrationForm", controller.create);
route.get("/api/registrationForm", controller.find);
route.put("/api/registerationForm/:id", controller.update);
route.delete("/api/registerationForm/:id", controller.delete);
route.post("/api/registerationForm/:id/upload", upload.single('reportFile'), controller.uploadReport);

module.exports = route;
