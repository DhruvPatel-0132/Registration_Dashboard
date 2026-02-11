import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Stage1 from "./pages/Stage1";
import Stage2 from "./pages/Stage2";
import Stage3Wrapper from "./pages/Stage3Wrapper";
import Success from "./pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<DashboardLayout />}>

        <Route path="stage-1" element={<Stage1 />} />
        <Route path="stage-2" element={<Stage2 />} />
        <Route path="stage-3" element={<Stage3Wrapper />} />
        <Route path="success" element={<Success />} />
      </Route>
    </Routes>
  );
}

export default App;
