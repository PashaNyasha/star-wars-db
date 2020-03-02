import React from "react";
import "./Row.css";
import PropTypes from "prop-types";

const Row = ({left, right, rotateBlock: {rotate, componentLoading}}) => {
  return (
    <div className="show-item">
      <button
        className="rotate-block"
        disabled={componentLoading}
        onClick={rotate}
      >
        &#xedff;
      </button>
      <div className="items-wrapper">
        {left}
        {right}
      </div>
    </div>
  );
};

Row.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node
};

export default Row;
