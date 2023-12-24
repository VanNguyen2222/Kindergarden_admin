import { Box } from "@mui/material";
import { TeachersContext } from "context/TeachersProvider";
import emailjs from "emailjs-com";
import ListOwnClass from "features/Teachers/components/ListOnwClass";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { ref, set, update } from "firebase/database";
import { auth, db } from "firebaseConfig";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import ava from "../../../../assests/image/ava.jpg";
import "./EditTeacher.css";
function PassRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function EditTeacherPage(props) {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photoURL, setPhotoURL] = useState(ava);
  const teachers = useContext(TeachersContext);
  const { teacherId } = useParams();
  const isAdd = !teacherId;
  const navigate = useNavigate();
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [isCheckPhone, setIsCheckPhone] = useState(false);
  const [isCheckBtn, setIsCheckBtn] = useState(true);
  const password = Number(PassRandom(100000, 999999));
  const alert = useAlert();
  useEffect(() => {
    if (!isAdd) {
      if (teachers) {
        const teacherCur = teachers.find((item) => item.id === teacherId);
        setName(teacherCur?.name);
        setEmail(teacherCur?.email);
        setPhone(teacherCur?.phoneNumber);
        setAddress(teacherCur?.address);
        setPhotoURL(teacherCur?.image);
      }
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPhotoURL(ava);
    }
  }, [teacherId, isAdd, teachers]);

  const handleEmailBlur = (e) => {
    setTimeout(() => {
      const teacherEmail = teachers.map((teacher) => teacher.email);
      if (teacherEmail.includes(email)) {
        setIsCheckEmail(true);
        setIsCheckBtn(true);
      } else {
        setIsCheckEmail(false);
      }
    }, 150);
  };
  const handlePhoneBlur = (e) => {
    setTimeout(() => {
      const numberPhone = e.target.value;
      if (
        numberPhone > 0 &&
        numberPhone.length <= 11 &&
        numberPhone.length >= 10
      ) {
        setIsCheckPhone(false);
      } else {
        setIsCheckPhone(true);
        setIsCheckBtn(true);
      }
    }, 150);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCheckEmail) {
      if (isAdd) {
        emailjs
          .sendForm(
            "service_75k8ias",
            "template_ooy29sb",
            form.current,
            "JRsK_wDGEwwh3kU6n"
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            set(ref(db, "teachers/" + user.uid), {
              name,
              email,
              photoURL,
              providerId: user.providerId,
              phoneNumber: phone,
              isActive: true,
              role: "teacher",
              pass: password,
              address
            });
            alert.success("Add teacher successful!")
            updateProfile(user, {
              displayName: name,
            })
              .then(() => {
                // Profile updated!
                // ...
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } else {
        const updates = {};
        updates[`teachers/${teacherId}/name`] = name;
        updates[`teachers/${teacherId}/email`] = email;
        updates[`teachers/${teacherId}/phoneNumber`] = phone;
        updates[`teachers/${teacherId}/address`] = address;
        updates[`teachers/${teacherId}/photoURL`] = photoURL;
        update(ref(db), updates);
        alert.success("Update teacher successful!")
        navigate(-1);
      }
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPhotoURL(ava);
    }
  };
  useEffect(() => {
    name?.length !== 0 &&
      isCheckEmail === false &&
      isCheckPhone === false &&
      email?.length !== 0 &&
      phone?.length !== 0 &&
      address?.length !== 0
      ? setIsCheckBtn(false)
      : setIsCheckBtn(true);
  }, [name, email, phone, address, isCheckEmail, isCheckPhone]);
  return (
    <>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="div">
          <div>
            <div className="form">
              <input
                placeholder="Nhập Họ Tên"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form">
              <input
                placeholder="Nhập địa chỉ email"
                type="email"
                name="email"
                value={email}
                onBlur={handleEmailBlur}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isCheckEmail && (
                <span className="alert">Email already in use*</span>
              )}
            </div>
            <div className="form">
              <input
                placeholder="Nhập số điện thoại"
                type="text"
                name="phone"
                value={phone}
                onBlur={handlePhoneBlur}
                onChange={(e) => setPhone(e.target.value)}
              />
              {isCheckPhone && (
                <span className="alert">
                  Must be numbers and between 10 and 12 numbers*
                </span>
              )}
            </div>
            <input
              type="number"
              name="pass"
              style={{ display: "none" }}
              value={password}
            />
            <div className="form">
              <textarea
                placeholder="Nhập địa chỉ"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="image">
            {/* {!isAdd && <img src={image} alt="" />} */}
            {/* <input type="file" name="image" onChange={handleImage}></input> */}
          </div>
        </div>
        <input
          className={isCheckBtn ? "btn-submit " : "btn-submit full"}
          type="submit"
          value={isAdd ? "Add" : "Save"}
          disabled={isCheckBtn}
        />
      </form>
      <Box>
        <ListOwnClass />
      </Box>
    </>
  );
}

export default EditTeacherPage;
