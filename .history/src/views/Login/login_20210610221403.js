import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "views/Login/login.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Header from "../../components/Navbars/Navbar";

import video from "./growvid.mp4";

export default function Login({ fn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Handling Submit")
    fn(email, password);
  }

  return (
    <div className="Login">
      <Header>
      </Header>
      <div className="log-in-container">
        <Form onSubmit={handleSubmit}>

          <Form.Group size="lg" class-name="form-group" className="form-group" controlId="email">
            <Form.Label className="attribute">Email</Form.Label>
            <Form.Control
              className="textbox"
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group" size="lg" controlId="password">
            <Form.Label className="attribute">Password</Form.Label>
            <Form.Control
              className="textbox"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button block size="lg" className="submit" type="submit" disabled={!validateForm()}>
            Login
          </Button>

        </Form>
      </div>
      <div className="video-container">
        <video src={video} width="70%" autoplay="true" muted="true" />
      </div>
    </div>

  );
}
