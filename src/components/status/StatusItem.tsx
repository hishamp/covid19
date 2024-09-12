const StatusDot = ({ color = "black" }: { color?: string }) => {
  return (
    <span
      style={{ background: color }}
      className={`mr-2 h-[8px] w-[8px] rounded-full bg-inherit inline-block`}
    ></span>
  );
};

const StatusItem = ({
  name,
  value,
  color,
}: {
  name: string;
  value: number;
  color: string;
}) => {
  return (
    <div className="capitalize" style={{ color: color }} >
      <StatusDot color={color} />
      <span className="font-bold">
        {name} : {value}
      </span>
    </div>
  );
};

export default StatusItem;
