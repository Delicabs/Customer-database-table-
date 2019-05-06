import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Addnew from "@material-ui/icons/Add";

class AddCustomer extends Component {
  state = {
    open: false,
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveCustomer = () => {
    const newCustomer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.addCustomer(newCustomer);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Button
          style={{ marginTop: 10, marginBottom: 10 }}
          size="small"
          variant="contained"
          color="secondary"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add new customer
          <Addnew />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              onChange={this.handelChange}
              label="Firstname"
              value={this.state.firstname}
              fullWidth
            />
            <TextField
              margin="dense"
              name="lastname"
              onChange={this.handelChange}
              label="Lastname"
              value={this.state.lastname}
              fullWidth
            />
            <TextField
              margin="dense"
              name="streetaddress"
              onChange={this.handelChange}
              label="Streetaddress"
              value={this.state.streetaddress}
              fullWidth
            />
            <TextField
              margin="dense"
              name="postcode"
              onChange={this.handelChange}
              label="Postcode"
              value={this.state.postcode}
              fullWidth
            />
            <TextField
              margin="dense"
              name="city"
              onChange={this.handelChange}
              label="City"
              value={this.state.city}
              fullWidth
            />
            <TextField
              margin="dense"
              name="email"
              onChange={this.handelChange}
              label="Email"
              value={this.state.email}
              fullWidth
            />
            <TextField
              margin="dense"
              name="phone"
              onChange={this.handelChange}
              label="Phone"
              value={this.state.phone}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveCustomer} color="primary">
              save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddCustomer;
