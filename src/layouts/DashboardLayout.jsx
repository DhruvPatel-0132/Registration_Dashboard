import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import StageIndicator from "../components/StageIndicator";

const PROGRESS_COLOR_RULES = {
  red: [0, 33],
  orange: [34, 66],
  blue: [67, 99],
  green: [100, 100],
};

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [progress, setProgress] = useState(33);

  const [stageStatus, setStageStatus] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
  });

  const [formData, setFormData] = useState({
    stage1: {},
    stage2: {},
    stage3: {},
  });

  const getCurrentStage = () => {
    if (location.pathname.includes("stage-1")) return 1;
    if (location.pathname.includes("stage-2")) return 2;
    if (location.pathname.includes("stage-3")) return 3;
    return 0;
  };

  const currentStage = getCurrentStage();

  const getProgressColor = () => {
    for (const color in PROGRESS_COLOR_RULES) {
      const [min, max] = PROGRESS_COLOR_RULES[color];
      if (progress >= min && progress <= max) return color;
    }
  };

  useEffect(() => {
    if (currentStage === 2 && !stageStatus.stage1) {
      navigate("/", { replace: true });
    }

    if (currentStage === 3 && !stageStatus.stage2) {
      navigate("/", { replace: true });
    }

    if (location.pathname.includes("success") && !stageStatus.stage3) {
      navigate("/", { replace: true });
    }
  }, [currentStage, stageStatus, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4 text-xl font-semibold">
        Multi-Stage Registration Dashboard
      </header>

      <div className="p-4 space-y-3 bg-white shadow">
        <StageIndicator currentStage={currentStage} />
        <ProgressBar percentage={progress} color={getProgressColor()} />
      </div>

      <main className="p-6">
        <Outlet context={{selectedRole,setSelectedRole,progress,setProgress,stageStatus,setStageStatus,formData,setFormData}}
        />
      </main>
    </div>
  );
}

export default DashboardLayout;
