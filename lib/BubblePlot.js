"use strict";

exports.__esModule = true;
exports.default = BubblePlot;

var _react = _interopRequireWildcard(require("react"));

var _BubbleChart = require("./components/BubbleChart");

var _core = require("@superset-ui/core");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */
function BubblePlot(props) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  var {
    data,
    height,
    width,
    filters,
    setDataMask,
    emitCrossFilters,
    all_columns,
    active_selection
  } = props;
  var data2 = data.map(value => {
    var prop = {};
    all_columns.forEach(column => {
      if (typeof column === 'string') {
        prop[column] = value[column];
      } else if (typeof column === 'object') {
        // Usa 'label' o 'sqlExpression' según tus necesidades
        prop[column.label] = value[column.sqlExpression];
      }
    });
    return prop;
  });
  console.log('Plugin Bubble props', props);
  var [filterPost, setFilterPost] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    setFilterPost((filters == null ? void 0 : filters.ID_PAGE) || []);
  }, [filters]);
  var isActiveFilterValue = (0, _react.useCallback)(function isActiveFilterValue(key, val) {
    var _filters$key2;

    if (Array.isArray(val)) {
      return !!filters && val.some(v => {
        var _filters$key;

        return (_filters$key = filters[key]) == null ? void 0 : _filters$key.includes(v);
      });
    }

    return !!filters && ((_filters$key2 = filters[key]) == null ? void 0 : _filters$key2.includes(val));
  }, [filters]);

  var getCrossFilterDataMask = (key, results) => {
    var updatedFilters = _extends({}, filters || {});

    var keys = [];
    var value = [];
    results.forEach(item => {
      var key = item.dataContext.user;
      var val = item.dataContext.ID_PAGE;
      keys.push(key);
      value.push(val);
    });

    if (filters && isActiveFilterValue(key, value)) {
      updatedFilters = {};
    } else {
      updatedFilters = {
        [key]: Array.isArray(value) ? value : [value]
      };
    }

    if (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0) {
      delete updatedFilters[key];
    }

    var groupBy = Object.keys(updatedFilters);
    var groupByValues = Object.values(updatedFilters);
    var labelElements = [];
    groupBy.forEach(col => {
      var _updatedFilters;

      var filterValues = (0, _core.ensureIsArray)((_updatedFilters = updatedFilters) == null ? void 0 : _updatedFilters[col]);

      if (filterValues.length) {
        var valueLabels = filterValues;
        labelElements.push("" + valueLabels.join(', '));
      }
    });
    return {
      dataMask: {
        extraFormData: {
          filters: groupBy.length === 0 ? [] : groupBy.map(col => {
            var _updatedFilters2;

            var val = (0, _core.ensureIsArray)((_updatedFilters2 = updatedFilters) == null ? void 0 : _updatedFilters2[col]);
            if (!val.length) return {
              col,
              op: 'IS NULL'
            };
            return {
              col,
              op: 'IN',
              val: val.map(el => el)
            };
          })
        },
        filterState: {
          label: keys.join(', '),
          value: groupByValues.length ? groupByValues : null,
          filters: updatedFilters && Object.keys(updatedFilters).length ? updatedFilters : null
        }
      },
      isCurrentValueSelected: false
    };
  };

  var toggleFilter = (0, _react.useCallback)(function toggleFilter(key, val) {
    if (!emitCrossFilters) {
      return;
    }

    setDataMask(getCrossFilterDataMask(key, val).dataMask);
  }, [emitCrossFilters, getCrossFilterDataMask, setDataMask]);
  return /*#__PURE__*/_react.default.createElement(_BubbleChart.BubbleChart, {
    data: data2.filter(item => {
      if (filterPost.length > 0) {
        console.log('Item:', item);
        return filterPost.includes(item.ID_PAGE);
      }

      return true;
    }),
    width: width,
    height: height,
    filterPosts: filterPost,
    isFiltereable: active_selection,
    setFilterPost: active_selection ? toggleFilter : () => {}
  });
}