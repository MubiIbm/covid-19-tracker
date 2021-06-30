import numeral from 'numeral';
import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
const options = {

    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "DD/MM/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
              
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};


const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};
function LineGraph({ casesType = 'cases', ...props }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => { return response.json() })
                .then(data => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                })
        }
        fetchData();
    }, [casesType]);



    return (
        <div className={props.className}>

            {
                data?.length > 0 && (
                    <Line

                        data={{
                            datasets: [
                                {
                                    label: "Covid-19 Cases",
                                    fill:"start",
                                    backgroundColor: '#d7798b',
                                    borderColor: "#ab314b",
                                    borderWidth: 2,
                                    data: data,
                                },
                            ],
                        }}
                        options={options}
                        className="line"
                    />)
            }
        </div>
    )
}

export default LineGraph
