const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const authController = require("./server/controller/auth");
const ejs = require("ejs");
const multer = require("multer");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI.replace("test", "phms");

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"));

// load public
app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/images", express.static(path.resolve(__dirname, "public/images")));
app.use("/js", express.static(path.resolve(__dirname, "public/js")));

// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define the filename for uploaded files
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// Route for handling the file upload
app.post(
  "/api/registerationForm/:id/upload",
  upload.single("reportFile"),
  (req, res) => {
    const userId = req.params.id;
    const reportFile = req.file;

    // Process the uploaded file as needed
    // Save the file path or other relevant information to the user or database

    res.json({ message: "File uploaded successfully" });
  }
);

app.get("/api/registerationForm/:id/upload", (req, res) => {
  const userId = req.params.id;

  // Retrieve the file path or other relevant information from the user or database
  // Based on the information, send the file or relevant data in the response
  // For example:
  const filePath = "uploads";
  res.sendFile(filePath);
});

app.put(
  "/api/registerationForm/:id/upload",
  upload.single("reportFile"),
  (req, res) => {
    const userId = req.params.id;
    const reportFile = req.file;

    // Process the updated file as needed
    // Update the file path or other relevant information in the user or database

    res.json({ message: "File updated successfully" });
  }
);

// Add this route before the existing routes
app.post("/login", authController.login);

// Load routes
const router = require("./server/routes/router");
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/api/registrationForm", (req, res) => {
  const selectedPatient = req.query.patient;

  // Query the database or perform any necessary operations to fetch the prescription data
  // Example code: Assuming prescription data is stored in a "prescriptions" collection
  Prescription.findOne({ name: selectedPatient })
    .then((prescription) => {
      res.json({ prescription: prescription.prescription });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching prescription data" });
    });
});
