import ListItem from "@mui/material/ListItem";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

class ShoppingItem extends React.Component {
  render() {
    console.log(this.props.text);
    return (
      <ListItem
        key={this.props.index}
        secondaryAction={
          <p>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={this.props.editElement()}
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
      >
        <Avatar>
          <TaskAltIcon />
        </Avatar>
        <ListItemText primary={this.props.text} sx={{ margin: "5pt" }} />
      </ListItem>
    );
  }
}

export default ShoppingItem;
