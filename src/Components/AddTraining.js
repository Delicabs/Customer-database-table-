import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";

class AddTraining extends Component {
  state = {
    open: false,
    date: moment().format("YYYY-MM-DD"),
    duration: "",
    activity: "",
    customer: ""
  };
  saveTraining = () => {
    const newTraining = {
      date: this.state.date,
      duration: this.state.duration,
      activity: this.state.activity,
      customer: this.props.customer
    };
    this.props.addTraining(newTraining);
    this.handleClose();
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

  render() {
    return (
      <div>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add new training
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add new training to customer
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="date"
              onChange={this.handelChange}
              label="Date"
              value={this.state.date}
              fullWidth
            />
            <TextField
              margin="dense"
              name="duration"
              onChange={this.handelChange}
              label="Duration"
              value={this.state.duration}
              fullWidth
            />
            <TextField
              margin="dense"
              name="activity"
              onChange={this.handelChange}
              label="Activity"
              value={this.state.activity}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveTraining} color="primary">
              save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddTraining;
