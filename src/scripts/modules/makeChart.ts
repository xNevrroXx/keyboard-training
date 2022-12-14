import {Chart, registerables } from "chart.js";
import {IDataStatistic} from "../types";

function makeChart(chartData: IDataStatistic["timestamp"], canvasSelector: string, label: string, targetTypeChart: "speed" | "accuracy", parentElem?: HTMLElement) {
  Chart.register(...registerables);
  let canvasContext;
  if(parentElem) {
    canvasContext = (<HTMLCanvasElement>parentElem.querySelector(canvasSelector)).getContext('2d');
  }
  else {
    canvasContext = (<HTMLCanvasElement>document.querySelector(canvasSelector)).getContext('2d');
  }

  const formattingData = [];
  for (let i = 0, length = chartData.length; i < length; i++) {
    formattingData.push({
      x: chartData[i].char,
      y: chartData[i][targetTypeChart]
    })
  }
  const dataTest = {
    datasets: [{
      label: label,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: formattingData
    }]
  }
  const config = {
    type: "line",
    data: dataTest,
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: {
            callback: function(value: any, index: any) {
              return this.getLabelForValue(value) + (targetTypeChart === "speed" ? " ch/min" : "%");
            }
          }
        },
        x: {
          ticks: {
            callback: function (value: any, index: any) {
              return this.getLabelForValue(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const label = context.dataset.label;

              return label;
            },
            beforeLabel: function(context: any) {
              let label = `avg ${targetTypeChart} - `;
              const value = context.parsed.y;
              const char = context.label;

              if (value || value === 0) {
                label += value;
              }

              if (targetTypeChart === "accuracy") {
                const charData = chartData.filter(value => value.char === char)[0];

                label += `. Mistake in ${charData.countMistakes} out of ${charData.totalNumber}`;
              }

              return label;
            }
          }
        }
      }
    }
  }

  const myChart = new Chart(
    canvasContext,
    // @ts-ignore
    config
  );
}

export default makeChart;