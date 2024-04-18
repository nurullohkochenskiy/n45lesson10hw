import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { createTeacher, editTeacher } from "../app/teachers/teachersSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  width: 500,
  bgcolor: "background.paper",
  p: 4,
};

export default function TransitionsModal({ id, typeModal, namebtn }) {
  const [open, setOpen] = React.useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { foundTeacher } = useSelector((state) => state.teachers);
  const groups = ["n45", "n46"];

  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const handleModalOpen = () => {
    setOpen(true);
  };

  const onSubmit = (data) => {
    const fixedData = { id: id, ...data };
    dispatch(editTeacher(fixedData));
    handleClose();
    window.location.reload();
  };
  const onSubmitAdd = (data) => {
    dispatch(createTeacher(data));
    handleClose();
  };
 
  return (
    <div>
      <Button variant="contained" onClick={handleModalOpen}>
        {namebtn}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            component="form"
            onSubmit={
              typeModal == "add"
                ? handleSubmit(onSubmitAdd)
                : handleSubmit(onSubmit)
            }
            sx={style}
          >
            <Controller
              name="firstname"
              control={control}
              defaultValue={
                typeModal == "add" ? "" : `${foundTeacher.firstname}`
              }
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%" }}
                  required
                  label="Firstname"
                  error={!!errors.firstname}
                  helperText={errors.firstname && errors.firstname.message}
                  variant={errors.firstname ? "outlined" : "standard"}
                />
              )}
            />
            <Controller
              name="lastname"
              control={control}
              defaultValue={
                typeModal == "add" ? "" : `${foundTeacher.lastname}`
              }
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ mt: 2, width: "100%" }}
                  required
                  label="Lastname"
                  error={!!errors.lastname}
                  helperText={errors.lastname && errors.lastname.message}
                  variant={errors.lastname ? "outlined" : "standard"}
                />
              )}
            />
            <Controller
              name="level"
              control={control}
              defaultValue={typeModal == "add" ? "" : `${foundTeacher.level}`}
              rules={{ required: "Level is required" }}
              render={({ field }) => (
                <>
                  <InputLabel sx={{ mt: 2 }} id="demo-multiple-checkbox-label">
                    Level:
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...field}
                    required
                    label="Level"
                    placeholder="Choose level"
                    error={!!errors.level}
                    sx={{
                      mb: 2,
                      minWidth: 120,
                      borderColor: errors.level ? "red" : undefined,
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"junior"}>Junior</MenuItem>
                    <MenuItem value={"middle"}>Middle</MenuItem>
                    <MenuItem value={"senior"}>Senior</MenuItem>
                  </Select>
                </>
              )}
            />

            <Controller
              name="groups"
              control={control}
              defaultValue={typeModal == "add" ? [] : foundTeacher.groups}
              rules={{ required: "At least one group must be selected" }}
              render={({ field }) => (
                <>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Groups:
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    {...field}
                    multiple
                    label="Groups"
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(", ")}
                    error={!!errors.groups}
                    sx={{
                      minWidth: 120,
                      borderColor: errors.groups ? "red" : undefined,
                    }}
                  >
                    {groups.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={field.value.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.groups && (
                    <Typography color="red">{errors.groups.message}</Typography>
                  )}
                </>
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
