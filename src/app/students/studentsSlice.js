import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const findHighestId = (students) => {
  let highestId = 0;
  for (const student of students) {
    if (Number(student.id) > highestId) {
      highestId = Number(student.id);
    }
  }
  return highestId;
};
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get("http://localhost:3001/students");
    return response.data;
  }
);

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    loading: false,
    error: "",
    students: JSON.parse(localStorage.getItem("students")) || [],
    inpVal: "",
    filtered: [],
    filteredStatus: false,
    foundStudent: {},
  },
  reducers: {
    getStudent: (state, action) => {
      const foundStudent = state.students.find(
        (student) => student.id == Number(action.payload)
      );
      state.foundStudent = foundStudent;
    },
    createStudent: (state, action) => {
      const { firstname, lastname, group } = action.payload;
      const { students } = state;
      const highestId = findHighestId(students);
      const newStudent = {
        id: String(highestId + 1),
        firstname,
        lastname,
        group,
      };
      state.students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    editStudent: (state, action) => {
      state.students = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    filterStudent: (state, action) => {
      const shorten = action.payload;
      if (shorten.search.length > 0 || shorten.groupFilt.length > 0) {
        const filteredItems = state.students.filter((student) => {
          const searchingItems = [
            student.firstname,
            student.lastname,
            student.group,
          ];
          const filteringGroup = student.group;

          let smatches = true;
          let gmatches = true;
          //! Search filter
          if (shorten.search) {
            const searchMatches = searchingItems.some((item) => {
              return item.toLowerCase().includes(shorten.search.toLowerCase());
            });
            if (searchMatches) {
              smatches = true;
            } else {
              smatches = false;
            }
          }
          //! Group filter
          if (shorten.groupFilt) {
            const groupMatches = filteringGroup.includes(
              shorten.groupFilt.toLowerCase()
            );
            if (groupMatches) {
              gmatches = true;
            } else {
              gmatches = false;
            }
          }
          let res = true;
          if (smatches === false || gmatches === false) {
            res = false;
          }
          return res;
        });
        state.filteredStatus = true;
        state.filtered = filteredItems;
      } else {
        state.filteredStatus = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("students", JSON.stringify(action.payload));
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  getStudent,
  createStudent,
  deleteStudent,
  editStudent,
  filterStudent,
} = studentsSlice.actions;

export default studentsSlice.reducer;
