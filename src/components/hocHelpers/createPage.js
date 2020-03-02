import React from "react";
import Row from "../row";

const createPage = (itemId, List, Details) => {
  return class extends React.Component {
    state = {
      selectedItem: itemId,
      listClass: `choose-item`,
      detailsClass: `item`,
      componentLoading: false
    };
    onItemSelected(id) {
      this.setState(({selectedItem}) => {
        return {
          selectedItem: id
        };
      });
    }

    rotateBlock = () => {
      this.setState(({listClass, detailsClass}) => {
        const defListClass = `choose-item rotate-list`;
        const rotateList = `choose-item`;
        const defDetailsClass = `item`;
        const rotateDetails = `item rotate-details`;
        return {
          listClass: listClass === defListClass ? rotateList : defListClass,
          detailsClass:
            detailsClass === rotateDetails ? defDetailsClass : rotateDetails
        };
      });
    };

    checkLoading = loading => {
      this.setState(({componentLoading}) => {
        return {
          componentLoading: loading
        };
      });
    };

    render() {
        const {selectedItem, listClass, detailsClass, componentLoading} = this.state;
        return (
          <Row
            left={
              <List
                onItemSelected={(id, type) => this.onItemSelected(id, type)}
                changeClass={listClass}
                checkLoading={this.checkLoading}
                rotateBlock = {this.rotateBlock}
                mobile = {this.props.mobile}
                load = {componentLoading}
              />
            }
            right={
              <Details
                itemId={selectedItem}
                changeClass={detailsClass}
                checkLoading={this.checkLoading}
              />
            }
            rotateBlock={{rotate: this.rotateBlock, componentLoading}}
          />
        );
      }
  };
};

export default createPage;
