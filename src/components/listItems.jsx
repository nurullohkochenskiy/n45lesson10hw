import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainListItems = () => {
  
  const navigate = useNavigate();
  const { filtered: studentsFiltered } = useSelector((state) => state.students);
  const { filtered: teachersFiltered } = useSelector((state) => state.teachers);
  const handleStudentsBtn = () => {
    navigate("/students");
    if (!studentsFiltered) {
      window.location.reload();
    }
  };
  const handleTeachersBtn = () => {
    navigate("/teachers");
    if (!teachersFiltered) {
      window.location.reload();
    }
  };
  return (
    <React.Fragment>
      <ListItemButton
        onClick={handleTeachersBtn}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Teachers" />
      </ListItemButton>
      <ListItemButton
        onClick={handleStudentsBtn}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;
