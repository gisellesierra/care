import React from 'react';
import { Chart, Geom, Axis } from 'bizcharts';
import moment from 'moment';
import dateFormat from 'dateformat';



const ChartPain = ({datas,type,max})=>{
    const data = []
    datas.map(dataResponseDate=>{
        dataResponseDate.responses.map(value=>{
            if(value[type] !== undefined && value[type] === true){
                console.log(value)
                data.push({
                    "date":dateFormat( dataResponseDate.date_response,'yyyy-mm-dd'),
                    "value": parseInt(value.response)*100/max
                })
            }
        })

    })
    const scale = {
        value: {
            type: "linear",
            formatter: val => {
                return val + "%";
            },
            tickCount: 5,
            ticks: ["0", "25", "50", "75", "100"],
        }
    };
    // const data = [
    //     {"date": '2021-02-28', "value": 60},
    //     {"date": '2021-02-29', "value": 80},
    //     {"date": '2021-03-01', "value": 99},
    //     {"date": '2021-03-02', "value": 89},
    //     {"date": '2021-03-03', "value": 79},
    //     {"date": '2021-03-04', "value": 89},
    //     {"date": '2021-03-05', "value": 49},
    //     {"date": '2021-03-06', "value": 79},
    //     {"date": '2021-03-07', "value": 69}
    // ];
    return(
    <Chart
        width={600}
        height={400}
        data={data.map(item => {
        const date = moment(item.date).format('YYYY-MM-DD');
        return Object.assign({ date }, item);
    })}
        scale={scale}>
        <Axis name="date" />
        <Axis name="value" />
        <Geom type="line" position="date*value" shape='smooth' />
    </Chart>
)}
export default ChartPain