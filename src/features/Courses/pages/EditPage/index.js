import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextFieldValidate from "components/TextFieldValidate";
import { child, get, getDatabase, push, ref, update } from "firebase/database";
import { db } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UploadImages from "uploadFiles/UploadImages";
import { useAlert } from "react-alert";
import ListClssesCourse from "features/Courses/components/ListClassesCourse";

function EditPage(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [nameObject, setNameObject] = useState([]);
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [images, setImages] = useState(null);
  const alert = useAlert();
  const listObject = [
    "From 3 - 6 age",
    "From 7 - 14 age",
    "From 15 - 18 age",
    "Over 18 age",
  ];
  const { courseId } = useParams();
  const isAdd = !courseId;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdd) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `courses/${courseId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const courseCurrent = snapshot.val();
            setName(courseCurrent.name || "");
            setDescription(courseCurrent.description || "");
            setPrice(courseCurrent.price || "");
            setAddress(courseCurrent.address || "");
            setNameObject(courseCurrent.object || "");
            setTime(courseCurrent.time || 0);
            setImages(courseCurrent.images || null);
          } else {
            alert.error("Can find data !!! Try again");
          }
        })
        .catch((error) => {
          alert.error("Can find data !!! Try again");
        });
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setAddress("");
      setNameObject([]);
      setTime("");
      setImages(null);
    }
  }, [courseId, isAdd, alert]);

  const handleSubmit = () => {
    if (isAdd) {
      const coursesRef = ref(db, "courses");
      push(coursesRef, {
        name,
        description,
        time: +time,
        object: nameObject,
        address,
        price: +price,
        images,
        isActive: true,
      })
        .then(() => {
          alert.success("Add course successful!");
        })
        .catch((error) => {
          alert.error("Add course fail!");
        });
    } else {
      const updates = {};
      updates[`courses/${courseId}/name`] = name;
      updates[`courses/${courseId}/description`] = description;
      updates[`courses/${courseId}/price`] = price;
      updates[`courses/${courseId}/address`] = address;
      updates[`courses/${courseId}/time`] = time;
      updates[`courses/${courseId}/object`] = nameObject;
      updates[`courses/${courseId}/images`] = images;
      update(ref(db), updates)
        .then(() => {
          alert.success("Edit course successful!");
          navigate(-1);
        })
        .catch((error) => alert.error("Edit course fail!"));
    }
    setName("");
    setDescription("");
    setPrice("");
    setAddress("");
    setNameObject([]);
    setTime("");
    setImages(null);
  };

  const handleLock = () => {
    if (
      name.length !== 0 &&
      description.length !== 0 &&
      price.length !== 0 &&
      nameObject.length !== 0 &&
      address.length !== 0 &&
      time.length !== 0 &&
      images.length !== 0
    )
      return false;
    return true;
  };

  const handleImages = (urlImages) => {
    setImages(urlImages);
  };
  const handleChangeObject = (event) => {
    const {
      target: { value },
    } = event;

    setNameObject(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Box>
      <Box
        sx={{
          width: 500,
          borderRadius: "10px",
          border: "1px solid #ccc",
          padding: "30px",
        }}
      >
        <TextFieldValidate value={name} setValue={setName} name="Name" />
        <TextFieldValidate
          value={time}
          setValue={setTime}
          name="Time learning"
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel name="Object" id="demo-simple-select-label">
              <label>Object</label>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={nameObject}
              onChange={handleChangeObject}
            >
              {listObject.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextFieldValidate
          value={address}
          setValue={setAddress}
          name="Address"
        />
        <TextFieldValidate value={price} setValue={setPrice} name="Price" />
        <TextFieldValidate
          value={description}
          setValue={setDescription}
          name="Description"
        />

        <UploadImages value={images} handleImages={handleImages} />
        <Divider />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={handleLock()}
        >
          {isAdd ? "Add" : "Save"}
        </Button>
      </Box>
      {!isAdd && <ListClssesCourse />}
    </Box>
  );
}

export default EditPage;
