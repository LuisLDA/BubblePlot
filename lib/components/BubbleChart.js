"use strict";

exports.__esModule = true;
exports.BubbleChart = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _useFilter = require("../hooks/useFilter");
var _mappers = require("../data/mappers");
var _useBubbleGraph = require("../hooks/useBubbleGraph");
var _icons = require("@ant-design/icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var BubbleChart = _ref => {
  var {
    data,
    width,
    height,
    filterPosts,
    setFilterPost
  } = _ref;
  var {
    filterAxisX,
    filterAxisY,
    setFilterAxisX,
    setFilterAxisY
  } = (0, _useFilter.useFilter)({
    valueX: "Comentarios",
    valueY: "Compartidos"
  });
  var optionsDropdown = Object.keys(data[0]).filter(key => !(key === "id" || key === "id_page" || key === "username" || key === "red" || key === "red_name")).map(key => ({
    value: key,
    label: key
  }));
  var [dataAxis, setDataAxis] = (0, _react.useState)((0, _mappers.mapToBubbleData)(data, filterAxisX, filterAxisY));
  var {
    resultsSelected
  } = (0, _useBubbleGraph.useBubbleGraph)({
    id: "chartdiv",
    filterAxisX,
    filterAxisY,
    dataAxis
  });
  if (resultsSelected && resultsSelected.length > 0) {
    console.log('Selected BubbleChart:', resultsSelected);
    setFilterPost(resultsSelected.map(item => ({
      id_page: item
    })));

    // @ts-ignore
    setFilterPost(resultsSelected.map(item => ({
      id_page: item
    })));
  }
  (0, _react.useEffect)(() => {
    setDataAxis((0, _mappers.mapToBubbleData)(data, filterAxisX, filterAxisY));
  }, [filterAxisX, filterAxisY]);
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
    id: "chartdiv",
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
    onClose: () => setFilterPost([])
  }, /*#__PURE__*/_react.default.createElement(_icons.FilterOutlined, null)))));
};
exports.BubbleChart = BubbleChart;