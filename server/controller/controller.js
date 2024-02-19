const User = require("../model/model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const { role, password } = req.body;
  let newUser = {};

  if (role === "patient") {
    newUser = new User({
      role: "patient",
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      address: req.body.address,
      aadhaar: req.body.aadhaar,
      mobile: req.body.mobile,
      password: password,
      status: "inactive",
      appdate: "",
      prescription: "",
      docname: "",
    });
  } else if (role === "doctor") {
    newUser = new User({
      role: "doctor",
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      address: req.body.address,
      license: req.body.license,
      specialization: req.body.specialization,
      password: password,
      status: "inactive",
    });
  } else if (role === "pharmacist") {
    newUser = new User({
      role: "pharmacist",
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      address: req.body.address,
      licenseInfo: req.body.licenseInfo,
      password: password,
      status: "inactive",
    });
  }

  const userInstance = new User(newUser);

  userInstance
    .save()
    .then((data) => {
      res.status(200).json({ message: "Registration successful" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Registration failed", error: err.message });
    });
};

exports.find = (req, res) => {
  const role = req.query.role; // Get the role from the query parameter

  if (role) {
    // Filter the users based on the role
    User.find({ role: role })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    // Retrieve all users
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

exports.uploadReport = (req, res) => {
  const userId = req.params.id;
  const reportFile = req.file;

  // Find the user by ID
  User.findById(userId, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the report file data
    user.reportFile = {
      data: reportFile.buffer,
      contentType: reportFile.mimetype
    };

    // Save the updated user data
    user.save((err, updatedUser) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Failed to update user' });
      }

      res.json(updatedUser);
    });
  });
};