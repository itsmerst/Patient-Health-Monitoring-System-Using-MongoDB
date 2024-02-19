const User = require("../model/model");

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if the user is an admin
  if (username === "admin" && password === "a") {
    // Admin login successful
    req.session.user = {
      username: "admin",
      role: "admin",
    };
    res.redirect("/admin");
    return;
  }

  User.findOne({ email: username, password: password })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        if (user.status === "inactive") {
          res.status(403).json({
            message: "User is inactive Contact System Administratorx",
          });
        } else {
          const role = user.role;

          // Store user information in session
          req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
          };

          // Store patient's name and ID in session if the role is patient
          if (role === "patient") {
            req.session.patientId = user.id; // Store the user ID in the session
            req.session.patientName = user.name;
            req.session.patientEmail = user.email;
            req.session.patientMobile = user.mobile;
            req.session.patientAddress = user.address;
            req.session.patientAge = user.age;
            req.session.patientPassword = user.password;
          } else if (role === "doctor") {
            req.session.doctorId = user.id;
            req.session.doctorName = user.name;
          } else if (role === "pharmacist") {
            req.session.pharmacistId = user.id;
            req.session.pharmacistName = user.name;
          }

          // Redirect the user based on their role
          if (role === "admin") {
            res.redirect("/admin");
          } else if (role === "doctor") {
            res.redirect("/doctor");
          } else if (role === "patient") {
            res.redirect("/patient");
          } else if (role === "pharmacist") {
            res.redirect("/pharmacist");
          }
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
