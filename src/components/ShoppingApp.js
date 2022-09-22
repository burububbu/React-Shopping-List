import React from "react";

import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/ToolBar";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import ShoppingItem from "./ShoppingItem";
import "./ShoppingApp.css";

// box style reused for modals
const boxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
  height: "fit-content",

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
};

class ShoppingApp extends React.Component {
  componentDidMount() {
    // retrieve items stored in the local storage
    const itemsLocal = JSON.parse(localStorage.getItem("items")) || [];
    this.setState({ items: itemsLocal });
  }

  componentDidUpdate() {
    // update items stored in the local storage
    const items = this.state.items;
    localStorage.setItem("items", JSON.stringify(items));
  }

  constructor(props) {
    super(props);

    this.state = {
      items: [], // item in json format {text: string, completed: bool}
      modalOpen: false, // add modal
      editModalOpen: false, // edit modal
      idSelected: null,
      currentOldText: "", // text of the instance to edit
      currentText: "", // from add modal
      newText: "", // from edit modal
      onlyCompleted: false,
    };

    // bindings
    this.addItem = this.addItem.bind(this);
    this.openModal = this.openModal.bind(this);
    this.editExistingElement = this.editExistingElement.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCurrentTextItemChange =
      this.handleCurrentTextItemChange.bind(this);
    this.filterOnlyCompletedHandler =
      this.filterOnlyCompletedHandler.bind(this);
  }

  getApplicationBar() {
    return (
      <Box sx={{ flexGrow: 1, marginBottom: "5pt" }}>
        <AppBar color="secondary" position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ color: "white" }}>Shopping list</h1>
            <IconButton
              size="large"
              color="inherit"
              onClick={this.filterOnlyCompletedHandler}
            >
              <PlaylistAddCheckIcon></PlaylistAddCheckIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  filterOnlyCompletedHandler() {
    this.setState({ onlyCompleted: !this.state.onlyCompleted });
  }

  addItem() {
    this.setState({ modalOpen: false });
    this.state.items.push({ text: this.state.currentText, completed: false });
    this.setState({ currentText: "" });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  handleModalClose() {
    this.setState({ modalOpen: false });
    this.setState({ currentText: "" });
  }

  handleCurrentTextItemChange(event) {
    this.setState({ currentText: event.target.value });
  }

  editExistingElement() {
    var localItems = this.state.items;
    localItems[this.state.idSelected].text = this.state.newText;

    this.setState({ items: localItems, editModalOpen: false });
  }

  render() {
    return (
      <div className="container">
        {this.getApplicationBar()}
        <Fab
          color="secondary"
          aria-label="add"
          onClick={this.openModal}
          sx={{ position: "fixed", right: "10pt", bottom: "10pt" }} // override css properties only for the current instance
        >
          <AddIcon> </AddIcon>
        </Fab>

        {this.state.items
          .filter((el) => !this.state.onlyCompleted || el.completed)
          .map((el, id) => (
            <ShoppingItem
              key={id.toString()}
              index={id}
              text={el.text}
              completed={el.completed}
              checkElement={() => {
                const localItems = this.state.items;

                localItems[id].completed = true;
                this.setState({ items: localItems });
              }}
              editElement={(_) => {
                this.setState({
                  currentOldText: el.text,
                  idSelected: id,
                  editModalOpen: true,
                  newText: "",
                });
              }}
              removeElement={(_) => {
                const localItems = this.state.items;
                localItems.splice(id, 1);
                this.setState({ items: localItems });
              }}
            ></ShoppingItem>
          ))}

        <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
          <Box sx={boxStyle}>
            <h2 style={{ margin: "10pt", color: "purple" }}>Add an item</h2>

            <TextField
              color="secondary"
              id="shopping-item-text"
              label="Shopping item"
              variant="standard"
              onChange={this.handleCurrentTextItemChange}
              sx={{ marginLeft: "10pt", marginRight: "10pt" }}
            />

            <Button
              color="secondary"
              variant="contained"
              disabled={this.state.currentText.length < 1}
              onClick={this.addItem}
              sx={{ width: "30%", margin: "10pt", alignSelf: "end" }}
            >
              Add
            </Button>
          </Box>
        </Modal>

        <Modal
          open={this.state.editModalOpen}
          onClose={this.handleEditModalClose}
        >
          <Box sx={boxStyle}>
            <h2 style={{ margin: "10pt", color: "purple" }}>Edit the item</h2>

            <TextField
              color="secondary"
              label="Shopping item"
              defaultValue={this.state.currentOldText}
              variant="standard"
              onChange={(evt) => this.setState({ newText: evt.target.value })}
              sx={{ margin: "10pt", width: "90%" }}
            />

            <Button
              color="secondary"
              variant="contained"
              disabled={this.state.newText.length < 1}
              onClick={this.editExistingElement}
              sx={{ width: "30%", margin: "10pt", alignSelf: "end" }}
            >
              Edit
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default ShoppingApp;
