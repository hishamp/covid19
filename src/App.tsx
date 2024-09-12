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
      <h2 className="lg:text-6xl text-3xl">Covid 19 Data</h2>
      <Card className="md:my-10 md:p-10 p-2">
        <StateSelect />
        <StatusBox />
        <div className="grid lg:grid-cols-2 grid-cols-1 mt-10">
          <div className="w-[250px] h-[350px] md:w-[500px] md:h-[500px]">
            <CovidPieChart />
          </div>
          <div className="w-[320px] h-[350px] md:w-[500px] md:h-[500px]">
            <CovidLineChart />
          </div>
        </div>
      </Card>
      <Card className="h-[500px] mt-4">
        <CovidMap />
      </Card>
    </div>
  );
}

export default App;
