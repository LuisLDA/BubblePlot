import React, { useState, useEffect } from 'react';
import { Select, Space } from 'antd';
import { useFilter } from '../hooks/useFilter';
import { mapToBubbleData } from '../data/mappers';
import { useBubbleGraph } from '../hooks/useBubbleGraph';
import { Tag } from "antd";
import { FilterOutlined } from '@ant-design/icons';
export var BubbleChart = _ref => {
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
  } = useFilter({
    valueX: optionsDropdown[0].value,
    valueY: optionsDropdown[1].value
  });
  var [dataAxis, setDataAxis] = useState(mapToBubbleData(data, filterAxisX, filterAxisY));
  useBubbleGraph({
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

  useEffect(() => {
    setDataAxis(mapToBubbleData(data, filterAxisX, filterAxisY));
  }, [filterAxisX, filterAxisY, data]);
  var restHeight = height - 40;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      width: width,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Space, {
    wrap: true
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: filterAxisY,
    variant: "borderless",
    placement: "bottomRight",
    style: {
      width: 120,
      transform: "rotate(-90deg)"
    },
    onChange: setFilterAxisY,
    options: optionsDropdown.filter(option => option !== undefined && option.value !== filterAxisX)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "customBubblediv",
    style: {
      width: "100%",
      height: restHeight
    }
  }), /*#__PURE__*/React.createElement(Select, {
    defaultValue: filterAxisX,
    variant: "borderless",
    style: {
      width: 120
    },
    onChange: setFilterAxisX,
    options: optionsDropdown.filter(option => option !== undefined && option.value !== filterAxisY)
  })), filterPosts.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 20,
      right: 20
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "#2db7f5",
    closable: true,
    style: {
      userSelect: 'none'
    },
    onClose: () => setFilterPost([])
  }, /*#__PURE__*/React.createElement(FilterOutlined, null)))));
};