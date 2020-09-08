import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: dob,
    };

    axios
      .post("https://flix-fix.herokuapp.com/users", createdUser)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("User created successfully");
        window.open("/client", "_self");
      })
      .catch((e) => {
        console.log(e.response);
        alert("Error processing request");
      });
  };

  return (
    <Container>
      <br />
      <br />
      <Form style={{ width: "32rem", margin: "auto", textAlign: "center" }}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dob}
            placeholder="12/31/1986"
            onChange={(e) => setDob(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Link to={`/client`}>
          <Button variant="dark link" type="submit">
            Cancel
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   onClick: PropTypes.func.isRequired,
// };
