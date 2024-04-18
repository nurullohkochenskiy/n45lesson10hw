import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterStudent } from "../app/students/studentsSlice";



export default function FilterStudent({ filteringItems, setFilteringItems }) {
  const [groupFilt, setGroupFilt] = React.useState("");
  const dispatch = useDispatch();

  const handleChangeGroup = (e) => {
    setGroupFilt(e.target.value);
    setFilteringItems({ ...filteringItems, groupFilt: e.target.value });
  };
  
  React.useEffect(() => {
    dispatch(filterStudent(filteringItems));
  }, [dispatch, filteringItems]);
  return (
    <div>
      <Typography ml={2}>Filter by: </Typography>
      <FormControl sx={{ m: 1, width: 100 }}>
        <InputLabel id="demo-multiple-checkbox-label">Group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={groupFilt}
          label="group"
          onChange={handleChangeGroup}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"n45"}>n45</MenuItem>
          <MenuItem value={"n46"}>n46</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}
