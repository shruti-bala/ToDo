import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import SignIn from "./Components/Login";
import SignUp from "./Components/Signup";
import TasksList from "./Components/TasksList";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/tasks",
    element: <TasksList />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
