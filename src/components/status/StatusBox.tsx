import { useAppSelector } from "@/store/hooks";
import StatusItem from "./StatusItem";
import { Skeleton } from "../ui/skeleton";

const StatusBox = () => {
  const { summary, loading } = useAppSelector((state) => state.covid);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 my-4 gap-2">
      {Object.entries(summary).map(([key, value]) => {
        const color =
          key === "active"
            ? "orange"
            : key === "deaths"
            ? "red"
            : key === "recovered"
            ? "green"
            : "black";
        if(loading){
            return <Skeleton className="h-[20px]" />
        }   
        return <StatusItem key={key} name={key} value={value} color={color} />;
      })}
    </div>
  );
};

export default StatusBox;
