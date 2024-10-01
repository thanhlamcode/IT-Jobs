import { Gauge } from "@ant-design/plots";

function PerCentChart() {
  const config = {
    autoFit: true,
    data: {
      target: 210,
      total: 400,
      //   name: "score",
    },
    legend: false,
    style: {
      textContent: (target, total) =>
        `Income: ${target}M\n Percentage: ${(target / total) * 100}%`,
    },
  };
  return <Gauge {...config} />;
}

export default PerCentChart;
