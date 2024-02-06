import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItemText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Task from "./Task";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#43d0f7",
      light: "#ffffff",
    },
    secondary: {
      main: "#43d0f7",
      light: "#ffffff",
    },
  },
});

function TasksList() {
  const [addNewTask, setAddNewTask] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [show, setShow] = useState(false);
  const id = localStorage.getItem("id");
  const handleTaskChange = (event) => {
    setAddNewTask(event.target.value);
  };
  function addItem() {
    const body = {
      task: addNewTask,
      completed: false,
      Userid: id,
    };
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(body),
    };

    fetch("/tasks/tasks", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServerResponse(data.message);
        setShow(true);
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("/tasks/tasks?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Typography
          variant="h2"
          sx={{ textAlign: "center", my: 4, color: "primary.light" }}
        >
          {" "}
          Task List
        </Typography>
        <Typography variant="h4" sx={{ mx: 8, color: "secondary.main" }}>
          Pending
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="AddTask"
            label="Add Task"
            name="AddTask"
            value={addNewTask}
            onChange={handleTaskChange}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            color="secondary"
            inputProps={{ style: { color: "#ffffff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Change outline color
                },
                "&:hover fieldset": {
                  borderColor: "secondary.main", // Change outline color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main", // Change outline color when focused
                },
              },
              width: "60vh",
              mx: 8,
            }}
          />
          <Button variant="contained" onClick={addItem}>
            Add
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            my: 8,
            mx: 8,
            display: "flex",
            flexDirection: "column",

            color: "white",
          }}
        >
          {tasks.map((task, i) => (
            <Task key={i} item={task} comp={false} />
          ))}
        </Box>
        <Typography variant="h4" sx={{ mx: 8, color: "secondary.main" }}>
          Completed
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            my: 8,
            mx: 8,
            display: "flex",
            flexDirection: "column",

            color: "white",
          }}
        >
          {tasks.map((task, i) => (
            <Task key={i} item={task} comp={true} />
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default TasksList;
