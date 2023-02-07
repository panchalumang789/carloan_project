import React, { useLayoutEffect, useState } from "react";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useEffect } from "react";

const Graph = (props) => {
  const [display, setDisplay] = useState(props.display);
  const chartID = props.chartID;

  useEffect(() => {
    setDisplay(props.display);
  }, [props]);

  useLayoutEffect(() => {
    var root = am5.Root.new(chartID);

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    series.states.create("hidden", {
      endAngle: -90,
    });

    let data = props.graphData;
    series.data.setAll(data);

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);
  }, [chartID]);

  return (
    <div
      className={
        display +
        " fixed inset-0 flex justify-center items-center z-50 bg-transparent/70"
      }
    >
      <div className="h-11/12 w-11/12 md:h-auto md:w-auto z-50 bg-white p-2">
        <div className="w-full text-right">
          <button
            className="relative ml-auto w-14 top-2 font-medium fa-solid fa-close text-3xl"
            onClick={() => props.visible("hidden")}
          ></button>
        </div>
        <div className="w-[700px] h-[430px]" id={chartID}></div>
      </div>
    </div>
  );
};

export default Graph;
