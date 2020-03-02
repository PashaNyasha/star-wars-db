import React from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundary from "../ErrorBoundary";
import SwapiService from "../../services/swapi-service/swapi-service.js";
import {SwapiProvider} from "../swapi-service-context";
import {PeoplePage, PlanetPage, StarshipPage, TestPage} from "../pages";

export default class App extends React.Component {
  state = {
    mobile: false
  };

  swapiService = new SwapiService();

  componentDidMount() {
    const updateState = () => {
      this.setState(() => {
        return {
          mobile: width <= 500 ? true : false
        };
      });
    };

    let width = document.documentElement.clientWidth;
    updateState();
    window.onresize = e => {
      width = document.documentElement.clientWidth;
      updateState();
    };
  }

  render() {
    return (
      <ErrorBoundary>
        <SwapiProvider value={this.swapiService}>
          <div className="container">
            <Header />
            <main className="page-main">
              <RandomPlanet />
              <PeoplePage mobile={this.state.mobile} />

              <PlanetPage mobile={this.state.mobile} />

              <StarshipPage mobile={this.state.mobile} />
            </main>
          </div>
        </SwapiProvider>
      </ErrorBoundary>
    );
  }
}
