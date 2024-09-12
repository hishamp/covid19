import { useAppSelector } from "@/store/hooks";
import Plot from "react-plotly.js";

const CovidPieChart = () => {
  const summary = useAppSelector((state) => state.covid.summary);

  const total = summary.total || 1;
  const deathPercentage = (summary.deaths / total) * 100;
  const recoveredPercentage = (summary.recovered / total) * 100;
  const activePercentage = (summary.active / total) * 100;

  return (
    <Plot
      data={[
        {
          type: "pie",
          values: [activePercentage, recoveredPercentage, deathPercentage],
          labels: ["active", "recovered", "death"],
          hoverinfo: "label+percent",
          textinfo: "value",
        },
      ]}
      layout={{
        title: "Covid 19 Case data",
        width: 500,
        height: 500,
      }}
    />
  );
};

export default CovidPieChart