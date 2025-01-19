import Time from "./Time";

export default function Timeline() {
  return (
    <div className="w-full flex items-center min-h-[300px] p-8 m-8">
      <div className="border border-blue-500 w-full min-h-[300px]">
        <Time />
      </div>
    </div>
  );
}
