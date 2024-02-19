$("#registerButton").click(function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect form field values
  const role = $("#role").val();
  const name = $("#full-name").val();
  const age = $("#age").val();
  const email = $("#email").val();
  const address = $("#address").val();
  const aadhaar = $("#aadhaar").val();
  const mobile = $("#mobile").val();
  const password = $("#password").val();

  // Create an object with the collected data
  const formData = {
    role,
    name,
    age,
    email,
    address,
    aadhaar,
    mobile,
    password,
  };

  // Send the form data to the server
  fetch("/api/registrationForm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server response
      console.log(data); // You can customize this based on your needs
    })
    .catch((error) => {
      console.error(error);
    });

  alert("Data Inserted Successfully!");
});
