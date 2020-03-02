import React from "react";
import "./ItemList.css";
import PropTypes from "prop-types";

const ItemList = props => {
  const itemSelect = (e, id, type) => {
    e.preventDefault();
    const {onItemSelected, mobile, mobileButton} = props;
    if (mobile) mobileButton();
    onItemSelected(id, type);
  };

  const renderItems = arr => {
    return arr.map((elem, i) => {
      const {id, active, type, name} = elem;

      return (
        <li
          key={id}
          onClick={e => {
            e.preventDefault();
            itemSelect(e, id, type);
            props.activateItem(i, arr);
          }}
        >
          <a href="./" className={active}>
            {name}
          </a>
        </li>
      );
    });
  };

  const {load, errorIdicator, data, loadingClass} = props.rest;
  const {changeClass} = props;
  const items = data ? renderItems(data) : null;
  return (
    <div className={changeClass}>
      <div className="item-list">
        <nav>
          {load}
          {errorIdicator}
          <ul
            className={loadingClass}
            onScroll={props.lazyLoad}
          >
            {items}
          </ul>
        </nav>
      </div>
    </div>
  );
};

ItemList.defaultProps = {
  onItemSelected: () => {}
};

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.func
};
export default ItemList;
