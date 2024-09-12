import { useAppSelector } from "@/store/hooks";
import Plot from "react-plotly.js";

const CovidLineChart = () => {
  const summary = useAppSelector((state) => state.covid.summary);

  const totalCases = summary.total;
  const recoveredCases = summary.recovered;
  const activeCases = summary.active;
  const deaths = summary.deaths;

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
        title: "COVID-19 Summary Data",
        xaxis: { title: "Categories" },
        yaxis: { title: "Number of Cases" },
        width: 500,
        height: 500,
      }}
    />
  );
};

export default CovidLineChart;
