"use strict";

exports.__esModule = true;
exports.BubbleChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _useFilter = require("../hooks/useFilter");

var _mappers = require("../data/mappers");

var _useBubbleGraph = require("../hooks/useBubbleGraph");

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BubbleChart = _ref => {
  var {
    data,
    width,
    height,
    filterPosts,
    setFilterPost
  } = _ref;
  var optionsDropdown = Object.keys(data[0]).filter(key => !(key === "ID" || key === "ID_PAGE" || key === "USERNAME" || key === "RED" || key === "RED_NAME")).map(key => ({
    value: key,
    label: key
  }));
  var {
    filterAxisX,
    filterAxisY,
    setFilterAxisX,
    setFilterAxisY
  } = (0, _useFilter.useFilter)({
    valueX: optionsDropdown[0].value,
    valueY: optionsDropdown[1].value
  });
  var [dataAxis, setDataAxis] = (0, _react.useState)((0, _mappers.mapToBubbleData)(data, filterAxisX, filterAxisY));
  (0, _useBubbleGraph.useBubbleGraph)({
    id: "customBubblediv",
    filterAxisX,
    filterAxisY,
    dataAxis,
    setFilterPost
  });
  /*if (resultsSelected && resultsSelected.length > 0) {
    console.log('Selected BubbleChart:', resultsSelected);
    setFilterPost(resultsSelected.map(item => ({ ID_PAGE: item })));
  }*/

  (0, _react.useEffect)(() => {
    setDataAxis((0, _mappers.mapToBubbleData)(data, filterAxisX, filterAxisY));
  }, [filterAxisX, filterAxisY, data]);
  var restHeight = height - 40;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      width: width,
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    wrap: true
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    defaultValue: filterAxisY,
    variant: "borderless",
    placement: "bottomRight",
    style: {
      width: 120,
      transform: "rotate(-90deg)"
    },
    onChange: setFilterAxisY,
    options: optionsDropdown.filter(option => option !== undefined && option.value !== filterAxisX)
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "customBubblediv",
    style: {
      width: "100%",
      height: restHeight
    }
  }), /*#__PURE__*/_react.default.createElement(_antd.Select, {
    defaultValue: filterAxisX,
    variant: "borderless",
    style: {
      width: 120
    },
    onChange: setFilterAxisX,
    options: optionsDropdown.filter(option => option !== undefined && option.value !== filterAxisY)
  })), filterPosts.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      top: 20,
      right: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "#2db7f5",
    closable: true,
    style: {
      userSelect: 'none'
    },
    onClose: () => setFilterPost("ID_PAGE", [])
  }, /*#__PURE__*/_react.default.createElement(_icons.FilterOutlined, null)))));
};

exports.BubbleChart = BubbleChart;