import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ClassesProvider from "context/ClassesProvider";
import ContactsProvider from "context/ContactsProvider";
import CoursesProvider from "context/CoursesProvider";
import TeachersProvider from "context/TeachersProvider";
import StudentsProvider from "context/StudentsProvider";
import PaymentsProvider from "context/PaymentsProvider";
import AlerTemplate from "./Alert";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,  
  offset: '70px 50px -20px',
  transition: transitions.FADE,
}


ReactDOM.render(
  <AlertProvider template={AlerTemplate} {...options}>
    <React.StrictMode>
      <BrowserRouter>
        <CoursesProvider>
          <TeachersProvider>
            <ClassesProvider>
              <StudentsProvider>
                <ContactsProvider>
                  <PaymentsProvider>
                    <App />
                  </PaymentsProvider>
                </ContactsProvider>
              </StudentsProvider>
            </ClassesProvider>
          </TeachersProvider>
        </CoursesProvider>
      </BrowserRouter>
    </React.StrictMode>
  </AlertProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
