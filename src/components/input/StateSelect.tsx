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
    console.log(e, typeof e);
    dispatch(getStateData(e));
  };
  return (
    <Select onValueChange={stateChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="state" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={"all"} value="all">
          India
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
