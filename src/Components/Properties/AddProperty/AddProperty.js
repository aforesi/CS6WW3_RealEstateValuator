import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../Context/auth-context";
import "./AddProperty.css";

export default class AddProperty extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.onChangeYearBuilt = this.onChangeYearBuilt.bind(this);
    this.onChangeStories = this.onChangeStories.bind(this);
    this.onChangeBedrooms = this.onChangeBedrooms.bind(this);
    this.onChangeFullBathrooms = this.onChangeFullBathrooms.bind(this);
    this.onChangeHalfBathrooms = this.onChangeHalfBathrooms.bind(this);
    this.onChangeTotalSquareFeet = this.onChangeTotalSquareFeet.bind(this);
    this.onChangeLivableSquareFeet = this.onChangeLivableSquareFeet.bind(this);
    this.onChangeGarageSquareFeet = this.onChangeGarageSquareFeet.bind(this);
    this.onChangeGarageType = this.onChangeGarageType.bind(this);
    this.onChangeFireplace = this.onChangeFireplace.bind(this);
    this.onChangePool = this.onChangePool.bind(this);
    this.onChangeCentralHeating = this.onChangeCentralHeating.bind(this);
    this.onChangeCentralCooling = this.onChangeCentralCooling.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      yearBuilt: 0,
      stories: 0,
      bedrooms: 0,
      fullBathrooms: 0,
      halfBathrooms: 0,
      totalSquareFeet: 0,
      livableSquareFeet: 0,
      garageSquareFeet: 0,
      garageType: 0,
      fireplace: false,
      pool: false,
      centralHeating: false,
      centralCooling: false,
      latitude: 0,
      longitude: 0,
      users: []
    };
  }

  onChangeYearBuilt(e) {
    this.setState({
      yearBuilt: e.target.value
    });
  }

  onChangeStories(e) {
    this.setState({
      stories: e.target.value
    });
  }

  onChangeBedrooms(e) {
    this.setState({
      bedrooms: e.target.value
    });
  }

  onChangeFullBathrooms(e) {
    this.setState({
      fullBathrooms: e.target.value
    });
  }

  onChangeHalfBathrooms(e) {
    this.setState({
      halfBathrooms: e.target.value
    });
  }

  onChangeTotalSquareFeet(e) {
    this.setState({
      totalSquareFeet: e.target.value
    });
  }

  onChangeLivableSquareFeet(e) {
    this.setState({
      livableSquareFeet: e.target.value
    });
  }

  onChangeGarageSquareFeet(e) {
    this.setState({
      garageSquareFeet: e.target.value
    });
  }

  onChangeGarageType(e) {
    this.setState({
      garageType: e.target.value
    });
  }

  onChangeFireplace(e) {
    this.setState({
      fireplace: true
    });
  }

  onChangePool(e) {
    this.setState({
      pool: true
    });
  }

  onChangeCentralHeating(e) {
    this.setState({
      centralHeating: true
    });
  }
  onChangeCentralCooling(e) {
    this.setState({
      centralCooling: true
    });
  }

  onChangeLatitude(e) {
    this.setState({
      latitude: e.target.value
    });
  }

  onChangeLongitude(e) {
    this.setState({
      longitude: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const property = {
      yearBuilt: this.state.yearBuilt,
      stories: this.state.stories,
      bedrooms: this.state.bedrooms,
      fullBathrooms: this.state.fullBathrooms,
      halfBathrooms: this.state.halfBathrooms,
      totalSquareFeet: this.state.totalSquareFeet,
      livableSquareFeet: this.state.livableSquareFeet,
      garageSquareFeet: this.state.garageSquareFeet,
      garageType: this.state.garageType,
      fireplace: this.state.fireplace,
      pool: this.state.pool,
      centralHeating: this.state.centralHeating,
      centralCooling: this.state.centralCooling,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };

    const token = this.context.token;

    axios
      .post("http://localhost:5000/properties/add", property, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error);
      });

    window.location = "/properties";
  }

  render() {
    return (
      <div>
        <h3>Add new properties</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Year Built: </label>
            <input
              type="number"
              min="1850"
              max="2030"
              placeholder="Year Built"
              pattern="^([0-9]{4})$"
              title="Min: 1850, Max: 2030"
              required
              className="form-control"
              value={this.state.yearBuilt}
              onChange={this.onChangeYearBuilt}
            />
          </div>
          <div className="form-group">
            <label>Stories: </label>
            <input
              type="number"
              min="0"
              max="20"
              title="Min: 0, Max: 20"
              placeholder="Number of stories"
              required
              className="form-control"
              value={this.state.stories}
              onChange={this.onChangeStories}
            />
          </div>
          <div className="form-group">
            <label>Bedrooms: </label>
            <input
              type="number"
              min="0"
              max="50"
              title="Min: 0, Max: 50"
              placeholder="Number of bedrooms"
              required
              className="form-control"
              value={this.state.bedrooms}
              onChange={this.onChangeBedrooms}
            />
          </div>
          <div className="form-group">
            <label>Full Bathrooms: </label>
            <input
              type="number"
              min="0"
              max="20"
              title="Min: 0, Max: 20"
              placeholder="Number of full bathrooms"
              required
              className="form-control"
              value={this.state.fullBathrooms}
              onChange={this.onChangeFullBathrooms}
            />
          </div>
          <div className="form-group">
            <label>Half Bathrooms: </label>
            <input
              type="number"
              min="0"
              max="20"
              title="Min: 0, Max: 20"
              placeholder="Number of half bathrooms"
              required
              className="form-control"
              value={this.state.halfBathrooms}
              onChange={this.onChangeHalfBathrooms}
            />
          </div>
          <div className="form-group">
            <label>Total Square Feet: </label>
            <input
              type="number"
              min="0"
              max="20000"
              title="Min: 0, Max: 20000"
              placeholder="Total square feet"
              required
              className="form-control"
              value={this.state.totalSquareFeet}
              onChange={this.onChangeTotalSquareFeet}
            />
          </div>
          <div className="form-group">
            <label>Livable Square Feet: </label>
            <input
              type="number"
              min="0"
              max="20000"
              title="Min: 0, Max: 20000"
              placeholder="Livable square feet"
              required
              className="form-control"
              value={this.state.livableSquareFeet}
              onChange={this.onChangeLivableSquareFeet}
            />
          </div>
          <div className="form-group">
            <label>Garage Square Feet: </label>
            <input
              type="number"
              min="0"
              max="20000"
              title="Min: 0, Max: 20000"
              placeholder="Livable square feet"
              required
              className="form-control"
              value={this.state.garageSquareFeet}
              onChange={this.onChangeGarageSquareFeet}
            />
          </div>
          <div className="form-group">
            <label>Garage Type: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.garageType}
              onChange={this.onChangeGarageType}
            >
              <option value="1">Attached</option>
              <option value="2">Detached</option>
              <option value="0">None</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fireplace: </label>
            <input
              type="checkbox"
              className="form-control"
              value={this.state.fireplace}
              onChange={this.onChangeFireplace}
            />
          </div>
          <div className="form-group">
            <label>Pool: </label>
            <input
              type="checkbox"
              className="form-control"
              value={this.state.pool}
              onChange={this.onChangePool}
            />
          </div>
          <div className="form-group">
            <label>Central Heating: </label>
            <input
              type="checkbox"
              className="form-control"
              value={this.state.centralHeating}
              onChange={this.onChangeCentralHeating}
            />
          </div>
          <div className="form-group">
            <label>Central Cooling: </label>
            <input
              type="checkbox"
              className="form-control"
              value={this.state.centralCooling}
              onChange={this.onChangeCentralCooling}
            />
          </div>
          <div className="form-group">
            <label>Latitude: </label>
            <input
              type="number"
              step="00.0000001"
              min="-90"
              max="90"
              placeholder="Latitude (00.0000000)"
              pattern="^([0-9]{1,2}\.[0-9]{3,7})$"
              title="Min: -90, Max:90, Decimal max:7, 00.0000000"
              className="form-control"
              value={this.state.latitude}
              onChange={this.onChangeLatitude}
            />
          </div>
          <div className="form-group">
            <label>Longitude: </label>
            <input
              type="number"
              step="00.0000001"
              min="-180"
              max="180"
              placeholder="Longitude (00.0000000)"
              pattern="^([0-9]{1,2}\.[0-9]{3,7})$"
              title="Min: -180, Max:180, Decimal max:7, 00.0000000"
              className="form-control"
              value={this.state.longitude}
              onChange={this.onChangeLongitude}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add Properties"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
