function ProgressBar({ percentage, color }) {
  const COLOR_MAP = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  return (
    <div className="w-full">
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${COLOR_MAP[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm mt-1 font-medium text-gray-700">
        {percentage}% Completed
      </p>
    </div>
  );
}

export default ProgressBar;
