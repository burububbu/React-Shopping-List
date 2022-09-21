import React from "react";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import "./ShoppingList.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import ShoppingItem from "./ShoppingItem";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
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
    const itemsLocal = JSON.parse(localStorage.getItem("items")) || [];
    this.setState({ items: itemsLocal });
  }

  componentDidUpdate() {
    const { items } = this.state;
    localStorage.setItem("items", JSON.stringify(items));
  }

  constructor(props) {
    super(props);

    // item is a json {text: ""}
    this.state = { items: [], modalOpen: true };

    this.addItem = this.addItem.bind(this);
    this.openModal = this.openModal.bind(this);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCurrentTextItemChange =
      this.handleCurrentTextItemChange.bind(this);
  }

  addItem() {
    this.setState({ modalOpen: false });
    this.state.items.push({ text: this.state.currentText });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }
  handleModalClose() {
    this.setState({ modalOpen: false });
  }

  handleCurrentTextItemChange(event) {
    this.setState({ currentText: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <h1>"Shopping list" </h1>

        <Fab
          color="primary"
          aria-label="add"
          onClick={this.openModal}
          sx={{ position: "absolute", bottom: "20px", right: "20px" }} // override css properties only for the current instance
        >
          <AddIcon> </AddIcon>
        </Fab>

        {this.state.items.map((el, id) => (
          <ShoppingItem
            key={id.toString()}
            index={id}
            text={el.text}
            editElement={() => 0}
            removeElement={(_) => {
              const localItems = this.state.items;
              localItems.splice(id, 1);
              this.setState({ items: localItems });
            }}
          ></ShoppingItem>
        ))}

        <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
          <Box sx={boxStyle}>
            <h2 style={{ margin: "10pt" }}>Add an item</h2>

            <TextField
              id="shopping-item-text"
              label="Shopping item"
              variant="standard"
              onChange={this.handleCurrentTextItemChange}
              sx={{ margin: "10pt", width: "90%" }}
            />

            <Button
              variant="contained"
              onClick={this.addItem}
              sx={{ width: "30%", margin: "10pt", alignSelf: "end" }}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default ShoppingApp;
