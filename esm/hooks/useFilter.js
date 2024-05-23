function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useState } from "react";
export var useFilter = _ref => {
  var {
    valueX,
    valueY
  } = _ref;
  var [filter, setFilter] = useState({
    filterAxisX: valueX,
    filterAxisY: valueY
  });
  var {
    filterAxisX,
    filterAxisY
  } = filter;
  var setFilterAxisX = value => {
    console.log("selected X: " + value);
    setFilter(_extends({}, filter, {
      filterAxisX: value
    }));
  };
  var setFilterAxisY = value => {
    console.log("selected Y: " + value);
    setFilter(_extends({}, filter, {
      filterAxisY: value
    }));
  };
  return {
    filterAxisX,
    filterAxisY,
    setFilterAxisX,
    setFilterAxisY
  };
};