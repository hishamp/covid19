import { useAppSelector } from "@/store/hooks";
import Plot from "react-plotly.js";
import { Skeleton } from "../ui/skeleton";

const CovidLineChart = () => {
  const { summary, loading } = useAppSelector((state) => state.covid);

  const totalCases = summary.total;
  const recoveredCases = summary.recovered;
  const activeCases = summary.active;
  const deaths = summary.deaths;

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
          x: ["Total Cases", "Active Cases", "Recovered Cases", "Deaths"],
          y: [totalCases, activeCases, recoveredCases, deaths],
          type: "scatter",
          mode: "lines+markers",
          name: "Summary Data",
          line: { color: "blue" },
        },
      ]}
      layout={{
        title: "COVID-19 Summary Chart",
        xaxis: { title: "Categories" },
        yaxis: { title: "Number of Cases" },
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default CovidLineChart;
