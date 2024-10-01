import { DualAxes } from "@ant-design/plots";

function ColumnLine() {
  const data = [
    { time: "2019", "Số lượng việc làm": 350, "Nhu cầu việc làm": 220 },
    { time: "2020", "Số lượng việc làm": 900, "Nhu cầu việc làm": 380 },
    { time: "2021", "Số lượng việc làm": 300, "Nhu cầu việc làm": 400 },
    { time: "2022", "Số lượng việc làm": 450, "Nhu cầu việc làm": 600 },
    { time: "2023", "Số lượng việc làm": 470, "Nhu cầu việc làm": 800 },
  ];

  const config = {
    data,
    xField: "time",
    legend: true,
    children: [
      {
        type: "interval",
        yField: "Số lượng việc làm",
        style: { maxWidth: 80 },
        label: { position: "inside" },
        interaction: {
          elementHighlight: true,
          elementHighlightByColor: { background: true },
        },
      },
      {
        type: "line",
        yField: "Nhu cầu việc làm",
        shapeField: "smooth",
        style: { lineWidth: 2 },
        axis: { y: false },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: false,
          },
        },
      },
    ],
  };
  return <DualAxes {...config} />;
}
export default ColumnLine;
