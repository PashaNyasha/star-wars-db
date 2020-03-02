import React from "react";
import "./ItemDetails.css";

const Record = ({item, field, label}) => {
  return (
    <dl>
      <dt>{label}:</dt>
      <dd>{item[field]}</dd>
    </dl>
  );
};
export {Record};

const ItemDetails = props => {
  const showDetails = item => {
    const {image, name} = item;

    return (
      <React.Fragment>
        <h3 className="item-name">{name}</h3>

        <div className="item-image">
          <img src={image} alt="" />
        </div>

        <div className="item-data">
          {React.Children.map(props.children, child => {
            return React.cloneElement(child, {item});
          })}
        </div>
      </React.Fragment>
    );
  };

  const {item, spinner, error, loadingClass} = props.data;
  const data = !item ? null : showDetails(item);
  const itemClass = loadingClass
    ? `item-details ${loadingClass}`
    : `item-details`;
  const {changeClass} = props;
  return (
    <div className={changeClass}>
      {error}
      {spinner}
      <div className={itemClass}>{data}</div>
    </div>
  );
};

export default ItemDetails;
