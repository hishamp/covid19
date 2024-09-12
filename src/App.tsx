import "./App.css";
import CovidLineChart from "./components/chart/CovidLineChart";
import CovidPieChart from "./components/chart/CovidPieChart";
import StateSelect from "./components/input/StateSelect";
import CovidMap from "./components/map/CovidMap";
import StatusBox from "./components/status/StatusBox";
import { Card } from "./components/ui/card";

function App() {
  return (
    <div>
      <h2 className="text-6xl">Covid 19 Data</h2>
      <Card className="my-10 p-10">
        <StateSelect />
        <StatusBox />
        <div className="grid lg:grid-cols-2 grid-cols-1 mt-10">
          <CovidPieChart />
          <CovidLineChart />
        </div>
      </Card>
      <Card className="h-[500px]">
        <CovidMap />
      </Card>
    </div>
  );
}

export default App;
