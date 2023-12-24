import React, { useState, useEffect } from "react";
import { storage } from "./../firebaseConfig/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./styleUploadImages.scss";

function UploadImages(props) {
  const { handleImages } = props;
  const imageFormat =
    "https://firebasestorage.googleapis.com/v0/b/project-thht.appspot.com/o/courses%2Fcourse.webp?alt=media&token=c3fe26a8-882c-42b2-be5d-f1693dac5b08";
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(imageFormat);
  useEffect(() => {
    handleImages(url);
  });
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    const imageRef = ref(storage, `courses/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="images">
      <img src={url} alt=""></img>
      <input type="file" id="input" onChange={handleImageChange} />
      <label for="input" id="lable">
        Choose file
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UploadImages;
