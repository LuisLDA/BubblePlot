import { useLayoutEffect } from "react"
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5locales_de_DE from "@amcharts/amcharts5/locales/de_DE";
import { getRandomColor } from '../utils/getRandomColor';


export const useBubbleGraph = ({ id, filterAxisX, filterAxisY, dataAxis, setFilterPost, isFiltereable }: { id: string, filterAxisX: any, filterAxisY: any, dataAxis: any[], setFilterPost: any, isFiltereable: boolean }) => {





    const tooltipHtml: string =
        `
      <div style="display:flex;gap:8px;align-items:center;">
        <div style="display:flex;flex-direction:column">
            <img src="{bulletSettings.src}" style="width: 50px; height: 50px; margin: 0 auto; display: block; border-radius: 25px"/>      
        </div>
        <div style="display:flex;flex-direction:column">
            <span style="font-weight:bold;">Usuario:</span>
            <span style="font-weight:bold;">Red Social:</span>
            ${filterAxisX !== 'Seguidores' ? `<span style="font-weight:bold;">${filterAxisX}:</span>` : ''}
            ${filterAxisY !== 'Seguidores' ? `<span style="font-weight:bold;">${filterAxisY}:</span>` : ''}
            <span style="font-weight:bold;">Seguidores:</span>
        </div>
        <div style="display:flex;flex-direction:column">
            <span style="float: right;">{user}</span>
            <span style="float: right;">{red}</span>
            ${filterAxisX !== 'Seguidores' ? `<span style="float: right;">{valueX}</span>` : ''}
            ${filterAxisY !== 'Seguidores' ? `<span style="float: right;">{valueY}</span>` : ''}
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
            //Filter
            //panX: false,
            //panY: false,
            panX: !isFiltereable,
            panY: !isFiltereable,
            wheelY: "zoomXY",
            pinchZoomX: true,
            pinchZoomY: true,
            maxTooltipDistance: 0,
            arrangeTooltips: false,
        }));

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            min: -100,
            maxDeviation: 0.9,
            renderer: am5xy.AxisRendererX.new(root, {}),
            //tooltip: am5.Tooltip.new(root, {}),
        }));

        // xAxis.children.moveValue(am5.Label.new(root, {
        //   text: filterAxisX,
        //   x: am5.p50,
        //   centerX: am5.p50
        // }), xAxis.children.length - 1);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min: -100,
            maxDeviation: 0.9,
            renderer: am5xy.AxisRendererY.new(root, {
                inversed: false,
            }),
            //tooltip: am5.Tooltip.new(root, {})
        }));

        // yAxis.children.moveValue(am5.Label.new(root, {
        //   rotation: -90,
        //   text: filterAxisY,
        //   y: am5.p50,
        //   centerX: am5.p50
        // }), 0);


        let tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            labelHTML: tooltipHtml,
        });

        tooltip?.get("background")?.setAll({
            fill: am5.color(0x222222),
            fillOpacity: 0.5
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
            tooltip: tooltip,
            snapTooltip: true,
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


        let circleTemplate: am5.Template<am5.Circle> = am5.Template.new({});
        circleTemplate.adapters.add("fill", function (fill, target) {
            let dataItem = target.dataItem;
            if (dataItem) {
                return am5.Color.fromString(getRandomColor());
            }
            return fill
        });


        // Agrega el icono de la red social
        let socialIconTemplate = am5.Template.new<am5.Picture>({});
        socialIconTemplate.setAll({
            templateField: "icon",
            centerX: am5.p0,
            centerY: am5.p0,
            width: 16, // Ajusta el tamaño según sea necesario
            height: 16, // Ajusta el tamaño según sea necesario
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

            imageContainer.children.push(
                am5.Picture.new(root, {}, imageTemplate)
            );

            return am5.Bullet.new(root, {
                sprite: bulletContainer,
            });
        });


        let circleIconTemplate: am5.Template<am5.Circle> = am5.Template.new({});
        circleIconTemplate.adapters.add("fill", function (fill, target) {
            let dataItem = target.dataItem;
            if (dataItem) {
                return am5.Color.fromString("#FFFFFF");
            }
            return fill
        });

        series.bullets.push(function () {
            let bulletContainer = am5.Container.new(root, {});

            let circle = bulletContainer.children.push(
                am5.Circle.new(
                    root,
                    {
                        radius: 8,
                        fillOpacity: 0.7,
                        fill: am5.color(0x000000),
                        //Poner en la esquina inferior derecha
                        //x: am5.p0,
                        //y: am5.p0,
                        centerX: am5.p0,
                        centerY: am5.p0,

                    },
                    circleIconTemplate as am5.Template<am5.Circle>
                )
            );

            let imageContainer = bulletContainer.children.push(
                am5.Container.new(root, {
                    mask: circle
                })
            );

            imageContainer.children.push(
                am5.Picture.new(root, {}, socialIconTemplate)
            );

            return am5.Bullet.new(root, {
                sprite: bulletContainer,
            });
        });


        setHeatRules(series, circleTemplate, imageTemplate, circleIconTemplate, socialIconTemplate);

        series.data.setAll(
            dataAxis
        );

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            //xAxis: xAxis,
            //yAxis: yAxis,
            snapToSeries: [series],
            behavior: isFiltereable ? "selectXY" : "none",
        }));

        if (isFiltereable) {
            cursor.events.on("selectended", function (ev) {

                // Get actors
                let cursor = ev.target;

                //console.log("Evento Target:", cursor);

                let x1 = xAxis.positionToValue(xAxis.toAxisPosition(cursor.getPrivate("downPositionX")!));
                let x2 = xAxis.positionToValue(xAxis.toAxisPosition(cursor.getPrivate("positionX")!));
                let y1 = yAxis.positionToValue(yAxis.toAxisPosition(cursor.getPrivate("downPositionY")!));
                let y2 = yAxis.positionToValue(yAxis.toAxisPosition(cursor.getPrivate("positionY")!));

                // Assemble bounds
                let bounds = {
                    left: x1 > x2 ? x2 : x1,
                    right: x1 > x2 ? x1 : x2,
                    top: y1 < y2 ? y1 : y2,
                    bottom: y1 < y2 ? y2 : y1
                };


                // Filter data items within boundaries
                let results: am5.DataItem<am5xy.ILineSeriesDataItem>[] = [];
                am5.array.each(series.dataItems, function (dataItem) {
                    let x = dataItem.get("valueX");
                    let y = dataItem.get("valueY");
                    //let z = dataItem.get("valueZ");
                    if (am5.math.inBounds({ x: x!, y: y! }, bounds)) {
                        results.push(dataItem);
                    }
                });


                // Results
                console.log(results);
                // @ts-ignore

                //FILTER
                //setFilterPost("ID_PAGE", results.map((item) => { return item.dataContext!!.ID_PAGE }));

                setFilterPost("ID_PAGE", results);

            });

        }


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

    let scrollbarX = chart.get("scrollbarX");

    scrollbarX?.startGrip.setAll({
        visible: false,
    });

    scrollbarX?.endGrip.setAll({
        visible: false,
    });

    let scrollbarY = chart.get("scrollbarY");

    scrollbarY?.startGrip.setAll({
        visible: false,
    });

    scrollbarY?.endGrip.setAll({
        visible: false,
    });

}

const setHeatRules = (series: am5xy.LineSeries,
    circleTemplate: am5.Template<am5.Entity>,
    imageTemplate: am5.Template<am5.Picture>,
    circleIconTemplate: am5.Template<am5.Circle>,
    socialIconTemplate: am5.Template<am5.Picture>
) => {
    series.set("heatRules", [
        {
            target: circleTemplate,
            min: 12,
            max: 18,
            dataField: "value",
            key: "radius"
        },
        {
            target: imageTemplate,
            min: 24,
            max: 36,
            dataField: "value",
            key: "width"
        }, {
            target: imageTemplate,
            min: 24,
            max: 36,
            dataField: "value",
            key: "height"
        },
        {
            target: circleIconTemplate,
            min: 8,
            max: 10,
            dataField: "value",
            key: "radius"
        },
        {
            target: socialIconTemplate,
            min: 16,
            max: 20,
            dataField: "value",
            key: "width"
        }, {
            target: socialIconTemplate,
            min: 16,
            max: 20,
            dataField: "value",
            key: "height"
        }
    ]);
}

