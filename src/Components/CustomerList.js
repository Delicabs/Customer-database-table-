import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteIcon from "@material-ui/icons/Delete";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], open: false, message: "", training: [] };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(res => res.json())
      .then(jsondata => this.setState({ customers: jsondata.content }));
  };

  deleteCustomer = link => {
    if (window.confirm("Are you sure?"))
      fetch(link, { method: "DELETE" })
        .then(res => this.fetchCustomers())
        .then(res => this.setState({ open: true, message: "Customer deleted" }))
        .catch(err => console.log(err));
  };

  addCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    })
      .then(res => this.fetchCustomers())
      .then(res => this.setState({ open: true, message: "New customer saved" }))
      .catch(err => console.log(err));
  };
  addTraining = newTraining => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTraining)
    })
      .then(response => this.fetchCustomers())
      .then(response =>
        this.setState({ open: true, message: "New training saved" })
      )
      .catch(err => console.error(err));
  };

  editCustomer = (link, customer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => this.fetchCustomers())
      .then(res => this.setState({ open: true, message: "Customer editet" }))
      .catch(err => console.log(err));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  }
  addTraining = training => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(training)
    })
      .then(response => this.fetchCustomers())
      .then(response =>
        this.setState({ open: true, message: "New training saved" })
      )
      .catch(err => console.error(err));
  };
  render() {
    const columns = [
      {
        Header: "Firstname",
        accessor: "firstname"
      },
      {
        Header: "Lastname",
        accessor: "lastname"
      },
      {
        Header: "Streetaddress",
        accessor: "streetaddress"
      },
      {
        Header: "Postcode",
        accessor: "postcode"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "Add training",
        sortable: false,
        filterable: false,
        minwidth: 90,
        accessor: "links[0].href",
        Cell: ({ value }) => (
          <AddTraining
            addTraining={this.addTraining}
            fetchCustomers={this.fetchCustomers}
            customer={value}
          />
        )
      },

      {
        Header: "Edit",
        filterable: false,
        sortable: false,
        width: 90,
        accessor: "links[0].href",
        Cell: ({ value, row }) => (
          <EditCustomer
            editCustomer={this.editCustomer}
            customer={row}
            link={value}
          />
        )
      },
      {
        Header: "Delete",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "links[0].href",
        Cell: ({ value }) => (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => this.deleteCustomer(value)}
          >
            DELETE
            <DeleteIcon />
          </Button>
        )
      }
    ];
    return (
      <div>
        {console.log(this.state.customers)}
        <AddCustomer addCustomer={this.addCustomer} />

        <ReactTable
          filterable={true}
          data={this.state.customers}
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

export default CustomerList;
