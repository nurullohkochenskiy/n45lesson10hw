import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterTeacher } from "../app/teachers/teachersSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const groups = ["n45", "n46"];

export default function FilterTeacher({ filteringItems, setFilteringItems }) {
  const [levelFilt, setLevelFilt] = React.useState("");
  const [groupPicker, setGroupPicker] = React.useState([]);
  const dispatch = useDispatch();

  const handleChangeLevel = (e) => {
    setLevelFilt(e.target.value);
    setFilteringItems({ ...filteringItems, levelFilt: e.target.value });
  };
  const handleChangeGroups = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setFilteringItems({ ...filteringItems, groupPicker: value });
    setGroupPicker(typeof value === "string" ? value.split(",") : value);
  };
  React.useEffect(() => {
    dispatch(filterTeacher(filteringItems));
  }, [dispatch, filteringItems]);
  return (
    <div>
      <Typography ml={2}>Filter by: </Typography>
      <FormControl sx={{ m: 1, width: 100 }}>
        <InputLabel id="demo-multiple-checkbox-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={levelFilt}
          label="level"
          onChange={handleChangeLevel}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Junior"}>Junior</MenuItem>
          <MenuItem value={"Middle"}>Middle</MenuItem>
          <MenuItem value={"Senior"}>Senior</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 100 }}>
        <InputLabel id="demo-multiple-checkbox-label">Groups</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={groupPicker}
          onChange={handleChangeGroups}
          input={<OutlinedInput label="Groups" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {groups.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={groupPicker.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
