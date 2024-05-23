import React, { useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { getRandomColor } from '../utils/getRandomColor';
import am5locales_de_DE from "@amcharts/amcharts5/locales/de_DE";
export var useBubbleGraph = _ref => {
  var {
    id,
    filterAxisX,
    filterAxisY,
    dataAxis
  } = _ref;
  var [resultsSelected, setResultsSelected] = useState([]);

  /*useEffect(() => {
      const filterPostSelecteds = resultsSelected.map((id) => {
          //return data.find((row) => row.id_page === id);
          return { id_page: id }
      }) ?? [];
       console.log("filterPostSelecteds", filterPostSelecteds);
      setFilterPost(filterPostSelecteds);
  }, [resultsSelected])*/

  var tooltipHtml = "\n      <div style=\"display:flex;gap:8px;align-items:center;\">\n        <div style=\"display:flex;flex-direction:column\">\n            <img src=\"{bulletSettings.src}\" style=\"width: 50px; height: 50px; margin: 0 auto; display: block; border-radius: 25px\"/>      \n        </div>\n        <div style=\"display:flex;flex-direction:column\">\n            <span style=\"font-weight:bold;\">Usuario:</span>\n            <span style=\"font-weight:bold;\">Red Social:</span>\n            <span style=\"font-weight:bold;\">" + filterAxisX + ":</span>\n            <span style=\"font-weight:bold;\">" + filterAxisY + ":</span>\n            <span style=\"font-weight:bold;\">Interacciones:</span>\n        </div>\n        <div style=\"display:flex;flex-direction:column\">\n            <span style=\"float: right;\">{user}</span>\n            <span style=\"float: right;\">{red}</span>\n            <span style=\"float: right;\">{valueX}</span>\n            <span style=\"float: right;\">{valueY}</span>\n            <span style=\"float: right;\">{value}</span>\n        </div>\n     </div>";
  useLayoutEffect(() => {
    var _root$_logo, _tooltip$get;
    var root = am5.Root.new(id);
    (_root$_logo = root._logo) == null || _root$_logo.dispose();
    root.setThemes([am5themes_Animated.new(root)]);
    root.locale = am5locales_de_DE;
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelY: "zoomXY",
      pinchZoomX: true,
      pinchZoomY: true
    }));
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      renderer: am5xy.AxisRendererX.new(root, {})
      //tooltip: am5.Tooltip.new(root, {}),
    }));

    // xAxis.children.moveValue(am5.Label.new(root, {
    //   text: filterAxisX,
    //   x: am5.p50,
    //   centerX: am5.p50
    // }), xAxis.children.length - 1);

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: false
      })
      //tooltip: am5.Tooltip.new(root, {})
    }));

    // yAxis.children.moveValue(am5.Label.new(root, {
    //   rotation: -90,
    //   text: filterAxisY,
    //   y: am5.p50,
    //   centerX: am5.p50
    // }), 0);

    var tooltip = am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      getFillFromSprite: false,
      labelHTML: tooltipHtml
    });
    tooltip == null || (_tooltip$get = tooltip.get("background")) == null || _tooltip$get.setAll({
      fill: am5.color(0x222222),
      fillOpacity: 0.8
    });
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      calculateAggregates: true,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "y",
      valueXField: "x",
      valueField: "value",
      //maskBullets: false,
      seriesTooltipTarget: "bullet",
      tooltip: tooltip
    }));
    series.strokes.template.set("visible", false);

    // Add bullet
    var imageTemplate = am5.Template.new({});
    imageTemplate.setAll({
      templateField: "bulletSettings",
      centerX: am5.p50,
      centerY: am5.p50,
      width: 68,
      height: 68
    });
    var circleTemplate = am5.Template.new({});
    circleTemplate.adapters.add("fill", function (fill, target) {
      var dataItem = target.dataItem;
      if (dataItem) {
        return am5.Color.fromString(getRandomColor());
      }
      return fill;
    });
    series.bullets.push(function () {
      var bulletContainer = am5.Container.new(root, {});
      var circle = bulletContainer.children.push(am5.Circle.new(root, {
        radius: 16,
        fillOpacity: 0.7
      }, circleTemplate));
      var imageContainer = bulletContainer.children.push(am5.Container.new(root, {
        mask: circle
      }));
      var image = imageContainer.children.push(am5.Picture.new(root, {}, imageTemplate));
      return am5.Bullet.new(root, {
        sprite: bulletContainer
      });
    });
    setHeatRules(series, circleTemplate, imageTemplate);
    series.data.setAll(dataAxis);
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      //xAxis: xAxis,
      //yAxis: yAxis,
      //snapToSeries: [series],
      behavior: "selectXY"
    }));
    cursor.events.on("selectended", function (ev) {
      // Get actors
      var cursor = ev.target;
      console.log("Evento Target:", cursor);
      var x1 = xAxis.positionToValue(xAxis.toAxisPosition(cursor.getPrivate("downPositionX")));
      var x2 = xAxis.positionToValue(xAxis.toAxisPosition(cursor.getPrivate("positionX")));
      var y1 = yAxis.positionToValue(yAxis.toAxisPosition(cursor.getPrivate("downPositionY")));
      var y2 = yAxis.positionToValue(yAxis.toAxisPosition(cursor.getPrivate("positionY")));

      // Assemble bounds
      var bounds = {
        left: x1 > x2 ? x2 : x1,
        right: x1 > x2 ? x1 : x2,
        top: y1 < y2 ? y1 : y2,
        bottom: y1 < y2 ? y2 : y1
      };

      // Filter data items within boundaries
      var results = [];
      am5.array.each(series.dataItems, function (dataItem) {
        var x = dataItem.get("valueX");
        var y = dataItem.get("valueY");
        //let z = dataItem.get("valueZ");
        if (am5.math.inBounds({
          x: x,
          y: y
        }, bounds)) {
          results.push(dataItem);
        }
      });

      // Results
      //console.log(results);

      /*const filterPostSelecteds = results.map((item) => item.dataContext!!.id_page).map((id) => {
          //return data.find((row) => row.id_page === id);
          return { id_page: id }
      }) ?? [];
       console.log("filterPostSelecteds", filterPostSelecteds);
      setFilterPost(filterPostSelecteds);*/

      // @ts-ignore
      //console.log(results.map((item) => item.dataContext!!.id_page));
      // @ts-ignore

      // @ts-ignore
      setResultsSelected(results.map(item => item.dataContext.id_page));
    });

    //setScrollbars(chart, root);

    series.appear(1000);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [dataAxis]);
  return {
    dataAxis,
    filterAxisX,
    filterAxisY,
    resultsSelected
  };
};
var setScrollbars = (chart, root) => {
  chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal"
  }));
  chart.set("scrollbarY", am5.Scrollbar.new(root, {
    orientation: "vertical"
  }));
};
var setHeatRules = (series, circleTemplate, imageTemplate) => {
  series.set("heatRules", [{
    target: circleTemplate,
    min: 3,
    max: 60,
    dataField: "value",
    key: "radius"
  }, {
    target: imageTemplate,
    min: 6,
    max: 120,
    dataField: "value",
    key: "width"
  }, {
    target: imageTemplate,
    min: 6,
    max: 120,
    dataField: "value",
    key: "height"
  }]);
};