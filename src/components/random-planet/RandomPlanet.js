import React from "react";
import SwapiService from "../../services/swapi-service/swapi-service.js";
import "./RandomPlanet.css";
import Spinner from "../spinner";
import ErrorIndicator from "../Error-indicator";
import PropTypes from "prop-types";

class RandomPlanet extends React.Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25 + 3);
    // Получить данные по планете
    const {getPlanet} = this.swapiService;
    
    getPlanet(id)
      .then(planet => {
        this.setState({planet, loading: false});
        setTimeout(() => this.updatePlanet(), 5000);
      })
      .catch(() => this.setState({error: true, loading: false}));
  };

  componentDidMount() {
    this.updatePlanet();
  }

  render() {
    const {planet, loading, error} = this.state;

    const hasData = !(loading || error);

    const errorIndicator = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetWiev planet={planet} /> : null;

    return (
      <div className="random-planet">
        <div className="planet">
          {errorIndicator}
          {spinner}
          {content}
        </div>
      </div>
    );
  }
}

const PlanetWiev = ({planet}) => {
  const {name, population, rotationPeriod, diameter, image} = planet;
  return (
    <React.Fragment>
      <div className="planet-image-wrap">
        <div className="planet-image">
          <img src={image} alt="" />
        </div>
      </div>

      <div className="planet-desc">
        <div className="planet-info">
          <h2>{name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Population:</td>
                <td>{population}</td>
              </tr>

              <tr>
                <td>Rotation Period:</td>
                <td>{rotationPeriod}</td>
              </tr>

              <tr>
                <td>Diameter:</td>
                <td>{diameter}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RandomPlanet;
