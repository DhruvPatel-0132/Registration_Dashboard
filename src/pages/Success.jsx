import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const {
    formData,
    setProgress,
    setStageStatus,
    setSelectedRole,
  } = useOutletContext();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    if (!formData.stage3) {
      navigate("/register/stage-1", { replace: true });
    }
  }, [formData, navigate]);

  const handleGoHome = () => {
    setProgress(0);
    setStageStatus({
      stage1: false,
      stage2: false,
      stage3: false,
    });
    setSelectedRole("");

    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        Registration Successful
      </h2>

      <p className="mb-4 text-gray-700">
        Here is a summary of your submitted information:
      </p>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Role:</strong> {formData.stage1?.role}
        </p>

        {formData.stage2 && (
          <>
            {formData.stage2.school && (
              <p>
                <strong>School:</strong> {formData.stage2.school}
              </p>
            )}
            {formData.stage2.grade && (
              <p>
                <strong>Grade:</strong> {formData.stage2.grade}
              </p>
            )}
            {formData.stage2.subject && (
              <p>
                <strong>Subject:</strong> {formData.stage2.subject}
              </p>
            )}
            {formData.stage2.experience !== undefined && (
              <p>
                <strong>Experience:</strong> {formData.stage2.experience} years
              </p>
            )}
            {formData.stage2.department && (
              <p>
                <strong>Department:</strong> {formData.stage2.department}
              </p>
            )}
            {formData.stage2.research && (
              <p>
                <strong>Research Area:</strong> {formData.stage2.research}
              </p>
            )}
          </>
        )}

        <p>
          <strong>Email:</strong> {formData.stage3?.email}
        </p>
      </div>

      <button
        onClick={handleGoHome}
        className="mt-6 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Go to Home
      </button>
    </div>
  );
}

export default Success;
