import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../app/teachers/teachersSlice";
import { fetchStudents } from "../../app/students/studentsSlice";
const Main = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
    
  }, [dispatch]);
  return (
    <Dashboard>
      <Typography variant="h3" mt={10} mx={"auto"}>
        Hello {user.username}
      </Typography>
    </Dashboard>
  );
};

export default Main;
