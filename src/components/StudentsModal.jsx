import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { createStudent, editStudent } from "../app/students/studentsSlice";

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
  const { foundStudent } = useSelector((state) => state.students);

  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const handleModalOpen = () => {
    setOpen(true);
  };

  const onSubmit = (data) => {
    const fixedData = { id: id, ...data };
    dispatch(editStudent(fixedData));
    handleClose();
    window.location.reload();
  };
  const onSubmitAdd = (data) => {
    dispatch(createStudent(data));
    handleClose();
  };
  console.log(foundStudent);
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
                typeModal == "add" ? "" : `${foundStudent.firstname}`
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
                typeModal == "add" ? "" : `${foundStudent.lastname}`
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
              name="group"
              control={control}
              defaultValue={typeModal == "add" ? "" : `${foundStudent.group}`}
              rules={{ required: "Group is required" }}
              render={({ field }) => (
                <>
                  <InputLabel sx={{ mt: 2 }} id="demo-multiple-checkbox-label">
                    Group:
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    {...field}
                    required
                    label="Group"
                    placeholder="Choose group"
                    error={!!errors.group}
                    sx={{
                      mb: 2,
                      minWidth: 120,
                      borderColor: errors.group ? "red" : undefined,
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"n45"}>n45</MenuItem>
                    <MenuItem value={"n46"}>n46</MenuItem>
                  </Select>
                  {errors.group && (
                    <Typography color="red">{errors.group.message}</Typography>
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
