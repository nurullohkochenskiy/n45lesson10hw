import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import teachersReducer from "./teachers/teachersSlice";
import studentsReducer from "./students/studentsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    students: studentsReducer,
  },
});

export default store;
