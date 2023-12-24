import Courses from "features/Courses";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Classes from "features/Classes";
import HomeIcon from "@mui/icons-material/Home";
import Students from "features/Students";
import Teachers from "features/Teachers";
import Contacts from "features/Contacts";
import { Typography } from "@mui/material";
function App() {
  return (
    <div>
      <Dashboard>
        <Routes>
          <Route
            path="/"
            element={
              <Typography
                style={{ display: "flex", alignItems: "flex-end" }}
                variant="h3"
                gutterBottom
                component="div"
              >
                <HomeIcon color="primary" style={{ fontSize: 60 }} />
                Home
              </Typography>
            }
          />
          <Route path="courses/*" element={<Courses />} />
          <Route path="classes/*" element={<Classes />} />
          <Route path="students/*" element={<Students />} />
          <Route path="teachers/*" element={<Teachers />} />
          <Route path="contacts/*" element={<Contacts />} />
        </Routes>
      </Dashboard>
    </div>
  );
}

export default App;
