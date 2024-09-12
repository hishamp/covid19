import { useAppSelector } from "@/store/hooks";
import Plot from "react-plotly.js";
import { Skeleton } from "../ui/skeleton";

const CovidPieChart = () => {
  const { summary, loading } = useAppSelector((state) => state.covid);

  const total = summary.total || 1;
  const deathPercentage = (summary.deaths / total) * 100;
  const recoveredPercentage = (summary.recovered / total) * 100;
  const activePercentage = (summary.active / total) * 100;

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Skeleton className="w-2/3 h-2/3" />
      </div>
    );
  }

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
        title: "Covid 19 Case data Percentage",
        showlegend: true,
        legend: {
          orientation: "h", // horizontal legend
          x: 0,
          y: -0.2,
        },
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default CovidPieChart;
