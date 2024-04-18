import React, { useState } from "react";
import Dashboard from "../../components/Dashboard";
import { Stack } from "@mui/material";
import TransitionsModal from "../../components/StudentsModal";
import FilterStudent from "../../components/FilterStudent";
import Studentlist from "../../components/Studentlist";
import StudentsSearch from "../../components/StudentsSearch";

const Students = () => {
  const [filteringItems, setFilteringItems] = useState({
    search: "",
    groupFilt: [],
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
        <StudentsSearch
          filteringItems={filteringItems}
          setFilteringItems={setFilteringItems}
        />
        <TransitionsModal typeModal={"add"} namebtn={"Add a student"} />

        <FilterStudent
          filteringItems={filteringItems}
          setFilteringItems={setFilteringItems}
        />
      </Stack>

      <Studentlist filteringItems={filteringItems} />
    </Dashboard>
  );
};

export default Students;
