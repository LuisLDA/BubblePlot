"use strict";

exports.__esModule = true;
exports.useFilter = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var useFilter = _ref => {
  var {
    valueX,
    valueY
  } = _ref;
  var [filter, setFilter] = (0, _react.useState)({
    filterAxisX: valueX,
    filterAxisY: valueY
  });
  var {
    filterAxisX,
    filterAxisY
  } = filter;
  var setFilterAxisX = value => {
    //console.log(`selected X: ${value}`);
    setFilter(_extends({}, filter, {
      filterAxisX: value
    }));
  };
  var setFilterAxisY = value => {
    //console.log(`selected Y: ${value}`);
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
exports.useFilter = useFilter;