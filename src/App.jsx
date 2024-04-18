import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Dashboard/Main";
import { Provider } from "react-redux";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile";
import Students from "./pages/Dashboard/Students";
import Teachers from "./pages/Dashboard/Teachers";
import store from "./app/store";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/students"
            element={
              <RequireAuth>
                <Students />
              </RequireAuth>
            }
          />
          <Route
            path="/teachers"
            element={
              <RequireAuth>
                <Teachers />
              </RequireAuth>
            }
          />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
