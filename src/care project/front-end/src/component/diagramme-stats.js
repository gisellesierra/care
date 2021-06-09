import React from "react";
import { Chart, Interval, Interaction } from "bizcharts";
const data = [
    { day: "Lundi", connected: 38 },
    { day: "Mardi", connected: 52 },
    { day: "Mercredi",connected: 61 },
    { day: "Jeudi", connected: 45 },
    { day: "Vendredi", connected: 48 },
    { day: "Samedi", connected: 38 },
    { day: "Dimanche", connected: 38 },
];
const DiagrammeStats = ()=>(
    <div className={"diagramme"} style={{padding:'20px'}}>
        <Chart autoFit data={data} height={400} padding="auto">
            <Interval position="day*connected" />
            <Interaction type="element-highlight" />
            <Interaction type="active-region" />
        </Chart>
    </div>
)
export default DiagrammeStats
