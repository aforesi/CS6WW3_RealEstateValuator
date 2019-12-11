import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../Context/auth-context";
import "./ListProperties.css";
import CurrencyFormat from 'react-currency-format';

const CalculatedProperty = props => (
  <tr>
    <td>{props.property.address}</td>
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
  </tr>
);

export default class PropertyList extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = { 
      properties: [],
      loading: true
    };
  }


  componentDidMount() {
    const token = this.context.token;
    
      axios
      .get("http://localhost:5000/properties/predictedProperties", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        this.setState({ 
          properties: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });


      
    
  }


  propertyList() {
    return this.state.properties.map(currentproperty => {
      return (
        <CalculatedProperty
          property={currentproperty}
          key={currentproperty._id}
        />
      );
    });
  }

  predictionList() {
    return this.state.calculatedProperties.map(currentproperty => {
      return (
        <CalculatedProperty
          property={currentproperty}
          key={currentproperty._id}
        />
      );
    });
  }


  render() {
    return (
      <div>
      { this.state.loading && 
        <div className="testLogo">  
          <h1><i className="fa fa-refresh fa-spin"></i></h1>
        </div>
      }

        <h3>Calculated Properties</h3>
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
              <th>Predicted Price</th>
            </tr>
          </thead>
          <tbody>{this.propertyList()}</tbody>
        </table>
      </div>
    );
  }
}
