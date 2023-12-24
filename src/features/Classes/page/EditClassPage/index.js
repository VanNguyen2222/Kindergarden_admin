import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { LicenseInfo } from "@mui/x-license-pro";
import BasicSelect from "components/BasicSelect";
import TextFieldValidate from "components/TextFieldValidate";
import { ClassesContex } from "context/ClassesProvider";
import { CoursesContext } from "context/CoursesProvider";
import { TeachersContext } from "context/TeachersProvider";
import ListStudentsClass from "features/Classes/components/ListStudentsClass";
import { push, ref, update } from "firebase/database";
import { db } from "firebaseConfig";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import "./EditClassPage.css";
LicenseInfo.setLicenseKey(
  "61628ce74db2c1b62783a6d438593bc5Tz1NVUktRG9jLEU9MTY4MzQ0NzgyMTI4NCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
const day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function EditClassesPage(props) {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [detailTime, setDetailTime] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [courseId, setCourseId] = useState("");
  const { classId } = useParams();
  const teachers = useContext(TeachersContext);
  const classes = useContext(ClassesContex);
  const courses = useContext(CoursesContext);
  const navigate = useNavigate();
  const alert = useAlert();
  let dateCur = new Date();

  const getMonth = dateCur.getMonth() + 1;
  const fuDate =
    dateCur.getDate() +
    "-" +
    (getMonth >= 10 ? getMonth : "0" + getMonth) +
    "-" +
    dateCur.getFullYear() +
    2;
  const newDate =
    dateCur.getDate() +
    "-" +
    (getMonth >= 10 ? getMonth : "0" + getMonth) +
    "-" +
    dateCur.getFullYear();

  const classCur = useMemo(
    () => classes.find((item) => item.id === classId),
    [classes, classId]
  );

  const otherClasses = useMemo(
    () => classes.filter(c =>
      c.courseId === classCur?.courseId &&
      c.id !== classCur?.id &&
      c.isActive),
    [classes, classCur]
  )

  const isAdd = useMemo(() => !classId, [classId]);
  const teachersActive = useMemo(
    () => teachers.filter((teacher) => teacher.isActive),
    [teachers]
  );
  useEffect(() => {
    if (!isAdd) {
      if (classCur) {
        setName(classCur.name);
        setStart(classCur.start);
        setEnd(classCur.end);
        setTeacherId(classCur.teacherId);
        setCourseId(classCur.courseId);
        setDetailTime(classCur.detailTime);
      }
    } else {
      setName("");
      setStart("");
      setEnd("");
      setTeacherId("");
      setCourseId("");
    }
  }, [classId, isAdd, teachers, classes, courses, classCur]);

  const handleSubmit = () => {
    if (isAdd) {
      const classesRef = ref(db, "classes");
      const newClassKey = push(classesRef, {
        name,
        start,
        end,
        detailTime,
        teacherId,
        courseId,
        isActive: true,
      }).key;
      const coursesClassRef = ref(db, `courses/${courseId}/classes`);
      push(coursesClassRef, newClassKey);
      alert.success(`Add class ${name} successful!`);
    } else {
      const updates = {};
      updates[`classes/${classId}/name`] = name;
      updates[`classes/${classId}/start`] = start;
      updates[`classes/${classId}/end`] = end;
      updates[`classes/${classId}/detailTime`] =
        detailTime;
      updates[`classes/${classId}/teacherId`] = teacherId;
      updates[`classes/${classId}/courseId`] = courseId;
      update(ref(db), updates);
      alert.success(`Update class ${name} successful!`);
      navigate(-1);
    }
    setName("");
    setStart("");
    setEnd("");
    setTeacherId("");
    setCourseId("");
    setDetailTime([]);
  };

  const handleLock = () => {
    if (
      name.length !== 0 &&
      start.length !== 0 &&
      end.length !== 0 &&
      detailTime.length !== 0 &&
      teacherId.length !== 0 &&
      courseId.length !== 0
    )
      return false;
    return true;
  };
  const handleChangeDay = (event, d) => {
    if (event.target.value) {
      setDetailTime(
        detailTime.map((item, index) => {
          if (item.dayOfWeed === event.target.value) {
            event.target.value = "";
          } else if (index === d) {
            item.dayOfWeed = event.target.value;
          }
          return item;
        })
      );
    }
  };
  const handleAddShowDayOfWeek = () => {
    setDetailTime([
      ...detailTime,
      {
        dayOfWeed: "",
        startTime: "",
      },
    ]);
  };
  const handleTime = (e, d) => {
    setDetailTime(
      detailTime.map((item, index) => {
        if (index === d) {
          item.startTime = e.target.value;
        }
        return item;
      })
    );
  };
  const handleDeleteTime = (e, d) => {
    e.preventDefault();
    const newTime = detailTime.filter((time, index) => index !== d);
    setDetailTime([...newTime]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Box
          sx={{
            width: 600,
            borderRadius: "10px",
            border: "1px solid blue",
            padding: "30px",
            marginLeft: "10px",
            marginBottom: "20px"
          }}
        >
          <TextFieldValidate
            value={name}
            setValue={setName}
            name="Name"
            className="classEdit"
          />
          <div className="date-time">
            <label>Start:</label>
            <input
              type="date"
              value={start}
              min={newDate}
              max={fuDate}
              onChange={(e) => setStart(e.target.value)}
            />
            <label>End:</label>

            <input
              min={newDate}
              max={fuDate}
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
            <Button onClick={handleAddShowDayOfWeek} variant="contained">
              <AddCircleOutlineIcon />
              day
            </Button>
          </div>

          {detailTime &&
            detailTime.map((time, index) => (
              <div className="time" key={index}>
                <FormControl style={{ width: "300px" }} key={index}>
                  <InputLabel id="demo-simple-select-label">
                    Day of week {index + 1}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={time.dayOfWeed}
                    label="dayOfWeed"
                    onChange={(e) => handleChangeDay(e, index)}
                  >
                    {day.map((dow, index) => (
                      <MenuItem key={index} value={dow}>
                        {dow}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <input
                  className="time-hour"
                  value={time.startTime}
                  type="time"
                  id="appt"
                  name="appt"
                  min="07:00"
                  max="18:00"
                  required
                  onChange={(e) => {
                    handleTime(e, index);
                  }}
                ></input>
                <IconButton
                  onClick={(e) => handleDeleteTime(e, index)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          <div style={{ margin: "20px 0px" }}>
            <BasicSelect
              nameSelect="Teachers"
              getValue={setTeacherId}
              list={teachersActive}
              defaultValue={teacherId}
            />
          </div>
          <BasicSelect
            className="classEdit"
            getValue={setCourseId}
            list={courses}
            nameSelect="Courses"
            defaultValue={courseId}
          />
          <Divider />
          <Button
            style={{
              marginLeft: "220px",
              marginTop: "20px",
              width: "80px",
              height: "40px",
            }}
            onClick={handleSubmit}
            variant="contained"
            disabled={handleLock()}
          >
            {isAdd ? "Add" : "Save"}
          </Button>
        </Box>
        <Box>
          {classCur ? <ListStudentsClass otherClasses={otherClasses} members={classCur.students} /> : ""}
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default EditClassesPage;
