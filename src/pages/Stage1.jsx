import { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FormError from "../components/FormError";

function Stage1() {
  const navigate = useNavigate();

  const {
    selectedRole,
    setSelectedRole,
    setProgress,
    stageStatus,
    setStageStatus,
    setFormData,
  } = useOutletContext();

  const [error, setError] = useState("");
  const selectRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setError("Please select a role");
      selectRef.current.focus();
      return;
    }

    setStageStatus({
      ...stageStatus,
      stage1: true,
    });

    setFormData((prev) => ({
      ...prev,
      stage1: { role: selectedRole },
    }));

    setProgress(66);

    navigate("/register/stage-2");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Select Your Role</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          ref={selectRef}
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
            setError("");
          }}
          className="w-full rounded-lg border px-4 py-2"
          disabled={stageStatus.stage1}
        >
          <option value="">-- Select Role --</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="professor">Professor</option>
        </select>

        {error && <FormError message={error} />}

        <button
          type="submit"
          disabled={stageStatus.stage1}
          className={`w-full py-2 rounded-lg text-white font-medium
            ${
              stageStatus.stage1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default Stage1;
