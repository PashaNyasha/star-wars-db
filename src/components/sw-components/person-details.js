import React from "react";
import ItemDetails from "../item-details/ItemDetails";
import {detailsWithData, withSwapiService} from "../hocHelpers";

const Person = detailsWithData(ItemDetails);

const PersonDetails = props => <Person {...props} />;

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPerson
  };
};

export default withSwapiService(PersonDetails, mapMethodsToProps);
