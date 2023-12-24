import { Box, Button, TextField } from "@mui/material";
import TextFieldValidate from "components/TextFieldValidate";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { db } from "firebaseConfig";
import "./Response.css";
import emailjs from "emailjs-com";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
const Response = () => {
  const form = useRef();
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const { contactId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `contacts/${contactId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const contactCurrent = snapshot.val();
          setName(contactCurrent.name || "");
          setEmail(contactCurrent.email || "");
          setObject(contactCurrent.object || "");
          setTime(contactCurrent.time || "");
          setMessage(contactCurrent.message || "");
          setResponse(contactCurrent.response || "");
        } else {
          alert.error("Can find data !!! Try again");
        }
      })
      .catch((error) => {
        alert.error("Can find data !!! Try again");
      });
  }, [contactId, alert]);
  const handleSubmit = () => {
    emailjs
      .sendForm(
        "service_75k8ias",
        "template_6kntzol",
        form.current,
        "JRsK_wDGEwwh3kU6n"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    const updates = {};
    updates[`contacts/${contactId}/response`] = response;
    updates[`contacts/${contactId}/isResponse`] = true;
    navigate("homecontact");
    update(ref(db), updates)
      .then(() => {
        alert.success("Response successful!");
        navigate("contacts");
      })
      .catch((error) => alert.error("Response fail!"));
  };

  const handleLock = () => {
    if (response.length !== 0) return false;
    return true;
  };

  return (
    // <form ref={form} onSubmit={handleSubmit}>
    //     <div className="div" >
    //     <div className="form">
    //         <input
    //           placeholder="Name"
    //           type="text"
    //           name="name"
    //           value={name}
    //         />
    //       </div>
    //       <div className="form">
    //         <input
    //           placeholder="Email"
    //           type="email"
    //           name="email"
    //           value={email}
    //         />
    //     </div>
    //     <div className="form">
    //         <input
    //           placeholder="Time"
    //           type="email"
    //           name="time"
    //           value={time}
    //         />
    //     </div>
    //     </div>
    // </form>
    <form ref={form} onSubmit={handleSubmit}>
      <Box style={{ display: "flex", justifyContent: "space-around" }}>
        <Box
          sx={{
            width: 500,
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "30px",
          }}
        >
          <TextFieldValidate value={name} name="Name" disabled />
          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-multiline-static"
            label="Email"
            name="email"
            value={email}
          />
          <TextFieldValidate value={time} name="Time" disabled />
          <TextFieldValidate value={object} name="Object" disabled />
        </Box>
        <Box
          sx={{
            width: 500,
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "30px",
          }}
        >
          <TextField
            style={{
              display: "block",
              width: "100%",
              marginBottom: 20,
              marginTop: 20,
            }}
            id="outlined-multiline-static"
            label="Message"
            multiline
            name="message"
            rows={4}
            value={message}
          />
          <TextField
            style={{ display: "block", width: "100%", marginBottom: 20 }}
            id="outlined-multiline-static"
            label="Response"
            multiline
            name="response"
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <Button
            style={{ marginLeft: "190px" }}
            variant="contained"
            onClick={handleSubmit}
            disabled={handleLock()}
          >
            Send
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Response;
