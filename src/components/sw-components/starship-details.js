import React from "react";
import ItemDetails from "../item-details/ItemDetails";
import {detailsWithData, withSwapiService} from "../hocHelpers";

const Starship = detailsWithData(ItemDetails);

const StarshipDetails = props => <Starship {...props} />;

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getStarship
  };
};

export default withSwapiService(StarshipDetails, mapMethodsToProps);
