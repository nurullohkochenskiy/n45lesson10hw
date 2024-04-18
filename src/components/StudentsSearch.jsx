import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterStudent } from "../app/students/studentsSlice";

const StudentsSearch = ({ filteringItems, setFilteringItems }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterStudent(filteringItems));
  }, [dispatch, filteringItems]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const newFilteringItems = { ...filteringItems, search: e.target.value };
    setFilteringItems(newFilteringItems);
  };

  return (
    <>
      <TextField
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={handleSearch}
      />
    </>
  );
};

export default StudentsSearch;
