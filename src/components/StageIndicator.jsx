function StageIndicator({ currentStage }) {
  const stages = [
    { id: 1, label: "Stage 1" },
    { id: 2, label: "Stage 2" },
    { id: 3, label: "Stage 3" },
  ];

  return (
    <div className="flex items-center gap-4">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className={`px-4 py-1 rounded-full text-sm font-medium
            ${
              currentStage === stage.id
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-600"
            }`}
        >
          {stage.label}
        </div>
      ))}
    </div>
  );
}

export default StageIndicator;
