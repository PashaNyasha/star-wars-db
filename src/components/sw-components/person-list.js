import React from "react";
import ItemList from "../item-list";
import {withData, withSwapiService} from "../hocHelpers";

const Person = withData(ItemList);

const PersonList = props => <Person {...props} />;

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPeople
  };
};

export default withSwapiService(PersonList, mapMethodsToProps);