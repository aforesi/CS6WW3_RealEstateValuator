import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/auth-context";
import "./ListProperties.css";

const Property = props => (
  <tr>
    <td>{props.property.yearBuilt}</td>
    <td>{props.property.stories}</td>
    <td>{props.property.bedrooms}</td>
    <td>{props.property.fullBathrooms}</td>
    <td>{props.property.halfBathrooms}</td>
    <td>{props.property.totalSquareFeet}</td>
    <td>{props.property.livableSquareFeet}</td>
    <td>{props.property.garageSquareFeet}</td>
    <td>{props.property.garageType}</td>
    <td>{props.property.fireplace}</td>
    <td>{props.property.pool}</td>
    <td>{props.property.centralHeating}</td>
    <td>{props.property.centralCooling}</td>
    <td>{props.property.latitude}</td>
    <td>{props.property.longitude}</td>
    <td>
      <Link to={"/edit/" + props.property._id}>
        <button className="btn btn-warning">Edit</button>
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteProperty(props.property._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class PropertyList extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.deleteProperty = this.deleteProperty.bind(this);

    this.state = { properties: [] };
  }

  componentDidMount() {
    const token = this.context.token;

    axios
      .get("http://localhost:5000/properties/", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        this.setState({ properties: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteProperty(id) {
    const token = this.context.token;

    axios
      .delete("http://localhost:5000/properties/" + id, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      properties: this.state.properties.filter(el => el._id !== id)
    });
  }

  propertyList() {
    return this.state.properties.map(currentproperty => {
      return (
        <Property
          property={currentproperty}
          deleteProperty={this.deleteProperty}
          key={currentproperty._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Properties</h3>
        <Link to="/add-property">
          <button className="btn btn-primary" type="button">
            Add New Property
          </button>
        </Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Year Built</th>
              <th>Stories</th>
              <th>Bedrooms</th>
              <th>Full Bathrooms</th>
              <th>Half Bathrooms</th>
              <th>Total SqFt</th>
              <th>Livable SqFt</th>
              <th>Garage SqFt</th>
              <th>Garage Type</th>
              <th>Fireplace</th>
              <th>Pool</th>
              <th>Central Heating</th>
              <th>Central Cooling</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>{this.propertyList()}</tbody>
        </table>
      </div>
    );
  }
}
