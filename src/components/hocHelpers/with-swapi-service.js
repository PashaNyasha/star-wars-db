import React from "react";
import {SwapiConsumer} from "../swapi-service-context";

const withSwapiService = (Wrapped, mapMethodsToProps) => {
  return props => {
    return (
      <SwapiConsumer>
        {swapiService => {
          const serviceProps = mapMethodsToProps(swapiService);
          return <Wrapped {...props} {...serviceProps} />;
        }}
      </SwapiConsumer>
    );
  };
};
export default withSwapiService;