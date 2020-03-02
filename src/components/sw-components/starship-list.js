import React from "react";
import ItemList from "../item-list";
import {withData, withSwapiService} from "../hocHelpers";

const Starship = withData(ItemList);

const StarshipList = props => <Starship {...props} />;

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllStarships
  };
};

export default withSwapiService(StarshipList, mapMethodsToProps);