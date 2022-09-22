import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

class ShoppingItem extends React.Component {
  render() {
    return (
      <ListItem
        key={this.props.index}
        secondaryAction={
          <p>
            <IconButton
              disabled={this.props.completed}
              edge="end"
              aria-label="edit"
              onClick={this.props.editElement}
              sx={{ margin: "0.5pt" }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              edge="end"
              aria-label="remove"
              onClick={this.props.removeElement}
              sx={{ margin: "0.5pt" }}
            >
              <DeleteIcon />
            </IconButton>
          </p>
        }
        sx={{
          backgroundColor: this.props.completed ? "lightgray" : "#F2EEFF",
          borderLeft: this.props.completed
            ? "5px solid gray"
            : "5px solid purple",
          paddingLeft: "0pt",
        }}
      >
        <Button
          disabled={this.props.completed}
          color="secondary"
          onClick={this.props.checkElement}
        >
          <TaskAltIcon />
        </Button>
        <ListItemText
          primary={
            this.props.completed ? <s>{this.props.text}</s> : this.props.text
          }
          sx={{ padding: "1px" }}
        />
      </ListItem>
    );
  }
}

export default ShoppingItem;
