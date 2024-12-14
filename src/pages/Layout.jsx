import "../App.css";
import { Outlet, Link } from "react-router-dom";
import "../input.css";


export default function Layout() {
  return (
    <div className="overflow-hidden h-full w-full">
      <div className="flex items-center w-full min-h-screen flex-col px-20 py-8">
        <img className="w-full sm:w-1/2 lg:w-1/3" src="EcoConnectLogo.png"/>
        <Outlet />
      </div>
    </div>
  );
}
