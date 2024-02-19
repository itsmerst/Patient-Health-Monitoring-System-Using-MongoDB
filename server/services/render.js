const axios = require("axios");

exports.homeRoutes = (req, res) => {
  res.render("home");
};

exports.admin = (req, res) => {
  // Make a get request to /api/registerationForm
  axios
    .get("http://localhost:3000/api/registrationForm")
    .then(function (response) {
      res.render("admin", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.doctor = (req, res) => {
  // Make a GET request to /api/registrationForm with role "patient"
  axios
    .get("http://localhost:3000/api/registrationForm", {
      params: { role: "patient" },
    })
    .then(function (response) {
      const patients = response.data
        .filter((user) => user.role === "patient")
        .map((user) => user.name);
      const appointments = response.data.filter(
        (appointment) =>
          appointment.appdate !== null &&
          appointment.docname === req.session.doctorName
      );

      res.render("doctor", {
        patients: patients,
        doctorName: req.session.doctorName,
        users: response.data,
        appointments: appointments,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.patient = (req, res) => {
  const patientName = req.session.patientName;
  const user = {
    name: req.session.patientName,
    email: req.session.patientEmail,
    mobile: req.session.patientMobile,
    address: req.session.patientAddress,
    age: req.session.patientAge,
    password: req.session.patientPassword,
    id: req.session.patientId,
  };

  // Make a GET request to /api/registrationForm with role "doctor"
  axios
    .get("http://localhost:3000/api/registrationForm", {
      params: { role: "doctor" },
    })
    .then(function (response) {
      const doctors = response.data;

      // Make a GET request to fetch the prescriptions for the logged-in patient by name
      axios
        .get("http://localhost:3000/api/registrationForm", {
          params: { name: patientName },
        })
        .then(function (response) {
          const prescriptions = response.data;
          res.render("patient", { doctors, patientName, user, prescriptions });
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.pharmacist = (req, res) => {
  // Make a GET request to fetch the users with role "patient"
  axios
    .get("http://localhost:3000/api/registrationForm", {
      params: { role: "patient" },
    })
    .then(function (response) {
      const users = response.data;
      res.render("pharmacist", {
        pharmacistName: req.session.pharmacistName,
        users,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
