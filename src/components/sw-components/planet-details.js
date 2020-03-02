import React from "react";
import ItemDetails from "../item-details/ItemDetails";
import {detailsWithData, withSwapiService} from "../hocHelpers";

const Planet = detailsWithData(ItemDetails);

const PlanetDetails = props => <Planet {...props} />;

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPlanet
  };
};
export default withSwapiService(PlanetDetails, mapMethodsToProps);