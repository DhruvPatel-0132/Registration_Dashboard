import { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FormError from "../components/FormError";

function Stage2() {
  const navigate = useNavigate();

  const {
    selectedRole,
    setProgress,
    stageStatus,
    setStageStatus,
    setFormData,
  } = useOutletContext();

  const [errors, setErrors] = useState({});

  const refs = {
    student: {
      school: useRef(null),
      grade: useRef(null),
    },
    teacher: {
      subject: useRef(null),
      experience: useRef(null),
    },
    professor: {
      department: useRef(null),
      research: useRef(null),
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let firstInvalidRef = null;

    if (selectedRole === "student") {
      const school = e.target.school.value.trim();
      const grade = e.target.grade.value.trim();

      if (!school) {
        newErrors.school = "School name is required";
        firstInvalidRef = refs.student.school;
      }

      if (!grade) {
        newErrors.grade = "Grade is required";
        if (!firstInvalidRef) firstInvalidRef = refs.student.grade;
      }

      if (Object.keys(newErrors).length === 0) {
        setFormData((prev) => ({
          ...prev,
          stage2: { school, grade },
        }));
      }
    }

    if (selectedRole === "teacher") {
      const subject = e.target.subject.value.trim();
      const experience = e.target.experience.value.trim();

      if (!subject) {
        newErrors.subject = "Subject is required";
        firstInvalidRef = refs.teacher.subject;
      }

      if (experience === "" || Number(experience) < 0) {
        newErrors.experience = "Experience must be 0 or more";
        if (!firstInvalidRef) firstInvalidRef = refs.teacher.experience;
      }

      if (Object.keys(newErrors).length === 0) {
        setFormData((prev) => ({
          ...prev,
          stage2: { subject, experience },
        }));
      }
    }

    if (selectedRole === "professor") {
      const department = e.target.department.value.trim();
      const research = e.target.research.value.trim();

      if (!department) {
        newErrors.department = "Department is required";
        firstInvalidRef = refs.professor.department;
      }

      if (!research) {
        newErrors.research = "Research area is required";
        if (!firstInvalidRef) firstInvalidRef = refs.professor.research;
      }

      if (Object.keys(newErrors).length === 0) {
        setFormData((prev) => ({
          ...prev,
          stage2: { department, research },
        }));
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      firstInvalidRef?.current.focus();
      return;
    }

    setStageStatus({
      ...stageStatus,
      stage2: true,
    });

    setProgress(99);

    navigate("/register/stage-3");
  };

  const renderForm = () => {
    if (selectedRole === "student") {
      return (
        <>
          <input
            name="school"
            ref={refs.student.school}
            placeholder="School Name"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.school && <FormError message={errors.school} />}

          <input
            name="grade"
            ref={refs.student.grade}
            placeholder="Grade"
            type="number"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.grade && <FormError message={errors.grade} />}
        </>
      );
    }

    if (selectedRole === "teacher") {
      return (
        <>
          <input
            name="subject"
            ref={refs.teacher.subject}
            placeholder="Subject"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.subject && <FormError message={errors.subject} />}

          <input
            name="experience"
            ref={refs.teacher.experience}
            placeholder="Years of Experience"
            type="number"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.experience && <FormError message={errors.experience} />}
        </>
      );
    }

    if (selectedRole === "professor") {
      return (
        <>
          <input
            name="department"
            ref={refs.professor.department}
            placeholder="Department"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.department && <FormError message={errors.department} />}

          <input
            name="research"
            ref={refs.professor.research}
            placeholder="Research Area"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.research && <FormError message={errors.research} />}
        </>
      );
    }

    return null;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {selectedRole
          ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Details`
          : "Role Details"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderForm()}

        <button
          type="submit"
          disabled={stageStatus.stage2}
          className={`w-full py-2 rounded-lg text-white font-medium
            ${
              stageStatus.stage2
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

export default Stage2;
