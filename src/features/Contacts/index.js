import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button } from "@mui/material";
import HomePage from "../Contacts/pages/HomePage";
import Response from "../Contacts/pages/Response";
const Contacts = () => {
  return (
    <div>
      <div style={{ marginBottom: "15px", fontSize: "50px" }}>CONTACTS</div>
      <Link
        style={{
          color: "inherit",
          textDecoration: "inherit",
          fontSize: "20px",
        }}
        to=""
      >
        <Button style={{ fontSize: "25px", textTransform: "capitalize" }}>
          Home
        </Button>
      </Link>
      <Routes>
        <Route path=":contactId" element={<Response />} />
        <Route path="" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default Contacts;
