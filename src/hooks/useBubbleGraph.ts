import { useLayoutEffect } from "react"
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { getRandomColor } from '../utils/getRandomColor';
import am5locales_en_US from "@amcharts/amcharts5/locales/en_US";
import am5locales_de_DE from "@amcharts/amcharts5/locales/de_DE";


export const useBubbleGraph = ({ id, filterAxisX, filterAxisY, dataAxis }: { id: string, filterAxisX: any, filterAxisY: any, dataAxis: any[] }) => {



    const tooltipHtml: string =
        `
      <div style="display:flex;gap:8px;align-items:center;">
        <div style="display:flex;flex-direction:column">
            <img src="{bulletSettings.src}" style="width: 50px; height: 50px; margin: 0 auto; display: block; border-radius: 25px"/>      
        </div>
        <div style="display:flex;flex-direction:column">
            <span style="font-weight:bold;">Usuario:</span>
            <span style="font-weight:bold;">Red Social:</span>
            <span style="font-weight:bold;">${filterAxisX}:</span>
            <span style="font-weight:bold;">${filterAxisY}:</span>
            <span style="font-weight:bold;">Interacciones:</span>
        </div>
        <div style="display:flex;flex-direction:column">
            <span style="float: right;">{user}</span>
            <span style="float: right;">{red}</span>
            <span style="float: right;">{valueX}</span>
            <span style="float: right;">{valueY}</span>
            <span style="float: right;">{value}</span>
        </div>
     </div>`;




    useLayoutEffect(() => {
        let root = am5.Root.new(id);
        root._logo?.dispose();
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        root.locale = am5locales_de_DE;

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelY: "zoomXY",
            pinchZoomX: true,
            pinchZoomY: true,
        }));

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {}),
        }));

        // xAxis.children.moveValue(am5.Label.new(root, {
        //   text: filterAxisX,
        //   x: am5.p50,
        //   centerX: am5.p50
        // }), xAxis.children.length - 1);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(root, {
                inversed: false,
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));

        // yAxis.children.moveValue(am5.Label.new(root, {
        //   rotation: -90,
        //   text: filterAxisY,
        //   y: am5.p50,
        //   centerX: am5.p50
        // }), 0);


        let tooltip = am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            getFillFromSprite: false,
            labelHTML: tooltipHtml,
        });

        tooltip?.get("background")?.setAll({
            fill: am5.color(0x222222),
            fillOpacity: 0.8
        });

        let series = chart.series.push(am5xy.LineSeries.new(root, {
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
        let imageTemplate = am5.Template.new<am5.Picture>({});
        imageTemplate.setAll({
            templateField: "bulletSettings",
            centerX: am5.p50,
            centerY: am5.p50,
            width: 68,
            height: 68,
        });


        let circleTemplate = am5.Template.new({});
        circleTemplate.adapters.add("fill", function (fill, target) {
            let dataItem = target.dataItem;
            if (dataItem) {
                return am5.Color.fromString(getRandomColor());
            }
            return fill
        });

        series.bullets.push(function () {
            let bulletContainer = am5.Container.new(root, {});

            let circle = bulletContainer.children.push(
                am5.Circle.new(
                    root,
                    {
                        radius: 16,
                        fillOpacity: 0.7
                    },
                    circleTemplate as am5.Template<am5.Circle>
                )
            );

            let imageContainer = bulletContainer.children.push(
                am5.Container.new(root, {
                    mask: circle
                })
            );

            let image = imageContainer.children.push(
                am5.Picture.new(root, {}, imageTemplate)
            );

            return am5.Bullet.new(root, {
                sprite: bulletContainer
            });
        });


        setHeatRules(series, circleTemplate, imageTemplate);

        series.data.setAll(
            dataAxis
        );

        chart.set("cursor", am5xy.XYCursor.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            snapToSeries: [series]
        }));


        setScrollbars(chart, root);

        series.appear(1000);
        chart.appear(1000, 100);


        return () => {
            root.dispose();
        };

    }, [dataAxis])





    return {
        dataAxis,
        filterAxisX,
        filterAxisY,
    }
}


const setScrollbars = (chart: am5xy.XYChart, root: am5.Root) => {
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    chart.set("scrollbarY", am5.Scrollbar.new(root, {
        orientation: "vertical"
    }));
}

const setHeatRules = (series: am5xy.LineSeries, circleTemplate: am5.Template<am5.Entity>, imageTemplate: am5.Template<am5.Picture>) => {
    series.set("heatRules", [
        {
            target: circleTemplate,
            min: 3,
            max: 60,
            dataField: "value",
            key: "radius"
        },
        {
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
        }
    ]);
}

