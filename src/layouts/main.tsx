import { Outlet } from "react-router-dom";
import NavLink from "../components/site/NavLink";

export default function MainLayout() {
  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-2.5 sticky w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <div className="mr-3">
              <svg
                id="logo-35"
                width="50"
                height="39"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                  className="ccompli1"
                  fill="#007AFF"
                ></path>
                <path
                  d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                  className="ccustom"
                  fill="#312ECB"
                ></path>
              </svg>
            </div>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Demo
            </span>
          </a>
          <div className="items-center justify-between flex order-1">
            <ul className="flex p-4 space-x-8 text-sm font-medium bg-white">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/register">Register</NavLink>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
