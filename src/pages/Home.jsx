import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border-2 border-blue-500 p-6 rounded-xl max-w-md w-full">

        <p className="text-m font-semibold">
          Registration App
        </p>

        <hr className="my-3 border" />

        <h1 className="text-2xl font-bold mb-2 text-center">
          Welcome to the Portal
        </h1>

        <h6 className="text-sm text-gray-600 mb-4 text-center">
          Complete your role-based Registration to get started
        </h6>

        <div className="flex justify-center">
          <NavLink
            to="/register/stage-1"
          >
            <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2">
              Start Registration
            </button>
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default Home;
