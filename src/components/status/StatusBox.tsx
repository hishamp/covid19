import { useAppSelector } from "@/store/hooks";
import StatusItem from "./StatusItem";

const StatusBox = () => {
  const summary = useAppSelector((state) => state.covid.summary);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {Object.entries(summary).map(([key, value]) => {
        const color =
          key === "active"
            ? "orange"
            : key === "deaths"
            ? "red"
            : key === "recovered"
            ? "green"
            : "black";
        return <StatusItem key={key} name={key} value={value} color={color} />;
      })}
    </div>
  );
};

export default StatusBox;
