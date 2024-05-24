"use strict";

exports.__esModule = true;
exports.useBubbleGraph = void 0;
var _react = _interopRequireWildcard(require("react"));
var am5 = _interopRequireWildcard(require("@amcharts/amcharts5"));
var am5xy = _interopRequireWildcard(require("@amcharts/amcharts5/xy"));
var _Animated = _interopRequireDefault(require("@amcharts/amcharts5/themes/Animated"));
var _getRandomColor = require("../utils/getRandomColor");
var _de_DE = _interopRequireDefault(require("@amcharts/amcharts5/locales/de_DE"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var useBubbleGraph = _ref => {
  var {
    id,
    filterAxisX,
    filterAxisY,
    dataAxis,
    setFilterPost
  } = _ref;
  var tooltipHtml = "\n      <div style=\"display:flex;gap:8px;align-items:center;\">\n        <div style=\"display:flex;flex-direction:column\">\n            <img src=\"{bulletSettings.src}\" style=\"width: 50px; height: 50px; margin: 0 auto; display: block; border-radius: 25px\"/>      \n        </div>\n        <div style=\"display:flex;flex-direction:column\">\n            <span style=\"font-weight:bold;\">Usuario:</span>\n            <span style=\"font-weight:bold;\">Red Social:</span>\n            <span style=\"font-weight:bold;\">" + filterAxisX + ":</span>\n            <span style=\"font-weight:bold;\">" + filterAxisY + ":</span>\n            <span style=\"font-weight:bold;\">Interacciones:</span>\n        </div>\n        <div style=\"display:flex;flex-direction:column\">\n            <span style=\"float: right;\">{user}</span>\n            <span style=\"float: right;\">{red}</span>\n            <span style=\"float: right;\">{valueX}</span>\n            <span style=\"float: right;\">{valueY}</span>\n            <span style=\"float: right;\">{value}</span>\n        </div>\n     </div>";
  (0, _react.useLayoutEffect)(() => {
    var _root$_logo, _tooltip$get;
    var root = am5.Root.new(id);
    (_root$_logo = root._logo) == null || _root$_logo.dispose();
    root.setThemes([_Animated.default.new(root)]);
    root.locale = _de_DE.default;
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
        return am5.Color.fromString((0, _getRandomColor.getRandomColor)());
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
      console.log(results);
      // @ts-ignore
      setFilterPost(results.map(item => {
        return {
          id_page: item.dataContext.id_page
        };
      }));
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
    filterAxisY
  };
};
exports.useBubbleGraph = useBubbleGraph;
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