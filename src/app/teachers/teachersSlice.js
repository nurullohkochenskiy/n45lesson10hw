import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const findHighestId = (teachers) => {
  let highestId = 0;
  for (const teacher of teachers) {
    if (Number(teacher.id) > highestId) {
      highestId = Number(teacher.id);
    }
  }
  return highestId;
};
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get("http://localhost:3001/teachers");
    return response.data;
  }
);

export const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    loading: false,
    error: "",
    teachers: JSON.parse(localStorage.getItem("teachers")) || [],
    inpVal: "",
    filtered: [],
    filteredStatus: false,
    foundTeacher: {},
  },
  reducers: {
    getTeacher: (state, action) => {
      const foundTeacher = state.teachers.find(
        (teacher) => teacher.id == Number(action.payload)
      );
      state.foundTeacher = foundTeacher;
    },
    createTeacher: (state, action) => {
      const { firstname, lastname, level, groups } = action.payload;
      const { teachers } = state;
      const highestId = findHighestId(teachers);
      const newTeacher = {
        id: String(highestId + 1),
        firstname: firstname,
        lastname: lastname,
        level: level,
        groups: groups,
      };
      const newTeachers = [...teachers, newTeacher];
      localStorage.setItem("teachers", JSON.stringify(newTeachers));
      state.teachers = newTeachers;
    },
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== action.payload
      );
      localStorage.setItem("teachers", JSON.stringify(state.teachers));
    },
    editTeacher: (state, action) => {
      state.teachers = state.teachers.map((teacher) =>
        teacher.id === action.payload.id ? action.payload : teacher
      );
      localStorage.setItem("teachers", JSON.stringify(state.teachers));
    },
    filterTeacher: (state, action) => {
      const shorten = action.payload;
      if (
        shorten.search.length > 0 ||
        shorten.levelFilt.length > 0 ||
        shorten.groupPicker.length > 0
      ) {
        const filteredItems = state.teachers.filter((teacher) => {
          const searchingItems = [
            teacher.firstname,
            teacher.lastname,
            teacher.level,
            teacher.groups.join(""),
          ];
          const filteringLevel = teacher.level.toLowerCase();
          const filteringGroups = teacher.groups.map((group) =>
            group.toLowerCase()
          );

          let smatches = true;
          let lmatches = true;
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
          //! Level filter
          if (shorten.levelFilt) {
            const levelMatches = filteringLevel.includes(
              shorten.levelFilt.toLowerCase()
            );
            if (levelMatches) {
              lmatches = true;
            } else {
              lmatches = false;
            }
          }
          //! Group filter
          if (shorten.groupPicker) {
            const groupMatches = shorten.groupPicker.every((group) =>
              filteringGroups.includes(group.toLowerCase())
            );
            console.log(filteringGroups);
            if (groupMatches) {
              gmatches = true;
            } else {
              gmatches = false;
            }
          }
          let res = true;
          if (smatches == false || lmatches == false || gmatches == false) {
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
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("teachers", JSON.stringify(action.payload));
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  getTeacher,
  createTeacher,
  deleteTeacher,
  editTeacher,
  filterTeacher,
} = teachersSlice.actions;

export default teachersSlice.reducer;
