import { useNavigate, useOutletContext } from "react-router-dom";
import Stage3 from "./Stage3";

function Stage3Wrapper() {
  const navigate = useNavigate();
  const context = useOutletContext();

  return <Stage3 {...context} navigate={navigate} />;
}

export default Stage3Wrapper;
