import "../App.css";
import { Outlet, Link } from "react-router-dom";
import "../input.css";


export default function Layout() {
  return (
    <div className="overflow-hidden h-full w-full bg-slate-50">
      <div className="flex items-center w-full min-h-screen flex-col px-3 md:px-10 py-8">
        <img className="w-full lg:w-1/4" src="EcoConnectLogo.png"/>
        <Outlet />
      </div>
    </div>
  );
}
