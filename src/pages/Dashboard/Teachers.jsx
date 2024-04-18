import React, { useState } from "react";
import Dashboard from "../../components/Dashboard";
import Teacherlist from "../../components/Teacherlist";
import { Stack } from "@mui/material";
import FilterTeacher from "../../components/FilterTeacher";
import TransitionsModal from "../../components/TeachersModal";
import SearchBar from "../../components/SearchBar";

const Teachers = () => {
  const [filteringItems, setFilteringItems] = useState({
    search: "",
    levelFilt: "",
    groupPicker: [],
  });
  

  return (
    <Dashboard>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={5}
      >
        <SearchBar
          filteringItems={filteringItems}
          setFilteringItems={setFilteringItems}
        />
        <TransitionsModal typeModal={"add"} namebtn={"Add a teacher"} />

        <FilterTeacher
          filteringItems={filteringItems}
          setFilteringItems={setFilteringItems}
        />
      </Stack>

      <Teacherlist filteringItems={filteringItems} />
    </Dashboard>
  );
};

export default Teachers;
