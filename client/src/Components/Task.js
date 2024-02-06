import { Button, Checkbox, ListItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Task(props) {
  const [serverResponse, setServerResponse] = useState("");
  const [updateTask, setUpdateTask] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  function onCompleted() {
    const body = {
      task: props.item.task,
      completed: !props.item.completed,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(body),
    };
    fetch("/tasks/tasks/" + String(props.item.id), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServerResponse(data.message);
        setShow(true);
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }
  function editItem() {
    const body = {
      task: updateTask,
      completed: props.item.completed,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(body),
    };
    fetch("/tasks/tasks/" + String(props.item.id), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServerResponse(data.message);
        setShow(true);
      })
      .catch((err) => console.log(err));
    window.location.reload();

    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    setUpdateTask(event.target.value);
  };

  function deleteItem() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    console.log("/tasks/tasks/" + String(props.item.id));
    fetch("/tasks/tasks/" + String(props.item.id), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServerResponse(data.message);
        setShow(true);
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  if (props.item.completed === props.comp) {
    return (
      <div>
        <List
          sx={{
            width: "70vh",
            border: "2px solid #ffffff",
            borderRadius: "8px",
            my: 2,
          }}
        >
          <ListItem sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox style={{ color: "#ffffff" }} onClick={onCompleted} />
            {props.item.task}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={handleOpen}>
                <EditIcon style={{ color: "#ffffff", marginRight: "15px" }} />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
                <DeleteIcon style={{ color: "#ffffff" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="updateTask"
              label="Task"
              name="updateTask"
              color="secondary"
              onChange={handleChange}
              inputProps={{ style: { color: "secondary.main" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black", // Change outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary.main", // Change outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main", // Change outline color when focused
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "10px" }}
              onClick={editItem}
            >
              Add Task
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default Task;
