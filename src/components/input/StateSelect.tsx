import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getStateData } from "@/store/covid-slice";

const StateSelect = () => {
  const dispatch = useAppDispatch();
  const states = useAppSelector((state) => state.covid.statesList);

  const stateChange = (e: string) => {
    dispatch(getStateData(e));
  };
  return (
    <Select onValueChange={stateChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select state" />
      </SelectTrigger>
      <SelectContent>
        {/* to get all data again  */}
        <SelectItem key={"all"} value="all"> 
          All States
        </SelectItem>
        {states.map((item) => {
          return (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default StateSelect;
