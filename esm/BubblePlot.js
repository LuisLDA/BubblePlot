var _templateObject;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { createRef, useCallback, useState } from 'react'; //import { styled } from '@superset-ui/core';

import { BubbleChart } from './components/BubbleChart';
import { ensureIsArray, styled } from '@superset-ui/core'; // The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

var Styles = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  padding: ", "px;\n  border-radius: ", "px;\n  height: ", "px;\n  width: ", "px;\n\n  h3 {\n    /* You can use your props to control CSS! */\n    margin-top: 0;\n    margin-bottom: ", "px;\n    font-size: ", "px;\n    font-weight: ", ";\n  }\n\n  pre {\n    height: ", "px;\n  }\n"])), _ref => {
  var {
    theme
  } = _ref;
  return theme.colors.secondary.light2;
}, _ref2 => {
  var {
    theme
  } = _ref2;
  return theme.gridUnit * 4;
}, _ref3 => {
  var {
    theme
  } = _ref3;
  return theme.gridUnit * 2;
}, _ref4 => {
  var {
    height
  } = _ref4;
  return height;
}, _ref5 => {
  var {
    width
  } = _ref5;
  return width;
}, _ref6 => {
  var {
    theme
  } = _ref6;
  return theme.gridUnit * 3;
}, _ref7 => {
  var {
    theme,
    headerFontSize
  } = _ref7;
  return theme.typography.sizes[headerFontSize];
}, _ref8 => {
  var {
    theme,
    boldText
  } = _ref8;
  return theme.typography.weights[boldText ? 'bold' : 'normal'];
}, _ref9 => {
  var {
    theme,
    headerFontSize,
    height
  } = _ref9;
  return height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize];
});
/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function BubblePlot(props) {
  var _props$filterState$fi, _props$filterState, _props$filterState$fi2;

  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  var {
    data,
    height,
    width,
    filters,
    setDataMask,
    emitCrossFilters,
    all_columns
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
  }); //console.log('DATA BUBBLEPLOT22 :', data2);

  var rootElem = /*#__PURE__*/createRef(); // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  // useEffect(() => {
  //   const root = rootElem.current as HTMLElement;
  //   console.log('Plugin element', root);
  // });

  console.log('Plugin Bubble props', props);
  var [filterPost, setFilterPost] = useState((_props$filterState$fi = (_props$filterState = props.filterState) == null ? void 0 : (_props$filterState$fi2 = _props$filterState.filters) == null ? void 0 : _props$filterState$fi2.ID_PAGE) != null ? _props$filterState$fi : []); //const [filterPost, setFilterPost] = useState([]);

  var isActiveFilterValue = useCallback(function isActiveFilterValue(key, val) {
    var _filters$key2;

    if (Array.isArray(val)) {
      return !!filters && val.some(v => {
        var _filters$key;

        return (_filters$key = filters[key]) == null ? void 0 : _filters$key.includes(v);
      });
    }

    return !!filters && ((_filters$key2 = filters[key]) == null ? void 0 : _filters$key2.includes(val));
  }, [filters]);

  var getCrossFilterDataMask = (key, value) => {
    var updatedFilters = _extends({}, filters || {});

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

      var filterValues = ensureIsArray((_updatedFilters = updatedFilters) == null ? void 0 : _updatedFilters[col]);

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

            var val = ensureIsArray((_updatedFilters2 = updatedFilters) == null ? void 0 : _updatedFilters2[col]);
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
          label: labelElements.join(', '),
          value: groupByValues.length ? groupByValues : null,
          filters: updatedFilters && Object.keys(updatedFilters).length ? updatedFilters : null
        }
      },
      isCurrentValueSelected: false
    };
  };

  var toggleFilter = useCallback(function toggleFilter(key, val) {
    if (!emitCrossFilters) {
      return;
    }

    setDataMask(getCrossFilterDataMask(key, val).dataMask);
  }, [emitCrossFilters, getCrossFilterDataMask, setDataMask]);
  /*useEffect(() => {
    console.log('DATA BUBBLEPLOT :', filterPost);
    const dataMask = {
      extraFormData: {
        filters:
          filterPost.length > 0 ? ['ID_PAGE'].map((col, idx) => {
            return {
              col,
              op: 'IN' as const,
              val: filterPost as (string | number | boolean)[],
            };
          }) : [],
      },
      filterState: {
        label: 'ID_PAGE',
        value: filterPost,
        //selectedValues: ['any'],
        filters: {
          'ID_PAGE': filterPost,
        }
      },
    };
    console.log('dataMask bubble', dataMask);
    props.setDataMask(dataMask);
  }, [filterPost])*/

  return /*#__PURE__*/React.createElement(BubbleChart, {
    data: data2,
    width: width,
    height: height,
    filterPosts: filterPost,
    setFilterPost: toggleFilter
  }) // <Styles
  //   ref={rootElem}
  //   boldText={props.boldText}
  //   headerFontSize={props.headerFontSize}
  //   height={height}
  //   width={width}
  // >
  // </Styles>
  // <Styles
  //   ref={rootElem}
  //   boldText={props.boldText}
  //   headerFontSize={props.headerFontSize}
  //   height={height}
  //   width={width}
  // >
  //   <button onClick={() => toggleFilter("ID_PAGE", ["100109035146827", "100113755207433"])}>Set Filter</button>
  //   <pre>
  //     {JSON.stringify(data, null, 2)}
  //   </pre>
  // </Styles>
  ;
}