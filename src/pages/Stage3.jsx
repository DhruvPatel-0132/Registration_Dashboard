import React from "react";
import { Navigate } from "react-router-dom";
import FormError from "../components//FormError";

class Stage3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      agreement: false,
      error: "",
      submitted: false,
    };

    this.emailRef = React.createRef();
  }

  validateForm = () => {
    const { email, agreement } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.setState({ error: "Please enter a valid email" });
      this.emailRef.current.focus();
      return false;
    }

    if (!agreement) {
      this.setState({ error: "You must accept the agreement" });
      return false;
    }

    return true;
  };

  handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    this.setState({
      [name]: type === "checkbox" ? checked : value,
      error: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) return;

    const {
      setProgress,
      stageStatus,
      setStageStatus,
      setFormData,
      navigate,
    } = this.props;

    setStageStatus({
      ...stageStatus,
      stage3: true,
    });

    setFormData((prev) => ({
      ...prev,
      stage3: {
        email: this.state.email,
        agreement: this.state.agreement,
      },
    }));

    setProgress(100);

    this.setState({ submitted: true });

    navigate("/register/success");
  };

  render() {
    if (this.state.submitted) {
      return <Navigate to="/register/success" replace />;
    }

    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Additional Information
        </h2>

        <form onSubmit={this.handleSubmit} className="space-y-4">
          <input
            ref={this.emailRef}
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agreement"
              checked={this.state.agreement}
              onChange={this.handleChange}
            />
            Agreement
          </label>

          {this.state.error && <FormError message={this.state.error} />}

          <button
            type="submit"
            disabled={!this.state.email || !this.state.agreement}
            className={`w-full py-2 rounded-lg text-white font-medium
              ${
                !this.state.email || !this.state.agreement
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Stage3;
