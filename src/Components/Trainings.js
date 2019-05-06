import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddTraining from "./AddTraining";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";

class Trainings extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], open: false, message: "" };
  }
  componentDidMount() {
    this.fetchtrainings();
  }

  fetchtrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(res => res.json())
      .then(jsondata => this.setState({ trainings: jsondata }));
  };

  deleteTraining = link => {
    console.log(link);
    if (window.confirm("Are you sure?")) console.log(link);
    fetch("https://customerrest.herokuapp.com/api/trainings/" + link, {
      method: "DELETE"
    })
      .then(res => this.fetchtrainings())
      .then(res => this.setState({ open: true, message: "Training deleted" }))
      .catch(err => console.log(err));
  };

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  }

  render() {
    const columns = [
      {
        Header: "Firstname",
        accessor: "customer.firstname"
      },
      {
        Header: "Lastname",
        accessor: "customer.lastname"
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "Duration",
        accessor: "duration"
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: row => <span>{moment(row.value).format("D.M.YYYY- hh:mm")}</span>
      },

      {
        Header: "",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "id",
        Cell: ({ value }) => (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => this.deleteTraining(value)}
          >
            DELETE
            <DeleteIcon />
          </Button>
        )
      }
    ];
    return (
      <div>
        <ReactTable
          filterable={true}
          data={this.state.trainings}
          columns={columns}
          filterable
          defaultFilterMethod={(filter, row) =>
            this.filterCaseInsensitive(filter, row)
          }
        />
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default Trainings;
