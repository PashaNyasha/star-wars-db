import React from "react";
import ItemList from "../item-list";
import {withData, withSwapiService} from "../hocHelpers";

const Planet = withData(ItemList);

const PlanetList = props => <Planet {...props} />;

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPlanets
  };
};

export default withSwapiService(PlanetList, mapMethodsToProps);
