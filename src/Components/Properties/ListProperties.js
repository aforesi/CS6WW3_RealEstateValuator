import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/auth-context";
import "./ListProperties.css";
import CurrencyFormat from 'react-currency-format';

const Property = props => (
  <tr>
    <td>{props.property.houseNumber} {props.property.streetName}</td>
    <td>{props.property.yearBuilt}</td>
    <td>{props.property.stories}</td>
    <td>{props.property.bedrooms}</td>
    <td>{props.property.fullBathrooms}</td>
    <td>{props.property.halfBathrooms}</td>
    <td>{props.property.totalSquareFeet}</td>
    <td>{props.property.livableSquareFeet}</td>
    <td>{props.property.garageSquareFeet}</td>
    <td>{props.property.garageType}</td>
    <td>{props.property.fireplace.toString()}</td>
    <td>{props.property.pool.toString()}</td>
    <td>{props.property.centralHeating.toString()}</td>
    <td>{props.property.centralCooling.toString()}</td>
    <td><CurrencyFormat value={props.property.salePrice} displayType={'text'} thousandSeparator={true} prefix={' $'} /></td>
    <td>{props.property.lastSaleDate.slice(0, 10)}</td>
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

    this.state = { 
      properties: [],
      calculatedProperties: [],
      loading: true,
      requestNum: 0,
      lastId: null
    };
  }

  getHouses = () => {
    axios
      .get("http://localhost:5000/properties/", {
        params: {
          requestNum: this.state.requestNum,
          lastId: this.state.lastId
        }
      })
      .then(response => {
        this.setState({ 
          properties: [...this.state.properties, ...response.data],
          loading: false,
          requestNum: 1,
          lastId: response.data[response.data.length-1]._id
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    const token = this.context.token;
    axios
      .get("http://localhost:5000/properties/", {
        headers: {
          Authorization: "Bearer " + token
        },
        params: {
          requestNum: this.state.requestNum,
          lastId: this.state.lastId
        }
      })
      .then(response => {
        this.setState({ 
          properties: response.data,
          requestNum: this.state.requestNum += 1,
          lastId: response.data[response.data.length-1]._id
        });
      })
      .catch(error => {
        console.log(error);
      });

      axios
      .get("http://localhost:5000/properties/calculatedProperties", {
        headers: {
          Authorization: "Bearer " + token
        },
        params: {
          requestNum: this.state.requestNum,
          lastId: this.state.lastId
        }
      })
      .then(response => {
        this.setState({ 
          calculatedProperties: response.data,
          loading: false
        });
        console.log("calced props: ", this.state.calculatedProperties);
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

  displayCalculatedProperties () {
    console.log("test");
  }


  render() {
    return (
      <div>
      { this.state.loading && 
        <div className="testLogo">  
          <h1><i className="fa fa-refresh fa-spin"></i></h1>
        </div>
      }

        <h3>Properties</h3>
        <Link to="/add-property">
          <button className="btn btn-primary" type="button">
            Add New Property
          </button>
        </Link>
          <button onClick={this.displayCalculatedProperties} className="btn btn-primary" type="button">
            View Your Properties
          </button>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Address</th>
              <th>Year Built</th>
              <th>Stories</th>
              <th>Bedrooms</th>
              <th>Full Bath</th>
              <th>Half Bath</th>
              <th>Total SqFt</th>
              <th>Livable SqFt</th>
              <th>Garage SqFt</th>
              <th>Garage Type</th>
              <th>Fireplace</th>
              <th>Pool</th>
              <th>Heating</th>
              <th>Cooling</th>
              <th>Last Sale Price</th>
              <th>Last Sale Date</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.propertyList()}</tbody>
        </table>
        { !this.state.loading && 
        <div className="loadMore">
          <button onClick={this.getHouses} className="btn btn-primary" type="button">
              Load More...
          </button>
        </div>
        }
      </div>
    );
  }
}
