var _templateObject;
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
import React, { useEffect, createRef, useState } from 'react';
import { styled } from '@superset-ui/core';
import { BubbleChart } from './components/BubbleChart';

// The following Styles component is a <div> element, which has been styled using Emotion
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
  var _props$filterState$fi, _props$filterState;
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  var {
    data,
    height,
    width
  } = props;
  var rootElem = /*#__PURE__*/createRef();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    var root = rootElem.current;
    console.log('Plugin element', root);
  });
  console.log('Plugin props', props);
  var [filterPost, setFilterPost] = useState((_props$filterState$fi = (_props$filterState = props.filterState) == null || (_props$filterState = _props$filterState.filters) == null ? void 0 : _props$filterState.id_page) != null ? _props$filterState$fi : []);
  useEffect(() => {
    console.log('useEffect de BubblePlot:', filterPost);
    var dataMask = {
      extraFormData: {
        filters: filterPost.length > 0 ? ['id_page'].map((col, idx) => {
          return {
            col,
            op: 'IN',
            val: filterPost.map(row => row.id_page)
          };
        }) : []
      },
      filterState: {
        value: [filterPost.map(row => row.id_page)],
        selectedValues: ['any'],
        filters: {
          'id_page': filterPost
        }
      }
    };
    //console.log('dataMask', dataMask);
    props.setDataMask(dataMask);
  }, [filterPost]);
  return /*#__PURE__*/React.createElement(BubbleChart, {
    data: data,
    width: width,
    height: height,
    filterPosts: filterPost,
    setFilterPost: setFilterPost
  })

  // <Styles
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
  //   {/* <pre>
  //     {JSON.stringify(data, null, 2)}
  //   </pre> */}
  // </Styles>
  ;
}