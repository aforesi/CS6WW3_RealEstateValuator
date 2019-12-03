import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/auth-context";
import "./Users.css";

const User = props => (
  <tr>
    <td>{props.user.email}</td>
    <td>{props.user.name}</td>
    <td>{props.user.lastName}</td>
    <td>{props.user.city}</td>
    <td>{props.user.isAgent}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>
        <button className="btn btn-warning">Edit</button>
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class UserList extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = { users: [] };
  }

  componentDidMount() {
    const token = this.context.token;

    axios
      .get("http://localhost:5000/users/", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteUser(id) {
    const token = this.context.token;
    axios
      .delete("http://localhost:5000/users/" + id, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    });
  }

  userList() {
    return this.state.users.map(currentuser => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Is Agent</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}
